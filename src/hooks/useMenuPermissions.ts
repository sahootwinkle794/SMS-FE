"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useMenuPermissionsStore } from "@/store/menuPermissions.store";

export interface Permission {
  canRead: boolean;
  canWrite: boolean;
  canDelete: boolean;
  canApprove: boolean;
}

export const useMenuPermissions = (customUrl?: string) => {
  const pathname = usePathname();
  const { getPermissionsByUrl, version  } = useMenuPermissionsStore();
  
  const [permissions, setPermissions] = useState<Permission | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPermissions = () => {
      setIsLoading(true);
      
      // Use customUrl if provided, otherwise use current pathname
      const urlToCheck = customUrl || pathname;
      
      // Clean the URL (remove query params, trailing slashes)
      const cleanUrl = urlToCheck.split('?')[0].replace(/\/$/, '');
      
      const menuPermissions = getPermissionsByUrl(cleanUrl);
      
      // If no direct match, try to find parent menu
      if (!menuPermissions && cleanUrl.includes('/')) {
        const segments = cleanUrl.split('/').filter(Boolean);
        while (segments.length > 1 && !menuPermissions) {
          segments.pop();
          const parentUrl = '/' + segments.join('/');
          const parentPermissions = getPermissionsByUrl(parentUrl);
          if (parentPermissions) {
            setPermissions(parentPermissions);
            setIsLoading(false);
            return;
          }
        }
      }
      
      setPermissions(menuPermissions);
      setIsLoading(false);
    };

    fetchPermissions();
  }, [pathname, customUrl, getPermissionsByUrl, version]);

  return {
    permissions,
    isLoading,
    hasPermission: (permission: keyof Permission) => {
      return permissions?.[permission] || false;
    },
    canRead: permissions?.canRead || false,
    canWrite: permissions?.canWrite || false,
    canDelete: permissions?.canDelete || false,
    canApprove: permissions?.canApprove || false,
  };
};