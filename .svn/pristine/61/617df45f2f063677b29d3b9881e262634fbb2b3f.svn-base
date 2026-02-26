export interface AddRoleApiResponse {
  message: string;
  status: number;
  data: RoleResponse;
}

export interface RoleResponse {
  id: string;
  roleCode: number;
  roleName: string;
  status: number;
  createdBy: string;
  createdAt: string; // ISO string
  updatedBy: string | null;
  updatedAt: string | null;
}

export interface DeleteRoleResponse {
  status: number;
  message: string;
  data: RoleResponse;
}

export interface RoleListApiResponse {
  status: number;
  message: string;
  data: RoleListData;
}

export interface RoleListData {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  data: RoleResponse[];
}
