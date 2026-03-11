"use client";

import { useEffect, useState } from "react";
import { useGreeting } from "@/hooks/useGreeting";
import { Box, Grid, Group, Stack, Text, UnstyledButton } from "@mantine/core";
import {IconBellRinging, IconBike, IconBookmarkPlus, IconBooks, IconBuildingCommunity, IconCalendarEvent, IconCash,
  IconClipboardList,IconCoffee,IconDeviceCctv,IconFileInvoice,IconGavel, IconGymnastics, IconHome, IconPackage, IconParking,IconPlayFootball,IconSchool,IconShieldCheck,IconSwimming,IconTool, IconTrees, IconTruckDelivery, IconUserCheck, IconUsers, IconWifi,
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
  { icon: IconHome,          label: "Visitor Management", section: "services" as const },
  { icon: IconUsers,         label: "Resident Management", isAccess: true, section: "services" as const },
  { icon: IconCash,          label: "Dues", isAccess: false, section: "services" as const },
  { icon: IconParking,       label: "Parking Slot Allocation", section: "services" as const },
  { icon: IconGavel,         label: "Complaint / Ticket Management", section: "services" as const },
  { icon: IconTool,          label: "Maintenance Bill Generation", section: "services" as const },
  { icon: IconBookmarkPlus,  label: "Guest Room Booking", section: "services" as const },
  { icon: IconPackage,       label: "Parcel / Delivery Management", section: "services" as const },
  { icon: IconShieldCheck,   label: "Security Management", section: "services" as const },
  { icon: IconTruckDelivery, label: "Vendor / Service Entry", section: "services" as const },
  { icon: IconUserCheck,     label: "Staff Management", section: "services" as const },
  { icon: IconFileInvoice,   label: "Invoice & Receipts", section: "services" as const },
  { icon: IconDeviceCctv,    label: "Security Logs", section: "services" as const },
  { icon: IconBellRinging,   label: "Emergency Alerts", section: "services" as const },

  // ── Amenities ─────────────────────────────────────────────────────────────
  { icon: IconCalendarEvent, label: "Events", section: "amenities" as const },
  { icon: IconClipboardList, label: "Notices", section: "amenities" as const },
  { icon: IconParking,       label: "Parking", section: "amenities" as const },
  { icon: IconWifi,          label: "Notice Board", section: "amenities" as const },
  { icon: IconDeviceCctv,    label: "CCTV Surveillance", section: "amenities" as const },
  { icon: IconBuildingCommunity, label: "Community Hall", isAccess: false, section: "amenities" as const },
  { icon: IconGymnastics,    label: "Gym / Fitness Center", section: "amenities" as const },
  { icon: IconSwimming,      label: "Swimming Pool", section: "amenities" as const },
  { icon: IconPlayFootball,  label: "Sports Ground", section: "amenities" as const },
  { icon: IconBike,          label: "Cycling Track", section: "amenities" as const },
  { icon: IconTrees,         label: "Garden / Park", section: "amenities" as const },
  { icon: IconCoffee,        label: "Cafeteria", section: "amenities" as const },
  { icon: IconSchool,        label: "Kids Play Area", section: "amenities" as const },
  { icon: IconBooks,         label: "Library", section: "amenities" as const },
];

const EVENTS = [
  { label: "Holi Celebration", date: "14 Mar 2026", tag: "Festival"   },
  { label: "AGM Meeting",      date: "15 Mar 2026", tag: "Governance"  },
  { label: "Maintenance Day",  date: "18 Mar 2026", tag: "Ops"         },
  { label: "Committee Review", date: "22 Mar 2026", tag: "Admin"       },
  { label: "Society Meeting", date: "24 Mar 2026", tag: "Admin"       },
];

const SOCIETY_ID = "727f429a-ce9b-47c0-bc07-3f43d9a5f8b9"; // TODO: replace with dynamic ID

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
          </UnstyledButton>
        </Box>

        <Box style={{ ...softCard, borderRadius: 999, padding: "6px 18px" }}>
          <Text fz="xs" c="dimmed" fw={500} mt={2}>Society Admin Dashboard</Text>
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
              previewLimit={7}
            />
          </Stack>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <UpcomingEvents
            items={EVENTS}
            title="Upcoming Events"
            // onSeeAll={() => console.log("See all events")}
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