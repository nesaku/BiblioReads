import { cleanImageUrl } from "../../utils/cleanImageUrl";
// Load WebP Image With JPG Fallback
const CoverImage = ({
  src,
  alt,
  width = 98,
  height = 148,
  extraClasses = "",
  loading = "lazy",
  onLoad = null,
  onError = null,
}) => (
  <picture>
    <source
      srcSet={`/img?url=${cleanImageUrl(src)}&output=webp&maxage=30d`}
      type="image/webp"
      className={`rounded-lg shadow-sm drop-shadow-sm bg-white dark:bg-slate-900 ${extraClasses}`}
    />
    <source
      srcSet={`/img?url=${cleanImageUrl(src)}&maxage=30d`}
      type="image/jpeg"
      className={`rounded-lg shadow-sm drop-shadow-sm bg-white dark:bg-slate-900 ${extraClasses}`}
    />
    <img
      src={`/img?url=${cleanImageUrl(src)}&maxage=30d`}
      alt={alt}
      width={width}
      height={height}
      className={`rounded-lg border-2 shadow-sm drop-shadow-sm bg-white dark:bg-slate-900 ${extraClasses}`}
      loading={loading}
      onLoad={onLoad}
      onError={onError}
    />
  </picture>
);

export default CoverImage;
