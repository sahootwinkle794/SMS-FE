"use client";

import { AppBreadcrumbs } from "@/components";
import { getRequest } from "@/service";
import { API_PATH } from "@/utils/apiPath";
import { buildSvgSrc, COMMON_MESSAGE } from "@/utils/constants";
import { RouteConfig } from "@/utils/routeConfig";
import {
  Box,
  Card,
  Flex,
  Image,
  SimpleGrid,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconChevronRight, IconX } from "@tabler/icons-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import classes from "./FacilitiesAndAmenity.module.css";

// ─── Types ───────────────────────────────────────────────────────────────────

interface MenuItem {
  id: string | number;
  menuLevel: number;
  menuUrl: string;
  menuIcon: string | null;
  menuName: string;
  menuDesc: string;
  status: number;
}

interface MenuResponse {
  data: {
    children: MenuItem[];
  };
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const filterMenuChildren = (children: MenuItem[]): MenuItem[] =>
  children.filter((child) => child.status !== 2);

// ─── Sub-components ──────────────────────────────────────────────────────────

interface MenuCardProps {
  item: MenuItem;
  onClick: (url: string) => void;
}

const MenuCard = ({ item, onClick }: MenuCardProps) => {
  const theme = useMantineTheme();

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      className={classes.card}
      style={{ backgroundColor: theme.colors.primary[0] }}
      onClick={() => onClick(item.menuUrl)}
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
  );
};

// ─── Main Component ──────────────────────────────────────────────────────────

const FacilitiesAndAmenity = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const menuId = searchParams.get("menuId");
  const [children, setChildren] = useState<MenuItem[]>([]);

  const notifyError = useCallback((msg: string) => {
    notifications.show({
      title: "Error",
      message: msg,
      color: "red",
      icon: <IconX size={16} />,
    });
  }, []);

  useEffect(() => {
    if (!menuId) return;

    const fetchMenuDetails = async () => {
      try {
        const res = (await getRequest(
          `${API_PATH.MENU_MASTER}/${menuId}`,
        )) as MenuResponse;

        setChildren(filterMenuChildren(res?.data?.children ?? []));
      } catch (err) {
        console.error(COMMON_MESSAGE.MENU_FETCH_FAIL, err);
        notifyError(COMMON_MESSAGE.MENU_FETCH_FAIL);
      }
    };

    fetchMenuDetails();
  }, [menuId, notifyError]);

  const handleCardClick = useCallback(
    (url: string) => router.push(url),
    [router],
  );

  return (
    <>
      <AppBreadcrumbs
        items={[
          { label: "Society Management", path: RouteConfig.SOCIETY_MGT },
          { label: "Facilities & Amenities" },
        ]}
      />

      <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="lg" mt="md">
        {children.map((item) => (
          <MenuCard key={item.id} item={item} onClick={handleCardClick} />
        ))}
      </SimpleGrid>
    </>
  );
};

export default FacilitiesAndAmenity;
