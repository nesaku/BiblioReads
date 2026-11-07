// Version info and build the version slug for the footer CHANGELOG link
export const version = "v4.5.0";
export const apiVersion = `BiblioReads ${version}`;
export const date = "nov-6-2026";
export const versionSlug = `${version
  .replace(/^v/, "")
  .replaceAll(".", "")}---${date}`;
