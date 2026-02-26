"use client";

import {
  Container,
  Grid,
  Stack,
  Group,
  Box,
  Text,
  Anchor,
  ActionIcon,
} from "@mantine/core";
import { IconMail, IconPhone, IconMapPin } from "@tabler/icons-react";
import {
  FOOTER_SECTIONS,
  CONTACT_INFO,
  SOCIAL_LINKS,
  BRAND,
  COLORS,
} from "../../constants";

export default function Footer() {
  return (
    <Box
      component="footer"
      py={60}
      style={{
        background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primaryDark} 100%)`,
      }}
    >
      <Container size="xl">
        <Grid gutter={40}>
          {/* Brand Section */}
          <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
            <Stack gap="md">
              <Group gap="xs">
                <Box
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    backgroundColor: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text fw={900} size="xl" c={COLORS.primary}>
                    S
                  </Text>
                </Box>
                <Text fw={700} size="xl" c="white">
                  {BRAND.name}
                </Text>
              </Group>
              <Text c="rgba(255, 255, 255, 0.8)" size="sm">
                {BRAND.fullName}
                <br />
                {BRAND.tagline}
              </Text>
              <Group gap="sm">
                {SOCIAL_LINKS.map((social) => {
                  const Icon = social.icon;
                  return (
                    <ActionIcon
                      key={social.label}
                      component="a"
                      href={social.href}
                      variant="light"
                      color="pink"
                      size="lg"
                      radius="xl"
                      aria-label={social.label}
                    >
                      <Icon size={20} />
                    </ActionIcon>
                  );
                })}
              </Group>
            </Stack>
          </Grid.Col>

          {/* Footer Links Sections */}
          {FOOTER_SECTIONS.map((section) => (
            <Grid.Col key={section.title} span={{ base: 12, sm: 6, md: 3 }}>
              <Stack gap="md">
                <Text fw={700} c="white" size="lg">
                  {section.title}
                </Text>
                <Stack gap="xs">
                  {section.links.map((link) => (
                    <Anchor
                      key={link.label}
                      href={link.href}
                      c="rgba(255, 255, 255, 0.8)"
                      underline="never"
                      size="sm"
                    >
                      {link.label}
                    </Anchor>
                  ))}
                </Stack>
              </Stack>
            </Grid.Col>
          ))}

          {/* Contact Info Section */}
          <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
            <Stack gap="md">
              <Text fw={700} c="white" size="lg">
                Contact Info
              </Text>
              <Stack gap="sm">
                <Group gap="xs">
                  <IconMail size={18} color="rgba(255, 255, 255, 0.8)" />
                  <Text c="rgba(255, 255, 255, 0.8)" size="sm">
                    {CONTACT_INFO.email}
                  </Text>
                </Group>
                <Group gap="xs">
                  <IconPhone size={18} color="rgba(255, 255, 255, 0.8)" />
                  <Text c="rgba(255, 255, 255, 0.8)" size="sm">
                    {CONTACT_INFO.phone}
                  </Text>
                </Group>
                <Group gap="xs" align="flex-start">
                  <IconMapPin size={18} color="rgba(255, 255, 255, 0.8)" />
                  <Text c="rgba(255, 255, 255, 0.8)" size="sm">
                    {CONTACT_INFO.address}
                  </Text>
                </Group>
              </Stack>
            </Stack>
          </Grid.Col>
        </Grid>

        {/* Copyright */}
        <Box
          mt={60}
          pt={30}
          style={{
            borderTop: "1px solid rgba(255, 255, 255, 0.2)",
          }}
        >
          <Text ta="center" c="rgba(255, 255, 255, 0.7)" size="sm">
            © {new Date().getFullYear()} {BRAND.name} - {BRAND.fullName}. All
            rights reserved. Developed by{" "}
            <Text component="span" fw={600} c="white">
              {BRAND.developer}
            </Text>
          </Text>
        </Box>
      </Container>
    </Box>
  );
}
