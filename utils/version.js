// Version info and build the version slug for the footer CHANGELOG link
export const version = "v4.1.0";
export const date = "june-13-2026";
export const versionSlug = `${version
  .replace(/^v/, "")
  .replaceAll(".", "")}---${date}`;
