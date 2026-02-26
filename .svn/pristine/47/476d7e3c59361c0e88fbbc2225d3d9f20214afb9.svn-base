const getServerUrl = () => process.env.NEXT_PUBLIC_API_URL1 ?? "";
const NEXT_PUBLIC_API_URL1 = process.env.NEXT_PUBLIC_API_URL1;
const NEXT_PUBLIC_API_URL2 = process.env.NEXT_PUBLIC_API_URL2;
const NEXT_PUBLIC_API_URL3 = process.env.NEXT_PUBLIC_API_URL3;

export const API_PATH = {
  // Server-side routes (called from route.ts) - use getter
  get VERIFY_OTP() {
    return `${getServerUrl()}/auth/verify-otp`;
  },
  //Identity Service - API's
  SEND_OTP: `${NEXT_PUBLIC_API_URL1}/auth/send-otp`,
  AUTH_REFRESH: `${NEXT_PUBLIC_API_URL1}/auth/refresh`,
  GET_ROLES: `${NEXT_PUBLIC_API_URL1}/roles`,
  GET_MENU_MASTER: `${NEXT_PUBLIC_API_URL1}/menus`,
  GET_ROLE_MENU_PERMISSIONS: `${NEXT_PUBLIC_API_URL1}/role-menu-permissions/role`,
  SUBMIT_ROLE_MENU_PERMISSIONS: `${NEXT_PUBLIC_API_URL1}/role-menu-permissions`,
  MENU_MASTER: `${NEXT_PUBLIC_API_URL1}/menus`,
  GET_USER_MASTER: `${NEXT_PUBLIC_API_URL1}/users`,

  //Society Service - API's
  GET_SOCIETY_LEVELS: `${NEXT_PUBLIC_API_URL2}/society-level`,
  GET_PACKAGE: `${NEXT_PUBLIC_API_URL2}/package-master`,
  GET_GEN_CODE: `${NEXT_PUBLIC_API_URL2}/gencode-master`,
  GET_SERVICE: `${NEXT_PUBLIC_API_URL2}/services-master`,
  GET_STATE_MASTER: `${NEXT_PUBLIC_API_URL2}/state-master`,
  GET_DISTRICT_MASTER: `${NEXT_PUBLIC_API_URL2}/district-master`,
  GET_AMENITY: `${NEXT_PUBLIC_API_URL2}/amenities`,
  POST_AMENITY: `${NEXT_PUBLIC_API_URL2}/amenities`,
  UPDATE_AMENITY: `${NEXT_PUBLIC_API_URL2}/amenities`,
  DELETE_AMENITY: `${NEXT_PUBLIC_API_URL2}/amenities`,
  GET_SERVICE_MASTER: `${NEXT_PUBLIC_API_URL2}/services-master`,

  //Society Management Service-API's
  GET_SOCITIES: `${NEXT_PUBLIC_API_URL3}/societies`,
  GET_TIER_CAT_MAPPING: `${NEXT_PUBLIC_API_URL3}/tier-category-map`,
  POST_TIER_CAT_MAPPING: `${NEXT_PUBLIC_API_URL3}/tier-category-map`,
  UPDATE_TIER_CAT_MAPPING: `${NEXT_PUBLIC_API_URL3}/tier-category-map`,
  DELETE_TIER_CAT_MAPPING: `${NEXT_PUBLIC_API_URL3}/tier-category-map`,
  CATEGORY_AMENITY_MAPPING: `${NEXT_PUBLIC_API_URL3}/category-amenity-map`,
  PACKAGE_TIER_MAPPING: `${NEXT_PUBLIC_API_URL3}/package-tier-map`,
};
