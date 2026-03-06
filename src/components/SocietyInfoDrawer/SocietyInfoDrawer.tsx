import {
  Avatar, Badge, Box, Drawer, Group, ScrollArea, SimpleGrid, Stack, Text, ThemeIcon,
} from "@mantine/core";
import {
  IconBuildingCommunity, IconCalendar, IconFileDescription,
  IconHash, IconMail, IconMapPin, IconPhone, IconShieldCheck,
  IconStack2, IconStar,
} from "@tabler/icons-react";
import { CORAL, CORAL_DARK, CORAL_LIGHT, PEACH, softCard } from "@/utils/constants";
import { SocietyBlock, SocietyInfoDrawerProps } from "./SocietyInfoDrawer.types";


// ─── Helpers ──────────────────────────────────────────────────────────────────

const LEVEL_COLOR: Record<string, string> = {
  HIGH: "red", MEDIUM: "yellow", LOW: "green",
};

const totalUnits = (blocks: SocietyBlock[]) =>
  blocks.reduce((sum, b) => sum + b.totalFlats, 0);

const totalParking = (blocks: SocietyBlock[]) =>
  blocks.reduce((sum, b) => sum + b.parkingSlots, 0);

// ─── Component ────────────────────────────────────────────────────────────────

export function SocietyInfoDrawer({ opened, onClose, data }: SocietyInfoDrawerProps) {
  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      position="right"
      size="md"
      padding="xl"
      title={
        <Group gap="sm">
          <ThemeIcon
            size={36} radius="md"
            style={{ background: `linear-gradient(135deg, ${CORAL} 0%, ${CORAL_LIGHT} 100%)` }}
          >
            <IconBuildingCommunity size={18} color="#fff" />
          </ThemeIcon>
          <Box>
            <Text fw={900} fz="sm" c="#1a1a1a">Society Details</Text>
            <Text fz="xs" c="dimmed">Read-only overview</Text>
          </Box>
        </Group>
      }
      styles={{
        header: { background: PEACH, borderBottom: "1.5px solid #FFE5E5" },
        body:   { background: PEACH, padding: 0 },
      }}
    >
      <ScrollArea h="calc(100vh - 80px)" px="xl" py="md">
        <Stack gap="md">

          {/* ── Identity ── */}
          <Box style={{ ...softCard, borderRadius: 16, padding: 20 }}>
            <Group gap="md" align="flex-start">
              <Avatar
                size={56} radius="xl"
                style={{
                  background: 'white',
                  fontWeight: 900, fontSize: 22, color: "#fff", flexShrink: 0,
                }}
              >
                {data.societyName.charAt(0)}
              </Avatar>
              <Box style={{ flex: 1, minWidth: 0 }}>
                <Text fw={900} fz="md" c="#1a1a1a" truncate>{data.societyName}</Text>
                <Text fz="xs" c="dimmed" fw={600} mb={8}>
                  {data.societyType} · Code: {data.societyCode}
                </Text>
                <Group gap="xs">
                  <Badge size="sm" variant="light" color={LEVEL_COLOR[data.societyLevel] ?? "gray"} fw={700}>
                    {data.societyLevel} Level
                  </Badge>
                  <Badge size="sm" variant="light" color={data.status === 1 ? "teal" : "red"} fw={700}>
                    <IconShieldCheck size={11} style={{ marginRight: 3 }} />
                    {data.status === 1 ? "Active" : "Inactive"}
                  </Badge>
                </Group>
              </Box>
            </Group>
          </Box>

          {/* ── Registration ── */}
          <Box style={{ ...softCard, borderRadius: 16, padding: 20 }}>
            <SectionLabel>Registration</SectionLabel>
            <Stack gap="sm">
              <InfoRow icon={IconFileDescription} label="Reg. Number"      value={data.registrationNumber}                                      />
              <InfoRow icon={IconHash}            label="Society Code"     value={data.societyCode}                                             />
              <InfoRow icon={IconCalendar}        label="Est. Year"        value={String(data.establishmentYear)}                               />
              <InfoRow icon={IconCalendar}        label="Onboarded"        value={new Date(data.onboardingDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })} />
              <InfoRow icon={IconStack2}          label="Total Area (sqft)"value={`${parseFloat(data.totalArea).toLocaleString("en-IN")} sq.ft`} />
            </Stack>
          </Box>

          {/* ── Location ── */}
          <Box style={{ ...softCard, borderRadius: 16, padding: 20 }}>
            <SectionLabel>Location</SectionLabel>
            <Stack gap="sm">
              <InfoRow icon={IconMapPin} label="Address"   value={data.addressLine1}                          />
              <InfoRow icon={IconMapPin} label="Locality"  value={data.areaLocality}                          />
              <InfoRow icon={IconMapPin} label="City"      value={`${data.city} — ${data.pincode}`}           />
              <InfoRow icon={IconMapPin} label="Landmark"  value={data.landmark}                              />
            </Stack>
          </Box>

          {/* ── Composition ── */}
          <Box style={{ ...softCard, borderRadius: 16, padding: 20 }}>
            <SectionLabel>Composition</SectionLabel>
            <SimpleGrid cols={3} mb="md">
              {[
                { label: "Total Units",   value: totalUnits(data.blocks)   },
                { label: "Blocks",        value: data.blocks.length        },
                { label: "Parking Slots", value: totalParking(data.blocks) },
              ].map((s) => (
                <Box key={s.label} ta="center" style={{ background: PEACH, borderRadius: 12, padding: "12px 8px" }}>
                  <Text fw={900} fz={22} style={{ color: CORAL_DARK }}>{s.value}</Text>
                  <Text fz="10px" fw={700} c="dimmed">{s.label}</Text>
                </Box>
              ))}
            </SimpleGrid>

            {/* Block list */}
            <Stack gap="xs">
              {data.blocks.map((block) => (
                <Group
                  key={block.blockCode}
                  justify="space-between"
                  p="xs"
                  style={{ background: PEACH, borderRadius: 10, border: "1.5px solid #FFE5E5" }}
                >
                  <Box>
                    <Text fz="sm" fw={800} c="#1a1a1a">{block.blockName}</Text>
                    <Text fz="xs" c="dimmed">{block.numberOfFloors} floors · {block.totalFlats} flats</Text>
                  </Box>
                  <Badge variant="light" color="orange" size="sm">{block.parkingSlots} parking</Badge>
                </Group>
              ))}
            </Stack>
          </Box>

          {/* ── Admin Contact ── */}
          <Box style={{ ...softCard, borderRadius: 16, padding: 20 }}>
            <SectionLabel>Admin Contact</SectionLabel>
            <Stack gap="sm">
              <InfoRow icon={IconStar}  label="Admin Name"  value={data.adminName}   />
              <InfoRow icon={IconMail}  label="Email"       value={data.adminEmail}  />
              <InfoRow icon={IconPhone} label="Mobile"      value={data.adminMobile} />
            </Stack>
          </Box>

        </Stack>
      </ScrollArea>
    </Drawer>
  );
}

// ─── Small helpers ────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <Text fz="xs" fw={800} tt="uppercase" c="dimmed" mb="sm" style={{ letterSpacing: "0.07em" }}>
      {children}
    </Text>
  );
}

function InfoRow({ icon: Icon, label, value }: { icon: typeof IconMail; label: string; value: string }) {
  return (
    <Group gap="sm" wrap="nowrap">
      <ThemeIcon size={30} radius="sm" variant="light" color="red" style={{ flexShrink: 0 }}>
        <Icon size={14} />
      </ThemeIcon>
      <Box style={{ minWidth: 0 }}>
        <Text fz="10px" fw={700} c="dimmed" tt="uppercase" style={{ letterSpacing: "0.06em" }}>{label}</Text>
        <Text fz="sm" fw={700} c="#1a1a1a" truncate>{value}</Text>
      </Box>
    </Group>
  );
}