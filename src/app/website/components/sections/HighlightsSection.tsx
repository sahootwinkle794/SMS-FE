"use client";

import {
  Container,
  Grid,
  Stack,
  Box,
  Title,
  Text,
  Paper,
  Group,
} from "@mantine/core";
import DeviceMockup from "../ui/DeviceMockup";
import { COLORS } from "../../constants";

export default function HighlightsSection() {
  return (
    <Box className="high" py={80} style={{ backgroundColor: COLORS.lightBg }}>
      <Container size="xl">
        <Stack gap="xl" mb={60} ta="center">
          <Title order={2} size={42} fw={900} c={COLORS.primary}>
            <Text component="span" inherit c={COLORS.accent}>
              Core Highlight
            </Text>
          </Title>
          <Text size="lg" c="dimmed" maw={700} mx="auto">
            Our best-in-class features designed to deliver the perfect solution
            for your society
          </Text>
        </Stack>

        <Paper
          shadow="xl"
          radius="lg"
          p={60}
          style={{ backgroundColor: "white" }}
        >
          <Grid gutter={50} align="center">
            <Grid.Col span={{ base: 12, md: 7 }}>
              <DeviceMockup />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 5 }}>
              <Stack gap="md">
                <Title order={3} size={28} fw={700} c={COLORS.primary}>
                  About Auto-Deduct & One-Payments
                </Title>
                <Text c="dimmed">
                  Never miss a payment with our automated billing system. Set up
                  auto-deduct for maintenance fees or make one-time payments
                  with ease. Complete transparency and control at your
                  fingertips.
                </Text>
                <Group gap={8} mt="md">
                  {[...Array(8)].map((_, i) => (
                    <Box
                      key={i}
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        backgroundColor: i === 0 ? COLORS.accent : "#DDD",
                      }}
                    />
                  ))}
                </Group>
              </Stack>
            </Grid.Col>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}
