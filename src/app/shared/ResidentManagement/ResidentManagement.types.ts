// ─── Role ────────────────────────────────────────────────────────────────────

export type ResidentManagementRole = "resident" | "soc_admin";

// ─── Society option for dropdown ─────────────────────────────────────────────

export interface SocietyOption {
  value: string;
  label: string;
}

// ─── Registration form values ─────────────────────────────────────────────────

export interface ResidentFormValues {
  fullName: string;
  phone: string;
  email: string;
  societyId: string;
  blockName: string;
  flatNumber: string;
  ownershipType: "owner" | "tenant" | "";
  moveInDate: string;
  vehicleNumber?: string;
  emergencyContact?: string;
  note?: string;
  /** Base64 or object URL — for preview and submission */
  profilePicture?: string;
  profilePictureFile?: File;
  identityProof?: string;
  identityProofFile?: File;
  identityProofType?: "aadhaar" | "pan" | "passport" | "voter_id" | "";
}

// ─── Resident request (for admin view) ───────────────────────────────────────

export type RequestStatus = "pending" | "approved" | "rejected" | "on_hold";

export interface ResidentRequest {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  societyName: string;
  blockName: string;
  flatNumber: string;
  ownershipType: "owner" | "tenant";
  moveInDate: string;
  vehicleNumber?: string;
  emergencyContact?: string;
  note?: string;
  submittedAt: string;
  status: RequestStatus;
  /** URL or base64 — set by API or local preview */
  profilePicture?: string;
  identityProof?: string;
  identityProofType?: string;
}