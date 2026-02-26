// ==========Brand Colors start==========

import { IMAGES } from "./images";
import { RouteConfig } from "./routeConfig";
export const RECORD_PER_PAGE = 10;
export const PRIMARY_BG = "#2E5799";
export const PRIMARY_GRADIENT =
  "linear-gradient(145.36deg, #177699 17.42%, #00307D 87.28%)";
export const PRIMARY_HOVER = "#7ca0c9";
export const PRIMARY_TEXT = "#FFFFFF";

export const SECONDARY_BG = "#FF8100";
export const SECONDARY_HOVER = "#FFB300";
export const SECONDARY_TEXT = "#ffffff";

export const TERTIARY_BG = "#DDDDDD";
export const TERTIARY_HOVER = "#c5c5c5ff";
export const TERTIARY_TEXT = "#000111a6";

export const DANGER_BG = "#E53935";
export const DANGER_HOVER = "#C62828";
export const DANGER_TEXT = "#FFFFFF";

export const SUCCESS_BG = "#43A047";
export const SUCCESS_HOVER = "#2E7D32";
export const SUCCESS_TEXT = "#FFFFFF";

export const INFO_BG = "#0288D1";
export const INFO_HOVER = "#01579B";
export const INFO_TEXT = "#FFFFFF";

// ==========Brand Colors end==========

export const BRAND_COLORS = {
  primary: {
    background: PRIMARY_BG,
    hover: PRIMARY_HOVER,
    text: PRIMARY_TEXT,
    gradient: PRIMARY_GRADIENT,
  },
  secondary: {
    background: SECONDARY_BG,
    hover: SECONDARY_HOVER,
    text: SECONDARY_TEXT,
  },
  danger: {
    background: DANGER_BG,
    hover: DANGER_HOVER,
    text: DANGER_TEXT,
  },
  tertiary: {
    background: TERTIARY_BG,
    hover: TERTIARY_HOVER,
    text: TERTIARY_TEXT,
  },
} as const;

export type BrandColorVariant = keyof typeof BRAND_COLORS;

export const MENU_DETAILS = [
  {
    UserGuid: "557767B6-F4F4-41D0-BAAF-9B1E8B05C493",
    menuCode: "CSACENQ",
    menuDesc: "Dashboard",
    navigationLink: "/customerEnquiry",
    menuIcon: "IconGauge",
    ParentMenu: "CSACENQ",
    MenuType: "SideMenu",
    MenuSequence: 4000,
    AllowAccess: 1,
    children: [],
  },
  {
    UserGuid: "557767B6-F4F4-41D0-BAAF-9B1E8B05C493",
    menuCode: "CSACERE",
    menuDesc: "Access Control",
    navigationLink: "/cebReports",
    menuIcon: "IconSettings",
    ParentMenu: "CSACERE",
    MenuType: "SideMenu",
    MenuSequence: 4010,
    AllowAccess: 1,
    children: [
      {
        UserGuid: "557767B6-F4F4-41D0-BAAF-9B1E8B05C493",
        menuCode: "CSAOSSCVRE",
        menuDesc: "Role Setup",
        navigationLink: "",
        menuIcon: "IconKey",
        ParentMenu: "CSACERE",
        MenuType: "SubMenu",
        MenuSequence: 10,
        AllowAccess: 1,
        children: [],
      },
      {
        UserGuid: "557767B6-F4F4-41D0-BAAF-9B1E8B05C493",
        menuCode: "CSAOSSCVRE",
        menuDesc: "User Setup",
        navigationLink: "",
        menuIcon: "IconUsers",
        ParentMenu: "CSACERE",
        MenuType: "SubMenu",
        MenuSequence: 10,
        AllowAccess: 1,
        children: [],
      },
    ],
  },
  {
    UserGuid: "557767B6-F4F4-41D0-BAAF-9B1E8B05C493",
    menuCode: "CSAMMRE",
    menuDesc: "Menu Control",
    navigationLink: "/mailMergeReports",
    menuIcon: "IconUserShield",
    ParentMenu: "CSAMMRE",
    MenuType: "SideMenu",
    MenuSequence: 4020,
    AllowAccess: 1,
    children: [
      {
        UserGuid: "557767B6-F4F4-41D0-BAAF-9B1E8B05C493",
        menuCode: "CSAOSSCVRE",
        menuDesc: "Menu Setup",
        navigationLink: "",
        menuIcon: "IconListDetails",
        ParentMenu: "CSACERE",
        MenuType: "SubMenu",
        MenuSequence: 10,
        AllowAccess: 1,
        children: [],
      },
      {
        UserGuid: "557767B6-F4F4-41D0-BAAF-9B1E8B05C493",
        menuCode: "CSAOSSCVRE",
        menuDesc: "Role Permissions",
        navigationLink: "",
        menuIcon: "IconLock",
        ParentMenu: "CSACERE",
        MenuType: "SubMenu",
        MenuSequence: 10,
        AllowAccess: 1,
        children: [],
      },
    ],
  },
  {
    UserGuid: "557767B6-F4F4-41D0-BAAF-9B1E8B05C493",
    menuCode: "CSAOSSCVRE",
    menuDesc: "Reports",
    navigationLink: "",
    menuIcon: "IconReportAnalytics",
    ParentMenu: "CSACERE",
    MenuType: "SideMenu",
    MenuSequence: 10,
    AllowAccess: 1,
    children: [],
  },
];

export const STATUS_CODE = {
  SUCCESS: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  ACCESS_DENIED: 403,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500,
} as const;

export const STATUS_MESSAGE = {
  SUCCESSFUL: "Successful!",
  FAILED: "Failed!",
  OTP_SENT: "OTP has been sent to your registered mobile number.",
  OTP_FAILED: "Failed to send OTP. Please try again.",
  OTP_VERIFIED: "OTP verified successfully",
  INVALID_OTP: "Invalid or expired OTP",
  MISSING_DATA: "Missing required data from backend",
  UNKNOWN_ERROR: "An unexpected internal server error occurred",
  BACKEND_ERROR: "Unexpected backend response",
  MISSING_BACKEND_RESPONSE: "Missing required data in backend response.",
  ACCESS_DENIED: "Access Denied",
  CONTACT_SU_MSG:
    "You don’t have permission to view this page. If you believe this is a mistake, please contact",
} as const;

export const COMMON_MESSAGE = {
  MENU_FETCH_FAIL: "Failed to fetch menus",
  MENU_ADDED: "Menu added successfully",
  MENU_ADD_FAIL: "Failed to add menu",
  DELETE_FAIL: "Failed to delete menu",
  DELETE_SUCCESS: "Successfully deleted!",
  DELETE_CONF_MSG:
    "Are you sure you want to delete this item? This action cannot be undone.",
  MENU_UPDATED: "Menu updated successfully",
  MENU_UPDATE_FAIL: "Menu update failed",
  NO_MENU_UPDATE_PERMISSION: "You don't have permission to modify menus",
  NO_MENU_DELETE_PERMISSION: "You don't have permission to delete menus",
  SOCIETY_LEVEL_FETCH_FAIL: "Failed to fetch society levels",
  TIER_MAPPING_FETCH_FAIL: "Failed to fetch tier levels",
  SOCIETY_LEVEL_UPDATE: "Society level updated successfully",
  SOCIETY_LEVEL_ADDED: "Society level added successfully",
  OPERATION_FAILED: "Operation failed",
  SOCIETY_LEVEL_DELETED: "Society level deleted successfully",

  AMENITY_FETCH_FAIL: "Failed to fetch amenity details",
  AMENITY_UPDATE: "Amenity details updated successfully",
  AMENITY_ADDED: "Amenity details added successfully",
  AMENITY_DELETED: "Amenity details deleted successfully",

  AMENITY_MAPPING_FAIL: "Failed to map amenity details",
  AMENITY_MAPPING_UPDATE: "Amenity mapping updated successfully",
  AMENITY_MAPPING_ADDED: "Amenity mapping added successfully",
  AMENITY_MAPPING_DELETED: "Amenity mapping deleted successfully",

  TIER_CATEGORY_MAPPING_FETCH_FAIL:
    "Failed to fetch tier-category mapping details",
  TIER_CATEGORY_MAPPING_UPDATE:
    "Tier-category mapping details updated successfully",
  TIER_CATEGORY_MAPPING_ADDED:
    "Tier-category mapping details added successfully",
  TIER_CATEGORY_MAPPING_DELETED:
    "Tier-category mapping details deleted successfully",
  DATA_FETCH_FAIL: "Failed to fetch data",

  SOCIETY_ADDED: "Society created successfully",
  SOCIETY_CREATION_FAILED: "Failed to create society",
  SOCIETY_UPDATE: "Society updated successfully",
  SOCIETY_FETCH: "Failed to fetch Society Details",
  PACKAGE_TIER_MAPPING_FETCH_FAIL: "Failed to fetch package-tier mapping details",

  SERVICE_FETCH_FAIL: "Failed to fetch service details",
  SERVICE_UPDATE: "Service details updated successfully",
  SERVICE_ADDED: "Service details added successfully",
  SERVICE_DELETED: "Service details deleted successfully",

  SUCCESSFUL: "Successful!",

  PACKAGE_DELETED: "Package deleted successfully",
  PACKAGE_FAIL: "Failed to delete package",
  PACKAGE_UPDATED: "Package updated successfully",
  PACKAGE_ADDED: "Package added successfully"

};

export const PAGE_TITLE = {
  SOCIETY_MANAGEMENT: "Society Management",
  SERVICE_CONFIGURATION: "Service Configuration",
  SERVICE_CATEGORY_MAPPING: "Service to Category Mapping",
  PACKAGE_SET_UP:"Package Set up"
};
export const FOOTER_TEXT =
  "Content Owned and Maintained by Prath Technologies Pvt. Ltd";

export const REGEX = {
  NAME: /^[A-Za-z\s.-]{2,50}$/,
  SOCIETY_CODE: /^[A-Z][A-Z0-9]{2,19}$/,
  PHONE: /^(?:\+91)?[6-9]\d{9}$/,
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  AREA: /^\d+(\.\d{1,2})?$/,
  REGISTRATION_NUM: /^[A-Z0-9/-]{5,20}$/,
};

export const REGEX_MSG = {
  NAME: "Name must be 2–50 characters and contain only letters, spaces, dots, or hyphens.",
  SOCIETY_NAME:
    "Society code must be 3–20 characters, start with a letter, and contain only uppercase letters and numbers.",
  PHONE: "Please enter a valid 10-digit mobile number.",
  EMAIL: "Enter a valid email address.",
  AREA: "Enter a valid number with up to 2 decimal places.",
  REGISTRATION_NUM: "Enter valid Registration number",
};

export const USER_ROLES = {
  SUPER_ADMIN: 1,
  ADMIN: 2,
  SOCIETY_ADMIN: 3,
  VISITOR: 0, //later it will be change
} as const;

export const ROLE_DASHBOARD_PATH: Record<UserRole, string> = {
  [USER_ROLES.SUPER_ADMIN]: RouteConfig.SADMIN_DASHBOARD,
  [USER_ROLES.ADMIN]: RouteConfig.ADMIN_DASHBOARD,
  [USER_ROLES.SOCIETY_ADMIN]: RouteConfig.SOC_ADMIN_DASHBOARD,
  [USER_ROLES.VISITOR]: RouteConfig.VISITOR_DASHBOARD,
};

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

export const RECORDS_PER_PAGE = 10;

export const STATUS_OPTIONS = [
  { label: "Active", value: "1" },
  { label: "Inactive", value: "0" },
] as const;

export const STATUS_CONFIG = {
  1: { label: "Active", color: "success.5" },
  0: { label: "Inactive", color: "primary.5" },
} as const;

export const buildSvgSrc = (icon?: string | null) => {
  if (!icon) return IMAGES.FALLBACK_IMG;
  try {
    const trimmed = icon.trim();
    if (trimmed.startsWith("data:image")) return trimmed;
    if (trimmed.startsWith("<svg")) {
      const encoded = btoa(unescape(encodeURIComponent(trimmed)));
      return `data:image/svg+xml;charset=utf-8;base64,${encoded}`;
    }
    return `data:image/svg+xml;charset=utf-8;base64,${trimmed}`;
  } catch {
    return IMAGES.FALLBACK_IMG;
  }
};

export const PageTitles: Record<string, string> = {
  [RouteConfig.USER_SETUP]: "User Setup",
  [RouteConfig.ROLE_SETUP]: "Role Setup",
  [RouteConfig.MENU_SETUP]: "Menu Setup",
  [RouteConfig.ROLE_PERMISSION]: "Role Permission",
  [RouteConfig.SOCIETY_SETUP]: "Society Setup",
};

// to be put in GEN_CODE_DESC
export const SOCIETY_RULES = {
  maxMembers: {
    label: "Max Members",
    type: "number",
  },
  // approvalRequired: {
  //   label: "Approval Required",
  //   type: "boolean",
  // },
  flatCriteria: {
    label: "Flat Criteria",
    type: "object",
    fields: {
      minAvgFlatSizeSqFt: {
        label: "Min Avg Flat Size (Sq Ft)",
        type: "number",
      },
      allowedFlatTypes: {
        label: "Allowed Flat Types",
        type: "array",
        options: ["3BHK", "4BHK", "DUPLEX", "PENTHOUSE"],
      },
    },
  },
  societyScale: {
    label: "Society Scale",
    type: "object",
    fields: {
      minTotalFlats: {
        label: "Min Total Flats",
        type: "number",
      },
      minBlocks: {
        label: "Min Blocks",
        type: "number",
      },
      maxMembers: {
        label: "Max Members",
        type: "number",
      },
    },
  },
};

export const MENU_TYPE = {
  SIDE_MENU: 0,
  PAGE_MENU: 1,
};

// utils/constants.ts

export interface AmenityCategory {
  title: string;
  description: string;
  amenities: string[];
  icon: string;
}

export interface AmenityTab {
  value: string;
  label: string;
  categories: AmenityCategory[];
}

export const AMENITY_TABS: AmenityTab[] = [
  {
    value: "core",
    label: "Core Amenities",
    categories: [
      {
        title: "Security & Safety",
        description: "Essential security features for resident safety",
        amenities: [
          "Security Guard",
          "CCTV Surveillance",
          "Entry / Exit Gate",
          "Fire Safety System",
          "Intercom / PA System",
          "Visitor Management",
        ],
        icon: "🛡️",
      },
      {
        title: "Utilities",
        description: "Basic utility infrastructure",
        amenities: [
          "Power Backup (DG Set)",
          "Water Supply",
          "Lift / Elevator",
          "Sewage / Drainage System",
          "Garbage Collection",
          "Rain Water Harvesting",
        ],
        icon: "⚡",
      },
      {
        title: "Infrastructure",
        description: "Physical infrastructure and facilities",
        amenities: [
          "Parking Area (2W / 4W)",
          "Internal Roads",
          "Street Lighting",
          "Boundary Wall / Fencing",
          "Name Board / Signage",
        ],
        icon: "🏗️",
      },
    ],
  },
  {
    value: "mid",
    label: "Mid-Level",
    categories: [
      {
        title: "Convenience",
        description: "Enhanced living experience",
        amenities: [
          "Clubhouse",
          "Children's Play Area",
          "Walking / Jogging Track",
          "Garden / Green Area",
          "Community Hall",
        ],
        icon: "🏠",
      },
      {
        title: "Digital & Technology",
        description: "Smart living solutions",
        amenities: [
          "Wi-Fi in Common Areas",
          "App-based Society Management",
          "Smart Entry (RFID / QR)",
        ],
        icon: "📱",
      },
    ],
  },
  {
    value: "premium",
    label: "Premium",
    categories: [
      {
        title: "Lifestyle & Recreation",
        description: "Premium lifestyle amenities",
        amenities: [
          "Swimming Pool",
          "Gym / Fitness Center",
          "Indoor Games Room",
          "Outdoor Sports Court",
          "Yoga / Meditation Hall",
          "Party Lawn / Banquet Hall",
        ],
        icon: "🌟",
      },
      {
        title: "Advanced Security",
        description: "Next-generation security systems",
        amenities: [
          "Smart Access Control",
          "Video Door Phone",
          "Boom Barriers",
          "Panic Button System",
        ],
        icon: "🔒",
      },
    ],
  },
];

// Helper function to get all amenity types for dropdown
export const getAmenityTypes = () => {
  return AMENITY_TABS.map((tab) => ({
    value: tab.value,
    label: tab.label,
  }));
};

// Helper function to get all categories for dropdown
export const getAmenityCategories = () => {
  const categories: { value: string; label: string }[] = [];
  AMENITY_TABS.forEach((tab) => {
    tab.categories.forEach((category) => {
      categories.push({
        value: category.title,
        label: category.title,
      });
    });
  });
  return categories;
};

// Helper function to get all amenity items (flattened list)
export const getAllAmenityItems = () => {
  const items: { value: string; label: string }[] = [];
  AMENITY_TABS.forEach((tab) => {
    tab.categories.forEach((category) => {
      category.amenities.forEach((amenity) => {
        // Avoid duplicates
        if (!items.find((item) => item.value === amenity)) {
          items.push({
            value: amenity,
            label: amenity,
          });
        }
      });
    });
  });
  return items;
};

// to be moved to gen code desc

export type CommonCategoryConfig = {
  title: string;
  description: string;
  amenities: string[];
  icon: string;
};

export const SERVICES_CATEGORIES: CommonCategoryConfig[] = [
  {
    title: "Security & Safety Services",
    description: "Resident safety, surveillance, and emergency handling",
    icon: "🔐",
    amenities: [
      "Security Guard Management",
      "Visitor Entry / Exit Management",
      "Gate Pass & Pre-Approval Service",
      "CCTV Monitoring & Playback",
      "Night Patrol Service",
      "Emergency Response Handling",
      "Fire Safety Audit & Drill Service",
      "Panic Button Response",
    ],
  },
  {
    title: "Utilities Management Services",
    description: "Power, water, and infrastructure utilities monitoring",
    icon: "⚡",
    amenities: [
      "Water Supply Management",
      "Power Backup (DG) Operation",
      "Electricity Meter Reading",
      "Street Light Maintenance",
      "STP Operation & Monitoring",
      "Solar Power Monitoring",
    ],
  },
  {
    title: "Parking & Vehicle Management",
    description: "Vehicle access, parking, and EV infrastructure",
    icon: "🚗",
    amenities: [
      "Parking Slot Allocation",
      "Vehicle Registration Management",
      "Guest Vehicle Tracking",
      "EV Charging Slot Management",
    ],
  },
  {
    title: "Housekeeping & Sanitation Services",
    description: "Cleanliness and hygiene across society premises",
    icon: "🧹",
    amenities: [
      "Common Area Cleaning",
      "Staircase & Corridor Cleaning",
      "Lift Cleaning",
      "Garbage Collection & Disposal",
      "Waste Segregation Monitoring",
      "Drainage & Sewage Maintenance",
      "Water Tank Cleaning",
    ],
  },
  {
    title: "Maintenance & Repair Services",
    description: "Technical and civil maintenance services",
    icon: "🛠️",
    amenities: [
      "Electrical Maintenance",
      "Plumbing Maintenance",
      "Civil Repair & Minor Works",
      "Carpenter Services",
      "Lift AMC & Breakdown Support",
      "Intercom / PA System Maintenance",
    ],
  },
  {
    title: "Administration & Society Operations",
    description: "Operational and administrative management",
    icon: "🏢",
    amenities: [
      "Complaint / Ticket Management",
      "Notice & Announcement Service",
      "Vendor Management",
      "Staff Attendance Management",
      "Payroll & Wage Tracking",
      "Society Office Operations",
    ],
  },
  {
    title: "Billing & Finance Services",
    description: "Billing, payments, and financial reporting",
    icon: "💰",
    amenities: [
      "Maintenance Bill Generation",
      "Online Payment Collection",
      "Due & Penalty Management",
      "Expense Tracking",
      "Vendor Payment Management",
      "Financial Reports & Audit Support",
    ],
  },
  {
    title: "Facility Usage & Booking Services",
    description: "Booking and scheduling of shared facilities",
    icon: "📅",
    amenities: [
      "Clubhouse / Hall Booking",
      "Sports Facility Booking",
      "Guest Room Booking",
      "Amenity Usage Scheduling",
    ],
  },
  {
    title: "Digital & Smart Services",
    description: "Digital access, automation, and smart monitoring",
    icon: "📱",
    amenities: [
      "Mobile App Access for Residents",
      "Digital Communication & Alerts",
      "App-based Service Requests",
      "QR / RFID Entry Monitoring",
      "Document Repository (Bylaws, NOCs)",
    ],
  },
];

export const PACKAGE_COLORS = {
  standard: { bg: "#3B82F6", hover: "#2563EB", text: "#FFFFFF" },
  premium: { bg: "#8B5CF6", hover: "#7C3AED", text: "#FFFFFF" },
  enterprise: { bg: "#F59E0B", hover: "#D97706", text: "#FFFFFF" },
  basic: { bg: "#9CA3AF", hover: "#7F8A99", text: "#FFFFFF" },
};

export const BILLING_CYCLE = [
  { value: "MONTHLY", label: "Monthly" },
  { value: "QUARTERLY", label: "Quarterly" },
  { value: "YEARLY", label: "Yearly" },
  { value: "CUSTOM", label: "Custom" },
];
