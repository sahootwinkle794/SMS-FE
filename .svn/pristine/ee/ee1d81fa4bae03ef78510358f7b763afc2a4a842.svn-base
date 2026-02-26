"use client";

import { AppBreadcrumbs } from "@/components";
import { useSidebarItems } from "@/hooks/useSidebarItems";
import { API_PATH } from "@/utils/apiPath";
import { getRequest } from "@/service";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Box, Flex, Image, Stack, Text, useMantineTheme } from "@mantine/core";
import { IconChevronRight, IconX } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { buildSvgSrc, COMMON_MESSAGE } from "@/utils/constants";
import { useRouter } from "next/navigation";

const SocietyManagement = () => {
  const menu = useSidebarItems();
  const pathName = usePathname();
  const router = useRouter();
  const currentMenuItem = menu.find((item) => item.path === pathName);
  const menuId = currentMenuItem?.menuId;
  const theme = useMantineTheme();

  const [children, setChildren] = useState<any[]>([]);

  const notifyError = (msg: string) =>
    notifications.show({
      title: "Error",
      message: msg,
      color: "red",
      icon: <IconX size={16} />,
    });

  useEffect(() => {
    if (!menuId) return;

    const fetchMenuDetails = async () => {
      try {
        const res = (await getRequest(`${API_PATH.MENU_MASTER}/${menuId}`)) as {
          data: { children: any[] };
        };
        setChildren(res?.data?.children ?? []);
      } catch (err) {
        notifyError(COMMON_MESSAGE.MENU_FETCH_FAIL);
        console.error("Menu fetch failed:", err);
      }
    };

    fetchMenuDetails();
  }, [menuId]);

  return (
    <>
      <AppBreadcrumbs items={[{ label: "Society Management" }]} />

      <Stack gap="xs" mt="md">
        {children
        .filter((item) => item.status === 1)
        .sort((a, b) => a.menuSeq - b.menuSeq)
        .map((item) => (
          <Box
            key={item.id}
            onClick={() => router.push(`${item.menuUrl}?menuId=${item.id}`)}
            p="lg"
            style={{
              cursor: "pointer",
              backgroundColor: theme.colors.primary[0],
              borderRadius: "8px",
              border: `1px solid ${theme.colors.primary[2]}`,
              transition: "all 0.15s ease",
            }}
          >
            <Flex align="center" justify="space-between" gap="md">
              <Flex align="center" gap="md" style={{ flex: 1, minWidth: 0 }}>
                <Box
                  w={40}
                  h={40}
                  style={{
                    borderRadius: "8px",
                    backgroundColor: theme.colors.primary[0],
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Image
                    src={buildSvgSrc(item.menuIcon)}
                    width={35}
                    height={35}
                    alt={item.menuName}
                    fit="contain"
                  />
                </Box>

                <Stack gap={2} style={{ flex: 1, minWidth: 0 }}>
                  <Text fw={500} size="sm" c="#212529">
                    {item.menuName}
                  </Text>
                  <Text size="xs" c="#6c757d" lineClamp={1}>
                    {item.menuDesc}
                  </Text>
                </Stack>
              </Flex>

              <IconChevronRight
                size={35}
                stroke={1.5}
                color={theme.colors.primary[7]}
                style={{ flexShrink: 0 }}
              />
            </Flex>
          </Box>
        ))}
      </Stack>
    </>
  );
};

export default SocietyManagement;
