// Version info and build the version slug for the footer CHANGELOG link
export const version = "v4.4.0";
export const apiVersion = `BiblioReads ${version}`;
export const date = "oct-29-2026";
export const versionSlug = `${version
  .replace(/^v/, "")
  .replaceAll(".", "")}---${date}`;
