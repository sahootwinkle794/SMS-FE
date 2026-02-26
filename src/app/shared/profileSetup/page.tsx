"use client";
import { useEffect, useRef, useState } from "react";
import {
  FileInput,
  TextInput,
  Grid,
  Button,
  Image,
  Badge,
  Flex,
  Group,
  Card,
  Text,
  Divider,
  Box,
  Avatar,
  FileButton,
  ActionIcon,
} from "@mantine/core";
import { IMAGES } from "@/utils/images";
import { useGreeting } from "@/hooks/useGreeting";
import { CustomModal } from "@/components";
import {
  IconEdit,
  IconCheck,
  IconRestore,
  IconCamera,
} from "@tabler/icons-react";
import { useAuthStore } from "@/store/auth.store";
import { maskPhone } from "@/utils/common";
import { SingleUserResponse } from "@/types/admin/setup/userSetup/userSetup";
import { getRequest, putRequest } from "@/service";
import { API_PATH } from "@/utils/apiPath";
import { notifications } from "@mantine/notifications";

const ProfileSetup = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    emailId: "",
    roleId: "",
    roleName: "",
    status: 1,
  });

  const [editProfileData, setEditProfileData] = useState({
    name: "",
    emailId: "",
    roleId: "",
    roleName: "",
    status: 1,
  });

  const [imagePreview, setImagePreview] = useState<string>(IMAGES.USER_PROFILE);
  const greetingMsg = useGreeting();
  const user = useAuthStore((state) => state.user);

  const getUserId = async (userId: number | string) => {
    try {
      const response = await getRequest<SingleUserResponse>(
        `${API_PATH.GET_USER_MASTER}/${userId}`
      );

      const user = response.data;
      setProfileData({
        name: user.name,
        emailId: user.emailId,
        roleId: user.roleId,
        roleName: user.roleName,
        status: user.status,
      });

      setEditProfileData({
        name: user.name,
        emailId: user.emailId,
        roleId: user.roleId,
        roleName: user.roleName,
        status: user.status,
      });
    } catch (error) {
      console.error(error);
      notifications.show({
        title: "Error",
        message: "Failed to load user details",
        color: "red",
      });
    }
  };

  const handleSaveProfile = async () => {
    try {
      const payload = {
        name: editProfileData.name,
        emailId: editProfileData.emailId,
        roleId: editProfileData.roleId,
        status: editProfileData.status,
      };

      await putRequest(`${API_PATH.GET_USER_MASTER}/${user?.id}`, payload);

      setProfileData(editProfileData); // commit changes
      setIsEditMode(false);

      notifications.show({
        title: "Success",
        message: "Profile updated successfully",
        color: "green",
      });
    } catch {
      notifications.show({
        title: "Error",
        message: "Failed to update profile",
        color: "red",
      });
    }
  };

  const handleChange = (field: string, value: string) => {
    setEditProfileData((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    if (user?.id) {
      getUserId(user.id);
    }
  }, [user?.id]);

  return (
    <>
      <Card withBorder radius="md" p="lg">
        <Grid>
          {/* LEFT PROFILE SUMMARY */}
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Flex direction="column" align="center">
              <Box pos="relative" display="inline-block">
                <Avatar
                  src={imagePreview}
                  size={140}
                  radius="50%"
                  styles={{
                    root: {
                      borderRadius: "50%",
                      overflow: "hidden",
                      border: isEditMode
                        ? "4px solid #4c6ef5"
                        : "3px solid #f1f3f5",
                      transition: "all 0.3s ease",
                      boxSizing: "border-box",
                      filter: isEditMode ? "brightness(0.95)" : "none",
                    },
                    image: {
                      objectFit: "cover",
                      width: "100%",
                      height: "100%",
                    },
                  }}
                />

                {/* Semi-transparent overlay in edit mode */}
                {isEditMode && (
                  <>
                    <Box
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        borderRadius: "50%",
                        backgroundColor: "rgba(0, 0, 0, 0.3)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        pointerEvents: "none",
                        zIndex: 1,
                      }}
                    />

                    <FileButton
                      accept="image/*"
                      onChange={(file) => {
                        if (!file) return;
                        setImagePreview(URL.createObjectURL(file));
                      }}
                    >
                      {(props) => (
                        <ActionIcon
                          {...props}
                          size="lg"
                          radius="xl"
                          color="white"
                          variant="filled"
                          bg="rgba(255, 255, 255, 0.9)"
                          style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            border: "2px solid white",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
                            cursor: "pointer",
                            zIndex: 10,
                          }}
                        >
                          <IconCamera size={20} color="#495057" stroke={2} />
                        </ActionIcon>
                      )}
                    </FileButton>
                  </>
                )}
              </Box>

              <Text mt="md" c="dimmed">
                {greetingMsg}
              </Text>

              <Text fw={600} size="lg">
                {profileData.name}
              </Text>
              <Group mt="xs" gap="xs">
                <Badge color="primary.5" variant="light">
                  {maskPhone(user?.userId)}
                </Badge>

                <ActionIcon
                  size="sm"
                  radius="xl"
                  variant="light"
                  color="primary"
                  onClick={() => setIsEditMode(true)}
                  disabled={isEditMode}
                >
                  <IconEdit size={14} />
                </ActionIcon>
              </Group>
            </Flex>
          </Grid.Col>

          {/* RIGHT PROFILE FORM */}
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Flex justify="space-between" align="center">
              <Text fw={600}>My Profile</Text>
              {isEditMode && (
                <Badge color="blue" variant="light">
                  Edit Mode
                </Badge>
              )}
            </Flex>

            <Divider my="sm" />

            <Grid>
              <Grid.Col span={{ base: 12, md: 12 }}>
                <TextInput
                  label="Name"
                  placeholder="Soumya Ranjan"
                  name="name"
                  value={editProfileData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  disabled={!isEditMode}
                />
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 12 }}>
                <TextInput
                  label="Email Address"
                  placeholder="soumya@gmail.com"
                  name="emailId"
                  value={editProfileData.emailId}
                  onChange={(e) => handleChange("emailId", e.target.value)}
                  disabled={!isEditMode}
                />
              </Grid.Col>
            </Grid>

            {/* ACTION BUTTONS */}
            <Group justify="flex-end" mt="md">
              <Button
                variant="outline"
                color="primary.5"
                leftSection={<IconRestore size={16} />}
                disabled={!isEditMode}
                onClick={() => {
                  setEditProfileData(profileData); // revert
                  setIsEditMode(false);
                }}
              >
                Cancel
              </Button>

              <Button
                color="primary.5"
                leftSection={<IconCheck size={16} />}
                disabled={!isEditMode}
                onClick={() => handleSaveProfile()}
              >
                Save Changes
              </Button>
            </Group>
          </Grid.Col>
        </Grid>
      </Card>

      {/* SUCCESS MODAL */}
      <CustomModal
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Success"
        subtext="Profile updated successfully"
        onAction={() => {
          setModalOpen(false);
          setIsEditMode(false);
        }}
      />
    </>
  );
};

export default ProfileSetup;
