// Version info and build the version slug for the footer CHANGELOG link
export const version = "v4.3.1";
export const date = "oct-28-2026";
export const versionSlug = `${version
  .replace(/^v/, "")
  .replaceAll(".", "")}---${date}`;
