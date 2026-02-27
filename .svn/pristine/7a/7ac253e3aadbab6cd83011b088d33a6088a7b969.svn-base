// Single user returned by API
export interface UserData {
  roleName: string;
  id: string;
  name: string;
  mobileNo: string;
  emailId: string;
  roleId: string;
  status: number;
  createdBy: string | null;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
}

export type User = {
  id: string;
  name: string;
  userCode: string;
  phone: string;
  email: string;
  status: "Active" | "Inactive" | "Pending";
  statusColor: string;
  createdBy: string;
  createdAt: string;
};

// API response for list
export interface UserDataResponse {
  status: number;
  message: string;
  data: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    data: UserData[];
  };
}

// API response for single user
export interface SingleUserResponse {
  status: number;
  message: string;
  data: UserData;
}

// Form state
export interface EditUserForm {
  name: string;
  phone: string;
  email: string;
  role: string;
  status?: "1" | "0"; // match your select
}

export interface PatchEditUserForm {
  name: string;
  mobileNo: string;
  emailId: string;
  roleId: string;
  status?: number;
}
