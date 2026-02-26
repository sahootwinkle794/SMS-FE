// types/admin/societyManagement/packageSetup/packageSetup.ts

export interface AmenityItem {
  data: unknown;
  amenityId: string;
  amenityCode: string;
  amenityName: string;
  description: string;
  iconUrl: string;
  isChargeable: boolean;
  displayOrder: number;
  status: number;
}

export interface AmenityApiResponse {
  data: AmenityListPayload;
}

export interface AmenityListPayload {
  page: number;
  limit: number; 
  total: number;
  totalPages: number;
  data: AmenityItem[];
  message: string;
}

export interface FormState {
  amenityCode: string;
  amenityName: string;
  description: string;
  iconUrl: string;
  status: number;
}


