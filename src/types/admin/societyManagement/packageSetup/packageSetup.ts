// types/admin/societyManagement/packageSetup/packageSetup.ts

export interface PackageItem {
  data: any;
  id: string;
  packageCode: string;
  packageName: string;
  billingCycle: string;
  durationDays: number;
  price: number;
  allowsTrial: boolean;
  trialDays?: number | null;
  status: number;
}

export interface PackageApiResponse {
  data: PackageListPayload;
}

export interface PackageListPayload {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  data: PackageItem[];
  message: string;
}


// for add payload
export interface AddPackagePayload {
  packageCode: string;
  packageName: string;
  billingCycle: string;
  durationDays: number;
  price: number;
  allowsTrial: boolean;
  trialDays?: number | null;
  status:number|string;
}

