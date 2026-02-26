"use client";

import {
  Container,
  Grid,
  Stack,
  Title,
  Text,
  Paper,
  TextInput,
  Textarea,
  Button,
} from "@mantine/core";
import { COLORS } from "../../constants";

export default function ContactSection() {
  return (
    <Box className="contacts" id="contact" py={80} style={{ backgroundColor: "white" }}>
      <Container size="lg">
        <Grid gutter={60} align="center">
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Stack gap="xl">
              <Title order={2} size={42} fw={900} c={COLORS.primary}>
                Ready to discuss
                <br />
                <Text component="span" inherit c={COLORS.accent}>
                  your toughest
                  <br />
                  tech challenges?
                </Text>
              </Title>
              <Text size="lg" c="dimmed">
                Fill out the form and we will get in touch with you as soon as
                possible.
                <br />
                <br />
                <Text component="span" fw={600} c={COLORS.primary}>
                  No account managers — that's a promise.
                </Text>
              </Text>
            </Stack>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Paper
              shadow="md"
              radius="lg"
              p="xl"
              style={{ border: `1px solid ${COLORS.pinkAccent}` }}
            >
              <Stack gap="md">
                <TextInput
                  label="Your Name"
                  placeholder="Enter your name"
                  size="md"
                  styles={{
                    input: { borderRadius: 8 },
                  }}
                />
                <TextInput
                  label="Email ID"
                  placeholder="your.email@example.com"
                  size="md"
                  type="email"
                  styles={{
                    input: { borderRadius: 8 },
                  }}
                />
                <TextInput
                  label="Phone Number"
                  placeholder="+91 XXXXX XXXXX"
                  size="md"
                  styles={{
                    input: { borderRadius: 8 },
                  }}
                />
                <Textarea
                  label="Your Requirements"
                  placeholder="Tell us about your needs..."
                  size="md"
                  minRows={4}
                  styles={{
                    input: { borderRadius: 8 },
                  }}
                />
                <Button
                  size="lg"
                  fullWidth
                  style={{ backgroundColor: COLORS.accent, borderRadius: 8 }}
                  mt="md"
                >
                  Submit Your Request
                </Button>
              </Stack>
            </Paper>
          </Grid.Col>
        </Grid>
      </Container>
    </Box>
  );
}

function Box(props: any) {
  return <div {...props} />;
}
