"use client";

import { Container, Group, Box, Text, Button } from "@mantine/core";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { downloadImg, loginImg } from "../../assets/utils/images";

const HEADER_BUTTONS = [
  {
    label: "Download App",
    icon: downloadImg,
    variant: "gradient" as const,
    gradient: { from: "#FF7853", to: "#FF2C36", deg: 135 },
    href: "https://play.google.com/store/apps/details",
  },
  {
    label: "Login",
    icon: loginImg,
    variant: "outline" as const,
    color: "#FF4C8E",
    href: "/auth/login",
  },
];

export default function Header() {
  const router = useRouter();

  return (
    <Box
      component="header"
      className="header"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        backgroundColor: "rgba(139, 21, 56, 0.98)",
      }}
    >
      <Container size="xl" py="md">
        <Group justify="space-between">
          {/* Logo */}
          <Group gap={0} align="center" style={{ position: "relative" }}>
            {/* Circle */}
            <Box
              style={{
                width: 52,
                height: 52,
                borderRadius: "50%",
                backgroundColor: "#FF0044",
                flexShrink: 0,
                zIndex: 1,
              }}
            />
            {/* SMS text overlapping the circle */}
            <Text
              fw={700}
              c="white"
              style={{
                fontSize: 32,
                letterSpacing: 1,
                marginLeft: -23, // pulls text left to overlap circle
                zIndex: 2,
              }}
            >
              SMS
            </Text>
          </Group>

          {/* CTA Buttons */}
          <Group gap="sm">
            {HEADER_BUTTONS.map(({ label, icon, href, ...props }) => (
              <Button
                key={label}
                size="lg"
                radius="sm"
                rightSection={
                  <Image src={icon} width={18} height={18} alt="" />
                }
                onClick={() => router.push(href)}
                className="btn-text"
                {...props}
              >
                {label}
              </Button>
            ))}
          </Group>
        </Group>
      </Container>
    </Box>
  );
}
