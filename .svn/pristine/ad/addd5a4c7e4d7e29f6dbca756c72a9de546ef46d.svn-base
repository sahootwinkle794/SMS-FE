// ─── Slot status ─────────────────────────────────────────────────────────────

export type SlotStatus = "available" | "occupied" | "blocked";

// ─── Resident info attached to an occupied/reserved slot ─────────────────────

export interface SlotResident {
  residentId: string;
  name: string;
  flatNumber: string;
  phone: string;
  vehicleNumber: string;
  vehicleType: "2-wheeler" | "4-wheeler";
  allottedDate: string;
}

// ─── A single parking slot ────────────────────────────────────────────────────

export interface ParkingSlot {
  slotId: string;
  slotLabel: string;   // e.g. "A-01", "A-02"
  row: string;         // e.g. "Row A", "Row B"
  status: SlotStatus;
  resident?: SlotResident;
}

// ─── A block with its slots ───────────────────────────────────────────────────

export interface ParkingBlock {
  blockId: string;
  blockName: string;
  totalSlots: number;
  slots: ParkingSlot[];
}

// ─── Allot form values ────────────────────────────────────────────────────────

export interface AllotFormValues {
  slotId: string;
  residentName: string;
  flatNumber: string;
  phone: string;
  vehicleNumber: string;
  vehicleType: "2-wheeler" | "4-wheeler" | "";
}