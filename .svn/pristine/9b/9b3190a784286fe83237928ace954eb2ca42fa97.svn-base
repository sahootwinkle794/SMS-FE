"use client";

import {
  ActionIcon,
  Box,
  Collapse,
  Group,
  Stack,
  Text,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";
import {
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
} from "@tabler/icons-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BRAND_COLORS, MENU_TYPE } from "../../utils/constants";
import { SidebarProps } from "./Sidebar.types";

const Sidebar: React.FC<SidebarProps> = ({ items, logo, onCollapseChange }) => {
  const pathname = usePathname();
  const router = useRouter();
  const theme = useMantineTheme();

  const [collapsed, setCollapsed] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [collapsedOpenMenu, setCollapsedOpenMenu] = useState<string | null>(
    null
  );

  const submenuRef = useRef<HTMLDivElement | null>(null);

  /* ================= EFFECTS ================= */

  useEffect(() => {
    onCollapseChange?.(collapsed);
  }, [collapsed, onCollapseChange]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const update = () => {
      const shouldCollapse = window.innerWidth < 768;
      setCollapsed(shouldCollapse);

      if (shouldCollapse) {
        setOpenMenu(null);
      } else {
        setCollapsedOpenMenu(null);
      }
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        submenuRef.current &&
        !submenuRef.current.contains(event.target as Node)
      ) {
        setCollapsedOpenMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ================= HANDLERS ================= */

  const handleNav = (path: string) => router.push(path);
  const toggleSidebar = () => setCollapsed((c) => !c);

  /* ================= RENDER ================= */

  return (
    <Box
      w={collapsed ? 70 : 220}
      h="100vh"
      pos="relative"
      bg="primary.7"
      style={{
        color: BRAND_COLORS.primary.text,
        transition: "width 200ms ease",
        boxShadow: `1px 2px 4px ${theme.colors.secondary[9]}`,
        display: "flex",
        flexDirection: "column",
        zIndex: 1000,
      }}
    >
      {/* HEADER */}
      <Group
        p="md"
        justify={collapsed ? "center" : "space-between"}
        style={{
          borderBottom: `1px solid ${theme.colors.primary[7]}`,
        }}
      >
        <Box>{logo}</Box>
      </Group>

      {/* MENU */}
      <Stack gap={4} p="sm" pos="relative">
        {items.map((item) => {
          const visibleChildren =
            item.children?.filter(
              (child) => child.menuType !== MENU_TYPE.PAGE_MENU
            ) ?? [];

          const hasChildren = visibleChildren.length > 0;

          const isActive =
            pathname === item.path ||
            pathname.startsWith(`${item.path}/`) ||
            visibleChildren.some((child) => pathname === child.path);

          const isOpen = openMenu === item.label;
          const isCollapsedOpen = collapsedOpenMenu === item.label;

          return (
            <Box key={item.label} pos="relative">
              {/* MAIN ITEM */}
              <UnstyledButton
                bg={isActive ? "primary.9" : "transparent"}
                onClick={() => {
                  if (collapsed) {
                    if (hasChildren) {
                      setCollapsedOpenMenu(isCollapsedOpen ? null : item.label);
                    } else {
                      handleNav(item.path);
                    }
                  } else {
                    if (hasChildren) {
                      setOpenMenu(isOpen ? null : item.label);
                    } else {
                      handleNav(item.path);
                    }
                  }
                }}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: 8,
                  transition: "0.2s",
                }}
              >
                <Group justify="space-between" w="100%">
                  <Group gap={12}>
                    {item.icon}
                    {!collapsed && <Text size="sm">{item.label}</Text>}
                  </Group>

                  {!collapsed &&
                    hasChildren &&
                    (isOpen ? (
                      <IconChevronDown size={16} />
                    ) : (
                      <IconChevronRight size={16} />
                    ))}
                </Group>
              </UnstyledButton>

              {/* EXPANDED SIDEBAR CHILDREN */}
              {!collapsed && hasChildren && (
                <Collapse in={isOpen}>
                  <Stack gap={4} mt={4} pl={36}>
                    {visibleChildren.map((child) => {
                      const activeChild = pathname === child.path;

                      return (
                        <UnstyledButton
                          key={child.path}
                          bg={activeChild ? "primary.9" : "transparent"}
                          onClick={() => handleNav(child.path)}
                          style={{
                            padding: "8px 10px",
                            borderRadius: 6,
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                          }}
                        >
                          {child.icon}
                          <Text size="sm">{child.label}</Text>
                        </UnstyledButton>
                      );
                    })}
                  </Stack>
                </Collapse>
              )}

              {/* COLLAPSED SIDEBAR POPUP */}
              {collapsed && hasChildren && isCollapsedOpen && (
                <Box
                  ref={submenuRef}
                  pos="absolute"
                  left={70}
                  top={0}
                  bg="primary.5"
                  p="sm"
                  style={{
                    borderRadius: 8,
                    boxShadow: theme.shadows.md,
                    zIndex: 999,
                    minWidth: 180,
                  }}
                >
                  <Stack>
                    {visibleChildren.map((child) => {
                      const activeChild = pathname === child.path;

                      return (
                        <UnstyledButton
                          key={child.path}
                          onClick={() => {
                            handleNav(child.path);
                            setCollapsedOpenMenu(null);
                          }}
                          bg={activeChild ? "primary.8" : "transparent"}
                          style={{
                            padding: "8px 10px",
                            borderRadius: 6,
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                            whiteSpace: "nowrap",
                          }}
                        >
                          {child.icon}
                          <Text size="sm">{child.label}</Text>
                        </UnstyledButton>
                      );
                    })}
                  </Stack>
                </Box>
              )}
            </Box>
          );
        })}
      </Stack>

      {/* FOOTER */}
      <Box mt="auto" p="sm">
        <ActionIcon
          color="primary.8"
          size="lg"
          radius="md"
          w="100%"
          onClick={toggleSidebar}
        >
          {collapsed ? (
            <IconChevronRight size={18} />
          ) : (
            <IconChevronLeft size={18} />
          )}
        </ActionIcon>
      </Box>
    </Box>
  );
};

export default Sidebar;
