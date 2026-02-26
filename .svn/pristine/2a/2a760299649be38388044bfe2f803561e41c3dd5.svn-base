"use client";
import { useEffect, useState, useCallback } from "react";
import { getRequest } from "@/service";
import { API_PATH } from "@/utils/apiPath";
import { notifications } from "@mantine/notifications";
import {
  RoleListApiResponse,
  RoleResponse,
} from "@/types/superAdmin/setup/roleSetup/roleSetup";
import { useAuthStore } from "@/store/auth.store";
import { USER_ROLES } from "@/utils/constants";

interface UseRolesResult {
  roles: RoleResponse[];
  loading: boolean;
  refetch: () => void;
}

type RoleQueryParams = {
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "ASC" | "DESC";
};

export const useRoles = (): UseRolesResult => {
  const user = useAuthStore((state) => state.user);
  const [roles, setRoles] = useState<RoleResponse[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchRoles = useCallback(async () => {
    setLoading(true);
    try {
      const payload: RoleQueryParams = {
        search: "",
      };

      const response = await getRequest<RoleListApiResponse>(
        API_PATH.GET_ROLES,
        payload
      );

      let roleList = response?.data?.data ?? [];

      if (user?.role === USER_ROLES.ADMIN) {
        roleList = roleList.filter(
          (role) => role.roleCode === USER_ROLES.ADMIN
        );
      }
      setRoles(roleList);
    } catch (error) {
      console.error(error);
      notifications.show({
        title: "Error!",
        message: "Failed to load roles",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  return {
    roles,
    loading,
    refetch: fetchRoles,
  };
};
