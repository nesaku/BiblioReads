// Version info and build the version slug for the footer CHANGELOG link
export const version = "v3.5.3";
export const date = "nov-29-2025";
export const versionSlug = `${version
  .replace(/^v/, "")
  .replaceAll(".", "")}---${date}`;
