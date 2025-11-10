import { version, date, versionSlug } from "@/utils/version";

const status = (req, res) => {
  res.status(200).json({
    status_code: 200,
    status: "ok",
    timestamp: new Date().toISOString(),
    version,
    date,
    changelog: `https://github.com/nesaku/BiblioReads/blob/main/CHANGELOG.md#${versionSlug}`,
    repository_url: "https://github.com/nesaku/BiblioReads",
  });
};
export default status;
