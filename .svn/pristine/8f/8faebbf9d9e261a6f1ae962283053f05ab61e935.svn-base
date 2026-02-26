"use client";

import { useEffect, useMemo, useState } from "react";
import { sidebarIconMap } from "@/utils/images";
import { useAuthStore } from "@/store/auth.store";
import { getRequest } from "@/service";
import { API_PATH } from "@/utils/apiPath";
import { ApiResponse } from "@/types/api/auth/verify-otp/verifyOtp";
import {
  useMenuPermissionsStore,
  MenuPermissions,
} from "@/store/menuPermissions.store";
import {
  ApiMenuItem,
  SidebarItem,
  SimplifiedMenu,
} from "@/components/Sidebar/Sidebar.types";

// Component to render base64 SVG icons
const Base64Icon = ({ base64String }: { base64String: string }) => {
  const svgString = useMemo(() => {
    try {
      return atob(base64String);
    } catch (error) {
      console.error("Invalid base64 SVG icon:", error);
      return null;
    }
  }, [base64String]);

  if (!svgString) return null;

  return (
    <div
      className="inline-flex items-center justify-center"
      dangerouslySetInnerHTML={{ __html: svgString }}
    />
  );
};

const mapSidebarItems = (menus: SimplifiedMenu[]): SidebarItem[] => {
  return menus
    .filter((menu) => menu.permissions?.canApprove)
    .sort((a, b) => a.menuSeq - b.menuSeq)
    .map((menu) => {
      let icon = undefined;

      // Check if menuIcon is a base64 string
      if (menu.menuIcon) {
        // If it's a base64 string (starts with expected base64 characters)
        if (menu.menuIcon.length > 50 && !menu.menuIcon.startsWith("/")) {
          icon = <Base64Icon base64String={menu.menuIcon} />;
        }
        // Otherwise check if it's a key in sidebarIconMap
        else if (menu.menuIcon in sidebarIconMap) {
          const IconComponent =
            sidebarIconMap[menu.menuIcon as keyof typeof sidebarIconMap];
          icon = <IconComponent size={18} />;
        }
      }

      const children = menu.children?.length
        ? mapSidebarItems(menu.children)
        : undefined;

      if (menu.children?.length && (!children || children.length === 0)) {
        return null;
      }

      return {
        menuCode: menu.menuCode,
        menuId: menu.menuId,
        label: menu.menuName,
        path: menu.menuUrl,
        menuType: menu.menuType,
        icon,
        children,
      };
    })
    .filter(Boolean) as SidebarItem[];
};

const transformMenus = (menus: ApiMenuItem[]): SimplifiedMenu[] => {
  return menus.map((menu) => ({
    menuId: menu.menuId,
    menuCode: menu.menuCode,
    menuName: menu.menuName,
    menuSeq: menu.menuSeq,
    menuUrl: menu.menuUrl,
    menuIcon: menu.menuIcon,
    permissions: menu.permissions,
    menuType: menu.menuType,
    children: menu.children?.length ? transformMenus(menu.children) : [],
  }));
};

export const useSidebarItems = () => {
  const user = useAuthStore((state) => state.user);
  const [sidebarMenus, setSidebarMenus] = useState<SimplifiedMenu[]>([]);
  const { setPermissions } = useMenuPermissionsStore();

  useEffect(() => {
    if (!user?.roleUnqId) return;

    const fetchRoleMenus = async () => {
      try {
        const result = await getRequest<ApiResponse<ApiMenuItem[]>>(
          `${API_PATH.GET_ROLE_MENU_PERMISSIONS}/${user.roleUnqId}`,
        );

        const transformedData = transformMenus(result.data);
        setSidebarMenus(transformedData);

        const extractPermissions = (
          menus: ApiMenuItem[],
        ): MenuPermissions[] => {
          const permissions: MenuPermissions[] = [];

          menus.forEach((menu) => {
            if (menu.menuUrl) {
              permissions.push({
                menuUrl: menu.menuUrl,
                permissions: menu.permissions,
              });
            }

            if (menu.children?.length) {
              permissions.push(...extractPermissions(menu.children));
            }
          });

          return permissions;
        };

        const allPermissions = extractPermissions(result.data);
        setPermissions(allPermissions);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRoleMenus();
  }, [user?.roleUnqId, setPermissions]);

  return useMemo(() => {
    return mapSidebarItems(sidebarMenus);
  }, [sidebarMenus]);
};
