"use client";

import { useState } from "react";
import {
  Container,
  Stack,
  Box,
  Text,
  Accordion,
  Image,
  Grid,
  Transition,
} from "@mantine/core";
import { FAQS, COLORS } from "../../constants";
import { IMAGE } from "../../assets/utils/images";
import { useIntersection } from "@mantine/hooks";
import { CSSProperties } from "react";

export default function FAQSection() {
  const { ref, entry } = useIntersection({
    threshold: 0.3,
  });

  const [activeFaq, setActiveFaq] = useState<string | null>(null);

  return (
    <Box
      className="faqs"
      id="faq"
      py={80}
      style={{ backgroundColor: COLORS.lightBg }}
    >
      <Container size="xl">
        <Grid gutter={60}>
          <Grid.Col span={{ base: 12, md: 6 }} ref={ref}>
            <Transition
              mounted={entry?.isIntersecting ?? false}
              transition="fade"
              duration={350}
            >
              {(styles: CSSProperties) => (
                <Box style={styles}>
                  <Stack gap="xl" mb={60}>
                    <Text component="h2" size="42px" className="faq-head">
                      FAQs on SMS
                    </Text>
                  </Stack>

                  <Accordion
                    variant="separated"
                    radius="lg"
                    value={activeFaq}
                    onChange={setActiveFaq}
                  >
                    {FAQS.map((faq, idx) => (
                      <Accordion.Item key={idx} value={`faq-${idx}`}>
                        <Accordion.Control>
                          <Text fw={400} size="18px" className="faq-Qsn">
                            {faq.question}
                          </Text>
                        </Accordion.Control>
                        <Accordion.Panel>
                          <Text c="dimmed" className="faq-Ans">
                            {faq.answer}
                          </Text>
                        </Accordion.Panel>
                      </Accordion.Item>
                    ))}
                  </Accordion>
                </Box>
              )}
            </Transition>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 6 }}>
            <Image src={IMAGE.FAQ_IMG} alt="faqs" className="faq-img" />
          </Grid.Col>
        </Grid>
      </Container>
    </Box>
  );
}