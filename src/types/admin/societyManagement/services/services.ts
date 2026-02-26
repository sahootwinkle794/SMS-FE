// types/admin/societyManagement/packageSetup/packageSetup.ts

export interface ServiceItem {
  data: any;
  id: string;
  serviceCode: string;
  serviceName: string;
  description: string;
  serviceType: string;
  isMandatory: boolean;
  iconUrl: string;
  displayOrder: number;
  isActive: boolean;
  isDeleted: boolean;
}

export interface ServiceApiResponse {
  data: ServiceListPayload;
}

export interface ServiceListPayload {
  page: number;
  limit: number; 
  total: number;
  totalPages: number;
  data: ServiceItem[];
  message: string;
}
