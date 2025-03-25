import get from "lodash/get";

export const Tokens = (
  item?: unknown
): {
  accessToken: string;
  refreshToken: string;
} => ({
  accessToken: get(item, "accessToken") || "",
  refreshToken: get(item, "refreshToken") || "",
});
