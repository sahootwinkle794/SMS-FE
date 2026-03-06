import { Box, Card, SimpleGrid, Text } from "@mantine/core";
import { CORAL_DARK, gradientBg, CORAL, softCard } from "@/utils/constants";
import { StatCardItem } from "./StatCards.types";

interface StatCardsProps {
  items: StatCardItem[];
}

export function StatCards({ items }: StatCardsProps) {
  return (
    <SimpleGrid cols={{ base: 2, sm: 4 }} spacing={{ base: "sm", sm: "md" }}>
      {items.map((s) => (
        <Card
          key={s.label}
          radius="xl"
          padding="lg"
          style={{
            ...(s.gradient
              ? { background: gradientBg, color: "#fff", border: "none" }
              : softCard),
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Decorative circles */}
          <Box
            style={{
              position: "absolute", top: -24, right: -24,
              width: 80, height: 80, borderRadius: "50%",
              background: s.gradient ? "rgba(255,255,255,0.15)" : `${CORAL}0D`,
            }}
          />
          <Box
            style={{
              position: "absolute", bottom: -16, right: 20,
              width: 44, height: 44, borderRadius: "50%",
              background: s.gradient ? "rgba(255,255,255,0.10)" : `${CORAL}08`,
            }}
          />
          <Text
            fz="xs" fw={700} mb={6}
            style={{ color: s.gradient ? "rgba(255,255,255,0.8)" : "#999" }}
          >
            {s.label}
          </Text>
          <Text
            fz={{ base: 26, sm: 30 }} fw={900} lh={1}
            style={{ color: s.gradient ? "#fff" : CORAL_DARK }}
          >
            {s.value}
          </Text>
          <Text
            fz="xs" mt={6}
            style={{ color: s.gradient ? "rgba(255,255,255,0.7)" : "#bbb" }}
          >
            {s.sub}
          </Text>
        </Card>
      ))}
    </SimpleGrid>
  );
}