import { Box, Card, Center, Group, Stack, Text } from "@mantine/core";
import { IconCalendarEvent, IconChevronRight } from "@tabler/icons-react";
import { CORAL, gradientBg, PEACH, softCard } from "@/utils/constants";
import { EventItem } from "./UpcomingEvents.types";


interface UpcomingEventsProps {
  items: EventItem[];
  title?: string;
  onSeeAll?: () => void;
}

export function UpcomingEvents({
  items,
  title = "Upcoming Events",
  onSeeAll,
}: UpcomingEventsProps) {
  return (
    <Card radius="xl" padding="lg" style={{ ...softCard, height: "100%" }}>
      <Group justify="space-between" mb="lg">
        <Text fw={900} fz="md" c="#1a1a1a">{title}</Text>
        {onSeeAll && (
          <Group gap={2} style={{ cursor: "pointer" }} onClick={onSeeAll}>
            <Text fz="sm" fw={700} c={CORAL}>See All</Text>
            <IconChevronRight size={15} color={CORAL} />
          </Group>
        )}
      </Group>

      <Stack gap="sm">
        {items.map((ev) => (
          <Box
            key={ev.label}
            style={{
              background: PEACH,
              border: "1.5px solid #FFE5E5",
              borderRadius: 16,
              padding: "12px 14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
            }}
          >
            <Group gap="sm" wrap="nowrap" style={{ flex: 1, minWidth: 0 }}>
              <Center
                style={{
                  width: 42, height: 42, borderRadius: "50%",
                  background: "#fff",
                  border: "1.5px solid #FFCCCC",
                  flexShrink: 0,
                }}
              >
                <IconCalendarEvent size={19} color={CORAL} stroke={1.8} />
              </Center>
              <Box style={{ minWidth: 0 }}>
                <Text fz="sm" fw={800} c="#1a1a1a" truncate>{ev.label}</Text>
                <Text fz="xs" c="dimmed" fw={600}>{ev.tag}</Text>
              </Box>
            </Group>
            <Box
              style={{
                background: gradientBg,
                borderRadius: 10,
                padding: "4px 12px",
                flexShrink: 0,
                boxShadow: `0 3px 10px ${CORAL}44`,
              }}
            >
              <Text fz="xs" fw={900} c="#fff">{ev.date}</Text>
            </Box>
          </Box>
        ))}
      </Stack>
    </Card>
  );
}