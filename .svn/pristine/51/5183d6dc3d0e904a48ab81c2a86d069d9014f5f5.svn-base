import { useState } from "react";
import { Box, Card, Center, Group, Stack, Text } from "@mantine/core";
import {
  IconCalendarEvent,
  IconChevronRight,
  IconList,
  IconCalendar,
  IconChevronLeft,
} from "@tabler/icons-react";

// ── Constants (inline so the file is self-contained) ────────────────────────
const CORAL = "#FF6B6B";
const PEACH = "#FFF0F0";
const gradientBg = "linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)";
const softCard = {
  background: "#FFFFFF",
  boxShadow: "0 4px 24px rgba(255,107,107,0.08)",
  border: "1.5px solid #FFE5E5",
};

// ── Types ────────────────────────────────────────────────────────────────────
export interface EventItem {
  label: string;
  tag: string;
  /** Any parseable date string, e.g. "2025-07-14" or "Jul 14" */
  date: string;
}

interface UpcomingEventsProps {
  items: EventItem[];
  title?: string;
  onSeeAll?: () => void;
}

// ── Helpers ──────────────────────────────────────────────────────────────────
function parseDate(dateStr: string): Date | null {
  // Try as-is first (works for ISO strings like "2025-03-14")
  let d = new Date(dateStr);
  if (!isNaN(d.getTime())) return d;

  // Try appending current year for short strings like "14 Mar" or "Mar 14"
  const currentYear = new Date().getFullYear();
  d = new Date(`${dateStr} ${currentYear}`);
  if (!isNaN(d.getTime())) return d;

  return null;
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfWeek(year: number, month: number) {
  return new Date(year, month, 1).getDay(); // 0 = Sunday
}

const MONTH_NAMES = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];
const DAY_NAMES = ["Su","Mo","Tu","We","Th","Fr","Sa"];

// ── Toggle Button ────────────────────────────────────────────────────────────
function ViewToggle({
  view,
  onChange,
}: {
  view: "list" | "calendar";
  onChange: (v: "list" | "calendar") => void;
}) {
  return (
    <Group gap={0} style={{
      background: '#fff0f0',
      border: "1.5px solid #FFE5E5",
      borderRadius: 12,
      padding: 3,
      overflow: "hidden",
    }}>
      {(["list", "calendar"] as const).map((v) => {
        const active = view === v;
        return (
          <button
            key={v}
            onClick={() => onChange(v)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              padding: "5px 11px",
              borderRadius: 9,
              border: "none",
              cursor: "pointer",
              fontWeight: 700,
              fontSize: 12,
              transition: "all 0.18s ease",
              background: active ? CORAL : "transparent",
              color: active ? "#fff" : CORAL,
              boxShadow: active ? `0 2px 8px ${CORAL}44` : "none",
            }}
          >
            {v === "list"
              ? <IconList size={13} stroke={2.2} />
              : <IconCalendar size={13} stroke={2.2} />}
            {v === "list" ? "List" : "Calendar"}
          </button>
        );
      })}
    </Group>
  );
}

// ── List View ────────────────────────────────────────────────────────────────
function ListView({ items }: { items: EventItem[] }) {
  return (
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
            transition: "box-shadow 0.15s",
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLElement).style.boxShadow = `0 4px 16px ${CORAL}22`)}
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLElement).style.boxShadow = "none")}
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
              background: CORAL,
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
  );
}

// ── Calendar View ────────────────────────────────────────────────────────────
function CalendarView({ items }: { items: EventItem[] }) {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selected, setSelected] = useState<number | null>(null);

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfWeek(year, month);

  // Map day → events
  const eventsByDay = new Map<number, EventItem[]>();
  items.forEach((ev) => {
    const d = parseDate(ev.date);
    if (d && d.getFullYear() === year && d.getMonth() === month) {
      const day = d.getDate();
      if (!eventsByDay.has(day)) eventsByDay.set(day, []);
      eventsByDay.get(day)!.push(ev);
    }
  });

  const prevMonth = () => {
    if (month === 0) { setMonth(11); setYear(y => y - 1); }
    else setMonth(m => m - 1);
    setSelected(null);
  };
  const nextMonth = () => {
    if (month === 11) { setMonth(0); setYear(y => y + 1); }
    else setMonth(m => m + 1);
    setSelected(null);
  };

  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  // pad to complete last row
  while (cells.length % 7 !== 0) cells.push(null);

  const selectedEvents = selected ? (eventsByDay.get(selected) ?? []) : [];

  return (
    <Stack gap="sm">
      {/* Month nav */}
      <Group justify="space-between" align="center">
        <button
          onClick={prevMonth}
          style={{
            background: PEACH, border: "1.5px solid #FFE5E5",
            borderRadius: 10, width: 32, height: 32,
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <IconChevronLeft size={15} color={CORAL} />
        </button>
        <Text fw={800} fz="sm" c="#1a1a1a">
          {MONTH_NAMES[month]} {year}
        </Text>
        <button
          onClick={nextMonth}
          style={{
            background: PEACH, border: "1.5px solid #FFE5E5",
            borderRadius: 10, width: 32, height: 32,
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <IconChevronRight size={15} color={CORAL} />
        </button>
      </Group>

      {/* Day-of-week headers */}
      <Box style={{
        display: "grid",
        gridTemplateColumns: "repeat(7, 1fr)",
        gap: 2,
      }}>
        {DAY_NAMES.map((d) => (
          <Center key={d}>
            <Text fz={10} fw={700} c="dimmed">{d}</Text>
          </Center>
        ))}
      </Box>

      {/* Day cells */}
      <Box style={{
        display: "grid",
        gridTemplateColumns: "repeat(7, 1fr)",
        gap: 3,
      }}>
        {cells.map((day, i) => {
          if (!day) return <Box key={`empty-${i}`} style={{ height: 36 }} />;

          const hasEvents = eventsByDay.has(day);
          const isToday =
            day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear();
          const isSelected = selected === day;

          return (
            <button
              key={day}
              onClick={() => setSelected(isSelected ? null : day)}
              style={{
                height: 36,
                borderRadius: 10,
                border: isSelected
                  ? `2px solid ${CORAL}`
                  : isToday
                  ? `1.5px solid ${CORAL}88`
                  : "1.5px solid transparent",
                background: isSelected
                  ? gradientBg
                  : hasEvents
                  ? PEACH
                  : "transparent",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
                transition: "all 0.15s",
                boxShadow: isSelected ? `0 3px 10px ${CORAL}44` : "none",
                position: "relative",
              }}
            >
              <Text
                fz={12}
                fw={isToday || isSelected ? 900 : 600}
                c={isSelected ? "#fff" : isToday ? CORAL : "#1a1a1a"}
              >
                {day}
              </Text>
              {hasEvents && !isSelected && (
                <Box style={{
                  width: 5, height: 5, borderRadius: "50%",
                  background: gradientBg,
                  position: "absolute",
                  bottom: 4,
                }} />
              )}
            </button>
          );
        })}
      </Box>

      {/* Selected day events */}
      {selected && (
        <Stack gap={6} mt={4}>
          <Text fz="xs" fw={700} c="dimmed" tt="uppercase">
            {MONTH_NAMES[month]} {selected}
          </Text>
          {selectedEvents.length === 0 ? (
            <Text fz="sm" c="dimmed" fw={600} ta="center" py="xs">
              No events this day
            </Text>
          ) : (
            selectedEvents.map((ev) => (
              <Box
                key={ev.label}
                style={{
                  background: PEACH,
                  border: "1.5px solid #FFE5E5",
                  borderRadius: 12,
                  padding: "10px 12px",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <Center style={{
                  width: 34, height: 34, borderRadius: "50%",
                  background: "#fff", border: "1.5px solid #FFCCCC",
                  flexShrink: 0,
                }}>
                  <IconCalendarEvent size={16} color={CORAL} stroke={1.8} />
                </Center>
                <Box style={{ flex: 1, minWidth: 0 }}>
                  <Text fz="sm" fw={800} c="#1a1a1a" truncate>{ev.label}</Text>
                  <Text fz="xs" c="dimmed" fw={600}>{ev.tag}</Text>
                </Box>
              </Box>
            ))
          )}
        </Stack>
      )}
    </Stack>
  );
}

// ── Main Component ───────────────────────────────────────────────────────────
export function UpcomingEvents({
  items,
  title = "Upcoming Events",
  // onSeeAll,
}: UpcomingEventsProps) {
  const [view, setView] = useState<"list" | "calendar">("list");

  return (
    <Card radius="xl" padding="lg" style={{ ...softCard, height: "100%" }}>
      {/* Header */}
      <Group justify="space-between" mb="lg" align="center">
        <Text fw={900} fz="md" c="#1a1a1a">{title}</Text>
        <Group gap="sm" align="center">
          <ViewToggle view={view} onChange={setView} />
          {/* {onSeeAll && (
            <Group gap={2} style={{ cursor: "pointer" }} onClick={onSeeAll}>
              <Text fz="sm" fw={700} c={CORAL}>See All</Text>
              <IconChevronRight size={15} color={CORAL} />
            </Group>
          )} */}
        </Group>
      </Group>

      {/* Views */}
      {view === "list"
        ? <ListView items={items} />
        : <CalendarView items={items} />}
    </Card>
  );
}