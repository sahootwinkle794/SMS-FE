// ─── Types ────────────────────────────────────────────────────────────────────

export interface SocietyBlock {
  blockName: string;
  numberOfFloors: number;
  totalFlats: number;
  parkingSlots: number;
  blockCode: string;
}

export interface SocietyInfoData {
  societyId: string;
  societyName: string;
  societyCode: string;
  registrationNumber: string;
  societyType: string;
  societyLevel: string;
  establishmentYear: number;
  totalArea: string;
  blocks: SocietyBlock[];
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
  onboardingDate: string;
}

export interface SocietyInfoDrawerProps {
  opened: boolean;
  onClose: () => void;
  data: SocietyInfoData;
}