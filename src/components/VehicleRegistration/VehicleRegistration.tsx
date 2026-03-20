"use client";

import { useState } from "react";
import {
  Avatar, Badge, Box, Button, Drawer, Group,
  Select, SimpleGrid, Stack, Text, TextInput, Tooltip,
} from "@mantine/core";
import {
  IconCar, IconDeviceFloppy, IconEdit, IconHome,
  IconMotorbike, IconPhone, IconPlus, IconUser, IconX,
} from "@tabler/icons-react";
import { CORAL, CORAL_LIGHT, PEACH, softCard } from "@/utils/constants";
import { SocietyAdminTable } from "@/components/SocietyAdminTable";
import { SocietyAdminTableColumn } from "../SocietyAdminTable/SocietyAdmin.types";
import {
  RegisteredVehicle, STATIC_VEHICLES,
  VehicleFormValues, VehicleStatus, VehicleType,
} from "./VehicleRegistration.types";

// ─── Design tokens ────────────────────────────────────────────────────────────

const gradientBg = `linear-gradient(135deg, ${CORAL} 0%, ${CORAL_LIGHT} 100%)`;

const BLOCKS   = ["All Blocks", "A-Block", "B-Block", "Q-Block", "X-Block", "Z-Block"];
const VEH_TYPES: { value: string; label: string }[] = [
  { value: "",           label: "All Types"   },
  { value: "4-wheeler",  label: "4-Wheeler"   },
  { value: "2-wheeler",  label: "2-Wheeler"   },
];
const STATUS_OPTIONS: { value: string; label: string }[] = [
  { value: "",         label: "All Status" },
  { value: "active",   label: "Active"     },
  { value: "inactive", label: "Inactive"   },
];

// ─── Props ────────────────────────────────────────────────────────────────────

interface VehicleRegistrationProps {
  vehicles?: RegisteredVehicle[];
  onAdd?:    (values: VehicleFormValues) => void;
  onEdit?:   (values: VehicleFormValues) => void;
  onToggle?: (vehicleId: string, status: VehicleStatus) => void;
}

// ─── Main component ───────────────────────────────────────────────────────────

export function VehicleRegistration({
  vehicles = STATIC_VEHICLES,
  onAdd,
  onEdit,
  onToggle,
}: VehicleRegistrationProps) {

  const [blockFilter,  setBlockFilter]  = useState("All Blocks");
  const [typeFilter,   setTypeFilter]   = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [drawerOpen,   setDrawerOpen]   = useState(false);
  const [editing,      setEditing]      = useState<RegisteredVehicle | null>(null);

  // Apply filters
  const filtered = vehicles.filter((v) => {
    if (blockFilter && blockFilter !== "All Blocks" && v.blockName !== blockFilter) return false;
    if (typeFilter   && v.vehicleType !== typeFilter)   return false;
    if (statusFilter && v.status      !== statusFilter) return false;
    return true;
  });

  const openAdd  = () => { setEditing(null); setDrawerOpen(true); };
  const openEdit = (v: RegisteredVehicle) => { setEditing(v); setDrawerOpen(true); };

  // ── Table columns ──────────────────────────────────────────────────────────
  const columns: SocietyAdminTableColumn<RegisteredVehicle>[] = [
    {
      key: "residentName", label: "Resident", searchable: true,
      render: (row) => (
        <Group gap="sm" wrap="nowrap">
          <Avatar size={32} radius="xl"
            style={{ background: 'lightgray', fontSize: 13, fontWeight: 900, color: "#fff", flexShrink: 0 }}>
            {row.residentName.charAt(0)}
          </Avatar>
          <Box style={{ minWidth: 0 }}>
            <Text fz="sm" fw={700} c="#1a1a1a" truncate>{row.residentName}</Text>
            <Text fz="xs" c="dimmed">{row.phone}</Text>
          </Box>
        </Group>
      ),
    },
    {
      key: "flatNumber", label: "Flat / Block", searchable: true,
      render: (row) => (
        <Box>
          <Text fz="sm" fw={700}>{row.flatNumber}</Text>
          <Text fz="xs" c="dimmed">{row.blockName}</Text>
        </Box>
      ),
    },
    {
      key: "vehicleNumber", label: "Vehicle No.", searchable: true,
      render: (row) => (
        <Text fz="sm" fw={800} style={{ color: CORAL, letterSpacing: "0.04em" }}>
          {row.vehicleNumber}
        </Text>
      ),
    },
    {
      key: "vehicleModel", label: "Model", searchable: true,
      render: (row) => (
        <Group gap={6} wrap="nowrap">
          {row.vehicleType === "4-wheeler"
            ? <IconCar size={14} color={CORAL} />
            : <IconMotorbike size={14} color={CORAL} />}
          <Text fz="sm" fw={600}>{row.vehicleModel}</Text>
        </Group>
      ),
    },
    {
      key: "vehicleType", label: "Type",
      render: (row) => (
        <Badge size="sm" variant="light" color={row.vehicleType === "4-wheeler" ? "blue" : "teal"} fw={700}>
          {row.vehicleType}
        </Badge>
      ),
    },
    {
      key: "status", label: "Status",
      render: (row) => (
        <Badge
          size="sm" variant="light"
          color={row.status === "active" ? "teal" : "gray"}
          fw={700} style={{ cursor: "pointer" }}
          onClick={() => onToggle?.(row.vehicleId, row.status === "active" ? "inactive" : "active")}
        >
          {row.status === "active" ? "Active" : "Inactive"}
        </Badge>
      ),
    },
    {
      key: "registeredDate", label: "Registered",
      render: (row) => <Text fz="xs" c="dimmed" fw={600}>{row.registeredDate}</Text>,
    },
    {
      key: "actions", label: "",
      render: (row) => (
        <Tooltip label="Edit">
          <Button size="xs" radius="xl" variant="subtle" color="gray"
            onClick={() => openEdit(row)}>
            <IconEdit size={14} />
          </Button>
        </Tooltip>
      ),
    },
  ];

  // ── Filter slot ────────────────────────────────────────────────────────────
  const filterSlot = (
    <>
      <Select
        data={BLOCKS.map((b) => ({ value: b, label: b }))}
        value={blockFilter}
        onChange={(v) => setBlockFilter(v ?? "All Blocks")}
        w={130}
        styles={{ input: { borderColor: "#FFE5E5", fontWeight: 600 } }}
      />
      <Select
        data={VEH_TYPES}
        value={typeFilter}
        onChange={(v) => setTypeFilter(v ?? "")}
        w={120}
        styles={{ input: { borderColor: "#FFE5E5", fontWeight: 600 } }}
      />
      <Select
        data={STATUS_OPTIONS}
        value={statusFilter}
        onChange={(v) => setStatusFilter(v ?? "")}
        w={120}
        styles={{ input: { borderColor: "#FFE5E5", fontWeight: 600 } }}
      />
    </>
  );

  return (
    <>
      {/* ── Stats row ──────────────────────────────────────────────────── */}
      <SimpleGrid cols={{ base: 2, sm: 4 }} mb="lg" spacing="sm">
        {[
          { label: "Total Vehicles",  value: vehicles.length,                                    gradient: false },
          { label: "4-Wheelers",      value: vehicles.filter((v) => v.vehicleType === "4-wheeler").length, gradient: true  },
          { label: "2-Wheelers",      value: vehicles.filter((v) => v.vehicleType === "2-wheeler").length, gradient: false },
          { label: "Inactive",        value: vehicles.filter((v) => v.status === "inactive").length,       gradient: false },
        ].map((s) => (
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
              style={{ color: s.gradient ? "#fff" : CORAL }}>
              {s.value}
            </Text>
          </Box>
        ))}
      </SimpleGrid>

      {/* ── Add button + table ──────────────────────────────────────────── */}
      <Group justify="flex-end" mb="md">
        <Button
          onClick={openAdd} radius="xl"
          leftSection={<IconPlus size={15} stroke={2.5} />}
          style={{ background: gradientBg, border: "none", fontWeight: 800, boxShadow: `0 4px 14px ${CORAL}55` }}
        >
          Register Vehicle
        </Button>
      </Group>

      <SocietyAdminTable
        data={filtered as any}
        columns={columns as any}
        rowKey="vehicleId"
        searchPlaceholder="Search by name, vehicle no, model…"
        filterSlot={filterSlot}
        emptyMessage="No vehicles match the selected filters."
      />

      {/* ── Add / Edit drawer ───────────────────────────────────────────── */}
      <Drawer
        opened={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        position="right"
        size="md"
        padding="xl"
        title={
          <Group gap="sm">
            <Box style={{
              width: 32, height: 32, borderRadius: 8,
              background: gradientBg,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <IconCar size={16} color="#fff" />
            </Box>
            <Box>
              <Text fw={900} fz="sm" c="#1a1a1a">{editing ? "Edit Vehicle" : "Register Vehicle"}</Text>
              <Text fz="xs" c="dimmed">{editing ? `Editing ${editing.vehicleNumber}` : "Add a new vehicle"}</Text>
            </Box>
          </Group>
        }
        styles={{
          header: { background: PEACH, borderBottom: "1.5px solid #FFE5E5" },
          body:   { background: PEACH },
        }}
      >
        <VehicleForm
          initial={editing ?? undefined}
          onSubmit={(vals) => {
            editing ? onEdit?.(vals) : onAdd?.(vals);
            setDrawerOpen(false);
          }}
          onCancel={() => setDrawerOpen(false)}
        />
      </Drawer>
    </>
  );
}

// ─── Vehicle form ─────────────────────────────────────────────────────────────

function VehicleForm({
  initial,
  onSubmit,
  onCancel,
}: {
  initial?: RegisteredVehicle;
  onSubmit: (v: VehicleFormValues) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<VehicleFormValues>({
    vehicleId:     initial?.vehicleId,
    residentName:  initial?.residentName  ?? "",
    flatNumber:    initial?.flatNumber    ?? "",
    blockName:     initial?.blockName     ?? "",
    phone:         initial?.phone         ?? "",
    vehicleNumber: initial?.vehicleNumber ?? "",
    vehicleType:   initial?.vehicleType   ?? "",
    vehicleModel:  initial?.vehicleModel  ?? "",
    status:        initial?.status        ?? "active",
  });

  const set = (k: keyof VehicleFormValues, v: string) =>
    setForm((p) => ({ ...p, [k]: v }));

  const inputStyle = {
    input: { borderColor: "#FFE5E5", borderRadius: 12, fontWeight: 600 },
    label: { fontWeight: 700, fontSize: 11, color: "#888", textTransform: "uppercase" as const, letterSpacing: "0.05em" },
  };

  return (
    <Stack gap="md" mt="xs">
      <TextInput label="Resident Name" placeholder="Rohan Mehta"
        leftSection={<IconUser size={14} color={CORAL} />}
        value={form.residentName} onChange={(e) => set("residentName", e.target.value)}
        styles={inputStyle} radius="md" />

      <SimpleGrid cols={2} spacing="md">
        <TextInput label="Flat Number" placeholder="A-101"
          leftSection={<IconHome size={14} color={CORAL} />}
          value={form.flatNumber} onChange={(e) => set("flatNumber", e.target.value)}
          styles={inputStyle} radius="md" />

        <Select label="Block" placeholder="Select block"
          data={["A-Block","B-Block","Q-Block","X-Block","Z-Block"]}
          value={form.blockName} onChange={(v) => set("blockName", v ?? "")}
          styles={inputStyle} radius="md" />
      </SimpleGrid>

      <TextInput label="Phone" placeholder="98765 43210"
        leftSection={<IconPhone size={14} color={CORAL} />}
        value={form.phone} onChange={(e) => set("phone", e.target.value)}
        styles={inputStyle} radius="md" />

      <TextInput label="Vehicle Number" placeholder="OD05AB1234"
        leftSection={<IconCar size={14} color={CORAL} />}
        value={form.vehicleNumber} onChange={(e) => set("vehicleNumber", e.target.value)}
        styles={inputStyle} radius="md" />

      <TextInput label="Vehicle Model" placeholder="Maruti Swift"
        leftSection={<IconCar size={14} color={CORAL} />}
        value={form.vehicleModel} onChange={(e) => set("vehicleModel", e.target.value)}
        styles={inputStyle} radius="md" />

      <SimpleGrid cols={2} spacing="md">
        <Select label="Vehicle Type" placeholder="Select type"
          data={[{ value: "4-wheeler", label: "4-Wheeler" }, { value: "2-wheeler", label: "2-Wheeler" }]}
          value={form.vehicleType} onChange={(v) => set("vehicleType", v ?? "")}
          styles={inputStyle} radius="md" />

        <Select label="Status" placeholder="Status"
          data={[{ value: "active", label: "Active" }, { value: "inactive", label: "Inactive" }]}
          value={form.status} onChange={(v) => set("status", v ?? "active")}
          styles={inputStyle} radius="md" />
      </SimpleGrid>

      <Group justify="flex-end" gap="sm" mt="xs">
        <Button variant="subtle" color="gray" radius="xl" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          radius="xl"
          leftSection={<IconDeviceFloppy size={15} />}
          style={{ background: gradientBg, border: "none", fontWeight: 800, boxShadow: `0 4px 14px ${CORAL}55` }}
          onClick={() => onSubmit(form)}
        >
          {initial ? "Save Changes" : "Register Vehicle"}
        </Button>
      </Group>
    </Stack>
  );
}