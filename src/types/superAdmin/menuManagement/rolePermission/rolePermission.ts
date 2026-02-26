/* ================= TYPES ================= */

export type PermissionPayload = {
  canRead: boolean;
  canWrite: boolean;
  canDelete: boolean;
  canApprove: boolean;
};

export type MenuPayload = {
  menuUnqId: string;
  permissions: PermissionPayload;
  children?: MenuPayload[];
};

export type SubmitPayload = {
  roleUnqId: string;
  menus: MenuPayload[];
};

export type MenuItem = {
  menuIcon: string | null | undefined;
  menuDesc: string | undefined;
  menuId: string;
  menuCode: number;
  menuName: string;
  menuLevel: number;
  permissions: PermissionPayload;
  children?: MenuItem[];
};

export type SubmitResponse = {
  message: string;
};

export type RWState = {
  read: boolean;
  write: boolean;
};