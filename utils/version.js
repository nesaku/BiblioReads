// Version info and build the version slug for the footer CHANGELOG link
export const version = "v3.5.4";
export const date = "jan-24-2026";
export const versionSlug = `${version
  .replace(/^v/, "")
  .replaceAll(".", "")}---${date}`;
