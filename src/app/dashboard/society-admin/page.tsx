"use client";

import { useEffect, useState } from "react";
import { useGreeting } from "@/hooks/useGreeting";
import { Box, Grid, Group, Stack, Text, UnstyledButton } from "@mantine/core";
import {
  IconAffiliate, IconCalendarEvent, IconCash, IconChartBar,
  IconClipboardList, IconFileInvoice, IconGavel, IconHome,
  IconMessage, IconParking, IconShield, IconTool, IconUsers, IconWifi,
} from "@tabler/icons-react";
import { StatCards, MenuSection, UpcomingEvents, SocietyInfoDrawer } from "@/components";
import { COMMON_MESSAGE, CORAL, CORAL_DARK, PEACH, softCard } from "@/utils/constants";
import { getRequest } from "@/service";
import { API_PATH } from "@/utils/apiPath";
import { SocietyItem } from "@/types/admin/societyManagement/newSociety/newSociety";
import { notifications } from "@mantine/notifications";

// ─── Static data ──────────────────────────────────────────────────────────────

const STATS = [
  { label: "Total Units",     value: "90",    sub: "across 3 blocks",  gradient: false },
  { label: "Total Residents", value: "612",   sub: "+4 this month",    gradient: true  },
  { label: "Dues Collected",  value: "₹4.2L", sub: "of ₹5.4L target",  gradient: false },
  { label: "Open Complaints", value: "23",    sub: "7 critical",       gradient: true  },
];

const MENUS = [
  // ── Services ──────────────────────────────────────────────────────────────
  { icon: IconHome,          label: "Units",        isAccess: false,                  section: "services" as const },
  { icon: IconUsers,         label: "Residents",    isAccess: true,                   section: "services" as const },
  { icon: IconCash,          label: "Dues",         badge: "3",                       section: "services" as const },
  { icon: IconFileInvoice,   label: "Invoices",     isAccess: true,                   section: "services" as const },
  { icon: IconChartBar,      label: "Reports",      isAccess: true,                   section: "services" as const },
  { icon: IconTool,          label: "Maintenance",  badge: "7",                       section: "services" as const },
  { icon: IconGavel,         label: "Meetings",                                       section: "services" as const },
  { icon: IconAffiliate,     label: "Committees",                                     section: "services" as const },
  { icon: IconShield,        label: "By-laws",                                        section: "services" as const },
  { icon: IconMessage,       label: "Messages",     badge: "12",                      section: "services" as const },

  // ── Amenities ─────────────────────────────────────────────────────────────
  { icon: IconCalendarEvent, label: "Events",                                         section: "amenities" as const },
  { icon: IconClipboardList, label: "Notices",                                        section: "amenities" as const },
  { icon: IconParking,       label: "Parking",                                        section: "amenities" as const },
  { icon: IconWifi,          label: "Notice Board",                                   section: "amenities" as const },
];

const EVENTS = [
  { label: "Holi Celebration", date: "14 Mar", tag: "Festival"   },
  { label: "AGM Meeting",      date: "15 Mar", tag: "Governance"  },
  { label: "Maintenance Day",  date: "18 Mar", tag: "Ops"         },
  { label: "Committee Review", date: "22 Mar", tag: "Admin"       },
];

const SOCIETY_ID = "d8158b52-2ba0-4f5f-a413-1e1d23b3f044"; // TODO: replace with dynamic ID

// ─── Dashboard ────────────────────────────────────────────────────────────────

const SocietyAdminDashboard = () => {
  const greeting = useGreeting();
  const [drawerOpen, setDrawerOpen]     = useState(false);
  const [societyData, setSocietyData]   = useState<SocietyItem | null>(null);
  const [loadingSociety, setLoadingSociety] = useState(false);

  const notifyError = (message: string) =>
    notifications.show({ title: "Error", message, color: "red" });

  useEffect(() => {
    fetchSocietyDetails();
  }, []);

  const fetchSocietyDetails = async () => {
    setLoadingSociety(true);
    try {
      const response = await getRequest<{ data: SocietyItem }>(
        `${API_PATH.GET_SOCITIES}/${SOCIETY_ID}`
      );
      setSocietyData(response?.data);
    } catch (error) {
      notifyError(COMMON_MESSAGE.SOCIETY_FETCH_FAIL);
    } finally {
      setLoadingSociety(false);
    }
  };

  return (
    <Box style={{ background: PEACH }} p="lg">

      {/* ── Greeting Header ───────────────────────────────────────────────── */}
      <Group justify="space-between" align="center" mb="lg">
        <Box>
          <Text fz="xs" fw={700} tt="uppercase" style={{ color: CORAL, letterSpacing: "0.08em" }}>
            {greeting} 👋
          </Text>
          <UnstyledButton
            onClick={() => setDrawerOpen(true)}
            disabled={loadingSociety || !societyData}
          >
            <Group gap={6} align="center">
              <Text
                fz={{ base: 16, sm: 20 }}
                fw={900}
                c="#1a1a1a"
                lh={1.2}
                style={{
                  borderBottom: `2px dashed ${CORAL}`,
                  transition: "color 0.15s ease",
                  opacity: loadingSociety ? 0.5 : 1,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = CORAL)}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#1a1a1a")}
              >
                {/* Show name from API once loaded, fallback while loading */}
                {societyData?.societyName ?? "Loading…"}
              </Text>
              {!loadingSociety && societyData && (
                <Text fz="xs" fw={700} style={{ color: CORAL }} mt={2}>↗</Text>
              )}
            </Group>
            <Text fz="xs" c="dimmed" fw={500} mt={2}>Society Admin Dashboard</Text>
          </UnstyledButton>
        </Box>

        <Box style={{ ...softCard, borderRadius: 999, padding: "6px 18px" }}>
          <Text fz="xs" fw={800} style={{ color: CORAL_DARK }}>
            📅 {new Date().toLocaleDateString("en-IN", {
              day: "numeric", month: "short", year: "numeric",
            })}
          </Text>
        </Box>
      </Group>

      {/* ── Main Grid ─────────────────────────────────────────────────────── */}
      <Grid gutter={{ base: "sm", sm: "md" }}>

        <Grid.Col span={{ base: 12, md: 8 }}>
          <Stack gap="md">
            <StatCards items={STATS} />
            <MenuSection
              items={MENUS}
              title="Quick Actions"
              previewLimit={5}
            />
          </Stack>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <UpcomingEvents
            items={EVENTS}
            title="Upcoming Events"
            onSeeAll={() => console.log("See all events")}
          />
        </Grid.Col>

      </Grid>

      {/* ── Society Info Drawer ───────────── */}
      {societyData && (
        <SocietyInfoDrawer
          opened={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          data={societyData as any}
        />
      )}

    </Box>
  );
};

export default SocietyAdminDashboard;