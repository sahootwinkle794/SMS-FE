"use client";

import { useState } from "react";
import {
  Avatar, Badge, Box, Button, Card, Center, Divider, Drawer,
  Grid, Group, Modal, Select, SimpleGrid, Stack, Text,
  Textarea, TextInput, Tooltip,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import {
  IconBuildingCommunity, IconCalendar, IconCar, IconCheck,
  IconChevronRight, IconClipboardList, IconClock, IconDeviceFloppy,
  IconHome, IconId, IconMail, IconPhoto, IconPhone, IconUpload,
  IconUser, IconUserCheck, IconUserOff, IconUserPlus, IconX, IconAlertCircle,
} from "@tabler/icons-react";
import { CORAL, CORAL_DARK, CORAL_LIGHT, PEACH, softCard } from "@/utils/constants";
import {
  ResidentFormValues, ResidentManagementRole,
  ResidentRequest, RequestStatus, SocietyOption,
} from "./ResidentManagement.types";

// ─── Static data (swap with API later) ───────────────────────────────────────

const STATIC_SOCIETIES: SocietyOption[] = [
  { value: "s1", label: "Trident Galaxy" },
  { value: "s2", label: "Green Valley Society" },
  { value: "s3", label: "DM Convention" },
];

const STATIC_BLOCKS = ["A-Block", "B-Block", "C-Block", "Q-Block", "Z-Block", "X-Block"];

const STATIC_REQUESTS: ResidentRequest[] = [
  {
    id: "r1", fullName: "Rohan Mehta", phone: "9876543210", email: "rohan@gmail.com",
    societyName: "Trident Galaxy", blockName: "A-Block", flatNumber: "101",
    ownershipType: "owner", moveInDate: "2026-03-01", vehicleNumber: "OD05AB1234",
    emergencyContact: "9876500000", note: "Moving from Pune. Have 2 cars, need extra parking.",
    submittedAt: "2026-03-10T08:30:00Z", status: "pending",
  },
  {
    id: "r2", fullName: "Priya Nair", phone: "9123456789", email: "priya@gmail.com",
    societyName: "Trident Galaxy", blockName: "B-Block", flatNumber: "204",
    ownershipType: "tenant", moveInDate: "2026-03-05", emergencyContact: "9123400000",
    submittedAt: "2026-03-09T14:00:00Z", status: "pending",
  },
  {
    id: "r3", fullName: "Suresh Patel", phone: "9000011122", email: "suresh@gmail.com",
    societyName: "Trident Galaxy", blockName: "Q-Block", flatNumber: "305",
    ownershipType: "owner", moveInDate: "2026-02-20", vehicleNumber: "MH12CD5678",
    submittedAt: "2026-03-08T10:00:00Z", status: "approved",
  },
  {
    id: "r4", fullName: "Anita Sharma", phone: "9988776655", email: "anita@gmail.com",
    societyName: "Trident Galaxy", blockName: "Z-Block", flatNumber: "402",
    ownershipType: "tenant", moveInDate: "2026-03-12",
    note: "Documents incomplete at time of submission.",
    submittedAt: "2026-03-07T09:00:00Z", status: "rejected",
  },
  {
    id: "r5", fullName: "Karan Singh", phone: "9871234560", email: "karan.singh@gmail.com",
    societyName: "Trident Galaxy", blockName: "X-Block", flatNumber: "501",
    ownershipType: "owner", moveInDate: "2026-03-15", vehicleNumber: "DL8CAB3421",
    emergencyContact: "9871200000", note: "Shifting from Delhi. Pet dog — Labrador.",
    submittedAt: "2026-03-11T07:15:00Z", status: "pending",
  },
  {
    id: "r6", fullName: "Meena Iyer", phone: "9445566778", email: "meena.iyer@outlook.com",
    societyName: "Trident Galaxy", blockName: "A-Block", flatNumber: "203",
    ownershipType: "tenant", moveInDate: "2026-03-18", emergencyContact: "9445500000",
    submittedAt: "2026-03-11T11:40:00Z", status: "pending",
  },
  {
    id: "r7", fullName: "Deepak Verma", phone: "9312233445", email: "deepak.v@yahoo.com",
    societyName: "Trident Galaxy", blockName: "B-Block", flatNumber: "108",
    ownershipType: "owner", moveInDate: "2026-03-10", vehicleNumber: "RJ14GH7890",
    note: "Ownership documents under verification with registrar.",
    submittedAt: "2026-03-10T16:00:00Z", status: "on_hold",
  },
  {
    id: "r8", fullName: "Sunita Rao", phone: "9654321098", email: "sunita.rao@gmail.com",
    societyName: "Trident Galaxy", blockName: "Q-Block", flatNumber: "410",
    ownershipType: "tenant", moveInDate: "2026-02-28",
    submittedAt: "2026-03-05T09:00:00Z", status: "approved",
  },
  {
    id: "r9", fullName: "Amit Joshi", phone: "9776655443", email: "amit.j@gmail.com",
    societyName: "Trident Galaxy", blockName: "Z-Block", flatNumber: "302",
    ownershipType: "owner", moveInDate: "2026-03-20", vehicleNumber: "GJ01KL4567",
    emergencyContact: "9776600000",
    submittedAt: "2026-03-12T13:20:00Z", status: "pending",
  },
  {
    id: "r10", fullName: "Fatima Khan", phone: "9900887766", email: "fatima.k@gmail.com",
    societyName: "Trident Galaxy", blockName: "X-Block", flatNumber: "601",
    ownershipType: "tenant", moveInDate: "2026-03-22",
    note: "Work from home professional. Needs stable internet — please confirm fiber availability.",
    submittedAt: "2026-03-12T15:55:00Z", status: "pending",
  },
  {
    id: "r11", fullName: "Ravi Shankar", phone: "9833221100", email: "ravi.s@rediffmail.com",
    societyName: "Trident Galaxy", blockName: "A-Block", flatNumber: "304",
    ownershipType: "owner", moveInDate: "2026-02-15", vehicleNumber: "TN09PQ2233",
    submittedAt: "2026-03-01T08:00:00Z", status: "approved",
  },
  {
    id: "r12", fullName: "Neha Gupta", phone: "9567890123", email: "neha.gupta@gmail.com",
    societyName: "Trident Galaxy", blockName: "B-Block", flatNumber: "505",
    ownershipType: "tenant", moveInDate: "2026-03-25",
    note: "Awaiting NOC from previous society.",
    submittedAt: "2026-03-13T10:10:00Z", status: "on_hold",
  },
];

// ─── Design helpers ───────────────────────────────────────────────────────────

const gradientBg = `linear-gradient(135deg, ${CORAL} 0%, ${CORAL_LIGHT} 100%)`;

const STATUS_CONFIG: Record<RequestStatus, { label: string; color: string; icon: typeof IconCheck }> = {
  pending:  { label: "Pending",   color: "orange", icon: IconClock     },
  approved: { label: "Approved",  color: "teal",   icon: IconCheck     },
  rejected: { label: "Rejected",  color: "red",    icon: IconX         },
  on_hold:  { label: "On Hold",   color: "blue",   icon: IconAlertCircle },
};

// ─── Props ────────────────────────────────────────────────────────────────────

interface ResidentManagementProps {
  role: ResidentManagementRole;
  /** Resident's pre-filled phone (from auth) */
  residentPhone?: string;
  /** Whether the resident has already submitted — hides form, shows status */
  hasSubmitted?: boolean;
  /** Admin: pre-loaded requests (replace static data with this when dynamic) */
  requests?: ResidentRequest[];
  /** Admin: can also open the registration form to add a resident manually */
  onSubmitForm?: (values: ResidentFormValues) => void;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  onHold?: (id: string) => void;
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function ResidentManagement({
  role,
  residentPhone = "",
  hasSubmitted = false,
  requests = STATIC_REQUESTS,
  onSubmitForm,
  onApprove,
  onReject,
  onHold,
}: ResidentManagementProps) {

  const [addFormOpen,      setAddFormOpen]      = useState(false);
  const [residentFormOpen, setResidentFormOpen] = useState(false);

  return (
    <Box style={{ background: PEACH, minHeight: "100vh" }} p="lg">

      {/* ── Page Header ─────────────────────────────────────────────────── */}
      <Group justify="space-between" align="center" mb="xl">
        <Group gap="sm">
          <Box style={{
            width: 40, height: 40, borderRadius: 12, flexShrink: 0,
            background: gradientBg,
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: `0 4px 12px ${CORAL}44`,
          }}>
            <IconUserPlus size={20} color="#fff" stroke={1.6} />
          </Box>
          <Box>
            <Text fz="xs" fw={700} tt="uppercase" style={{ color: CORAL, letterSpacing: "0.08em" }}>
              {role === "resident" ? "Registration" : "Management"}
            </Text>
            <Text fz={{ base: 16, sm: 20 }} fw={900} c="#1a1a1a" lh={1.2}>
              Resident Management
            </Text>
          </Box>
        </Group>

        {/* Admin can manually add a resident */}
        {role === "soc_admin" && (
          <Button
            onClick={() => setAddFormOpen(true)}
            radius="xl"
            leftSection={<IconUserPlus size={15} stroke={2} />}
            style={{
              background: gradientBg,
              border: "none",
              fontWeight: 800,
              boxShadow: `0 4px 14px ${CORAL}55`,
            }}
          >
            Add Resident
          </Button>
        )}
      </Group>

      {/* ── Role views ──────────────────────────────────────────────────── */}
      {role === "resident" ? (
        hasSubmitted ? (
          <SubmittedState phone={residentPhone} />
        ) : (
          <ResidentLanding
            phone={residentPhone}
            onOpenForm={() => setResidentFormOpen(true)}
          />
        )
      ) : (
        <AdminView
          requests={requests}
          onApprove={onApprove}
          onReject={onReject}
          onHold={onHold}
        />
      )}

      {/* ── Admin: Add Resident Drawer ───────────────────────────────────── */}
      <Drawer
        opened={addFormOpen}
        onClose={() => setAddFormOpen(false)}
        position="right"
        size="lg"
        padding="xl"
        title={
          <Group gap="sm">
            <Box style={{
              width: 32, height: 32, borderRadius: 8,
              background: gradientBg,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <IconUserPlus size={16} color="#fff" />
            </Box>
            <Box>
              <Text fw={900} fz="sm" c="#1a1a1a">Add Resident</Text>
              <Text fz="xs" c="dimmed">Fill in resident details</Text>
            </Box>
          </Group>
        }
        styles={{
          header: { background: PEACH, borderBottom: "1.5px solid #FFE5E5" },
          body:   { background: PEACH },
        }}
      >
        <RegistrationForm
          societies={STATIC_SOCIETIES}
          onSubmit={(vals) => { onSubmitForm?.(vals); setAddFormOpen(false); }}
          onCancel={() => setAddFormOpen(false)}
          submitLabel="Add Resident"
        />
      </Drawer>

      {/* ── Resident: Registration Drawer ───────────────────────────────── */}
      <Drawer
        opened={residentFormOpen}
        onClose={() => setResidentFormOpen(false)}
        position="right"
        size="xl"
        padding="xl"
        title={
          <Group gap="sm">
            <Box style={{
              width: 32, height: 32, borderRadius: 8,
              background: gradientBg,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <IconUserPlus size={16} color="#fff" />
            </Box>
            <Box>
              <Text fw={900} fz="sm" c="#1a1a1a">Society Registration</Text>
              <Text fz="xs" c="dimmed">Fill in your details to register</Text>
            </Box>
          </Group>
        }
        styles={{
          header: { background: PEACH, borderBottom: "1.5px solid #FFE5E5" },
          body:   { background: PEACH },
        }}
      >
        <RegistrationForm
          societies={STATIC_SOCIETIES}
          defaultPhone={residentPhone}
          onSubmit={(vals) => { onSubmitForm?.(vals); setResidentFormOpen(false); }}
          onCancel={() => setResidentFormOpen(false)}
          submitLabel="Submit Registration"
        />
      </Drawer>
    </Box>
  );
}

// ─── Resident: already submitted state ───────────────────────────────────────

function SubmittedState({ phone }: { phone: string }) {
  return (
    <Center mt={60}>
      <Stack align="center" gap="md" maw={480}>
        <Box style={{
          width: 72, height: 72, borderRadius: "50%",
          background: gradientBg,
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: `0 8px 24px ${CORAL}44`,
        }}>
          <IconClipboardList size={34} color="#fff" stroke={1.4} />
        </Box>
        <Text fz="xl" fw={900} c="#1a1a1a" ta="center">Request Submitted!</Text>
        <Text fz="sm" c="dimmed" ta="center" lh={1.7}>
          Your registration request has been submitted successfully.
          The society administrator will review your details and approve your access shortly.
          You will be notified on <strong>{phone || "your registered number"}</strong>.
        </Text>
        <Box style={{
          ...softCard, borderRadius: 16, padding: "12px 24px",
          background: "#fff8f8",
        }}>
          <Group gap="xs">
            <IconClock size={15} color={CORAL} />
            <Text fz="xs" fw={700} style={{ color: CORAL }}>Typically approved within 24–48 hours</Text>
          </Group>
        </Box>
      </Stack>
    </Center>
  );
}

// ─── Resident: landing / CTA ─────────────────────────────────────────────────

function ResidentLanding({
  phone,
  onOpenForm,
}: {
  phone: string;
  onOpenForm: () => void;
}) {
  return (
    <Center mt={40}>
      <Card radius="xl" padding="xl" style={{ ...softCard, maxWidth: 520, width: "100%" }}>
        <Stack align="center" gap="lg" ta="center">
          <Box style={{
            width: 72, height: 72, borderRadius: "50%",
            background: gradientBg,
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: `0 8px 24px ${CORAL}44`,
          }}>
            <IconUserCheck size={34} color="#fff" stroke={1.4} />
          </Box>

          <Box>
            <Text fw={900} fz="xl" c="#1a1a1a" mb={6}>Almost there!</Text>
            <Text fz="sm" c="dimmed" lh={1.8}>
              Your account has been created using{" "}
              <strong style={{ color: CORAL_DARK }}>{phone || "your phone number"}</strong>.
              <br />
              Complete your society registration to get full access.
            </Text>
          </Box>

          <Divider w="100%" color="#FFE5E5" />

          {/* Steps */}
          <Stack gap="sm" w="100%">
            {[
              { icon: IconClipboardList,    text: "Fill your registration details"       },
              { icon: IconBuildingCommunity,text: "Select your society & flat/unit"      },
              { icon: IconUserCheck,        text: "Admin reviews and approves your request" },
            ].map((step, i) => (
              <Group key={i} gap="sm">
                <Box style={{
                  width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
                  background: PEACH, border: "1.5px solid #FFCCCC",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <step.icon size={15} color={CORAL} />
                </Box>
                <Text fz="sm" fw={600} c="#444" ta="left">{step.text}</Text>
              </Group>
            ))}
          </Stack>

          <Button
            onClick={onOpenForm}
            size="md"
            radius="xl"
            fullWidth
            leftSection={<IconUserPlus size={17} stroke={2} />}
            style={{
              background: gradientBg,
              border: "none",
              fontWeight: 800,
              boxShadow: `0 4px 16px ${CORAL}55`,
              marginTop: 4,
            }}
          >
            Register Now
          </Button>

          <Text fz="xs" c="dimmed">Takes less than 2 minutes</Text>
        </Stack>
      </Card>
    </Center>
  );
}

// ─── Shared registration form ─────────────────────────────────────────────────

function RegistrationForm({
  societies,
  defaultPhone = "",
  onSubmit,
  onCancel,
  submitLabel = "Submit",
}: {
  societies: SocietyOption[];
  defaultPhone?: string;
  onSubmit?: (v: ResidentFormValues) => void;
  onCancel?: () => void;
  submitLabel?: string;
}) {
  const [form, setForm] = useState<ResidentFormValues>({
    fullName: "", phone: defaultPhone, email: "",
    societyId: "", blockName: "", flatNumber: "",
    ownershipType: "", moveInDate: "",
    vehicleNumber: "", emergencyContact: "", note: "",
    profilePicture: "", identityProof: "", identityProofType: "",
  });

  const set = (key: keyof ResidentFormValues, val: string) =>
    setForm((p) => ({ ...p, [key]: val }));

  // Handle file pick — store File object + object URL for preview
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fileKey: "profilePictureFile" | "identityProofFile",
    previewKey: "profilePicture" | "identityProof",
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setForm((p) => ({ ...p, [fileKey]: file, [previewKey]: url }));
  };

  const inputStyle = {
    input: { borderColor: "#FFE5E5", borderRadius: 12, fontWeight: 600 },
    label: { fontWeight: 700, fontSize: 12, color: "#888", textTransform: "uppercase" as const, letterSpacing: "0.05em" },
  };

  return (
    <Stack gap="md">
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
        <TextInput label="Full Name" placeholder="Rohan Mehta"
          leftSection={<IconUser size={15} color={CORAL} />}
          value={form.fullName} onChange={(e) => set("fullName", e.target.value)}
          styles={inputStyle} radius="md" />

        <TextInput label="Phone Number" placeholder="98765 43210"
          leftSection={<IconPhone size={15} color={CORAL} />}
          value={form.phone} onChange={(e) => set("phone", e.target.value)}
          styles={inputStyle} radius="md" />

        <TextInput label="Email Address" placeholder="you@example.com"
          leftSection={<IconMail size={15} color={CORAL} />}
          value={form.email} onChange={(e) => set("email", e.target.value)}
          styles={inputStyle} radius="md" />

        <Select label="Society" placeholder="Select society"
          leftSection={<IconBuildingCommunity size={15} color={CORAL} />}
          data={societies} value={form.societyId}
          onChange={(v) => set("societyId", v ?? "")}
          styles={inputStyle} radius="md" />

        <Select label="Block" placeholder="Select block"
          leftSection={<IconHome size={15} color={CORAL} />}
          data={STATIC_BLOCKS} value={form.blockName}
          onChange={(v) => set("blockName", v ?? "")}
          styles={inputStyle} radius="md" />

        <TextInput label="Flat / Unit Number" placeholder="101"
          leftSection={<IconHome size={15} color={CORAL} />}
          value={form.flatNumber} onChange={(e) => set("flatNumber", e.target.value)}
          styles={inputStyle} radius="md" />

        <Select label="Ownership Type" placeholder="Owner / Tenant"
          leftSection={<IconUserCheck size={15} color={CORAL} />}
          data={[{ value: "owner", label: "Owner" }, { value: "tenant", label: "Tenant" }]}
          value={form.ownershipType} onChange={(v) => set("ownershipType", v ?? "")}
          styles={inputStyle} radius="md" />

        <TextInput label="Move-in Date" placeholder="DD/MM/YYYY"
          leftSection={<IconCalendar size={15} color={CORAL} />}
          value={form.moveInDate} onChange={(e) => set("moveInDate", e.target.value)}
          styles={inputStyle} radius="md" />

        <TextInput label="Vehicle Number (optional)" placeholder="OD05AB1234"
          leftSection={<IconCar size={15} color={CORAL} />}
          value={form.vehicleNumber} onChange={(e) => set("vehicleNumber", e.target.value)}
          styles={inputStyle} radius="md" />

        <TextInput label="Emergency Contact (optional)" placeholder="98765 00000"
          leftSection={<IconPhone size={15} color={CORAL} />}
          value={form.emergencyContact} onChange={(e) => set("emergencyContact", e.target.value)}
          styles={inputStyle} radius="md" />
      </SimpleGrid>

      <Textarea label="Additional Note (optional)" placeholder="Anything the admin should know…"
        value={form.note} onChange={(e) => set("note", e.target.value)}
        minRows={3} radius="md"
        styles={inputStyle} />

      {/* ── Uploads ── */}
      <Box style={{ ...softCard, borderRadius: 16, padding: 16 }}>
        <Text fz="10px" fw={800} tt="uppercase" c="dimmed" mb="md" style={{ letterSpacing: "0.07em" }}>
          Documents & Photo
        </Text>
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">

          {/* Profile picture */}
          <Box>
            <Text fz="xs" fw={700} c="#888" tt="uppercase" mb={6} style={{ letterSpacing: "0.05em" }}>
              Profile Picture
            </Text>
            <Box
              component="label"
              htmlFor="profilePicInput"
              style={{
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                gap: 8, cursor: "pointer",
                border: `2px dashed #FFCCCC`,
                borderRadius: 12, padding: 12,
                background: form.profilePicture ? "transparent" : PEACH,
                transition: "border-color 0.15s",
                minHeight: 110, position: "relative", overflow: "hidden",
              }}
            >
              {form.profilePicture ? (
                <img
                  src={form.profilePicture}
                  alt="Profile preview"
                  style={{ width: 80, height: 80, borderRadius: "50%", objectFit: "cover" }}
                />
              ) : (
                <>
                  <Box style={{
                    width: 40, height: 40, borderRadius: "50%",
                    background: "#fff", border: "1.5px solid #FFCCCC",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <IconPhoto size={18} color={CORAL} />
                  </Box>
                  <Text fz="xs" fw={700} c="dimmed">Click to upload photo</Text>
                  <Text fz="10px" c="dimmed">JPG, PNG up to 2MB</Text>
                </>
              )}
              <input
                id="profilePicInput" type="file" accept="image/*"
                style={{ display: "none" }}
                onChange={(e) => handleFileChange(e, "profilePictureFile", "profilePicture")}
              />
            </Box>
          </Box>

          {/* Identity proof */}
          <Box>
            <Text fz="xs" fw={700} c="#888" tt="uppercase" mb={6} style={{ letterSpacing: "0.05em" }}>
              Identity Proof
            </Text>
            <Select
              placeholder="Select document type"
              data={[
                { value: "aadhaar",  label: "Aadhaar Card" },
                { value: "pan",      label: "PAN Card"     },
                { value: "passport", label: "Passport"     },
                { value: "voter_id", label: "Voter ID"     },
              ]}
              value={form.identityProofType ?? ""}
              onChange={(v) => set("identityProofType", v ?? "")}
              leftSection={<IconId size={14} color={CORAL} />}
              mb={8} radius="md"
              styles={inputStyle}
            />
            <Box
              component="label"
              htmlFor="idProofInput"
              style={{
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                gap: 8, cursor: "pointer",
                border: `2px dashed #FFCCCC`,
                borderRadius: 12, padding: 12,
                background: form.identityProof ? "transparent" : PEACH,
                minHeight: 78, position: "relative", overflow: "hidden",
              }}
            >
              {form.identityProof ? (
                <Group gap="xs">
                  <IconId size={18} color={CORAL} />
                  <Text fz="xs" fw={700} style={{ color: CORAL }}>Document uploaded ✓</Text>
                </Group>
              ) : (
                <>
                  <Box style={{
                    width: 36, height: 36, borderRadius: "50%",
                    background: "#fff", border: "1.5px solid #FFCCCC",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <IconUpload size={16} color={CORAL} />
                  </Box>
                  <Text fz="xs" fw={700} c="dimmed">Click to upload document</Text>
                  <Text fz="10px" c="dimmed">JPG, PNG, PDF up to 5MB</Text>
                </>
              )}
              <input
                id="idProofInput" type="file" accept="image/*,.pdf"
                style={{ display: "none" }}
                onChange={(e) => handleFileChange(e, "identityProofFile", "identityProof")}
              />
            </Box>
          </Box>

        </SimpleGrid>
      </Box>

      <Group justify="flex-end" mt="sm" gap="sm">
        {onCancel && (
          <Button variant="subtle" color="gray" radius="xl" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button
          radius="xl"
          leftSection={<IconDeviceFloppy size={15} />}
          style={{ background: gradientBg, border: "none", fontWeight: 800, boxShadow: `0 4px 14px ${CORAL}55` }}
          onClick={() => onSubmit?.(form)}
        >
          {submitLabel}
        </Button>
      </Group>
    </Stack>
  );
}

// ─── Admin view ───────────────────────────────────────────────────────────────

function AdminView({
  requests,
  onApprove,
  onReject,
  onHold,
}: {
  requests: ResidentRequest[];
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  onHold?: (id: string) => void;
}) {
  const [selected, setSelected] = useState<ResidentRequest | null>(null);
  const [filter,   setFilter]   = useState<RequestStatus | "all">("all");

  const counts = {
    all:      requests.length,
    pending:  requests.filter((r) => r.status === "pending").length,
    approved: requests.filter((r) => r.status === "approved").length,
    rejected: requests.filter((r) => r.status === "rejected").length,
    on_hold:  requests.filter((r) => r.status === "on_hold").length,
  };

  const filtered = filter === "all" ? requests : requests.filter((r) => r.status === filter);

  return (
    <>
      {/* ── Summary stat pills ── */}
      <SimpleGrid cols={{ base: 2, sm: 5 }} mb="lg" spacing="sm">
        {(["all", "pending", "approved", "rejected", "on_hold"] as const).map((s) => {
          const active = filter === s;
          const cfg = s === "all" ? null : STATUS_CONFIG[s];
          return (
            <Box
              key={s}
              onClick={() => setFilter(s)}
              style={{
                ...softCard,
                borderRadius: 16,
                padding: "12px 16px",
                cursor: "pointer",
                background: active ? gradientBg : "#fff",
                border: active ? "none" : "1.5px solid #FFE5E5",
                boxShadow: active ? `0 4px 14px ${CORAL}44` : undefined,
                transition: "all 0.15s",
              }}
            >
              <Text fz="xs" fw={700}
                style={{ color: active ? "rgba(255,255,255,0.85)" : "#999", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                {s === "all" ? "All" : cfg?.label}
              </Text>
              <Text fz={22} fw={900} style={{ color: active ? "#fff" : CORAL_DARK }}>{counts[s]}</Text>
            </Box>
          );
        })}
      </SimpleGrid>

      {/* ── Request list ── */}
      {filtered.length === 0 ? (
        <Center mt={60}>
          <Stack align="center" gap="sm">
            <Text fz={36}>📭</Text>
            <Text fw={700} c="#1a1a1a">No requests here</Text>
            <Text fz="sm" c="dimmed">No resident requests match this filter.</Text>
          </Stack>
        </Center>
      ) : (
        <Stack gap="sm">
          {filtered.map((req) => (
            <ResidentRequestCard
              key={req.id}
              request={req}
              onView={() => setSelected(req)}
              onApprove={() => onApprove?.(req.id)}
              onReject={() => onReject?.(req.id)}
              onHold={() => onHold?.(req.id)}
            />
          ))}
        </Stack>
      )}

      {/* ── Detail drawer ── */}
      <ResidentDetailDrawer
        request={selected}
        onClose={() => setSelected(null)}
        onApprove={() => { onApprove?.(selected!.id); setSelected(null); }}
        onReject={() => { onReject?.(selected!.id);  setSelected(null); }}
        onHold={() => { onHold?.(selected!.id);    setSelected(null); }}
      />
    </>
  );
}

// ─── Request card ─────────────────────────────────────────────────────────────

function ResidentRequestCard({
  request: r,
  onView, onApprove, onReject, onHold,
}: {
  request: ResidentRequest;
  onView: () => void;
  onApprove: () => void;
  onReject: () => void;
  onHold: () => void;
}) {
  const cfg = STATUS_CONFIG[r.status];

  return (
    <Card radius="xl" padding="md" style={softCard}>
      <Group justify="space-between" wrap="nowrap" gap="md">

        {/* Avatar + basic info */}
        <Group gap="sm" wrap="nowrap" style={{ flex: 1, minWidth: 0 }}>
          <Avatar
            size={46} radius="xl"
            style={{ background: 'lightgray', fontWeight: 900, fontSize: 18, color: "#fff", flexShrink: 0 }}
          >
            {r.fullName.charAt(0)}
          </Avatar>
          <Box style={{ minWidth: 0 }}>
            <Group gap="xs" wrap="nowrap">
              <Text fz="sm" fw={800} c="#1a1a1a" truncate>{r.fullName}</Text>
              <Badge size="xs" variant="light" color={cfg.color} fw={700}>{cfg.label}</Badge>
            </Group>
            <Text fz="xs" c="dimmed" fw={600}>
              {r.blockName} · Flat {r.flatNumber} · {r.ownershipType === "owner" ? "Owner" : "Tenant"}
            </Text>
            <Text fz="xs" c="dimmed">{r.phone} · {r.email}</Text>
          </Box>
        </Group>

        {/* Actions */}
        <Group gap="xs" wrap="nowrap" style={{ flexShrink: 0 }}>
          {r.status === "pending" && (
            <>
              <Tooltip label="Approve">
                <Button size="xs" radius="xl" variant="light" color="teal"
                  onClick={onApprove} style={{ fontWeight: 800 }}>
                  <IconCheck size={14} />
                </Button>
              </Tooltip>
              <Tooltip label="Hold">
                <Button size="xs" radius="xl" variant="light" color="blue"
                  onClick={onHold} style={{ fontWeight: 800 }}>
                  <IconAlertCircle size={14} />
                </Button>
              </Tooltip>
              <Tooltip label="Reject">
                <Button size="xs" radius="xl" variant="light" color="red"
                  onClick={onReject} style={{ fontWeight: 800 }}>
                  <IconX size={14} />
                </Button>
              </Tooltip>
            </>
          )}
          <Tooltip label="View Details">
            <Button size="xs" radius="xl" variant="subtle" color="gray"
              onClick={onView}>
              <IconChevronRight size={14} />
            </Button>
          </Tooltip>
        </Group>

      </Group>
    </Card>
  );
}

// ─── Detail drawer ────────────────────────────────────────────────────────────

function ResidentDetailDrawer({
  request: r,
  onClose, onApprove, onReject, onHold,
}: {
  request: ResidentRequest | null;
  onClose: () => void;
  onApprove: () => void;
  onReject: () => void;
  onHold: () => void;
}) {
  if (!r) return null;
  const cfg = STATUS_CONFIG[r.status];

  return (
    <Drawer
      opened={!!r}
      onClose={onClose}
      position="right"
      size="md"
      padding="xl"
      title={
        <Group gap="sm">
          <Avatar size={36} radius="xl"
            style={{ background: 'lightgray', fontWeight: 900, color: "#fff" }}>
            {r.fullName.charAt(0)}
          </Avatar>
          <Box>
            <Text fw={900} fz="sm" c="#1a1a1a">{r.fullName}</Text>
            <Badge size="xs" variant="light" color={cfg.color} fw={700}>{cfg.label}</Badge>
          </Box>
        </Group>
      }
      styles={{
        header: { background: PEACH, borderBottom: "1.5px solid #FFE5E5" },
        body:   { background: PEACH },
      }}
    >
      <Stack gap="md">

        {/* Personal */}
        <DrawerSection label="Personal Details">
          <InfoRow icon={IconUser}               label="Full Name"   value={r.fullName}       />
          <InfoRow icon={IconPhone}              label="Phone"       value={r.phone}          />
          <InfoRow icon={IconMail}               label="Email"       value={r.email}          />
          {r.emergencyContact &&
            <InfoRow icon={IconPhone}            label="Emergency"   value={r.emergencyContact} />}
        </DrawerSection>

        {/* Residence */}
        <DrawerSection label="Residence Details">
          <InfoRow icon={IconBuildingCommunity}  label="Society"     value={r.societyName}    />
          <InfoRow icon={IconHome}               label="Block"       value={r.blockName}      />
          <InfoRow icon={IconHome}               label="Flat"        value={r.flatNumber}     />
          <InfoRow icon={IconUserCheck}          label="Type"        value={r.ownershipType === "owner" ? "Owner" : "Tenant"} />
          <InfoRow icon={IconCalendar}           label="Move-in"     value={r.moveInDate}     />
          {r.vehicleNumber &&
            <InfoRow icon={IconCar}             label="Vehicle"     value={r.vehicleNumber}  />}
        </DrawerSection>

        {r.note && (
          <DrawerSection label="Note">
            <Text fz="sm" fw={600} c="#444" style={{ lineHeight: 1.6 }}>{r.note}</Text>
          </DrawerSection>
        )}

        {/* Documents */}
        {(r.profilePicture || r.identityProof) && (
          <DrawerSection label="Uploaded Documents">
            <SimpleGrid cols={2} spacing="sm">

              {r.profilePicture && (
                <Box>
                  <Text fz="10px" fw={700} c="dimmed" tt="uppercase" mb={6} style={{ letterSpacing: "0.05em" }}>
                    Profile Photo
                  </Text>
                  <Box style={{
                    borderRadius: 12, overflow: "hidden",
                    border: "1.5px solid #FFE5E5",
                    background: PEACH,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    height: 120,
                  }}>
                    <img
                      src={r.profilePicture}
                      alt="Profile"
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </Box>
                </Box>
              )}

              {r.identityProof && (
                <Box>
                  <Text fz="10px" fw={700} c="dimmed" tt="uppercase" mb={6} style={{ letterSpacing: "0.05em" }}>
                    {r.identityProofType
                      ? r.identityProofType.replace("_", " ").replace(/\w/g, (c) => c.toUpperCase())
                      : "Identity Proof"}
                  </Text>
                  {r.identityProof.startsWith("data:image") || r.identityProof.match(/\.(jpg|jpeg|png|webp)/i) ? (
                    <Box style={{
                      borderRadius: 12, overflow: "hidden",
                      border: "1.5px solid #FFE5E5",
                      height: 120,
                    }}>
                      <img
                        src={r.identityProof}
                        alt="ID Proof"
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    </Box>
                  ) : (
                    <Box
                      component="a"
                      href={r.identityProof}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        display: "flex", flexDirection: "column",
                        alignItems: "center", justifyContent: "center",
                        gap: 6, borderRadius: 12, height: 120,
                        border: "1.5px solid #FFE5E5",
                        background: PEACH, cursor: "pointer",
                        textDecoration: "none",
                      }}
                    >
                      <IconId size={28} color={CORAL} stroke={1.4} />
                      <Text fz="xs" fw={700} style={{ color: CORAL }}>View Document</Text>
                    </Box>
                  )}
                </Box>
              )}

            </SimpleGrid>
          </DrawerSection>
        )}

        {/* Actions */}
        {r.status === "pending" && (
          <Group grow mt="sm" gap="sm">
            <Button radius="xl" color="teal" leftSection={<IconCheck size={15} />}
              onClick={onApprove} style={{ fontWeight: 800 }}>
              Approve
            </Button>
            <Button radius="xl" color="blue" variant="light" leftSection={<IconAlertCircle size={15} />}
              onClick={onHold} style={{ fontWeight: 800 }}>
              Hold
            </Button>
            <Button radius="xl" color="red" variant="light" leftSection={<IconUserOff size={15} />}
              onClick={onReject} style={{ fontWeight: 800 }}>
              Reject
            </Button>
          </Group>
        )}

      </Stack>
    </Drawer>
  );
}

// ─── Small helpers ────────────────────────────────────────────────────────────

function DrawerSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <Box style={{ ...softCard, borderRadius: 16, padding: 16 }}>
      <Text fz="10px" fw={800} tt="uppercase" c="dimmed" mb="sm" style={{ letterSpacing: "0.07em" }}>
        {label}
      </Text>
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