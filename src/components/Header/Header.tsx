"use client";

import {
  Box,
  Avatar,
  Menu,
  Text,
  Group,
  Title,
  TextInput,
  ActionIcon,
  Modal,
  // Image,
} from "@mantine/core";
import {
  IconUser,
  IconLogout2,
  IconBell,
  IconSearch,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import styles from "./Header.module.css";
import React, { useState } from "react";
import { RouteConfig } from "@/utils/routeConfig";
// import { IMAGES } from "@/utils/images";
import { useAuthStore } from "@/store/auth.store";
import { getRoleShortName } from "@/utils/common";
import ProfileSetup from "@/app/shared/profileSetup/page";

interface AppHeaderProps {
  onLogout: () => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({ onLogout }) => {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  return (
    <>
      {" "}
      <Box className={styles.headerContainer}>
        <Box>
          <Group align="center" gap="md">
            {/* Logo */}
            {/* <Image src={IMAGES.BRAND_LOGO} alt="SMS Logo" w={80} /> */}

            {/* Title + Tagline */}
            <Box>
              <Title order={3} mb={2} c={"primary.5"}>
                Society Management System
              </Title>
              <Text size="xs" c="dimmed" color={"primary.7"}>
                Your all-in-one platform for organized living, efficient
                communication, and community harmony.
              </Text>
            </Box>
          </Group>
        </Box>

        <Group gap={12}>
          {/* Search Bar */}
          <TextInput
            radius={"md"}
            placeholder="Search..."
            leftSection={<IconSearch size={14} />}
            w={300}
          />

          {/* Notification Icon */}
          <ActionIcon
            variant="subtle"
            size={32}
            radius="xl"
            c="primary.5"
            style={(theme) => ({
              "&:hover": {
                backgroundColor: theme.colors.primary[1],
                color: theme.colors.primary[6],
              },
            })}
          >
            <IconBell size={20} />
          </ActionIcon>

          {/* User Menu */}
          <Menu width={180} shadow="md" keepMounted>
            <Menu.Target>
              <Group gap={8} className={styles.profileClick}>
                <Avatar radius="xl" size={32} color="primary.5">
                  {getRoleShortName(user?.role)}
                </Avatar>
                <Text size="sm" fw={500} color={"primary.7"}>
                  {user?.userId}
                </Text>
              </Group>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item
                leftSection={<IconUser size={16} />}
                // onClick={() => router.push(RouteConfig.PROFILE_SETUP)}
                onClick={() => setProfileModalOpen(true)}
              >
                My Profile
              </Menu.Item>

              <Menu.Item
                leftSection={<IconLogout2 size={16} />}
                color="red"
                onClick={onLogout}
              >
                Logout
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Box>
      {/* PROFILE MODAL */}
      <Modal
        opened={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
        withCloseButton
        centered
        size="xl"
        title="Profile Setup"
        overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
        
      >
        <ProfileSetup />
      </Modal>
    </>
  );
};

export default AppHeader;
