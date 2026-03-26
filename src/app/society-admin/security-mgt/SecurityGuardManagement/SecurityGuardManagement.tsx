"use client";

import { useState } from "react";
import {
  Avatar, Badge, Box, Button, Checkbox, Drawer,
  Group, Modal, Select, SimpleGrid, Stack,
  Text, TextInput, Textarea, Tooltip,
} from "@mantine/core";
import {
  IconCalendar, IconCheck, IconChevronRight, IconDeviceFloppy,
  IconDoor, IconEdit, IconMoon, IconPlus, IconShield,
  IconSun, IconUser, IconUserMinus, IconUserOff, IconX,
  IconAlertCircle, IconPhone, IconId, IconHome, IconClock,
} from "@tabler/icons-react";
import { CORAL, CORAL_DARK, CORAL_LIGHT, PEACH, softCard } from "@/utils/constants";
import { SocietyAdminTable } from "@/components/SocietyAdminTable";
import {SocietyAdminTableColumn} from "@/components/SocietyAdminTable/SocietyAdmin.types";
import {
  DayOfWeek, Gate, GuardFormValues, GuardLeaveRequest, GuardStatus,
  LeaveStatus, SecurityGuard, ShiftSchedule, ShiftScheduleFormValues,
  ShiftType, STATIC_GATES, STATIC_GUARDS, STATIC_LEAVE_REQUESTS,
  STATIC_SCHEDULES,
} from "./SecurityGuard.types";

// ─── Design tokens ────────────────────────────────────────────────────────────

const gradientBg = `linear-gradient(135deg, ${CORAL} 0%, ${CORAL_LIGHT} 100%)`;

const SHIFT_CONFIG: Record<ShiftType, { label: string; color: string; icon: typeof IconSun; time: string }> = {
  morning: { label: "Morning", color: "orange", icon: IconSun,  time: "6AM – 2PM"  },
  evening: { label: "Evening", color: "blue",   icon: IconSun,  time: "2PM – 10PM" },
  night:   { label: "Night",   color: "grape",  icon: IconMoon, time: "10PM – 6AM" },
};

const STATUS_CONFIG: Record<GuardStatus, { label: string; color: string }> = {
  active:   { label: "Active",    color: "teal"   },
  inactive: { label: "Inactive",  color: "gray"   },
  on_leave: { label: "On Leave",  color: "orange" },
};

const LEAVE_CONFIG: Record<LeaveStatus, { label: string; color: string }> = {
  pending:  { label: "Pending",  color: "orange" },
  approved: { label: "Approved", color: "teal"   },
  rejected: { label: "Rejected", color: "red"    },
};

const DAYS: DayOfWeek[] = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
const inputStyle = {
  input: { borderColor: "#FFE5E5", borderRadius: 12, fontWeight: 600 },
  label: { fontWeight: 700, fontSize: 11, color: "#888", textTransform: "uppercase" as const, letterSpacing: "0.05em" },
};

// ─── Props ────────────────────────────────────────────────────────────────────

interface SecurityGuardManagementProps {
  activeTab: "guards" | "gates" | "shifts" | "leaves";
  guards?:    SecurityGuard[];
  gates?:     Gate[];
  schedules?: ShiftSchedule[];
  leaves?:    GuardLeaveRequest[];
  onAddGuard?:      (v: GuardFormValues) => void;
  onEditGuard?:     (v: GuardFormValues) => void;
  onDeactivate?:    (id: string) => void;
  onAddSchedule?:   (v: ShiftScheduleFormValues) => void;
  onDeleteSchedule?:(id: string) => void;
  onApproveLeave?:  (id: string) => void;
  onRejectLeave?:   (id: string) => void;
}

// ─── Main component ───────────────────────────────────────────────────────────

export function SecurityGuardManagement({
  activeTab,
  guards    = STATIC_GUARDS,
  gates     = STATIC_GATES,
  schedules = STATIC_SCHEDULES,
  leaves    = STATIC_LEAVE_REQUESTS,
  onAddGuard,
  onEditGuard,
  onDeactivate,
  onAddSchedule,
  onDeleteSchedule,
  onApproveLeave,
  onRejectLeave,
}: SecurityGuardManagementProps) {

  if (activeTab === "guards")  return <GuardsTab  guards={guards} gates={gates} onAdd={onAddGuard} onEdit={onEditGuard} onDeactivate={onDeactivate} />;
  if (activeTab === "gates")   return <GatesTab   guards={guards} gates={gates} schedules={schedules} />;
  if (activeTab === "shifts")  return <ShiftsTab  guards={guards} gates={gates} schedules={schedules} onAdd={onAddSchedule} onDelete={onDeleteSchedule} />;
  if (activeTab === "leaves")  return <LeavesTab  leaves={leaves} onApprove={onApproveLeave} onReject={onRejectLeave} />;
  return null;
}

// ══════════════════════════════════════════════════════════════════════════════
// TAB 1 — Guards
// ══════════════════════════════════════════════════════════════════════════════

function GuardsTab({
  guards, gates,
  onAdd, onEdit, onDeactivate,
}: {
  guards: SecurityGuard[];
  gates: Gate[];
  onAdd?: (v: GuardFormValues) => void;
  onEdit?: (v: GuardFormValues) => void;
  onDeactivate?: (id: string) => void;
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editing,    setEditing]    = useState<SecurityGuard | null>(null);
  const [selected,   setSelected]   = useState<SecurityGuard | null>(null);

  const columns: SocietyAdminTableColumn<SecurityGuard>[] = [
    {
      key: "name", label: "Guard", searchable: true,
      render: (r) => (
        <Group gap="sm" wrap="nowrap">
          <Avatar size={34} radius="xl"
            style={{ background: 'lightgray', fontWeight: 900, color: "#fff", fontSize: 13, flexShrink: 0 }}>
            {r.name.charAt(0)}
          </Avatar>
          <Box style={{ minWidth: 0 }}>
            <Text fz="sm" fw={700} c="#1a1a1a" truncate>{r.name}</Text>
            <Text fz="xs" c="dimmed">{r.phone}</Text>
          </Box>
        </Group>
      ),
    },
    {
      key: "assignedGate", label: "Gate", searchable: true,
      render: (r) => (
        <Group gap={5}>
          <IconDoor size={13} color={CORAL} />
          <Text fz="sm" fw={600}>{r.assignedGate}</Text>
        </Group>
      ),
    },
    {
      key: "currentShift", label: "Shift",
      render: (r) => {
        const cfg = SHIFT_CONFIG[r.currentShift];
        return (
          <Badge size="sm" variant="light" color={cfg.color} fw={700}>
            {cfg.label} · {cfg.time}
          </Badge>
        );
      },
    },
    {
      key: "status", label: "Status",
      render: (r) => {
        const cfg = STATUS_CONFIG[r.status];
        return <Badge size="sm" variant="light" color={cfg.color} fw={700}>{cfg.label}</Badge>;
      },
    },
    { key: "joiningDate", label: "Joined",
      render: (r) => <Text fz="xs" c="dimmed" fw={600}>{r.joiningDate}</Text> },
    {
      key: "actions", label: "",
      render: (r) => (
        <Group gap={4} wrap="nowrap">
          <Tooltip label="View Details">
            <Button size="xs" radius="xl" variant="subtle" color="gray" onClick={() => setSelected(r)}>
              <IconChevronRight size={13} />
            </Button>
          </Tooltip>
          <Tooltip label="Edit">
            <Button size="xs" radius="xl" variant="subtle" color="gray"
              onClick={() => { setEditing(r); setDrawerOpen(true); }}>
              <IconEdit size={13} />
            </Button>
          </Tooltip>
          {r.status === "active" && (
            <Tooltip label="Deactivate">
              <Button size="xs" radius="xl" variant="subtle" color="red"
                onClick={() => onDeactivate?.(r.guardId)}>
                <IconUserOff size={13} />
              </Button>
            </Tooltip>
          )}
        </Group>
      ),
    },
  ];

  return (
    <>
      <StatsRow items={[
        { label: "Total Guards", value: guards.length,                                         gradient: false },
        { label: "On Duty",      value: guards.filter((g) => g.status === "active").length,    gradient: true  },
        { label: "On Leave",     value: guards.filter((g) => g.status === "on_leave").length,  gradient: false },
        { label: "Inactive",     value: guards.filter((g) => g.status === "inactive").length,  gradient: false },
      ]} />

      <Group justify="flex-end" mb="md">
        <Button onClick={() => { setEditing(null); setDrawerOpen(true); }} radius="xl"
          leftSection={<IconPlus size={15} stroke={2.5} />}
          style={{ background: gradientBg, border: "none", fontWeight: 800, boxShadow: `0 4px 14px ${CORAL}55` }}>
          Add Guard
        </Button>
      </Group>

      <SocietyAdminTable<SecurityGuard & Record<string, unknown>>
        data={guards as (SecurityGuard & Record<string, unknown>)[]} columns={columns} rowKey="guardId"
        searchPlaceholder="Search by name, gate…"
        emptyMessage="No guards found."
      />

      {/* Detail drawer */}
      <GuardDetailDrawer guard={selected} onClose={() => setSelected(null)} />

      {/* Add / Edit drawer */}
      <Drawer
        opened={drawerOpen} onClose={() => setDrawerOpen(false)}
        position="right" size="md" padding="xl"
        title={<DrawerTitle icon={IconShield} title={editing ? "Edit Guard" : "Add Guard"} sub={editing ? editing.name : "New security guard"} />}
        styles={{ header: { background: PEACH, borderBottom: "1.5px solid #FFE5E5" }, body: { background: PEACH } }}
      >
        <GuardForm
          initial={editing ?? undefined} gates={gates}
          onSubmit={(v) => { editing ? onEdit?.(v) : onAdd?.(v); setDrawerOpen(false); }}
          onCancel={() => setDrawerOpen(false)}
        />
      </Drawer>
    </>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// TAB 2 — Gate Assignment
// ══════════════════════════════════════════════════════════════════════════════

function GatesTab({
  guards, gates, schedules,
}: {
  guards: SecurityGuard[];
  gates: Gate[];
  schedules: ShiftSchedule[];
}) {
  const today = new Date().toISOString().split("T")[0];
  const todaySchedules = schedules.filter(
    (s) => s.startDate <= today && s.endDate >= today
  );

  const shiftOrder: ShiftType[] = ["morning", "evening", "night"];

  return (
    <Stack gap="md">
      {gates.map((gate) => {
        const gateSchedules = todaySchedules.filter((s) => s.gateName === gate.gateName);

        return (
          <Box key={gate.gateId} style={{ ...softCard, borderRadius: 20, padding: 20 }}>
            <Group gap="sm" mb="md">
              <Box style={{
                width: 36, height: 36, borderRadius: 10,
                background: gradientBg,
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: `0 3px 10px ${CORAL}44`,
              }}>
                <IconDoor size={18} color="#fff" stroke={1.6} />
              </Box>
              <Text fw={900} fz="md" c="#1a1a1a">{gate.gateName}</Text>
            </Group>

            <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="sm">
              {shiftOrder.map((shift) => {
                const cfg = SHIFT_CONFIG[shift];
                const sched = gateSchedules.find((s) => s.shiftType === shift);
                const guard = sched ? guards.find((g) => g.guardId === sched.guardId) : null;

                return (
                  <Box key={shift} style={{
                    background: sched ? PEACH : "#fafafa",
                    border: `1.5px solid ${sched ? "#FFE5E5" : "#eee"}`,
                    borderRadius: 14, padding: 14,
                  }}>
                    <Group gap="xs" mb={8}>
                      <cfg.icon size={13} color={sched ? CORAL : "#ccc"} />
                      <Text fz="xs" fw={800} tt="uppercase"
                        style={{ color: sched ? CORAL : "#ccc", letterSpacing: "0.07em" }}>
                        {cfg.label}
                      </Text>
                      <Text fz="10px" c="dimmed" fw={600}>{cfg.time}</Text>
                    </Group>

                    {guard ? (
                      <Group gap="sm">
                        <Avatar size={30} radius="xl"
                          style={{ background: 'lightgray', color: "#fff", fontSize: 12, fontWeight: 900, flexShrink: 0 }}>
                          {guard.name.charAt(0)}
                        </Avatar>
                        <Box>
                          <Text fz="sm" fw={700} c="#1a1a1a">{guard.name}</Text>
                          <Text fz="xs" c="dimmed">{guard.phone}</Text>
                        </Box>
                      </Group>
                    ) : (
                      <Text fz="sm" c="dimmed" fw={600} style={{ fontStyle: "italic" }}>
                        Unassigned
                      </Text>
                    )}
                  </Box>
                );
              })}
            </SimpleGrid>
          </Box>
        );
      })}
    </Stack>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// TAB 3 — Shift Schedule
// ══════════════════════════════════════════════════════════════════════════════

function ShiftsTab({
  guards, gates, schedules, onAdd, onDelete,
}: {
  guards: SecurityGuard[];
  gates: Gate[];
  schedules: ShiftSchedule[];
  onAdd?: (v: ShiftScheduleFormValues) => void;
  onDelete?: (id: string) => void;
}) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Group justify="flex-end" mb="md">
        <Button onClick={() => setModalOpen(true)} radius="xl"
          leftSection={<IconPlus size={15} stroke={2.5} />}
          style={{ background: gradientBg, border: "none", fontWeight: 800, boxShadow: `0 4px 14px ${CORAL}55` }}>
          Add Shift
        </Button>
      </Group>

      {/* Weekly grid */}
      <Box style={{ ...softCard, borderRadius: 20, padding: 20, overflowX: "auto" }}>
        <Text fw={800} fz="sm" c="dimmed" tt="uppercase" mb="md" style={{ letterSpacing: "0.07em" }}>
          Weekly Schedule
        </Text>

        {/* Header row */}
        <Box style={{ display: "grid", gridTemplateColumns: "180px repeat(7, 1fr)", gap: 4, minWidth: 640 }}>
          <Box />
          {DAYS.map((d) => (
            <Box key={d} style={{
              background: PEACH, borderRadius: 8, padding: "6px 4px", textAlign: "center",
            }}>
              <Text fz="xs" fw={800} tt="uppercase" style={{ color: CORAL, letterSpacing: "0.06em" }}>{d}</Text>
            </Box>
          ))}
        </Box>

        {/* Guard rows */}
        <Stack gap={4} mt={4}>
          {schedules.map((sched) => {
            const cfg = SHIFT_CONFIG[sched.shiftType];
            return (
              <Box key={sched.scheduleId}
                style={{ display: "grid", gridTemplateColumns: "180px repeat(7, 1fr)", gap: 4, minWidth: 640 }}>
                {/* Guard name cell */}
                <Group gap="xs" wrap="nowrap" style={{ padding: "4px 6px" }}>
                  <Avatar size={26} radius="xl"
                    style={{ background: 'lightgray', color: "#fff", fontSize: 11, fontWeight: 900, flexShrink: 0 }}>
                    {sched.guardName.charAt(0)}
                  </Avatar>
                  <Box style={{ minWidth: 0 }}>
                    <Text fz="xs" fw={700} c="#1a1a1a" truncate>{sched.guardName}</Text>
                    <Text fz="10px" c="dimmed">{sched.gateName}</Text>
                  </Box>
                </Group>

                {/* Day cells */}
                {DAYS.map((day) => {
                  const active = sched.days.includes(day);
                  return (
                    <Box key={day} style={{
                      borderRadius: 8, padding: "6px 4px", textAlign: "center",
                      background: active ? PEACH : "transparent",
                      border: `1.5px solid ${active ? "#FFE5E5" : "transparent"}`,
                    }}>
                      {active && (
                        <Badge size="xs" variant="light" color={cfg.color} fw={700}
                          style={{ fontSize: 9, padding: "2px 6px" }}>
                          {cfg.label}
                        </Badge>
                      )}
                    </Box>
                  );
                })}
              </Box>
            );
          })}
        </Stack>
      </Box>

      {/* Schedule list */}
      <Stack gap="xs" mt="md">
        {schedules.map((sched) => {
          const cfg = SHIFT_CONFIG[sched.shiftType];
          return (
            <Box key={sched.scheduleId} style={{
              ...softCard, borderRadius: 14, padding: "12px 16px",
              display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12,
            }}>
              <Group gap="sm" wrap="nowrap" style={{ flex: 1, minWidth: 0 }}>
                <Avatar size={32} radius="xl"
                  style={{ background: 'lightgray', color: "#fff", fontWeight: 900, fontSize: 13, flexShrink: 0 }}>
                  {sched.guardName.charAt(0)}
                </Avatar>
                <Box style={{ minWidth: 0 }}>
                  <Group gap="xs">
                    <Text fz="sm" fw={700} c="#1a1a1a">{sched.guardName}</Text>
                    <Badge size="xs" variant="light" color={cfg.color} fw={700}>{cfg.label}</Badge>
                  </Group>
                  <Text fz="xs" c="dimmed">{sched.gateName} · {sched.startDate} → {sched.endDate}</Text>
                </Box>
              </Group>
              <Tooltip label="Delete schedule">
                <Button size="xs" radius="xl" variant="subtle" color="red"
                  onClick={() => onDelete?.(sched.scheduleId)}>
                  <IconX size={13} />
                </Button>
              </Tooltip>
            </Box>
          );
        })}
      </Stack>

      {/* Add shift modal */}
      <Modal
        opened={modalOpen} onClose={() => setModalOpen(false)}
        title={<DrawerTitle icon={IconCalendar} title="Add Shift Schedule" sub="Assign guard to gate & shift" />}
        centered radius="xl" size="md" padding="xl"
        styles={{ header: { background: PEACH, borderBottom: "1.5px solid #FFE5E5" }, body: { background: PEACH }, content: { borderRadius: 20 } }}
      >
        <ShiftForm
          guards={guards} gates={gates}
          onSubmit={(v) => { onAdd?.(v); setModalOpen(false); }}
          onCancel={() => setModalOpen(false)}
        />
      </Modal>
    </>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// TAB 4 — Leave Management
// ══════════════════════════════════════════════════════════════════════════════

function LeavesTab({
  leaves,
  onApprove,
  onReject,
}: {
  leaves: GuardLeaveRequest[];
  onApprove?: (id: string) => void;
  onReject?:  (id: string) => void;
}) {
  const [filter,   setFilter]   = useState<LeaveStatus | "all">("all");
  const [selected, setSelected] = useState<GuardLeaveRequest | null>(null);

  const counts = {
    all:      leaves.length,
    pending:  leaves.filter((l) => l.status === "pending").length,
    approved: leaves.filter((l) => l.status === "approved").length,
    rejected: leaves.filter((l) => l.status === "rejected").length,
  };

  const filtered = filter === "all" ? leaves : leaves.filter((l) => l.status === filter);

  return (
    <>
      <StatsRow items={[
        { label: "Total",    value: counts.all,      gradient: false },
        { label: "Pending",  value: counts.pending,  gradient: true  },
        { label: "Approved", value: counts.approved, gradient: false },
        { label: "Rejected", value: counts.rejected, gradient: false },
      ]} />

      {/* Filter pills */}
      <Group gap="xs" mb="md">
        {(["all", "pending", "approved", "rejected"] as const).map((s) => {
          const active = filter === s;
          return (
            <Box key={s} onClick={() => setFilter(s)} style={{
              padding: "6px 16px", borderRadius: 999, cursor: "pointer",
              background: active ? gradientBg : "#fff",
              border: `1.5px solid ${active ? "transparent" : "#FFE5E5"}`,
              boxShadow: active ? `0 3px 10px ${CORAL}44` : "none",
              transition: "all 0.15s",
            }}>
              <Text fz="xs" fw={800} style={{ color: active ? "#fff" : "#888", textTransform: "capitalize" }}>
                {s === "all" ? `All (${counts.all})` : `${LEAVE_CONFIG[s].label} (${counts[s]})`}
              </Text>
            </Box>
          );
        })}
      </Group>

      <Stack gap="xs">
        {filtered.length === 0 ? (
          <Box ta="center" py={60}>
            <Text fz="xl">📭</Text>
            <Text fw={700} c="#1a1a1a">No leave requests</Text>
          </Box>
        ) : (
          filtered.map((leave) => {
            const cfg = LEAVE_CONFIG[leave.status];
            return (
              <Box key={leave.leaveId} style={{
                ...softCard, borderRadius: 16, padding: "14px 16px",
                display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12,
              }}>
                <Group gap="sm" wrap="nowrap" style={{ flex: 1, minWidth: 0 }}>
                  <Avatar size={36} radius="xl"
                    style={{ background: 'lightgray', color: "#fff", fontWeight: 900, fontSize: 14, flexShrink: 0 }}>
                    {leave.guardName.charAt(0)}
                  </Avatar>
                  <Box style={{ minWidth: 0 }}>
                    <Group gap="xs">
                      <Text fz="sm" fw={700} c="#1a1a1a">{leave.guardName}</Text>
                      <Badge size="xs" variant="light" color={cfg.color} fw={700}>{cfg.label}</Badge>
                    </Group>
                    <Text fz="xs" c="dimmed">{leave.assignedGate} · {leave.fromDate} → {leave.toDate}</Text>
                    <Text fz="xs" c="dimmed" style={{ fontStyle: "italic" }}>{leave.reason}</Text>
                  </Box>
                </Group>

                <Group gap="xs" wrap="nowrap" style={{ flexShrink: 0 }}>
                  {leave.status === "pending" && (
                    <>
                      <Tooltip label="Approve">
                        <Button size="xs" radius="xl" variant="light" color="teal"
                          onClick={() => onApprove?.(leave.leaveId)}>
                          <IconCheck size={13} />
                        </Button>
                      </Tooltip>
                      <Tooltip label="Reject">
                        <Button size="xs" radius="xl" variant="light" color="red"
                          onClick={() => onReject?.(leave.leaveId)}>
                          <IconX size={13} />
                        </Button>
                      </Tooltip>
                    </>
                  )}
                  <Tooltip label="View details">
                    <Button size="xs" radius="xl" variant="subtle" color="gray"
                      onClick={() => setSelected(leave)}>
                      <IconChevronRight size={13} />
                    </Button>
                  </Tooltip>
                </Group>
              </Box>
            );
          })
        )}
      </Stack>

      {/* Detail drawer */}
      <Drawer
        opened={!!selected} onClose={() => setSelected(null)}
        position="right" size="md" padding="xl"
        title={selected && <DrawerTitle icon={IconCalendar} title={selected.guardName} sub="Leave Request Details" />}
        styles={{ header: { background: PEACH, borderBottom: "1.5px solid #FFE5E5" }, body: { background: PEACH } }}
      >
        {selected && (
          <Stack gap="md">
            <DrawerSection label="Leave Details">
              <InfoRow icon={IconUser}     label="Guard"      value={selected.guardName}     />
              <InfoRow icon={IconDoor}     label="Gate"       value={selected.assignedGate}  />
              <InfoRow icon={IconCalendar} label="From"       value={selected.fromDate}       />
              <InfoRow icon={IconCalendar} label="To"         value={selected.toDate}         />
              <InfoRow icon={IconClock}    label="Applied On" value={selected.appliedOn}      />
            </DrawerSection>
            <DrawerSection label="Reason">
              <Text fz="sm" fw={600} c="#444" lh={1.6}>{selected.reason}</Text>
            </DrawerSection>
            {selected.reviewNote && (
              <DrawerSection label="Review Note">
                <Text fz="sm" fw={600} c="#444" lh={1.6}>{selected.reviewNote}</Text>
              </DrawerSection>
            )}
            {selected.status === "pending" && (
              <Group grow gap="sm">
                <Button radius="xl" color="teal" leftSection={<IconCheck size={15} />}
                  onClick={() => { onApprove?.(selected.leaveId); setSelected(null); }}
                  style={{ fontWeight: 800 }}>Approve</Button>
                <Button radius="xl" color="red" variant="light" leftSection={<IconX size={15} />}
                  onClick={() => { onReject?.(selected.leaveId); setSelected(null); }}
                  style={{ fontWeight: 800 }}>Reject</Button>
              </Group>
            )}
          </Stack>
        )}
      </Drawer>
    </>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// Forms
// ══════════════════════════════════════════════════════════════════════════════

function GuardForm({ initial, gates, onSubmit, onCancel }: {
  initial?: SecurityGuard;
  gates: Gate[];
  onSubmit: (v: GuardFormValues) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<GuardFormValues>({
    guardId:          initial?.guardId,
    name:             initial?.name             ?? "",
    phone:            initial?.phone            ?? "",
    emergencyContact: initial?.emergencyContact ?? "",
    idProofType:      initial?.idProofType      ?? "",
    idProofNumber:    initial?.idProofNumber    ?? "",
    address:          initial?.address          ?? "",
    joiningDate:      initial?.joiningDate      ?? "",
    assignedGate:     initial?.assignedGate     ?? "",
    currentShift:     initial?.currentShift     ?? "",
    status:           initial?.status           ?? "active",
  });
  const set = (k: keyof GuardFormValues, v: string) => setForm((p) => ({ ...p, [k]: v }));

  return (
    <Stack gap="md" mt="xs">
      <TextInput label="Full Name" placeholder="Ramesh Kumar"
        leftSection={<IconUser size={14} color={CORAL} />}
        value={form.name} onChange={(e) => set("name", e.target.value)}
        styles={inputStyle} radius="md" />
      <SimpleGrid cols={2} spacing="md">
        <TextInput label="Phone" placeholder="98765 43210"
          leftSection={<IconPhone size={14} color={CORAL} />}
          value={form.phone} onChange={(e) => set("phone", e.target.value)}
          styles={inputStyle} radius="md" />
        <TextInput label="Emergency Contact"
          leftSection={<IconPhone size={14} color={CORAL} />}
          value={form.emergencyContact} onChange={(e) => set("emergencyContact", e.target.value)}
          styles={inputStyle} radius="md" />
      </SimpleGrid>
      <SimpleGrid cols={2} spacing="md">
        <Select label="ID Proof Type"
          data={[{ value:"aadhaar",label:"Aadhaar" },{ value:"pan",label:"PAN" },{ value:"passport",label:"Passport" },{ value:"voter_id",label:"Voter ID" }]}
          value={form.idProofType} onChange={(v) => set("idProofType", v ?? "")}
          styles={inputStyle} radius="md" />
        <TextInput label="ID Proof Number" placeholder="XXXX-XXXX-XXXX"
          leftSection={<IconId size={14} color={CORAL} />}
          value={form.idProofNumber} onChange={(e) => set("idProofNumber", e.target.value)}
          styles={inputStyle} radius="md" />
      </SimpleGrid>
      <Textarea label="Address" placeholder="Street, Area, City"
        value={form.address} onChange={(e) => set("address", e.target.value)}
        minRows={2} styles={inputStyle} radius="md" />
      <SimpleGrid cols={2} spacing="md">
        <TextInput label="Joining Date" placeholder="YYYY-MM-DD"
          leftSection={<IconCalendar size={14} color={CORAL} />}
          value={form.joiningDate} onChange={(e) => set("joiningDate", e.target.value)}
          styles={inputStyle} radius="md" />
        <Select label="Status"
          data={[{ value:"active",label:"Active" },{ value:"inactive",label:"Inactive" }]}
          value={form.status} onChange={(v) => set("status", v ?? "active")}
          styles={inputStyle} radius="md" />
      </SimpleGrid>
      <SimpleGrid cols={2} spacing="md">
        <Select label="Assigned Gate"
          data={gates.map((g) => ({ value: g.gateName, label: g.gateName }))}
          value={form.assignedGate} onChange={(v) => set("assignedGate", v ?? "")}
          styles={inputStyle} radius="md" />
        <Select label="Current Shift"
          data={[{ value:"morning",label:"Morning" },{ value:"evening",label:"Evening" },{ value:"night",label:"Night" }]}
          value={form.currentShift} onChange={(v) => set("currentShift", v ?? "")}
          styles={inputStyle} radius="md" />
      </SimpleGrid>
      <Group justify="flex-end" gap="sm" mt="xs">
        <Button variant="subtle" color="gray" radius="xl" onClick={onCancel}>Cancel</Button>
        <Button radius="xl" leftSection={<IconDeviceFloppy size={15} />}
          style={{ background: gradientBg, border: "none", fontWeight: 800, boxShadow: `0 4px 14px ${CORAL}55` }}
          onClick={() => onSubmit(form)}>
          {initial ? "Save Changes" : "Add Guard"}
        </Button>
      </Group>
    </Stack>
  );
}

function ShiftForm({ guards, gates, onSubmit, onCancel }: {
  guards: SecurityGuard[];
  gates: Gate[];
  onSubmit: (v: ShiftScheduleFormValues) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<ShiftScheduleFormValues>({
    guardId: "", gateId: "", shiftType: "", startDate: "", endDate: "", days: [...DAYS],
  });
  const set = (k: keyof ShiftScheduleFormValues, v: unknown) => setForm((p) => ({ ...p, [k]: v }));
  const toggleDay = (d: DayOfWeek) =>
    setForm((p) => ({
      ...p,
      days: p.days.includes(d) ? p.days.filter((x) => x !== d) : [...p.days, d],
    }));

  return (
    <Stack gap="md" mt="xs">
      <Select label="Guard"
        data={guards.filter((g) => g.status === "active").map((g) => ({ value: g.guardId, label: g.name }))}
        value={form.guardId} onChange={(v) => set("guardId", v ?? "")}
        styles={inputStyle} radius="md" />
      <SimpleGrid cols={2} spacing="md">
        <Select label="Gate"
          data={gates.map((g) => ({ value: g.gateId, label: g.gateName }))}
          value={form.gateId} onChange={(v) => set("gateId", v ?? "")}
          styles={inputStyle} radius="md" />
        <Select label="Shift"
          data={[{ value:"morning",label:"Morning (6AM–2PM)" },{ value:"evening",label:"Evening (2PM–10PM)" },{ value:"night",label:"Night (10PM–6AM)" }]}
          value={form.shiftType} onChange={(v) => set("shiftType", v ?? "")}
          styles={inputStyle} radius="md" />
      </SimpleGrid>
      <SimpleGrid cols={2} spacing="md">
        <TextInput label="Start Date" placeholder="YYYY-MM-DD"
          leftSection={<IconCalendar size={14} color={CORAL} />}
          value={form.startDate} onChange={(e) => set("startDate", e.target.value)}
          styles={inputStyle} radius="md" />
        <TextInput label="End Date" placeholder="YYYY-MM-DD"
          leftSection={<IconCalendar size={14} color={CORAL} />}
          value={form.endDate} onChange={(e) => set("endDate", e.target.value)}
          styles={inputStyle} radius="md" />
      </SimpleGrid>
      <Box>
        <Text fz="11px" fw={700} c="#888" tt="uppercase" mb={8} style={{ letterSpacing: "0.05em" }}>Days</Text>
        <Group gap="xs">
          {DAYS.map((d) => (
            <Box key={d} onClick={() => toggleDay(d)} style={{
              padding: "5px 12px", borderRadius: 999, cursor: "pointer",
              background: form.days.includes(d) ? gradientBg : "#fff",
              border: `1.5px solid ${form.days.includes(d) ? "transparent" : "#FFE5E5"}`,
              boxShadow: form.days.includes(d) ? `0 2px 8px ${CORAL}44` : "none",
              transition: "all 0.15s",
            }}>
              <Text fz="xs" fw={800} style={{ color: form.days.includes(d) ? "#fff" : "#aaa" }}>{d}</Text>
            </Box>
          ))}
        </Group>
      </Box>
      <Group justify="flex-end" gap="sm" mt="xs">
        <Button variant="subtle" color="gray" radius="xl" onClick={onCancel}>Cancel</Button>
        <Button radius="xl" leftSection={<IconDeviceFloppy size={15} />}
          style={{ background: gradientBg, border: "none", fontWeight: 800, boxShadow: `0 4px 14px ${CORAL}55` }}
          onClick={() => onSubmit(form)}>
          Add Shift
        </Button>
      </Group>
    </Stack>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// Small shared components
// ══════════════════════════════════════════════════════════════════════════════

function GuardDetailDrawer({ guard, onClose }: { guard: SecurityGuard | null; onClose: () => void }) {
  if (!guard) return null;
  const shiftCfg  = SHIFT_CONFIG[guard.currentShift];
  const statusCfg = STATUS_CONFIG[guard.status];
  return (
    <Drawer opened={!!guard} onClose={onClose} position="right" size="md" padding="xl"
      title={
        <Group gap="sm">
          <Avatar size={36} radius="xl" style={{ background: 'lightgray', color: "#fff", fontWeight: 900 }}>
            {guard.name.charAt(0)}
          </Avatar>
          <Box>
            <Text fw={900} fz="sm" c="#1a1a1a">{guard.name}</Text>
            <Badge size="xs" variant="light" color={statusCfg.color} fw={700}>{statusCfg.label}</Badge>
          </Box>
        </Group>
      }
      styles={{ header: { background: PEACH, borderBottom: "1.5px solid #FFE5E5" }, body: { background: PEACH } }}
    >
      <Stack gap="md">
        <DrawerSection label="Personal">
          <InfoRow icon={IconPhone}    label="Phone"      value={guard.phone}            />
          <InfoRow icon={IconPhone}    label="Emergency"  value={guard.emergencyContact}  />
          <InfoRow icon={IconHome}     label="Address"    value={guard.address}           />
          <InfoRow icon={IconCalendar} label="Joined"     value={guard.joiningDate}       />
        </DrawerSection>
        <DrawerSection label="Identity">
          <InfoRow icon={IconId} label={guard.idProofType.replace("_"," ").toUpperCase()} value={guard.idProofNumber} />
        </DrawerSection>
        <DrawerSection label="Assignment">
          <InfoRow icon={IconDoor}  label="Gate"  value={guard.assignedGate}  />
          <InfoRow icon={IconClock} label="Shift" value={`${shiftCfg.label} (${shiftCfg.time})`} />
        </DrawerSection>
      </Stack>
    </Drawer>
  );
}

function StatsRow({ items }: { items: { label: string; value: number; gradient: boolean }[] }) {
  return (
    <SimpleGrid cols={{ base: 2, sm: 4 }} mb="lg" spacing="sm">
      {items.map((s) => (
        <Box key={s.label} style={{
          ...softCard, borderRadius: 16, padding: "14px 16px",
          background: s.gradient ? gradientBg : "#fff",
          border: s.gradient ? "none" : "1.5px solid #FFE5E5",
          boxShadow: s.gradient ? `0 4px 14px ${CORAL}44` : undefined,
        }}>
          <Text fz="xs" fw={700} tt="uppercase"
            style={{ color: s.gradient ? "rgba(255,255,255,0.8)" : "#999", letterSpacing: "0.06em" }}>
            {s.label}
          </Text>
          <Text fz={26} fw={900} lh={1} style={{ color: s.gradient ? "#fff" : CORAL_DARK }}>
            {s.value}
          </Text>
        </Box>
      ))}
    </SimpleGrid>
  );
}

function DrawerSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <Box style={{ ...softCard, borderRadius: 16, padding: 16 }}>
      <Text fz="10px" fw={800} tt="uppercase" c="dimmed" mb="sm" style={{ letterSpacing: "0.07em" }}>{label}</Text>
      <Stack gap="sm">{children}</Stack>
    </Box>
  );
}

function InfoRow({ icon: Icon, label, value }: { icon: typeof IconUser; label: string; value: string }) {
  return (
    <Group gap="sm" wrap="nowrap">
      <Box style={{
        width: 28, height: 28, borderRadius: 8, flexShrink: 0,
        background: PEACH, border: "1.5px solid #FFCCCC",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <Icon size={13} color={CORAL} />
      </Box>
      <Box style={{ minWidth: 0 }}>
        <Text fz="10px" fw={700} c="dimmed" tt="uppercase" style={{ letterSpacing: "0.05em" }}>{label}</Text>
        <Text fz="sm" fw={700} c="#1a1a1a" truncate>{value}</Text>
      </Box>
    </Group>
  );
}

function DrawerTitle({ icon: Icon, title, sub }: { icon: typeof IconShield; title: string; sub: string }) {
  return (
    <Group gap="sm">
      <Box style={{
        width: 32, height: 32, borderRadius: 8, flexShrink: 0,
        background: gradientBg,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <Icon size={16} color="#fff" />
      </Box>
      <Box>
        <Text fw={900} fz="sm" c="#1a1a1a">{title}</Text>
        <Text fz="xs" c="dimmed">{sub}</Text>
      </Box>
    </Group>
  );
}