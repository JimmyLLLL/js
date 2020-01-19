import { ASSET_INDICATORS } from "../dicts/others";

export const getAssetIndicator = (name: string): string =>
  ASSET_INDICATORS[name];
