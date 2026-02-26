"use client";

import { ActionIcon, Box, Stack, Tooltip, useMantineTheme } from "@mantine/core";
import { useState } from "react";

interface PopupButton {
  title: string;
  icon: React.ReactNode;
  onClick: () => void;
  color?: string;
}

interface FloatingButtonPopupProps {
  mainTitle: string;
  mainIcon: React.ReactNode;
  menuButtons?: PopupButton[];
  onMainClick?: () => void;
}

export default function FloatingButton({
  mainTitle,
  mainIcon,
  menuButtons,
  onMainClick,
}: FloatingButtonPopupProps) {
  const [open, setOpen] = useState(false);
  const theme =  useMantineTheme()

  const hasMenu = menuButtons && menuButtons.length > 0;

  const handleMainClick = () => {
    if (hasMenu) {
      setOpen((prev) => !prev);
    } else if (onMainClick) {
      onMainClick();
    }
  };

  return (
    <Box
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 9999,
      }}
    >
      {/* POPUP MENU */}
      {hasMenu && open && (
        <Stack style={{ marginBottom: 10 }}>
          {menuButtons!.map((btn, i) => (
            <Tooltip label={btn.title} key={i} position="left">
              <ActionIcon
                variant="filled"
                color={btn.color || "blue"}
                onClick={btn.onClick}
                size={45}
                radius="xl"
                style={{
                  backgroundColor: theme.colors.primary[5],
                  color: theme.colors.primary[0],
                  border: "1px solid #ccc",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                }}
              >
                {btn.icon}
              </ActionIcon>
            </Tooltip>
          ))}
        </Stack>
      )}

      {/* MAIN FLOATING BUTTON */}
      <Tooltip label={mainTitle} position="left">
        <ActionIcon
          size={55}
          radius="xl"
          variant="filled"
          color={"primary.5"}
          onClick={handleMainClick}
          style={{
            boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
          }}
        >
          {mainIcon}
        </ActionIcon>
      </Tooltip>
    </Box>
  );
}
