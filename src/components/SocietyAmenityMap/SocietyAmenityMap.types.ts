// ─── API response types ───────────────────────────────────────────────────────

export interface AmenityDetail {
  id: string;
  amenityCode: string;
  amenityName: string;
  amenityDescription: string;
  amenityIconUrl: string;
  isAmenityChargeable: boolean;
  isAmenityActive: number;   // 1 = active, 2 = inactive
  amenityMetadata: Record<string, unknown>;
  displayOrder: number;
  status: number;            // 1 = active, 0 = inactive
}

export interface CategoryWithAmenities {
  categoryCode: string;
  categoryName: string;
  amenityDetails: AmenityDetail[];
}

export interface CatAmenityMapApiResponse {
  status: number;
  message: string;
  data: {
    data: CategoryWithAmenities[];
  };
}

// ─── Society option (for the dropdown) ────────────────────────────────────────

export interface SocietyOption {
  value: string;   // societyId
  label: string;   // societyName
}

// ─── Checked state shape passed to onSave ─────────────────────────────────────
// key = amenityId, value = checked boolean

export type AmenityCheckedMap = Record<string, boolean>;