"use client";

import {
  Breadcrumbs,
  Anchor,
  Box,
  useMantineTheme,
  ActionIcon,
  Group,
  Tooltip,
  Switch,
} from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import styles from "./AppBreadcrumbs.module.css";

interface Crumb {
  label: string;
  path?: void | string | (() => void);
}

interface AppBreadcrumbsProps {
  items: Crumb[];
  isBackButton?: boolean;

  // Switch props
  showSwitch?: boolean;
  switchLabel?: string;
  switchChecked?: boolean;
  onSwitchChange?: (checked: boolean) => void;
}

export default function AppBreadcrumbs({
  items,
  isBackButton = false,
  showSwitch = false,
  switchLabel = "Enable",
  switchChecked = false,
  onSwitchChange,
}: AppBreadcrumbsProps) {
  const router = useRouter();
  const theme = useMantineTheme();

  const handleNavigation = (path: string | (() => void)) => {
    if (typeof path === 'function') {
      path(); // Execute custom function
    } else {
      router.push(path);
    }
  };

  return (
    <Box
      mb="sm"
      pb="sm"
      w="100%"
      style={{ borderBottom: "1px solid var(--mantine-color-gray-3)" }}
    >
      <Group justify="space-between" align="center">
        {/* Left: Breadcrumbs */}
        <Breadcrumbs separator="⮞">
          {items.map((item, idx) => {
            const isLast = idx === items.length - 1;

            if (isLast || !item.path) {
              return (
                <span
                  key={idx}
                  style={{
                    fontSize: "0.875rem",
                    cursor: "default",
                    color: theme.colors.primary[9],
                  }}
                >
                  {item.label}
                </span>
              );
            }

            return (
              <Anchor
                key={idx}
                size="sm"
                onClick={() => handleNavigation(item.path!)}
                className={styles.breadcrumbLink}
              >
                {item.label}
              </Anchor>
            );
          })}
        </Breadcrumbs>

        {/* Right: Back Button OR Switch */}
        {isBackButton && !showSwitch && (
          <Tooltip label="Go back" withArrow>
            <ActionIcon
              radius="xl"
              size="lg"
              variant="light"
              onClick={() => router.back()}
              style={{
                backgroundColor: theme.colors.primary[7],
                color: theme.white,
              }}
              styles={{
                root: {
                  "&:hover": {
                    backgroundColor: theme.colors.primary[8],
                  },
                },
              }}
            >
              <IconArrowLeft size={18} />
            </ActionIcon>
          </Tooltip>
        )}

        {showSwitch && (
          <Switch
            size="md"
            label={switchLabel}
            checked={switchChecked}
            onChange={(e) =>
              onSwitchChange?.(e.currentTarget.checked)
            }
            color="primary.5"
          />
        )}
      </Group>
    </Box>
  );
}
