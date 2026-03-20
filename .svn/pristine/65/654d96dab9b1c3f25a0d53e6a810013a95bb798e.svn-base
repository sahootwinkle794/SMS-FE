"use client";

import { useState } from "react";
import { Box, Group, SegmentedControl, Text } from "@mantine/core";
import { IconCar, IconClipboardList, IconParking } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";

import { ParkingSlotAllotment } from "@/components/ParkingSlotAllotment/ParkingSlotAllotment";
import { VehicleRegistration }  from "@/components/VehicleRegistration";
import { GuestVehicleTracking } from "@/components/GuestVehicleTracking";

import { AllotFormValues, ParkingBlock } from "@/components/ParkingSlotAllotment/ParkingSlotAllotment.types";
import { RegisteredVehicle, VehicleFormValues, VehicleStatus, STATIC_VEHICLES } from "@/components/VehicleRegistration/VehicleRegistration.types";
import { GuestVehicleLog, STATIC_GUEST_LOGS } from "@/components/GuestVehicleTracking/GuestVehicleTracking.types";
import { STATIC_PARKING_BLOCKS } from "@/mock/ParkingSlotAllotment.data";
import { CORAL, CORAL_LIGHT, PEACH, softCard } from "@/utils/constants";

// ─── Tab definitions ──────────────────────────────────────────────────────────

type ActiveTab = "slots" | "vehicles" | "guests";

const TABS: { value: ActiveTab; label: string; icon: typeof IconParking }[] = [
  { value: "slots",    label: "Slot Allotment",      icon: IconParking       },
  { value: "vehicles", label: "Vehicle Registration", icon: IconCar           },
  { value: "guests",   label: "Guest Tracking",       icon: IconClipboardList },
];

const gradientBg = `linear-gradient(135deg, ${CORAL} 0%, ${CORAL_LIGHT} 100%)`;

// ─── Page ─────────────────────────────────────────────────────────────────────

const ParkingManagementPage = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>("slots");
  const [blocks, setBlocks] = useState<ParkingBlock[]>(STATIC_PARKING_BLOCKS);
  const [vehicles, setVehicles] = useState<RegisteredVehicle[]>(STATIC_VEHICLES);
  const [guestLogs] = useState<GuestVehicleLog[]>(STATIC_GUEST_LOGS);

  const ok  = (msg: string) => notifications.show({ title: "Success", message: msg, color: "teal"  });
  const err = (msg: string) => notifications.show({ title: "Error",   message: msg, color: "red"   });

  // ── Slot handlers ──────────────────────────────────────────────────────────
  const handleAllot = async (slotId: string, values: AllotFormValues) => {
    try {
      setBlocks((prev) => prev.map((block) => ({
        ...block,
        slots: block.slots.map((slot) =>
          slot.slotId !== slotId ? slot : {
            ...slot, status: "occupied" as const,
            resident: {
              residentId:    Date.now().toString(),
              name:          values.residentName,
              flatNumber:    values.flatNumber,
              phone:         values.phone,
              vehicleNumber: values.vehicleNumber,
              vehicleType:   values.vehicleType as "2-wheeler" | "4-wheeler",
              allottedDate:  new Date().toISOString().split("T")[0],
            },
          }
        ),
      })));
      ok(`Slot ${slotId} allotted to ${values.residentName}.`);
    } catch { err("Failed to allot slot."); }
  };

  const handleRelease = async (slotId: string) => {
    try {
      setBlocks((prev) => prev.map((block) => ({
        ...block,
        slots: block.slots.map((slot) =>
          slot.slotId !== slotId ? slot : { ...slot, status: "available" as const, resident: undefined }
        ),
      })));
      ok(`Slot ${slotId} released.`);
    } catch { err("Failed to release slot."); }
  };

  // ── Vehicle handlers ───────────────────────────────────────────────────────
  const handleAddVehicle = async (values: VehicleFormValues) => {
    try {
      const newV: RegisteredVehicle = {
        ...values,
        vehicleId:       Date.now().toString(),
        vehicleType:     values.vehicleType as "2-wheeler" | "4-wheeler",
        registeredDate:  new Date().toISOString().split("T")[0],
      };
      setVehicles((prev) => [newV, ...prev]);
      ok(`Vehicle ${values.vehicleNumber} registered.`);
    } catch { err("Failed to register vehicle."); }
  };

  const handleEditVehicle = async (values: VehicleFormValues) => {
    try {
      setVehicles((prev) => prev.map((v) =>
        v.vehicleId !== values.vehicleId ? v : { ...v, ...values, vehicleType: values.vehicleType as "2-wheeler" | "4-wheeler" }
      ));
      ok(`Vehicle ${values.vehicleNumber} updated.`);
    } catch { err("Failed to update vehicle."); }
  };

  const handleToggleVehicle = async (vehicleId: string, status: VehicleStatus) => {
    try {
      setVehicles((prev) => prev.map((v) =>
        v.vehicleId !== vehicleId ? v : { ...v, status }
      ));
      ok(`Vehicle marked as ${status}.`);
    } catch { err("Failed to update status."); }
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
            <IconParking size={22} color="#fff" stroke={1.8} />
          </Box>
          <Box>
            <Text fz="xs" fw={700} tt="uppercase" style={{ color: CORAL, letterSpacing: "0.08em" }}>
              Management
            </Text>
            <Text fz={{ base: 16, sm: 20 }} fw={900} c="#1a1a1a" lh={1.2}>
              Parking Management
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

      {/* ── Active view ───────────────────────────────────────────────── */}
      {activeTab === "slots" && (
        <ParkingSlotAllotment
          blocks={blocks}
          onAllot={handleAllot}
          onRelease={handleRelease}
          hideHeader  // header is now owned by this page
        />
      )}

      {activeTab === "vehicles" && (
        <VehicleRegistration
          vehicles={vehicles}
          onAdd={handleAddVehicle}
          onEdit={handleEditVehicle}
          onToggle={handleToggleVehicle}
        />
      )}

      {activeTab === "guests" && (
        <GuestVehicleTracking logs={guestLogs} />
      )}

    </Box>
  );
};

export default ParkingManagementPage;