"use client";
import apiServer from "@/service/axios-server";
import { RouteConfig } from "@/utils/routeConfig";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";
export const useLogout = () => {
  const router = useRouter();
  const logout = async () => {
    try {
      const result = await apiServer.get(`/api/auth/logout`);
      if (result.data.status === 200) {
        notifications.show({
          title: "Success!",
          message: result.data.message,
          color: "green",
        });

        router.push(RouteConfig.MAIN_ROUTE);
      }
    } catch (error) {
      notifications.show({
        title: "Failed!",
        message: `Logout failed ${error}`,
        color: "red",
      });
    }
  };
  return { logout };
};
