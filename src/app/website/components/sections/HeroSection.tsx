"use client";

import {
  Container,
  Grid,
  Title,
  Text,
  Button,
  Stack,
  Group,
  Box,
  Badge,
  Image,
} from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import { COLORS } from "../../constants";
import { mobileImg } from "../../assets/utils/images";
import { Righteous } from "next/font/google";

export default function HeroSection() {
  return (
    <Box
      className="hero"
      style={{
        overflow: "hidden",
      }}
    >
      <Container size="xl" py={100}>
        <Grid gutter={50} align="center">
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Stack gap="xl">
              <Title
                order={1}
                size={46}
                fw={100}
                c="white"
                style={{ lineHeight: 1.2 }}
                className="hero-text"
              >
                Reinventing Community
                <br />
                <Text
                  className="hero-text"
                  fw={600}
                  component="span"
                  inherit
                  style={{
                    background: "linear-gradient(90deg, #fff 0%, #FFB3C1 100%)",
                    WebkitBackgroundClip: "text",
                  }}
                >
                  Living With The Society
                  <br />
                  Management System
                </Text>
              </Title>

              <Group gap="md">
                <Button
                  className="hero-btn"
                  size="lg"
                  radius="sm"
                  variant="gradient"
                  gradient={{ from: "#FF7853", to: "#FC2631", deg: 180 }}
                >
                  Get A Demo
                </Button>

                <Button
                  className="hero-btn"
                  size="lg"
                  variant="outline"
                  c="white"
                  style={{ borderColor: "white" }}
                >
                  Explore Features
                </Button>
              </Group>
            </Stack>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Box style={{ position: "relative", textAlign: "center" }}>
              <Box
                style={{
                  width: "100%",
                  maxWidth: 246,
                  margin: "0 auto",
                  marginRight: "0",
                  borderRadius: 40,
                }}
              >
                <Image src={mobileImg.src} alt="Mobile UI Preview" />
              </Box>
            </Box>
          </Grid.Col>
        </Grid>
      </Container>
      {/* Decorative buildings illustration */}
      <Box
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 100,
          opacity: 0.3,
        }}
      />
    </Box>
  );
}
