"use client";

import { useState } from "react";
import { Container, Stack, Box, Text, Accordion, Image } from "@mantine/core";
import { FAQS, COLORS } from "../../constants";

export default function FAQSection() {
  const [activeFaq, setActiveFaq] = useState<string | null>(null);

  return (
    <Box className="faqs" id="faq" py={80} style={{ backgroundColor: COLORS.lightBg }}>
      <Container size="md">
        <Stack gap="xl" mb={60}>
          <Text
            component="h2"
            size="42px"
            fw={900}
            ta="center"
            c={COLORS.primary}
          >
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
                <Text fw={600} c={COLORS.primary}>
                  {faq.question}
                </Text>
              </Accordion.Control>
              <Accordion.Panel>
                <Text c="dimmed">{faq.answer}</Text>
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>

        <Box mt={40} ta="center">
          <Image
            src="/api/placeholder/400/300"
            alt="FAQ Illustration"
            style={{ maxWidth: 300, margin: "0 auto" }}
          />
        </Box>
      </Container>
    </Box>
  );
}
