"use client";

import { Loader, Center, Stack, Text } from "@mantine/core";

interface UILoaderProps {
  fullScreen?: boolean;
  message?: string;
  size?: number | "sm" | "md" | "lg" | "xl";
}

const UILoader: React.FC<UILoaderProps> = ({
  fullScreen = true,
  message = "Loading...",
  size = "md",
}) => {
  return (
    <Center
      style={
        fullScreen
          ? {
              width: "100%",
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }
          : {}
      }
    >
      <Stack gap={8} align="center">
        <Loader size={size} color="#E53935"/>
        {message && (
          <Text size="sm" c="dimmed">
            {message}
          </Text>
        )}
      </Stack>
    </Center>
  );
};

export default UILoader;
