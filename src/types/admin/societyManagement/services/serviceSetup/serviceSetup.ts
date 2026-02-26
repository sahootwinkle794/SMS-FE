export interface ServiceApiResponse {
  status: number;
  message: string;
  data: ServicePaginationData;
}

export interface ServicePaginationData {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  data: ServiceItem[];
}


export interface ServiceItem {
  serviceId: string;
  serviceCode: string;
  serviceName: string;
  description: string;
  serviceType: "INTERNAL" | "EXTERNAL" | string;
  isMandatory: boolean;
  iconUrl: string;
  metadata: Record<string, string>;
  displayOrder: number;
  isActive: boolean;
  isDeleted: boolean;
  createdBy: string;
  createdAt: string; // ISO Date string
  updatedBy: string;
  updatedAt: string; // ISO Date string
}


export interface ServiceFormState {
  serviceCode: string;
  serviceName: string;
  description: string;
  serviceType: string;
  iconUrl: string;
  displayOrder: number;
  isActive: boolean;
}