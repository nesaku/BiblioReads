// Return higher resolution images
export function cleanImageUrl(url) {
  if (url.includes("._UY") || url.includes("._UX")) {
    return url;
  }

  const newUrl = url
    .replace("._SX120_SY180_", "._SX180_SY220_")
    .replace("._SX120_", "._SX180_")
    .replace("._SY180_", "._SY200_")
    .replace("._SX50_SY75_", "._SX75_SY120_")
    .replace("._SY75_", "._SY180_")
    .replace("._SX50_", "._SX80_")
    .replace("._SX98_SY160_", "._SX120_SY180_")
    .replace("._SX98_", "._SX120_");

  return newUrl !== url ? newUrl : url;
}
