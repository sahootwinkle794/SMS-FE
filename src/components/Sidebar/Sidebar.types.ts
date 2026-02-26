import { sidebarIconMap } from "@/utils/images";
import { UserRole } from "@/utils/constants";
import { ReactNode } from "react";
type SidebarIconKey = keyof typeof sidebarIconMap;

export interface SidebarChildItem {
  label: string;
  path: string;
  icon?: ReactNode;
  menuType: number;
}

export interface SidebarProps {
  items: SidebarItem[];
  logo?: ReactNode;
  onCollapseChange?: (collapsed: boolean) => void;
}


export interface RawSidebarItem {
  label: string;
  path: string;
  roles: readonly UserRole[];
  icon?: SidebarIconKey;
  children?: readonly RawSidebarItem[];
}

export interface SidebarChildItem {
  label: string;
  path: string;
  icon?: React.ReactNode;
  menuType: number;
}

export interface SidebarItem {
  menuCode: number;
  menuId: string;
  label: string;
  path: string;
  menuType: number;
  icon?: React.ReactNode;
  children?: SidebarChildItem[];
}

export type PermissionPayload = {
  canRead: boolean;
  canWrite: boolean;
  canDelete: boolean;
  canApprove: boolean;
};

export type ApiMenuItem = {
  menuId: string;
  menuCode: number;
  menuName: string;
  menuLevel: number;
  permissions: PermissionPayload;
  children?: ApiMenuItem[];
  menuSeq: number;
  menuUrl: string;
  menuIcon: string;
  menuType: number;
};


export interface SimplifiedMenu {
  menuId: string;
  menuCode: number;
  menuName: string;
  menuSeq: number;
  menuUrl: string;
  menuIcon: string;
  menuType: number;
  permissions: {
    canRead: boolean;
    canWrite: boolean;
    canDelete: boolean;
    canApprove: boolean;
  };
  children: SimplifiedMenu[];
}
