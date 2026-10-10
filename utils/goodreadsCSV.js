// Handle the parsing of Goodreads CSV export files
function parseRows(text) {
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    if (quoted && char === '"' && text[i + 1] === '"') {
      field += '"';
      i += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (!quoted && char === ",") {
      row.push(field);
      field = "";
    } else if (!quoted && (char === "\n" || char === "\r")) {
      if (char === "\r" && text[i + 1] === "\n") i += 1;
      row.push(field);
      if (row.some((value) => value.trim())) rows.push(row);
      row = [];
      field = "";
    } else {
      field += char;
    }
  }

  if (quoted) throw new Error("CSV has an unterminated quoted field.");
  row.push(field);
  if (row.some((value) => value.trim())) rows.push(row);
  return rows;
}

function parseDate(value) {
  const match = value.match(/^(\d{4})\/(\d{1,2})\/(\d{1,2})$/);
  return match
    ? new Date(
        Number(match[1]),
        Number(match[2]) - 1,
        Number(match[3]),
      ).getTime()
    : Date.now();
}

export function parseGoodreadsCSV(text) {
  const rows = parseRows(text.replace(/^\uFEFF/, ""));
  const headerRow = rows.shift();
  const columns = {};
  if (headerRow) {
    headerRow.forEach((header, index) => {
      columns[header.trim().toLowerCase()] = index;
    });
  }
  const idColumn =
    columns["book id"] !== undefined
      ? columns["book id"]
      : columns["goodreads book id"];

  if (
    idColumn === undefined ||
    columns.title === undefined ||
    columns.author === undefined
  ) {
    throw new Error(
      "This is not a Goodreads CSV export (Book Id, Title, and Author columns are required).",
    );
  }

  const get = (row, name) => {
    const value = row[columns[name]] || "";
    return value.replace(/^="([\s\S]*)"$/, "$1").trim();
  };
  const books = new Map();

  for (const row of rows) {
    const id = (row[idColumn] || "").trim();
    const title = get(row, "title");
    if (!/^\d+$/.test(id) || !title) continue;
    if (books.has(id)) continue;

    const authors = [];
    const authorNames = [get(row, "author")];
    get(row, "additional authors")
      .split(",")
      .forEach((author) => authorNames.push(author.trim()));
    authorNames.forEach((name) => {
      if (name) authors.push({ name, role: "Author", url: null });
    });
    const rating = Number(get(row, "my rating"));

    books.set(id, {
      slug: id,
      timestamp: parseDate(get(row, "date added")),
      title,
      author: authors,
      personalRating: rating > 0 ? rating : null,
      privateNotes: get(row, "private notes"),
      cover: null,
      goodreads: {
        isbn: get(row, "isbn"),
        isbn13: get(row, "isbn13"),
        publisher: get(row, "publisher"),
        binding: get(row, "binding"),
        pages: get(row, "number of pages"),
        yearPublished: get(row, "year published"),
        originalPublicationYear: get(row, "original publication year"),
        dateRead: get(row, "date read"),
        bookshelves: get(row, "bookshelves"),
        bookshelvesWithPositions: get(row, "bookshelves with positions"),
        exclusiveShelf: get(row, "exclusive shelf"),
        readCount: get(row, "read count"),
        ownedCopies: get(row, "owned copies"),
      },
    });
  }

  if (!books.size) throw new Error("No valid books found in Goodreads CSV.");
  return Array.from(books.values());
}
