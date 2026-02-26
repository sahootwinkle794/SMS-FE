/* ================= Society Item ================= */

export interface SocietyItem {
  societyId: string;
  societyName: string;
  societyCode: string;
  registrationNumber: string;
  societyType: string;
  societyLevel: string;
  establishmentYear: number;
  totalArea: string;
  numberOfBlocks: number;
  numberOfBuildings: number;
  numberOfFloors: number;
  totalFlats: number;
  flatSizeRange: string;
  parkingSlots: number;
  commercialUnits: number;
  addressLine1: string;
  areaLocality: string;
  city: string;
  district: string;
  state: string;
  pincode: string;
  landmark: string;
  adminName: string;
  adminMobile: string;
  adminEmail: string;
  adminRole: string;
  packageId: string;
  status: string;
  onboardingDate: string;
  isDeleted: boolean;
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
}

/* ================= API Response ================= */

export interface SocietyApiResponse {
  status: number;
  message: string;
  data: SocietyListPayload;
}

/* ================= List Payload ================= */

export interface SocietyListPayload {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  message: string;
  data: SocietyItem[];
}

/* ================= Add Payload ================= */

export interface AddSocietyPayload {
  societyName: string;
  societyCode: string;
  registrationNumber: string;
  societyType: string;
  societyLevelId: string;
  societyLevelCode: string;
  establishmentYear: number;
  totalArea: number;
  numberOfBlocks: number;
  blocks: BlockInfo[];
  addressLine1: string;
  areaLocality: string;
  city: string;
  districtCode: string;
  stateCode: string;
  pincode: string;
  landmark: string;
  adminName: string;
  adminMobile: string;
  adminEmail: string;
  packageId: string;
  status: number;
}

export interface BlockInfo {
  blockName: string;
  numberOfBuildings?: number;
  numberOfFloors: number;
  totalFlats: number;
  parkingSlots?: number;
}

export interface StateMasterApiResponse {
  data: SocietyMasterItem[];
}

export interface SocietyMasterItem {
  stateCode: number;
  stateName: string;
  status: number;
}

export interface DistrictMasterItem {
  districtCode: number;
  districtName: string;
  stateCode: number;
  status: number;
}

export interface DistrictMasterApiResponse {
  data: DistrictMasterItem[];
}


// Add these to your newSociety.ts types file

export interface SocietyDetailResponse {
  societyId: string;
  societyName: string;
  societyCode: string;
  registrationNumber: string;
  societyType: string;
  societyLevel: string;
  establishmentYear: number;
  totalArea: string;
  blocks: BlockInfo[];
  addressLine1: string;
  areaLocality: string;
  city: string;
  districtCode: string;
  stateCode: string;
  pincode: string;
  landmark: string;
  adminName: string;
  adminMobile: string;
  adminEmail: string;
  packageId: string;
  status: number;
  onboardingDate?: string;
  isDeleted?: boolean;
  createdBy?: string;
  createdAt?: string;
  updatedBy?: string;
  updatedAt?: string;
}

export interface SocietyFormValues {
  societyName: string;
  societyCode: string;
  registrationNumber: string;
  totalArea: string;
  establishmentYear: string;
  societyType: string;
  societyLevelId: string;
  addressLine1: string;
  areaLocality: string;
  stateCode: string;
  districtCode: string;
  city: string;
  pincode: string;
  landmark: string;
  adminName: string;
  adminMobile: string;
  adminEmail: string;
  packageId: string;
  status: string;
  blocks: BlockFormInfo[];
}

/* ================= Block Form Info (for form - uses strings) ================= */
export interface BlockFormInfo {
  blockName: string;
  numberOfBuildings: string;
  numberOfFloors: string;
  totalFlats: string;
  parkingSlots: string;
}