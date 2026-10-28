import { env } from "next-runtime-env";

const DEFAULT_USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/155.0.0.0 Safari/537.36";

export const getUserAgent = () =>
  env("NEXT_PUBLIC_USER_AGENT") || DEFAULT_USER_AGENT;
