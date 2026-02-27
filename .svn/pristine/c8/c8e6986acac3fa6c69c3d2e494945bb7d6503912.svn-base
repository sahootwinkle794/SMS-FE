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
  SimpleGrid,
} from "@mantine/core";
import { COLORS } from "../../constants";
import { Span } from "next/dist/trace";
import {arrowImg} from "../../assets/utils/images";

export default function ContactSection() {
  return (
    <Box
      className="contacts"
      id="contact"
      style={{ backgroundColor: "white" }}
    >
      <Container size="xl">
        <Grid gutter={60} align="center">
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Stack gap="xl">
              <Title className="contact-title">
                Ready to discuss
                <br /> your toughest
                <br />
                <Text className="contact-title2">tech challenges?</Text>
              </Title>
              <Title className="contact-title3">
                Fill out the form and get on a call within 24-48 hours with our
                product and tech expert.
              </Title>
              <Title className="contact-title3">
                No account managers –
                <Text component="span" className="highlight">
                  that’s a promise.
                </Text>
              </Title>
            </Stack>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Paper
              shadow="md"
              radius="lg"
              p="xl"
              style={{ border: `1px solid ${COLORS.pinkAccent}` }}
            >
              <Grid gutter="md">
                {/* Row 1: Name & Mobile */}
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <TextInput
                    className="form-Text"
                    label="Hello, my name is:"
                    placeholder="Full name"
                    size="md"
                    styles={{ input: { borderRadius: 8 } }}
                  />
                </Grid.Col>

                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <TextInput
                    className="form-Text"
                    label="Mobile No. :"
                    placeholder="+91 XXXXX XXXXX"
                    size="md"
                    styles={{ input: { borderRadius: 8 } }}
                  />
                </Grid.Col>

                {/* Row 2: Email & City */}
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <TextInput
                    className="form-Text"
                    label="Email ID :"
                    placeholder="your.email@example.com"
                    size="md"
                    type="email"
                    styles={{ input: { borderRadius: 8 } }}
                  />
                </Grid.Col>

                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <TextInput
                    className="form-Text"
                    label="City:"
                    placeholder="Enter your city"
                    size="md"
                    styles={{ input: { borderRadius: 8 } }}
                  />
                </Grid.Col>

                {/* Row 3: Full width description */}
                <Grid.Col span={12}>
                  <Textarea
                    className="form-Text"
                    label="I am interested in... :"
                    placeholder="Your Project Description"
                    size="md"
                    minRows={4}
                    styles={{ input: { borderRadius: 8 } }}
                  />
                </Grid.Col>

                {/* Row 4: Full width button */}
                <Grid.Col span={12}>
                  <Button
                    size="lg"
                    radius="sm"
                    variant="gradient"
                    gradient={{ from: "#FF7853", to: "#FF2C36", deg: 135 }}
                    rightSection={
                      <img
                        src={arrowImg.src}
                        width={18}
                        height={18}
                        alt="icon"
                      />
                    }
                    // onClick={() => router.push("/signup")}
                    className="btn-text"
                  >
                    Book a demo with us
                  </Button>
                  {/* <Button
                    size="lg"
                    fullWidth
                    style={{ backgroundColor: COLORS.accent, borderRadius: 8 }}
                    mt="md"
                  >
                    Submit Your Request
                  </Button> */}
                </Grid.Col>
              </Grid>
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
