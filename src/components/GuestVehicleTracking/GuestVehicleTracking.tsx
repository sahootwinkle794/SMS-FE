"use client";

import { useState } from "react";
import {
  Badge, Box, Group, Select, SimpleGrid, Text,
} from "@mantine/core";
import {
  IconCar, IconClock, IconLogin, IconLogout, IconMotorbike, IconTruck,
} from "@tabler/icons-react";
import { CORAL, CORAL_DARK, CORAL_LIGHT, PEACH, softCard } from "@/utils/constants";
import { SocietyAdminTable } from "@/components/SocietyAdminTable";
import { SocietyAdminTableColumn } from "../SocietyAdminTable/SocietyAdmin.types";
import { GuestVehicleLog, GuestEntryStatus, STATIC_GUEST_LOGS } from "./GuestVehicleTracking.types";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const gradientBg = `linear-gradient(135deg, ${CORAL} 0%, ${CORAL_LIGHT} 100%)`;

const fmt = (iso?: string) => {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleString("en-IN", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit", hour12: true });
};

const duration = (entry: string, exit?: string) => {
  if (!exit) return <Badge size="xs" color="teal" variant="light" fw={700}>Still Inside</Badge>;
  const mins = Math.round((new Date(exit).getTime() - new Date(entry).getTime()) / 60000);
  if (mins < 60) return <Text fz="xs" fw={700} c="dimmed">{mins}m</Text>;
  return <Text fz="xs" fw={700} c="dimmed">{Math.floor(mins / 60)}h {mins % 60}m</Text>;
};

const vehicleIcon = (type: GuestVehicleLog["vehicleType"]) => {
  if (type === "4-wheeler") return <IconCar size={14} color={CORAL} />;
  if (type === "2-wheeler") return <IconMotorbike size={14} color={CORAL} />;
  return <IconTruck size={14} color={CORAL} />;
};

// ─── Props ────────────────────────────────────────────────────────────────────

interface GuestVehicleTrackingProps {
  logs?: GuestVehicleLog[];
}

// ─── Main component ───────────────────────────────────────────────────────────

export function GuestVehicleTracking({
  logs = STATIC_GUEST_LOGS,
}: GuestVehicleTrackingProps) {

  const [statusFilter, setStatusFilter] = useState<GuestEntryStatus | "all">("all");
  const [blockFilter,  setBlockFilter]  = useState("all");
  const [gateFilter,   setGateFilter]   = useState("all");

  const blocks = ["all", ...Array.from(new Set(logs.map((l) => l.hostBlock).filter((b) => b !== "—")))];
  const gates  = ["all", ...Array.from(new Set(logs.map((l) => l.gateNumber)))];

  const filtered = logs.filter((l) => {
    if (statusFilter !== "all" && l.status !== statusFilter) return false;
    if (blockFilter  !== "all" && l.hostBlock    !== blockFilter)  return false;
    if (gateFilter   !== "all" && l.gateNumber   !== gateFilter)   return false;
    return true;
  });

  // ── Table columns ──────────────────────────────────────────────────────────
  const columns: SocietyAdminTableColumn<GuestVehicleLog>[] = [
    {
      key: "vehicleNumber", label: "Vehicle No.", searchable: true,
      render: (row) => (
        <Group gap={6} wrap="nowrap">
          {vehicleIcon(row.vehicleType)}
          <Text fz="sm" fw={800} style={{ color: CORAL }}>{row.vehicleNumber}</Text>
        </Group>
      ),
    },
    {
      key: "driverName", label: "Driver / Visitor", searchable: true,
      render: (row) => <Text fz="sm" fw={600} c="#333">{row.driverName}</Text>,
    },
    {
      key: "hostResidentName", label: "Host Resident", searchable: true,
      render: (row) => (
        <Box>
          <Text fz="sm" fw={700} c="#1a1a1a">{row.hostResidentName}</Text>
          <Text fz="xs" c="dimmed">{row.hostFlatNumber} · {row.hostBlock}</Text>
        </Box>
      ),
    },
    {
      key: "purpose", label: "Purpose", searchable: true,
      render: (row) => <Text fz="xs" fw={600} c="dimmed">{row.purpose}</Text>,
    },
    {
      key: "entryTime", label: "Entry",
      render: (row) => (
        <Group gap={5} wrap="nowrap">
          <IconLogin size={13} color="teal" />
          <Text fz="xs" fw={600} c="#333">{fmt(row.entryTime)}</Text>
        </Group>
      ),
    },
    {
      key: "exitTime", label: "Exit",
      render: (row) => row.exitTime ? (
        <Group gap={5} wrap="nowrap">
          <IconLogout size={13} color="#aaa" />
          <Text fz="xs" fw={600} c="dimmed">{fmt(row.exitTime)}</Text>
        </Group>
      ) : <Text fz="xs" c="dimmed">—</Text>,
    },
    {
      key: "status", label: "Duration / Status",
      render: (row) => duration(row.entryTime, row.exitTime),
    },
    {
      key: "gateNumber", label: "Gate",
      render: (row) => (
        <Badge size="xs" variant="outline" color="gray" fw={700}>{row.gateNumber}</Badge>
      ),
    },
    {
      key: "status2", label: "Status",
      render: (row) => (
        <Badge
          size="sm" variant="light"
          color={row.status === "inside" ? "teal" : "gray"}
          fw={700}
          leftSection={row.status === "inside"
            ? <IconClock size={10} />
            : <IconLogout size={10} />}
        >
          {row.status === "inside" ? "Inside" : "Exited"}
        </Badge>
      ),
    },
  ];

  // ── Filter slot ────────────────────────────────────────────────────────────
  const filterSlot = (
    <>
      <Select
        data={[{ value: "all", label: "All Status" }, { value: "inside", label: "Inside" }, { value: "exited", label: "Exited" }]}
        value={statusFilter}
        onChange={(v) => setStatusFilter((v ?? "all") as GuestEntryStatus | "all")}
        w={120}
        styles={{ input: { borderColor: "#FFE5E5", fontWeight: 600 } }}
      />
      <Select
        data={blocks.map((b) => ({ value: b, label: b === "all" ? "All Blocks" : b }))}
        value={blockFilter}
        onChange={(v) => setBlockFilter(v ?? "all")}
        w={130}
        styles={{ input: { borderColor: "#FFE5E5", fontWeight: 600 } }}
      />
      <Select
        data={gates.map((g) => ({ value: g, label: g === "all" ? "All Gates" : g }))}
        value={gateFilter}
        onChange={(v) => setGateFilter(v ?? "all")}
        w={120}
        styles={{ input: { borderColor: "#FFE5E5", fontWeight: 600 } }}
      />
    </>
  );

  return (
    <>
      {/* ── Stats row ──────────────────────────────────────────────────── */}
      <SimpleGrid cols={{ base: 1, sm: 5 }} mb="lg" spacing="xs">
        {[
          { label: "Total Today",  value: logs.length,                                  gradient: false },
          { label: "Inside Now",   value: logs.filter((l) => l.status === "inside").length,  gradient: true  },
          { label: "Exited",       value: logs.filter((l) => l.status === "exited").length,  gradient: false },
          { label: "4-Wheelers",   value: logs.filter((l) => l.vehicleType === "4-wheeler").length, gradient: false },
          { label: "2-Wheelers",   value: logs.filter((l) => l.vehicleType === "2-wheeler").length, gradient: false },
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
              style={{ color: s.gradient ? "#fff" : CORAL_DARK }}>
              {s.value}
            </Text>
          </Box>
        ))}
      </SimpleGrid>

      {/* ── Table ──────────────────────────────────────────────────────── */}
      <SocietyAdminTable
        data={filtered as any}
        columns={columns as any}
        rowKey="logId"
        searchPlaceholder="Search vehicle, driver, host…"
        filterSlot={filterSlot}
        emptyMessage="No guest vehicle logs match the selected filters."
      />
    </>
  );
}