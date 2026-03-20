"use client";

import { useMemo, useState } from "react";
import {
  Avatar, Badge, Box, Button, Drawer, Group,
  Modal, Select, SimpleGrid, Stack, Text,
  TextInput, Tooltip,
} from "@mantine/core";
import {
  IconCar, IconDeviceFloppy, IconHome, IconMotorbike,
  IconParking, IconPhone, IconUser, IconX,
} from "@tabler/icons-react";
import { CORAL, CORAL_DARK, CORAL_LIGHT, PEACH, softCard } from "@/utils/constants";
import { AllotFormValues, ParkingBlock, ParkingSlot, SlotStatus } from "./ParkingSlotAllotment.types";
import { STATIC_PARKING_BLOCKS } from "@/mock/ParkingSlotAllotment.data";

// ─── Design tokens ────────────────────────────────────────────────────────────

const gradientBg = `linear-gradient(135deg, ${CORAL} 0%, ${CORAL_LIGHT} 100%)`;

const SLOT_CONFIG: Record<SlotStatus, {
  bg: string; border: string; color: string; label: string;
}> = {
  available: { bg: "#fff",     border: `2px dashed #FFCCCC`,    color: "#bbb", label: "Available" },
  occupied:  { bg: gradientBg, border: "2px solid transparent", color: "#fff", label: "Occupied"  },
  blocked:   { bg: "#f0f0f0",  border: "2px solid #ddd",        color: "#aaa", label: "Blocked"   },
};

// ─── Props ────────────────────────────────────────────────────────────────────

interface ParkingSlotAllotmentProps {
  blocks?: ParkingBlock[];
  onAllot?: (slotId: string, values: AllotFormValues) => void;
  onRelease?: (slotId: string) => void;
  hideHeader?: boolean;
}

// ─── Main component ───────────────────────────────────────────────────────────

export function ParkingSlotAllotment({
  blocks = STATIC_PARKING_BLOCKS,
  onAllot,
  onRelease,
  hideHeader = false,
}: ParkingSlotAllotmentProps) {

  const [selectedBlockId, setSelectedBlockId] = useState<string>(blocks[0]?.blockId ?? "");
  const [selectedSlot,    setSelectedSlot]    = useState<ParkingSlot | null>(null);
  const [allotOpen,       setAllotOpen]       = useState(false);

  const block = useMemo(
    () => blocks.find((b) => b.blockId === selectedBlockId) ?? blocks[0],
    [blocks, selectedBlockId]
  );

  // Group slots by row
  const rowMap = useMemo(() => {
    const map = new Map<string, ParkingSlot[]>();
    block.slots.forEach((s) => {
      if (!map.has(s.row)) map.set(s.row, []);
      map.get(s.row)!.push(s);
    });
    return map;
  }, [block]);

  const stats = useMemo(() => ({
    total:     block.slots.length,
    available: block.slots.filter((s) => s.status === "available").length,
    occupied:  block.slots.filter((s) => s.status === "occupied").length,
    blocked:   block.slots.filter((s) => s.status === "blocked").length,
  }), [block]);

  const handleSlotClick = (slot: ParkingSlot) => {
    if (slot.status === "blocked") return;
    setSelectedSlot(slot);
    if (slot.status === "available") setAllotOpen(true);
  };

  return (
    <Box style={{ background: PEACH, minHeight: "100vh" }} p="lg">

      {/* ── Header ──────────────────────────────────────────────────────── */}
      <Group justify="space-between" align="center" mb="xl">
        {!hideHeader && (
          <Group gap="sm">
            <Box style={{
              width: 40, height: 40, borderRadius: 12, flexShrink: 0,
              background: gradientBg,
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: `0 4px 12px ${CORAL}44`,
          }}>
            <IconParking size={22} color="#fff" stroke={1.8} />
          </Box>
          <Box>
            <Text fz="xs" fw={700} tt="uppercase" style={{ color: CORAL, letterSpacing: "0.08em" }}>
              Management
            </Text>
            <Text fz={{ base: 16, sm: 20 }} fw={900} c="#1a1a1a" lh={1.2}>
              Parking Slot Allotment
            </Text>
          </Box>
        </Group>)}

        {/* Block selector */}
        <Select
          placeholder="Select Block"
          data={blocks.map((b) => ({ value: b.blockId, label: b.blockName }))}
          value={selectedBlockId}
          onChange={(v) => { if (v) { setSelectedBlockId(v); setSelectedSlot(null); } }}
          w={180}
          styles={{
            input: { border: "1.5px solid #FFE5E5", background: "#fff", fontWeight: 700, fontSize: 13 },
          }}
        />
      </Group>

      {/* ── Stat row ────────────────────────────────────────────────────── */}
      <SimpleGrid cols={{ base: 2, sm: 5 }} mb="xl" spacing="sm">
        {([
          { label: "Total",     value: stats.total,     gradient: false },
          { label: "Available", value: stats.available, gradient: false },
          { label: "Occupied",  value: stats.occupied,  gradient: true  },
          { label: "Blocked",   value: stats.blocked,   gradient: false },
        ] as const).map((s) => (
          <Box key={s.label} style={{
            ...softCard,
            borderRadius: 16, padding: "14px 16px",
            background: s.gradient ? gradientBg : "#fff",
            border: s.gradient ? "none" : "1.5px solid #FFE5E5",
            boxShadow: s.gradient ? `0 4px 14px ${CORAL}44` : undefined,
          }}>
            <Text fz="xs" fw={700} tt="uppercase"
              style={{ color: s.gradient ? "rgba(255,255,255,0.8)" : "#999", letterSpacing: "0.06em" }}>
              {s.label}
            </Text>
            <Text fz={26} fw={900} lh={1}
              style={{ color: s.gradient ? "#fff" : CORAL_DARK }}>
              {s.value}
            </Text>
          </Box>
        ))}
      </SimpleGrid>

      {/* ── Main content: grid + sidebar ────────────────────────────────── */}
      <Group align="flex-start" gap="md" wrap="nowrap">

        {/* ── Slot grid ─────────────────────────────────────────────────── */}
        <Box style={{ flex: 1, minWidth: 0 }}>
          <Box style={{ ...softCard, borderRadius: 20, padding: 24 }}>

            {/* Entrance indicator */}
            <Group justify="center" mb="lg">
              <Box style={{
                background: "#f5f5f5", border: "1.5px solid #e0e0e0",
                borderRadius: 10, padding: "6px 32px",
              }}>
                <Text fz="xs" fw={800} c="dimmed" tt="uppercase" style={{ letterSpacing: "0.12em" }}>
                  ← Entrance / Exit →
                </Text>
              </Box>
            </Group>

            {/* Rows */}
            <Stack gap="md">
              {Array.from(rowMap.entries()).map(([rowLabel, slots]) => (
                <Box key={rowLabel}>
                  <Group gap="xs" mb={8} align="center">
                    <Text fz="10px" fw={800} c="dimmed" tt="uppercase"
                      style={{ letterSpacing: "0.1em", minWidth: 44 }}>
                      {rowLabel}
                    </Text>
                    <Box style={{ flex: 1, height: 1, background: "#FFE5E5" }} />
                  </Group>
                  <Group gap={8} wrap="wrap">
                    {slots.map((slot) => (
                      <SlotBox
                        key={slot.slotId}
                        slot={slot}
                        isSelected={selectedSlot?.slotId === slot.slotId}
                        onClick={() => handleSlotClick(slot)}
                      />
                    ))}
                  </Group>
                </Box>
              ))}
            </Stack>

            {/* Legend */}
            <Group gap="md" mt="xl" justify="center" wrap="wrap">
              {(Object.entries(SLOT_CONFIG) as [SlotStatus, typeof SLOT_CONFIG[SlotStatus]][]).map(([status, cfg]) => (
                <Group key={status} gap={6}>
                  <Box style={{
                    width: 16, height: 16, borderRadius: 4,
                    background: cfg.bg === gradientBg ? gradientBg : cfg.bg,
                    border: cfg.border,
                  }} />
                  <Text fz="xs" fw={700} c="dimmed">{cfg.label}</Text>
                </Group>
              ))}
            </Group>
          </Box>
        </Box>

        {/* ── Info sidebar ──────────────────────────────────────────────── */}
        {selectedSlot && selectedSlot.status === "occupied" && (
          <Box style={{ width: 280, flexShrink: 0 }}>
            <SlotInfoPanel
              slot={selectedSlot}
              onClose={() => setSelectedSlot(null)}
              onRelease={() => { onRelease?.(selectedSlot.slotId); setSelectedSlot(null); }}
            />
          </Box>
        )}

      </Group>

      {/* ── Allot modal ───────────────────────────────────────────────────── */}
      {selectedSlot && (
        <AllotModal
          slot={selectedSlot}
          opened={allotOpen}
          onClose={() => { setAllotOpen(false); setSelectedSlot(null); }}
          onSubmit={(vals) => { onAllot?.(selectedSlot.slotId, vals); setAllotOpen(false); setSelectedSlot(null); }}
        />
      )}

    </Box>
  );
}

// ─── Slot box ─────────────────────────────────────────────────────────────────

function SlotBox({
  slot, isSelected, onClick,
}: {
  slot: ParkingSlot;
  isSelected: boolean;
  onClick: () => void;
}) {
  const cfg = SLOT_CONFIG[slot.status];
  const blocked = slot.status === "blocked";

  return (
    <Tooltip
      label={
        slot.status === "occupied"
          ? `${slot.resident?.name} · ${slot.resident?.vehicleNumber}`
          : slot.status === "blocked" ? "Blocked" : "Available"
      }
      withArrow position="top" fz="xs" fw={700}
      styles={{ tooltip: { background: "#1a1a1a", color: "#fff", borderRadius: 8 }, arrow: { background: "#1a1a1a" } }}
    >
      <Box
        onClick={!blocked ? onClick : undefined}
        style={{
          width: 56, height: 56, borderRadius: 10,
          background: isSelected ? `linear-gradient(135deg, ${CORAL_DARK} 0%, ${CORAL} 100%)` : cfg.bg,
          border: isSelected ? `2px solid ${CORAL_DARK}` : cfg.border,
          cursor: blocked ? "not-allowed" : "pointer",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          gap: 2, opacity: blocked ? 0.45 : 1,
          boxShadow: isSelected ? `0 4px 14px ${CORAL}66` : slot.status === "occupied" ? `0 3px 10px ${CORAL}33` : "none",
          transform: isSelected ? "scale(1.1)" : "scale(1)",
          transition: "all 0.15s ease",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Vehicle type icon for occupied */}
        {slot.status === "occupied" && slot.resident && (
          slot.resident.vehicleType === "4-wheeler"
            ? <IconCar size={18} color="#fff" stroke={1.8} />
            : <IconMotorbike size={18} color="#fff" stroke={1.8} />
        )}
        <Text
          fz="9px" fw={800} lh={1} ta="center"
          style={{ color: isSelected ? "#fff" : cfg.color, letterSpacing: "0.02em" }}
        >
          {slot.slotLabel}
        </Text>
        {/* Resident initial for occupied */}
        {slot.status === "occupied" && slot.resident && (
          <Text fz="8px" fw={700} style={{ color: "rgba(255,255,255,0.75)" }}>
            {slot.resident.name.charAt(0)}
          </Text>
        )}
      </Box>
    </Tooltip>
  );
}

// ─── Slot info panel (sidebar) ────────────────────────────────────────────────

function SlotInfoPanel({
  slot, onClose, onRelease,
}: {
  slot: ParkingSlot;
  onClose: () => void;
  onRelease: () => void;
}) {
  const r = slot.resident;
  const cfg = SLOT_CONFIG[slot.status];

  return (
    <Box style={{ ...softCard, borderRadius: 20, padding: 20 }}>
      <Group justify="space-between" mb="md">
        <Text fw={900} fz="sm" c="#1a1a1a">Slot Details</Text>
        <Box
          onClick={onClose}
          style={{ cursor: "pointer", color: "#aaa", display: "flex", alignItems: "center" }}
        >
          <IconX size={16} />
        </Box>
      </Group>

      {/* Slot badge */}
      <Group justify="center" mb="md">
        <Box style={{
          width: 72, height: 72, borderRadius: 16,
          background: cfg.bg === gradientBg ? gradientBg : cfg.bg,
          border: cfg.border,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", gap: 4,
          boxShadow: slot.status === "occupied" ? `0 4px 16px ${CORAL}44` : undefined,
        }}>
          <IconCar size={24} color="#fff" stroke={1.6} />
          <Text fz="10px" fw={900} style={{ color: "#fff" }}>
            {slot.slotLabel}
          </Text>
        </Box>
      </Group>

      <Badge
        fullWidth mb="md" size="sm" variant="light"
        color="red"
        fw={700}
      >
        {cfg.label} · {slot.row}
      </Badge>

      {r && (
        <Stack gap="sm">
          <InfoItem icon={IconUser}      label="Resident"  value={r.name}          />
          <InfoItem icon={IconHome}      label="Flat"      value={r.flatNumber}    />
          <InfoItem icon={IconPhone}     label="Phone"     value={r.phone}         />
          <InfoItem icon={IconCar}       label="Vehicle"   value={r.vehicleNumber} />
          <InfoItem icon={IconCar}       label="Type"      value={r.vehicleType}   />
          <InfoItem icon={IconParking}   label="Since"     value={r.allottedDate}  />

          <Button
            mt="xs" radius="xl" color="red" variant="light" size="sm" fullWidth
            leftSection={<IconX size={14} />}
            onClick={onRelease}
            style={{ fontWeight: 800 }}
          >
            Release Slot
          </Button>
        </Stack>
      )}
    </Box>
  );
}

// ─── Allot modal ──────────────────────────────────────────────────────────────

function AllotModal({
  slot, opened, onClose, onSubmit,
}: {
  slot: ParkingSlot;
  opened: boolean;
  onClose: () => void;
  onSubmit: (vals: AllotFormValues) => void;
}) {
  const [form, setForm] = useState<AllotFormValues>({
    slotId: slot.slotId,
    residentName: "", flatNumber: "", phone: "",
    vehicleNumber: "", vehicleType: "",
  });

  const set = (k: keyof AllotFormValues, v: string) =>
    setForm((p) => ({ ...p, [k]: v }));

  const inputStyle = {
    input: { borderColor: "#FFE5E5", borderRadius: 12, fontWeight: 600 },
    label: { fontWeight: 700, fontSize: 11, color: "#888", textTransform: "uppercase" as const, letterSpacing: "0.05em" },
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <Group gap="sm">
          <Box style={{
            width: 30, height: 30,
            background: gradientBg,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <IconParking size={16} color="#fff" />
          </Box>
          <Box>
            <Text fw={900} fz="sm" c="#1a1a1a">Allot Slot — {slot.slotLabel}</Text>
            <Text fz="xs" c="dimmed">{slot.row}</Text>
          </Box>
        </Group>
      }
      centered size="md" padding="xl"
      styles={{
        header:  { background: PEACH, borderBottom: "1.5px solid #FFE5E5" },
        body:    { background: PEACH },
        content: { borderRadius: 20, overflow: "hidden" },
      }}
    >
      <Stack gap="md" mt="xs">
        <TextInput label="Resident Name" placeholder="Rohan Mehta"
          leftSection={<IconUser size={14} color={CORAL} />}
          value={form.residentName} onChange={(e) => set("residentName", e.target.value)}
          styles={inputStyle} radius="md" />

        <TextInput label="Flat Number" placeholder="A-101"
          leftSection={<IconHome size={14} color={CORAL} />}
          value={form.flatNumber} onChange={(e) => set("flatNumber", e.target.value)}
          styles={inputStyle} radius="md" />

        <TextInput label="Phone" placeholder="98765 43210"
          leftSection={<IconPhone size={14} color={CORAL} />}
          value={form.phone} onChange={(e) => set("phone", e.target.value)}
          styles={inputStyle} radius="md" />

        <TextInput label="Vehicle Number" placeholder="OD05AB1234"
          leftSection={<IconCar size={14} color={CORAL} />}
          value={form.vehicleNumber} onChange={(e) => set("vehicleNumber", e.target.value)}
          styles={inputStyle} radius="md" />

        <Select
          label="Vehicle Type"
          placeholder="Select type"
          leftSection={<IconCar size={14} color={CORAL} />}
          data={[{ value: "4-wheeler", label: "4-Wheeler (Car/SUV)" }, { value: "2-wheeler", label: "2-Wheeler (Bike/Scooter)" }]}
          value={form.vehicleType} onChange={(v) => set("vehicleType", v ?? "")}
          styles={inputStyle} radius="md" />

        <Group justify="flex-end" gap="sm" mt="xs">
          <Button variant="subtle" color="gray" radius="xl" onClick={onClose}>Cancel</Button>
          <Button
            radius="xl"
            leftSection={<IconDeviceFloppy size={15} />}
            style={{ background: gradientBg, border: "none", fontWeight: 800, boxShadow: `0 4px 14px ${CORAL}55` }}
            onClick={() => onSubmit(form)}
          >
            Allot Slot
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}

// ─── Small helpers ────────────────────────────────────────────────────────────

function InfoItem({ icon: Icon, label, value }: { icon: typeof IconUser; label: string; value: string }) {
  return (
    <Group gap="sm" wrap="nowrap">
      <Box style={{
        width: 26, height: 26, borderRadius: 8, flexShrink: 0,
        background: PEACH, border: "1.5px solid #FFCCCC",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <Icon size={12} color={CORAL} />
      </Box>
      <Box style={{ minWidth: 0 }}>
        <Text fz="9px" fw={700} c="dimmed" tt="uppercase" style={{ letterSpacing: "0.05em" }}>{label}</Text>
        <Text fz="xs" fw={700} c="#1a1a1a" truncate>{value}</Text>
      </Box>
    </Group>
  );
}