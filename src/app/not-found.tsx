"use client";

import {
  Button,
  Container,
  Title,
  Text,
  Group,
  Image,
  Stack,
  Box,
} from "@mantine/core";
import Link from "next/link";
import { IMAGES } from "../utils/images";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <Box
      style={{
        backgroundImage: `url(${IMAGES.SCREEN_ERROR_BACKGROUND})`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <Container size="md" style={{ textAlign: "center" }}>
        <Stack align="center" gap="lg">
          <Image
            src={IMAGES.DOGGO_NOT_FOUND}
            alt="Dog looking confused"
            maw={150}
            radius="lg"
            style={{
              userSelect: "none",
              opacity: 0.9,
              filter: "drop-shadow(0px 4px 18px rgba(0, 0, 0, 0.18))",
            }}
          />

          <Title order={1} fw={800} fz={{ base: 42, sm: 62 }}>
            404
          </Title>

          <Title order={3} fw={600}>
            Page not found
          </Title>

          <Text c="dimmed" fz="lg" maw={400}>
            The page you’re trying to reach doesn’t exist or might have been
            removed.
          </Text>

          <Group justify="center" mt="md">
            <Button color="primary.5" size="md" radius="xl" onClick={() => window.history.back()}>
              Go back home
            </Button>
          </Group>
        </Stack>
      </Container>
    </Box>
  );
}
