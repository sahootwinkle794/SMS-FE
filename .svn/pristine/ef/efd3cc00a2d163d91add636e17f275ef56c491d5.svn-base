"use client";

import { useState } from "react";
import { Box, Group, SegmentedControl, Text } from "@mantine/core";
import {
  IconCalendar, IconDoor, IconShield, IconUserCheck,
} from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";

import { SecurityGuardManagement } from "./SecurityGuardManagement";
import {
  GuardFormValues, GuardLeaveRequest, SecurityGuard,
  ShiftSchedule, ShiftScheduleFormValues, LeaveStatus,
  STATIC_GUARDS, STATIC_SCHEDULES, STATIC_LEAVE_REQUESTS, STATIC_GATES,
} from "./SecurityGuardManagement/SecurityGuard.types";
import { CORAL, CORAL_LIGHT, PEACH } from "@/utils/constants";

// ─── Tab definitions ──────────────────────────────────────────────────────────

type ActiveTab = "guards" | "gates" | "shifts" | "leaves";

const TABS: { value: ActiveTab; label: string; icon: typeof IconShield }[] = [
  { value: "guards",  label: "Guards",          icon: IconShield    },
  { value: "gates",   label: "Gate Assignment",  icon: IconDoor      },
  { value: "shifts",  label: "Shift Schedule",   icon: IconCalendar  },
  { value: "leaves",  label: "Leave Management", icon: IconUserCheck },
];

const gradientBg = `linear-gradient(135deg, ${CORAL} 0%, ${CORAL_LIGHT} 100%)`;

// ─── Page ─────────────────────────────────────────────────────────────────────

const SecurityGuardManagementPage = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>("guards");

  const [guards,    setGuards]    = useState<SecurityGuard[]>(STATIC_GUARDS);
  const [schedules, setSchedules] = useState<ShiftSchedule[]>(STATIC_SCHEDULES);
  const [leaves,    setLeaves]    = useState<GuardLeaveRequest[]>(STATIC_LEAVE_REQUESTS);

  const ok  = (msg: string) => notifications.show({ title: "Success", message: msg, color: "teal" });
  const err = (msg: string) => notifications.show({ title: "Error",   message: msg, color: "red"  });

  // ── Guard handlers ─────────────────────────────────────────────────────────
  const handleAddGuard = async (values: GuardFormValues) => {
    try {
      // TODO: await postRequest(API_PATH.SECURITY_GUARD_ADD, values);
      const newGuard: SecurityGuard = {
        ...values,
        guardId:      Date.now().toString(),
        idProofType:  values.idProofType  as SecurityGuard["idProofType"],
        currentShift: values.currentShift as SecurityGuard["currentShift"],
      };
      setGuards((prev) => [newGuard, ...prev]);
      ok(`Guard ${values.name} added.`);
    } catch { err("Failed to add guard."); }
  };

  const handleEditGuard = async (values: GuardFormValues) => {
    try {
      // TODO: await putRequest(API_PATH.SECURITY_GUARD_UPDATE, values);
      setGuards((prev) => prev.map((g) =>
        g.guardId !== values.guardId ? g : {
          ...g, ...values,
          idProofType:  values.idProofType  as SecurityGuard["idProofType"],
          currentShift: values.currentShift as SecurityGuard["currentShift"],
        }
      ));
      ok(`Guard ${values.name} updated.`);
    } catch { err("Failed to update guard."); }
  };

  const handleDeactivate = async (id: string) => {
    try {
      // TODO: await putRequest(API_PATH.SECURITY_GUARD_DEACTIVATE, { id });
      setGuards((prev) => prev.map((g) =>
        g.guardId !== id ? g : { ...g, status: "inactive" }
      ));
      ok("Guard deactivated.");
    } catch { err("Failed to deactivate guard."); }
  };

  // ── Schedule handlers ──────────────────────────────────────────────────────
  const handleAddSchedule = async (values: ShiftScheduleFormValues) => {
    try {
      // TODO: await postRequest(API_PATH.SECURITY_SCHEDULE_ADD, values);
      const gate  = STATIC_GATES.find((g) => g.gateId === values.gateId);
      const guard = guards.find((g) => g.guardId === values.guardId);
      if (!gate || !guard) return;
      const newSched: ShiftSchedule = {
        ...values,
        scheduleId: Date.now().toString(),
        guardName:  guard.name,
        gateName:   gate.gateName,
        shiftType:  values.shiftType as ShiftSchedule["shiftType"],
      };
      setSchedules((prev) => [newSched, ...prev]);
      ok("Shift schedule added.");
    } catch { err("Failed to add schedule."); }
  };

  const handleDeleteSchedule = async (id: string) => {
    try {
      // TODO: await deleteRequest(API_PATH.SECURITY_SCHEDULE_DELETE, { id });
      setSchedules((prev) => prev.filter((s) => s.scheduleId !== id));
      ok("Schedule removed.");
    } catch { err("Failed to remove schedule."); }
  };

  // ── Leave handlers ─────────────────────────────────────────────────────────
  const handleLeaveAction = async (id: string, status: LeaveStatus) => {
    try {
      // TODO: await putRequest(API_PATH.SECURITY_LEAVE_UPDATE, { id, status });
      setLeaves((prev) => prev.map((l) =>
        l.leaveId !== id ? l : { ...l, status }
      ));
      // Mark guard on_leave if approved
      if (status === "approved") {
        const leave = leaves.find((l) => l.leaveId === id);
        if (leave) {
          setGuards((prev) => prev.map((g) =>
            g.guardId !== leave.guardId ? g : { ...g, status: "on_leave" }
          ));
        }
      }
      ok(`Leave request ${status}.`);
    } catch { err("Failed to update leave."); }
  };

  return (
    <Box style={{ background: PEACH, minHeight: "100vh" }} p="lg">

      {/* ── Page header ───────────────────────────────────────────────── */}
      <Group justify="space-between" align="center" mb="xl">
        <Group gap="sm">
          <Box style={{
            width: 40, height: 40, borderRadius: 12, flexShrink: 0,
            background: gradientBg,
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: `0 4px 12px ${CORAL}44`,
          }}>
            <IconShield size={22} color="#fff" stroke={1.8} />
          </Box>
          <Box>
            <Text fz="xs" fw={700} tt="uppercase" style={{ color: CORAL, letterSpacing: "0.08em" }}>
              Management
            </Text>
            <Text fz={{ base: 16, sm: 20 }} fw={900} c="#1a1a1a" lh={1.2}>
              Security Guard Management
            </Text>
          </Box>
        </Group>

        {/* ── Tab switcher ─────────────────────────────────────────────── */}
        <SegmentedControl
          value={activeTab}
          onChange={(v) => setActiveTab(v as ActiveTab)}
          radius="xl"
          data={TABS.map(({ value, label, icon: Icon }) => ({
            value,
            label: (
              <Group gap={6} wrap="nowrap" px={4}>
                <Icon size={14} color={activeTab === value ? "#fff" : CORAL} />
                <Text fz="sm" fw={700} style={{ color: activeTab === value ? "#fff" : CORAL }}>
                  {label}
                </Text>
              </Group>
            ),
          }))}
          styles={{
            root:        { background: "#fff", border: "1.5px solid #FFE5E5", padding: 4 },
            indicator:   { background: gradientBg, boxShadow: `0 3px 10px ${CORAL}44`, borderRadius: 999 },
            label:       { color: CORAL,  fontWeight: 700 },
            // labelActive: { color: "#fff", fontWeight: 700 },
            control:     { border: "none" },
          }}
        />
      </Group>

      {/* ── Active tab ────────────────────────────────────────────────── */}
      <SecurityGuardManagement
        activeTab={activeTab}
        guards={guards}
        gates={STATIC_GATES}
        schedules={schedules}
        leaves={leaves}
        onAddGuard={handleAddGuard}
        onEditGuard={handleEditGuard}
        onDeactivate={handleDeactivate}
        onAddSchedule={handleAddSchedule}
        onDeleteSchedule={handleDeleteSchedule}
        onApproveLeave={(id) => handleLeaveAction(id, "approved")}
        onRejectLeave={(id)  => handleLeaveAction(id, "rejected")}
      />
    </Box>
  );
};

export default SecurityGuardManagementPage;