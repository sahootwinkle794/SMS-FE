"use client"
import React, { useState } from "react";
import {
  Box,
  Button,
  Drawer,
  Group,
  Text,
  TextInput,
  Select,
  Textarea,
  Stack,
  SimpleGrid,
  Badge,
  Avatar,
  ActionIcon,
  Tooltip,
  Paper,
} from "@mantine/core";
import {
  IconTicket,
  IconPlus,
  IconFilter,
  IconEye,
  IconEdit,
  IconAlertTriangle,
  IconHome,
  IconTag,
  IconArrowUp,
  IconClock,
  IconRefresh,
  IconFileDescription,
  IconUserCheck,
  IconDeviceFloppy,
  IconCategory,
  IconLayersSubtract,
} from "@tabler/icons-react";
import { CORAL, CORAL_DARK, PEACH, gradientBg, softCard } from "@/utils/constants";

import { SocietyAdminTable } from "@/components/SocietyAdminTable";
import { SocietyAdminTableColumn } from "@/components/SocietyAdminTable/SocietyAdmin.types";
// ── Component-level styles ───────────────────────────────────────────────────
const inputStyle = {
  label: { fontWeight: 700, fontSize: 11, color: "#888", textTransform: "uppercase" as const, letterSpacing: "0.05em", marginBottom: 4 },
  input: { border: "1.5px solid #FFE5E5", background: "#fff", "&:focus": { borderColor: CORAL } },
};

// ── Static data ──────────────────────────────────────────────────────────────
const CATEGORIES = [
  { value: "maintenance",    label: "Maintenance"     },
  { value: "security",       label: "Security"        },
  { value: "housekeeping",   label: "Housekeeping"    },
  { value: "noise",          label: "Noise Complaint" },
  { value: "parking",        label: "Parking"         },
  { value: "utilities",      label: "Utilities"       },
  { value: "administrative", label: "Administrative"  },
  { value: "other",          label: "Other"           },
];

const SUB_CATEGORIES: Record<string, { value: string; label: string }[]> = {
  maintenance:    [{ value: "plumbing", label: "Plumbing" }, { value: "electrical", label: "Electrical" }, { value: "carpentry", label: "Carpentry" }, { value: "elevator", label: "Elevator" }, { value: "ac", label: "AC / HVAC" }],
  security:       [{ value: "cctv", label: "CCTV Issue" }, { value: "access", label: "Access Control" }, { value: "guard", label: "Guard Complaint" }],
  housekeeping:   [{ value: "common_area", label: "Common Area Cleaning" }, { value: "garbage", label: "Garbage Collection" }, { value: "pest", label: "Pest Control" }],
  noise:          [{ value: "neighbor", label: "Neighbour Noise" }, { value: "construction", label: "Construction Noise" }, { value: "party", label: "Party/Music" }],
  parking:        [{ value: "unauthorized", label: "Unauthorized Parking" }, { value: "allocation", label: "Allocation Issue" }],
  utilities:      [{ value: "water", label: "Water Supply" }, { value: "power", label: "Power Cut" }, { value: "gas", label: "Gas Leakage" }, { value: "internet", label: "Internet/Cable" }],
  administrative: [{ value: "billing", label: "Billing / Invoice" }, { value: "noc", label: "NOC Request" }, { value: "document", label: "Document Issue" }],
  other:          [{ value: "general", label: "General" }],
};

const STATUS_OPTIONS = [
  { value: "new",         label: "New"         },
  { value: "in_progress", label: "In Progress" },
  { value: "on_hold",     label: "On Hold"     },
  { value: "resolved",    label: "Resolved"    },
  { value: "reopened",    label: "Reopened"    },
];

const ESCALATION_OPTIONS = [
  { value: "0", label: "L0 – No Escalation"       },
  { value: "1", label: "L1 – Society Manager"      },
  { value: "2", label: "L2 – RWA Committee"        },
  { value: "3", label: "L3 – Developer / Authority"},
];

const STAFF_OPTIONS = [
  { value: "rajesh_k",   label: "Rajesh Kumar (Maintenance)"    },
  { value: "sunil_g",    label: "Sunil Gupta (Electrician)"     },
  { value: "priya_s",    label: "Priya Sharma (Housekeeping)"   },
  { value: "vendor_a",   label: "QuickFix Vendors Pvt Ltd"      },
  { value: "security_t", label: "SecureZone Security (Vendor)"  },
  { value: "unassigned", label: "Unassigned"                    },
];

const STATUS_META: Record<string, { color: string; bg: string }> = {
  new:         { color: "#2563EB", bg: "#EFF6FF" },
  in_progress: { color: "#D97706", bg: "#FFFBEB" },
  on_hold:     { color: "#7C3AED", bg: "#F5F3FF" },
  resolved:    { color: "#059669", bg: "#ECFDF5" },
  reopened:    { color: "#DC2626", bg: "#FEF2F2" },
};

// ── Ticket row type ──────────────────────────────────────────────────────────
interface TicketRow {
  id:         string;
  subject:    string;
  category:   string;
  sub:        string;
  flat:       string;
  status:     string;
  assignee:   string;
  escalation: string;
  ageing:     number;
  updated:    string;
  [key: string]: unknown; // satisfies Record<string, unknown>
}

// ── Sample rows ──────────────────────────────────────────────────────────────
const SAMPLE_TICKETS: TicketRow[] = [
  { id: "TKT-1042", subject: "Water leakage in bathroom",           category: "maintenance", sub: "Plumbing",             flat: "A-304", status: "in_progress", assignee: "Rajesh Kumar",        escalation: "L0", ageing: 5,  updated: "2h ago"  },
  { id: "TKT-1041", subject: "CCTV camera not working",             category: "security",    sub: "CCTV Issue",           flat: "B-101", status: "new",         assignee: "Unassigned",          escalation: "L1", ageing: 1,  updated: "30m ago" },
  { id: "TKT-1040", subject: "Noise complaint – late night music",  category: "noise",       sub: "Party/Music",          flat: "C-201", status: "resolved",    assignee: "Sunil Gupta",         escalation: "L0", ageing: 0,  updated: "1d ago"  },
  { id: "TKT-1039", subject: "Lift not working in Block D",         category: "maintenance", sub: "Elevator",             flat: "D-502", status: "on_hold",     assignee: "QuickFix Vendors",    escalation: "L2", ageing: 12, updated: "3d ago"  },
  { id: "TKT-1038", subject: "Unauthorized car in visitor parking", category: "parking",     sub: "Unauthorized Parking", flat: "A-101", status: "reopened",    assignee: "SecureZone Security", escalation: "L1", ageing: 3,  updated: "5h ago"  },
];

// ── Form blank ───────────────────────────────────────────────────────────────
const blankForm = {
  subject: "", category: "", subCategory: "",
  flatNumber: "", status: "new", assignee: "",
  escalation: "0", description: "",
};

// ── Cell renderers ────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: string }) {
  const label = STATUS_OPTIONS.find((s) => s.value === status)?.label ?? status;
  const meta  = STATUS_META[status] ?? { color: "#888", bg: "#f5f5f5" };
  return (
    <Badge variant="light" style={{ background: meta.bg, color: meta.color, fontWeight: 800, fontSize: 10, border: `1px solid ${meta.color}22` }}>
      {label}
    </Badge>
  );
}

function AgeingChip({ days }: { days: number }) {
  const color = days === 0 ? "#059669" : days <= 3 ? "#D97706" : "#DC2626";
  return (
    <Group gap={4} wrap="nowrap">
      <IconClock size={12} color={color} />
      <Text fz="xs" fw={700} c={color}>{days}d</Text>
    </Group>
  );
}

function EscalationBadge({ level }: { level: string }) {
  const color = level === "L0" ? "green" : level === "L1" ? "yellow" : level === "L2" ? "orange" : "red";
  return <Badge size="sm" variant="light" color={color} style={{ fontWeight: 800, fontSize: 9 }}>{level}</Badge>;
}

// ── Column definitions for SocietyAdminTable ─────────────────────────────────
const COLUMNS: SocietyAdminTableColumn<TicketRow>[] = [
  {
    key: "id", label: "Ticket ID", width: 100,
    render: (row) => <Text fz="xs" fw={800} c={CORAL}>{row.id}</Text>,
  },
  {
    key: "subject", label: "Subject", searchable: true,
    render: (row) => (
      <Box>
        <Text fz="xs" fw={600} c="#222" style={{ maxWidth: 220, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {row.subject}
        </Text>
        <Text fz={10} c="dimmed">{row.sub}</Text>
      </Box>
    ),
  },
  {
    key: "category", label: "Category", searchable: true,
    render: (row) => (
      <Badge variant="outline" size="sm" color="gray" style={{ fontWeight: 700, fontSize: 9, textTransform: "uppercase" }}>
        {row.category}
      </Badge>
    ),
  },
  {
    key: "flat", label: "Flat", width: 90, searchable: true,
    render: (row) => (
      <Group gap={4} wrap="nowrap">
        <IconHome size={11} color="#bbb" />
        <Text fz="xs" fw={700}>{row.flat}</Text>
      </Group>
    ),
  },
  {
    key: "status", label: "Status", width: 115, searchable: false,
    render: (row) => <StatusBadge status={row.status} />,
  },
  {
    key: "assignee", label: "Assignee", searchable: true,
    render: (row) => (
      <Group gap={6} wrap="nowrap">
        <Avatar size={22} radius="xl" color="orange">{row.assignee[0]}</Avatar>
        <Text fz="xs" fw={600} c="#444" style={{ whiteSpace: "nowrap" }}>{row.assignee}</Text>
      </Group>
    ),
  },
  {
    key: "escalation", label: "Escalation", width: 95, searchable: false,
    render: (row) => <EscalationBadge level={row.escalation} />,
  },
  {
    key: "ageing", label: "Ageing", width: 72, searchable: false,
    render: (row) => <AgeingChip days={row.ageing as number} />,
  },
  {
    key: "updated", label: "Last Updated", width: 105, searchable: false,
    render: (row) => <Text fz="xs" c="dimmed">{row.updated}</Text>,
  },
  {
    key: "actions", label: "", width: 72, searchable: false,
    render: () => (
      <Group gap={4} wrap="nowrap">
        <Tooltip label="View" withArrow>
          <ActionIcon size="sm" variant="light" color="blue" radius="md"><IconEye size={13} /></ActionIcon>
        </Tooltip>
        <Tooltip label="Edit" withArrow>
          <ActionIcon size="sm" variant="light" color="orange" radius="md"><IconEdit size={13} /></ActionIcon>
        </Tooltip>
      </Group>
    ),
  },
];

// ── Main component ────────────────────────────────────────────────────────────
const Complaints = () => {
  const [drawerOpen, setDrawerOpen]     = useState(false);
  const [form, setForm]                 = useState({ ...blankForm });
  const [filterStatus, setFilterStatus] = useState<string | null>(null);

  const set = (key: string, val: string) => setForm((f) => ({ ...f, [key]: val }));

  const subCategoryData = form.category ? (SUB_CATEGORIES[form.category] ?? []) : [];

  // Status filter applied before passing to SocietyAdminTable
  // (SocietyAdminTable handles text search internally)
  const tableData = filterStatus
    ? SAMPLE_TICKETS.filter((t) => t.status === filterStatus)
    : SAMPLE_TICKETS;

  // ── Stat cards ──────────────────────────────────────────────────────────────
  const stats = [
    { label: "Total Tickets",     value: SAMPLE_TICKETS.length,                                                                   color: "#2563EB", bg: "#EFF6FF", icon: <IconTicket   size={16} color="#2563EB" /> },
    { label: "Open / In Progress",value: SAMPLE_TICKETS.filter(t => ["new","in_progress","reopened"].includes(t.status)).length,  color: "#D97706", bg: "#FFFBEB", icon: <IconRefresh  size={16} color="#D97706" /> },
    { label: "On Hold",           value: SAMPLE_TICKETS.filter(t => t.status === "on_hold").length,                               color: "#7C3AED", bg: "#F5F3FF", icon: <IconArrowUp  size={16} color="#7C3AED" /> },
    { label: "Resolved",          value: SAMPLE_TICKETS.filter(t => t.status === "resolved").length,                              color: "#059669", bg: "#ECFDF5", icon: <IconUserCheck size={16} color="#059669" /> },
  ];

  return (
    <Box style={{ background: PEACH, minHeight: "100vh", padding: 24 }}>

      {/* ── Page header ── */}
      <Group justify="space-between" mb="xl" wrap="nowrap">
        <Group gap="sm">
          <Box style={{
            width: 40, height: 40, borderRadius: 10,
            background: gradientBg,
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: `0 4px 12px ${CORAL_DARK}55`,
          }}>
            <IconTicket size={20} color="#fff" />
          </Box>
          <Box>
            <Text fw={900} fz="xl" c="#1a1a1a" style={{ lineHeight: 1.1 }}>Complaints & Tickets</Text>
            <Text fz="xs" c="dimmed">Manage and track resident grievances</Text>
          </Box>
        </Group>
        <Button
          radius="xl"
          leftSection={<IconPlus size={15} />}
          style={{ background: gradientBg, border: "none", fontWeight: 800, boxShadow: `0 4px 14px ${CORAL_DARK}55` }}
          onClick={() => { setForm({ ...blankForm }); setDrawerOpen(true); }}
        >
          Raise Ticket
        </Button>
      </Group>

      {/* ── Stat cards ── */}
      <SimpleGrid cols={{ base: 2, sm: 4 }} spacing="md" mb="xl">
        {stats.map((s) => (
          <Paper key={s.label} style={{ ...softCard, borderRadius: 14, padding: "14px 18px", boxShadow: `0 2px 12px ${CORAL}18` }}>
            <Group gap="sm" wrap="nowrap">
              <Box style={{ width: 34, height: 34, borderRadius: 10, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {s.icon}
              </Box>
              <Box>
                <Text fz="xs" fw={700} c="dimmed" tt="uppercase" style={{ letterSpacing: "0.05em" }}>{s.label}</Text>
                <Text fz="xl" fw={900} c="#1a1a1a">{s.value}</Text>
              </Box>
            </Group>
          </Paper>
        ))}
      </SimpleGrid>

      {/* ── SocietyAdminTable ── */}
      <SocietyAdminTable<TicketRow>
        data={tableData}
        columns={COLUMNS}
        rowKey="id"
        searchPlaceholder="Search by ID, subject, flat…"
        emptyMessage="No tickets match your search."
        filterSlot={
          <Select
            placeholder="All statuses"
            leftSection={<IconFilter size={13} color={CORAL} />}
            data={STATUS_OPTIONS}
            value={filterStatus}
            onChange={setFilterStatus}
            clearable
            radius="xl"
            style={{ width: 175 }}
            styles={{ input: { borderColor: "#FFE5E5", borderRadius: 12, fontWeight: 600, background: "#fff" } }}
          />
        }
      />

      {/* ── Raise Ticket Drawer ── */}
      <Drawer
        opened={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        position="right"
        size="lg"
        padding="xl"
        title={
          <Group gap="sm">
            <Box style={{ width: 32, height: 32, borderRadius: 8, background: gradientBg, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <IconTicket size={16} color="#fff" />
            </Box>
            <Box>
              <Text fw={900} fz="sm" c="#1a1a1a">Raise Complaint Ticket</Text>
              <Text fz="xs" c="dimmed">Fill in the complaint details</Text>
            </Box>
          </Group>
        }
        styles={{
          header: { background: PEACH, borderBottom: "1.5px solid #FFE5E5" },
          body:   { background: PEACH },
        }}
      >
        <Stack gap="md" mt="sm">

          <TextInput
            label="Subject"
            placeholder="Brief description of the issue"
            leftSection={<IconFileDescription size={15} color={CORAL} />}
            value={form.subject}
            onChange={(e) => set("subject", e.target.value)}
            styles={inputStyle}
            radius="md"
          />

          <SimpleGrid cols={2} spacing="md">
            <Select
              label="Category"
              placeholder="Select category"
              leftSection={<IconCategory size={15} color={CORAL} />}
              data={CATEGORIES}
              value={form.category}
              onChange={(v) => { set("category", v ?? ""); set("subCategory", ""); }}
              styles={inputStyle}
              radius="md"
            />
            <Select
              label="Sub-Category"
              placeholder={form.category ? "Select sub-category" : "Pick category first"}
              leftSection={<IconLayersSubtract size={15} color={CORAL} />}
              data={subCategoryData}
              value={form.subCategory}
              onChange={(v) => set("subCategory", v ?? "")}
              disabled={!form.category}
              styles={inputStyle}
              radius="md"
            />
          </SimpleGrid>

          <SimpleGrid cols={2} spacing="md">
            <TextInput
              label="Flat / Unit Number"
              placeholder="A-304"
              leftSection={<IconHome size={15} color={CORAL} />}
              value={form.flatNumber}
              onChange={(e) => set("flatNumber", e.target.value)}
              styles={inputStyle}
              radius="md"
            />
            <Select
              label="Status"
              placeholder="Select status"
              leftSection={<IconTag size={15} color={CORAL} />}
              data={STATUS_OPTIONS}
              value={form.status}
              onChange={(v) => set("status", v ?? "new")}
              styles={inputStyle}
              radius="md"
            />
          </SimpleGrid>

          <SimpleGrid cols={2} spacing="md">
            <Select
              label="Assignee"
              placeholder="Assign staff/vendor"
              leftSection={<IconUserCheck size={15} color={CORAL} />}
              data={STAFF_OPTIONS}
              value={form.assignee}
              onChange={(v) => set("assignee", v ?? "")}
              styles={inputStyle}
              radius="md"
            />
            <Select
              label="Escalation Level"
              placeholder="Select level"
              leftSection={<IconAlertTriangle size={15} color={CORAL} />}
              data={ESCALATION_OPTIONS}
              value={form.escalation}
              onChange={(v) => set("escalation", v ?? "0")}
              styles={inputStyle}
              radius="md"
            />
          </SimpleGrid>

          <Textarea
            label="Description (optional)"
            placeholder="Provide more details about the issue…"
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
            minRows={3}
            radius="md"
            styles={inputStyle}
          />

          <Group justify="flex-end" mt="sm" gap="sm">
            <Button variant="subtle" color="gray" radius="xl" onClick={() => setDrawerOpen(false)}>
              Cancel
            </Button>
            <Button
              radius="xl"
              leftSection={<IconDeviceFloppy size={15} />}
              style={{ background: gradientBg, border: "none", fontWeight: 800, boxShadow: `0 4px 14px ${CORAL_DARK}55` }}
              onClick={() => {
                console.log("Submit ticket:", form);
                setDrawerOpen(false);
              }}
            >
              Submit Ticket
            </Button>
          </Group>
        </Stack>
      </Drawer>
    </Box>
  );
};

export default Complaints;