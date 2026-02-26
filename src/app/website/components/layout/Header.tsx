"use client";

import { Container, Group, Box, Text, Anchor, Button } from "@mantine/core";
import { useRouter } from "next/navigation";
import { NAV_LINKS, BRAND, COLORS } from "../../constants";
import {downloadImg} from "../../assets/utils/images";
import {loginImg} from "../../assets/utils/images";

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
        backgroundColor: `rgba(139, 21, 56, 0.98)`,
      }}
    >
      <Container size="xl" py="md">
        <Group justify="space-between">
          {/* Logo */}
          <Group gap="xs">
            <Box
              style={{
                width: 70,
                height: 70,
                borderRadius: "50%",
                backgroundColor: "#FF0044",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                fw={500}
                size="xl"
                style={{
                  color: "#ffffff",
                  marginLeft: "90px",
                  fontSize: "45px",
                }}
              >
                SMS
              </Text>
            </Box>
            {/* <Text fw={700} size="xl" c="white">
              {BRAND.name}
            </Text> */}
          </Group>

          {/* Navigation Links */}
          {/* <Group gap="xl" visibleFrom="md">
            {NAV_LINKS.map((link) => (
              <Anchor
                key={link.href}
                href={link.href}
                c="white"
                underline="never"
                fw={500}
              >
                {link.label}
              </Anchor>
            ))}
          </Group> */}

          {/* CTA Buttons */}
          <Group gap="sm">
            <Button
              size="lg"
              radius="sm"
              variant="gradient"
              gradient={{ from: "#FF7853", to: "#FF2C36", deg: 135 }}
              rightSection={
                <img src={downloadImg.src} width={18} height={18} alt="icon" />
              }
              onClick={() => router.push("/signup")}
              className="btn-text"
            >
              Download App
            </Button>
            <Button
              size="lg"
              radius="sm"
              variant="outline"
              color="#FF4C8E"
              rightSection={
                <img src={loginImg.src} width={18} height={18} alt="icon" />
              }
              onClick={() => router.push("/auth/login")}
              className="btn-text"
            >
              Login
            </Button>
            {/* <Button
              variant="subtle"
              c="white"
              size="sm"
              onClick={() => router.push("/auth/login")}
            >
              Login
            </Button> */}
          </Group>
        </Group>
      </Container>
    </Box>
  );
}
