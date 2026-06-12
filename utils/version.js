// Version info and build the version slug for the footer CHANGELOG link
export const version = "v4.0.0";
export const date = "june-12-2026";
export const versionSlug = `${version
  .replace(/^v/, "")
  .replaceAll(".", "")}---${date}`;
