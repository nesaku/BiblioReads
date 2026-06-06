// Version info and build the version slug for the footer CHANGELOG link
export const version = "v3.6.1";
export const date = "june-6-2026";
export const versionSlug = `${version
  .replace(/^v/, "")
  .replaceAll(".", "")}---${date}`;
