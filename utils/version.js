// Version info and build the version slug for the footer CHANGELOG link
export const version = "v3.5.2";
export const date = "nov-09-2025";
export const versionSlug = `${version
  .replace(/^v/, "")
  .replaceAll(".", "")}---${date}`;
