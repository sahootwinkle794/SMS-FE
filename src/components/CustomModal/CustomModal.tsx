"use client";
import React from "react";
import { Modal, Text, Center, Stack, Group, Button } from "@mantine/core";
import Image from "next/image";

interface CustomModalProps {
  opened: boolean;
  onClose: () => void;
  icon?: string | React.ReactNode;
  title?: string;
  subtext?: string;
  actionText?: string;
  onAction?: () => void;
  showCancel?: boolean;
  cancelText?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

export default function CustomModal({
  opened,
  onClose,
  icon,
  title,
  subtext,
  actionText = "OK",
  onAction,
  showCancel = false,
  cancelText = "Cancel",
  size = "sm",
}: CustomModalProps) {
  const renderIcon = () => {
    if (!icon) return null;

    if (typeof icon === "string") {
      return (
        <Center>
          <div style={{ width: 70, height: 70, position: "relative" }}>
            <Image
              src={icon}
              alt="icon"
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
        </Center>
      );
    }

    return <Center>{icon}</Center>;
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      withCloseButton={false}
      centered
      size={size}
      padding="xl"
      closeOnClickOutside={false}
      closeOnEscape={false}
    >
      <Stack align="center">
        {renderIcon()}

        {title && (
          <Text size="lg" fw={700} ta="center">
            {title}
          </Text>
        )}

        {subtext && (
          <Text size="sm" c="dimmed" mt="0" ta={'center'} >
            {subtext}
          </Text>
        )}

        <Group w="100%" mt="md" grow>
          <Button bdrs={'5px'} color="primary.5" onClick={onAction}>
            {actionText}
          </Button>

          {showCancel && (
            <Button bdrs={'5px'} color="secondary.7" onClick={onClose}>
              {cancelText}
            </Button>
          )}
        </Group>
      </Stack>
    </Modal>
  );
}
