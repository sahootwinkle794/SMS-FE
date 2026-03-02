// Single Service Category
export interface ServiceCategory {
  id: string;
  groupCode: string;
  genCode: string;
  genName: string;
  status: number;
  createdBy: string;
  createdAt: string;
  updatedBy: string | null;
  updatedAt: string | null;
}

// Full API Response
export interface ServiceCategoryPagination {
  page: number | null;
  limit: number | null;
  total: number;
  totalPages: number;
  data: ServiceCategory[];
}

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

export interface serviceDetails {
  service: string,
  displayOrder: number,
  status: string | number,
}


// types/admin/societyManagement/services/serviceCategoryMapping/serviceCategoryMapping.ts

// Service Detail within a Category Mapping
export interface MappedServiceDetail {
  id: string;
  serviceCode: string;
  serviceName: string;
  serviceDescription: string;
  serviceIconUrl: string;
  isServiceActive: number; // 1 = Active, 0 = Inactive
  serviceMetadata?: Record<string, any>;
  displayOrder: number;
  status: number; // 1 = Active, 0 = Inactive
}

// Category with its mapped services
export interface CategoryServiceMapping {
  categoryCode: string;
  categoryName: string;
  serviceDetails: MappedServiceDetail[];
}

// Full API Response
export interface CategoryServiceMappingApiResponse {
  status: number;
  message: string;
  data: CategoryServiceMapping[];
}

