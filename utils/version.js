// Version info and build the version slug for the footer CHANGELOG link
export const version = "v3.6.0";
export const date = "may-11-2026";
export const versionSlug = `${version
  .replace(/^v/, "")
  .replaceAll(".", "")}---${date}`;
