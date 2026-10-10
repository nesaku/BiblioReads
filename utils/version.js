// Version info and build the version slug for the footer CHANGELOG link
export const version = "v4.2.0";
export const date = "oct-10-2026";
export const versionSlug = `${version
  .replace(/^v/, "")
  .replaceAll(".", "")}---${date}`;
