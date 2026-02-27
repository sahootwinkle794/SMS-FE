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
  Button,
  Title,
} from "@mantine/core";
import Link from "next/link";
import { IconMail, IconPhone, IconMapPin } from "@tabler/icons-react";
import {
  FOOTER_SECTIONS,
  CONTACT_INFO,
  SOCIAL_LINKS,
  BRAND,
  COLORS,
} from "../../constants";
import { logo, playStore, appStore } from "../../assets/utils/images";

export default function Footer() {
  return (
    <Box className="footer" component="footer" py={60}>
      <Container size="xl">
        <Grid gutter={40}>
          {/* Brand Section */}
          <Grid.Col span={{ base: 12, sm: 6, md: 5 }}>
            <Stack gap="md">
              <Group gap="xs">
                <img src={logo.src} alt="logo" />
              </Group>
              <Text
                c="rgba(255, 255, 255, 0.8)"
                size="30px"
                className="footer-text"
              >
                {BRAND.fullName}
              </Text>
              <Stack gap="sm">
                <Group gap="xs" align="flex-start">
                  {/* <IconMapPin size={18} color="rgba(255, 255, 255, 0.8)" /> */}
                  <Text c="rgba(255, 255, 255, 0.8)" className="footer-text2">
                    {CONTACT_INFO.address}
                  </Text>
                </Group>
                <Group gap="xs">
                  {/* <IconMail size={18} color="rgba(255, 255, 255, 0.8)" /> */}
                  <Text c="rgba(255, 255, 255, 0.8)" className="footer-text2">
                    {CONTACT_INFO.email}
                  </Text>
                </Group>

                <Group gap="xs">
                  {/* <IconPhone size={18} color="rgba(255, 255, 255, 0.8)" /> */}
                  <Text c="rgba(255, 255, 255, 0.8)" className="footer-text2">
                    {CONTACT_INFO.phone}
                  </Text>
                </Group>
              </Stack>
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
            <Grid.Col key={section.title} span={{ base: 12, sm: 6, md: 2 }}>
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
          <Grid.Col span={{ base: 12, sm: 6, md: 2 }}>
            <Title className="app-download">Download App</Title>
            <Stack gap="sm" mt="md">
              <Link href="/#" style={{ textDecoration: "none" }}>
                <Button
                  className="playstore"
                  fullWidth
                  leftSection={
                    <img
                      src={playStore.src}
                      alt="download"
                      width={18}
                      height={18}
                    />
                  }
                >
                  Play Store
                </Button>
              </Link>
              <Link href="/#" style={{ textDecoration: "none" }}>
                <Button
                  className="playstore"
                  fullWidth
                  leftSection={
                    <img
                      src={appStore.src}
                      alt="download"
                      width={18}
                      height={18}
                    />
                  }
                >
                  App Store
                </Button>
              </Link>
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
