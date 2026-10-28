const useLocalImageProxy = process.env.NEXT_PUBLIC_IMAGE_PROXY === "next";

export const getImageProxyUrl = (source, webp = false) => {
  const options = useLocalImageProxy
    ? ""
    : `${webp ? "&output=webp" : ""}&maxage=30d`;

  return `/img?url=${encodeURIComponent(source)}${options}`;
};
