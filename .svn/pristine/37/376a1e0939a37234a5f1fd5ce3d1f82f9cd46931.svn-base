"use client";

import { useCallback, useEffect, useState } from "react";
import { getRequest } from "@/service";
import { API_PATH } from "@/utils/apiPath";
import { notifications } from "@mantine/notifications";
import { SocietyLevels, SocietyLevelResponse } from "@/types/admin/societyManagement/societyLevel/societyLevel";
import { COMMON_MESSAGE } from "@/utils/constants";

interface UseSocietyLevelsReturn {
  levels: SocietyLevels[];
  loading: boolean;
  refetch: () => void;
}

interface QueryParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "ASC" | "DESC";
  isActive?: boolean;
}

export const useSocietyLevels = (
  params?: QueryParams
): UseSocietyLevelsReturn => {
  const [levels, setLevels] = useState<SocietyLevels[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchLevels = useCallback(async () => {
    setLoading(true);
    try {
      const res = (await getRequest(
        API_PATH.GET_SOCIETY_LEVELS,
        {
          page: params?.page ?? 1,
          limit: params?.limit ?? 10,
          search: params?.search ?? "",
          sortBy: params?.sortBy ?? "createdAt",
          sortOrder: params?.sortOrder ?? "DESC",
          isActive: true,
        }
      )) as SocietyLevelResponse;
console.log(res,"res")
      setLevels(res?.data?.data ?? []);
    } catch (error) {
      notifications.show({
        title: "Error",
        message: COMMON_MESSAGE.SOCIETY_LEVEL_FETCH_FAIL,
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchLevels();
  }, [fetchLevels]);

  return {
    levels,
    loading,
    refetch: fetchLevels,
  };
};
