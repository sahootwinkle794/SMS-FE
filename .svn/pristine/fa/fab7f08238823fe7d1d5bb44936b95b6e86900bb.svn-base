import { USER_ROLES } from "@/utils/constants";
import { RouteConfig } from "@/utils/routeConfig";

export const sidebarMenuApiResponse = [
  {
    label: "Dashboard",
    path: "/admin",
    roles: [
      USER_ROLES.SUPER_ADMIN,
      USER_ROLES.ADMIN,
      USER_ROLES.SOCIETY_ADMIN,
    ],
    icon: "dashboard",
  },
  {
    label: "Access Control",
    path: "#",
    roles: [USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN],
    icon: "settings",
    children: [
      {
        label: "Role Setup",
        path: RouteConfig.ROLE_SETUP,
        roles: [USER_ROLES.SUPER_ADMIN],
        icon: "key",
      },
      {
        label: "User Setup",
        path: RouteConfig.USER_SETUP,
        roles: [USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN],
        icon: "users",
      },
    ],
  },
  {
    label: "Menu Control",
    path: "#",
    roles: [USER_ROLES.SUPER_ADMIN],
    icon: "shield",
    children: [
      {
        label: "Menu Setup",
        path: RouteConfig.MENU_SETUP,
        roles: [USER_ROLES.SUPER_ADMIN],
        icon: "list",
      },
      {
        label: "Role Permissions",
        path: RouteConfig.ROLE_PERMISSION,
        roles: [USER_ROLES.SUPER_ADMIN],
        icon: "lock",
      },
    ],
  },
  {
    label: "Reports",
    path: "#",
    roles: [USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN],
    icon: "report",
  },
] as const;
