import { SERVICE_TYPE_INTERFACE } from "@/utils/constants"
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
  serviceType: SERVICE_TYPE_INTERFACE;
  isMandatory: boolean;
  iconUrl: string;
  metadata: Record<string, string>;
  displayOrder: number;
  status: number; // 1 = Active, 0 = Inactive (based on backend)
}


export interface ServiceFormState {
  id?: string;   
  serviceCode: string;
  serviceName: string;
  description: string;
  serviceType: string;
  iconUrl: string;
  displayOrder?: number;
  status: number | string;
  isMandatory?: boolean;
  metadata?: Record<string, string> | null;
}
