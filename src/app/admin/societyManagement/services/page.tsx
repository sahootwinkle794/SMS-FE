"use client";

import { AppBreadcrumbs } from "@/components";
import { getRequest } from "@/service";
import { API_PATH } from "@/utils/apiPath";
import { RouteConfig } from "@/utils/routeConfig";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { notifications } from "@mantine/notifications";
import { IconChevronRight, IconX } from "@tabler/icons-react";
import { buildSvgSrc, COMMON_MESSAGE, PAGE_TITLE } from "@/utils/constants";
import {
  Box,
  Flex,
  Image,
  Stack,
  Text,
  useMantineTheme,
  SimpleGrid,
  Card,
} from "@mantine/core";

import classes from "../facandame/FacilitiesAndAmenity.module.css";

function Services() {
  const searchParams = useSearchParams();
  const menuId = searchParams.get("menuId");

  const [children, setChildren] = useState<any[]>([]);
  const theme = useMantineTheme();
  const router = useRouter();

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
        const res = (await getRequest(
          `${API_PATH.MENU_MASTER}/${menuId}`
        )) as {
          data: { children: any[] };
        };

        if (res?.data?.children?.length) {
          setChildren(
            res.data.children.filter(
              (child) => child.menuLevel === 3 && child.status !== 2
            )
          );
        }
      } catch (err) {
        notifyError(COMMON_MESSAGE.MENU_FETCH_FAIL);
        console.error(COMMON_MESSAGE.MENU_FETCH_FAIL, err);
      }
    };

    fetchMenuDetails();
  }, [menuId]);

  return (
    <>
      <AppBreadcrumbs
        items={[
          { label: PAGE_TITLE.SOCIETY_MANAGEMENT, path: RouteConfig.SOCIETY_MGT },
          { label: PAGE_TITLE.SERVICE_CONFIGURATION },
        ]}
      />

      <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="lg" mt="md">
        {children.map((item) => (
          <Card
            key={item.id}
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            className={classes.card}
            style={{
              backgroundColor: theme.colors.primary[0],
            }}
            onClick={() => router.push(item.menuUrl)}
          >
            <Flex align="center" justify="space-between">
              <Flex align="center" gap="md" style={{ flex: 1 }}>
                <Box
                  w={45}
                  h={45}
                  style={{
                    borderRadius: "10px",
                    backgroundColor: theme.colors.primary[1],
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Image
                    src={buildSvgSrc(item.menuIcon)}
                    width={30}
                    height={30}
                    alt={item.menuName}
                    fit="contain"
                  />
                </Box>

                <Stack gap={4} style={{ flex: 1 }}>
                  <Text fw={600} size="sm">
                    {item.menuName}
                  </Text>
                  <Text size="xs" c="dimmed" lineClamp={2}>
                    {item.menuDesc}
                  </Text>
                </Stack>
              </Flex>

              <IconChevronRight
                size={22}
                stroke={1.5}
                color={theme.colors.primary[7]}
              />
            </Flex>
          </Card>
        ))}
      </SimpleGrid>
    </>
  );
}

export default Services;
