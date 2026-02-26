"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Center, Stack, Text, Progress, Box } from "@mantine/core";
import { IMAGES } from "@/utils/images";
import { RouteConfig } from "@/utils/routeConfig";

export default function Home() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);

  // Progress animation
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 4;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // Redirect AFTER progress reaches 100
  useEffect(() => {
    if (progress === 100) {
      const timer = setTimeout(() => {
        router.replace(RouteConfig.WEBSITE_ROUTE);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [progress, router]);

  return (
    <Center h="100vh">
      <Stack align="center" gap={8} style={{ textAlign: "center" }}>
        {/* Bigger Image */}
        <Box style={{ marginBottom: 0 }}>
          <Image
            src={IMAGES.SOCIETY_BRAND_IMG}
            alt="Society Logo"
            width={320} // Increased size
            height={320}
            priority
          />
        </Box>

        <Text c="#811333" fw={700} size="xl">
          Society Management System
        </Text>

        <Box w={350}>
          <Progress
            value={progress}
            size="lg"
            radius="xl"
            striped
            animated
            color="pink"
          />
        </Box>

        <Text c="gray.3" size="sm">
          Loading...
        </Text>
      </Stack>
    </Center>
  );
}
