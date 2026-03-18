"use client";

import {
  Badge, Box, Button, Group, Loader, Select, Stack, Text,
} from "@mantine/core";
import { IconDeviceFloppy, IconBuildingCommunity } from "@tabler/icons-react";
import { useState, useEffect } from "react";
import CommonCategory from "../CommonCategory/CommonCategory";
import { CORAL, CORAL_LIGHT, PEACH, softCard } from "../../utils/constants";
import {
  AmenityCheckedMap,
  AmenityDetail,
  CategoryWithAmenities,
  SocietyOption,
} from "./SocietyAmenityMap.types";

// ─── Props ────────────────────────────────────────────────────────────────────

interface SocietyAmenityMapProps {
  /** "soc_admin" locks the society dropdown to the pre-selected society */
  type: "site_admin" | "soc_admin";

  /** All available societies for the dropdown (site_admin only) */
  societies?: SocietyOption[];

  /** Pre-selected society — required when type="soc_admin" */
  selectedSocietyId?: string;
  selectedSocietyName?: string;

  /** Category + amenity data from API */
  categories: CategoryWithAmenities[];

  /** Currently saved checked state from parent (amenityId → boolean) */
  savedCheckedMap: AmenityCheckedMap;

  /** Called when user hits Save Changes — parent handles the API call */
  onSave: (societyId: string, checkedMap: AmenityCheckedMap) => void;

  /** Called when society dropdown changes (site_admin) — parent re-fetches */
  onSocietyChange?: (societyId: string) => void;

  isSaving?: boolean;
  isLoading?: boolean;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function SocietyAmenityMap({
  type,
  societies = [],
  selectedSocietyId,
  selectedSocietyName,
  categories,
  savedCheckedMap,
  onSave,
  onSocietyChange,
  isSaving = false,
  isLoading = false,
}: SocietyAmenityMapProps) {

  // Local copy of checked state — starts from savedCheckedMap, editable by user
  const [checkedMap, setCheckedMap] = useState<AmenityCheckedMap>(savedCheckedMap);

  // Sync when parent pushes new savedCheckedMap (e.g. after society change)
  useEffect(() => {
    setCheckedMap(savedCheckedMap);
  }, [savedCheckedMap]);

  const activeSocietyId = selectedSocietyId ?? "";

  // Dirty check — has anything changed from the saved state?
  const isDirty = Object.keys(checkedMap).some(
    (id) => checkedMap[id] !== (savedCheckedMap[id] ?? false)
  );

  // Toggle a single amenity
  const handleToggle = (amenityId: string) => {
    setCheckedMap((prev) => ({ ...prev, [amenityId]: !prev[amenityId] }));
  };

  // Count active amenities per category for the badge
  const countActive = (amenities: AmenityDetail[]) =>
    amenities.filter((a) => checkedMap[a.id]).length;

  // Build props for CommonCategory
  const buildCategoryProps = (cat: CategoryWithAmenities) => {
    const amenityNames   = cat.amenityDetails.map((a) => a.amenityName);
    const amenityStatuses: Record<string, boolean> = {};
    const amenityDisplayOrders: Record<string, number> = {};

    cat.amenityDetails.forEach((a) => {
      amenityStatuses[a.amenityName]      = checkedMap[a.id] ?? false;
      amenityDisplayOrders[a.amenityName] = a.displayOrder;
    });

    return { amenityNames, amenityStatuses, amenityDisplayOrders };
  };

  return (
    <Box style={{ background: PEACH, minHeight: "100vh" }} p="lg">

      {/* ── Page Header ─────────────────────────────────────────────────── */}
      <Group justify="space-between" align="center" mb="xl">

        {/* Left — title + society selector */}
        <Group gap="sm" align="center">
          <Box
            style={{
              width: 40, height: 40, borderRadius: 12, flexShrink: 0,
              background: `linear-gradient(135deg, ${CORAL} 0%, ${CORAL_LIGHT} 100%)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: `0 4px 12px ${CORAL}44`,
            }}
          >
            <IconBuildingCommunity size={20} color="#fff" stroke={1.6} />
          </Box>
          <Box>
            <Text fz="xs" fw={700} tt="uppercase" style={{ color: CORAL, letterSpacing: "0.08em" }}>
              Configuration
            </Text>
            <Text fz={{ base: 16, sm: 20 }} fw={900} c="#1a1a1a" lh={1.2}>
              Society → Amenity Mapping
            </Text>
          </Box>
        </Group>

        {/* Right — society dropdown + save button */}
        <Group gap="sm" align="center">
          {type === "soc_admin" ? (
            // Locked pill showing society name
            <Box
              style={{
                ...softCard,
                borderRadius: 999,
                padding: "7px 18px",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <IconBuildingCommunity size={14} color={CORAL} />
              <Text fz="sm" fw={700} style={{ color: CORAL }}>
                {selectedSocietyName ?? "Society"}
              </Text>
            </Box>
          ) : (
            // Selectable dropdown for site_admin
            <Select
              placeholder="Select Society"
              data={societies}
              value={activeSocietyId || null}
              onChange={(val) => val && onSocietyChange?.(val)}
              disabled={isLoading}
              w={220}
              radius="xl"
              styles={{
                input: {
                  border: "1.5px solid #FFE5E5",
                  background: "#fff",
                  fontWeight: 700,
                  fontSize: 13,
                  color: "#1a1a1a",
                  "&:focus": { borderColor: CORAL },
                },
              }}
            />
          )}

          <Button
            onClick={() => onSave(activeSocietyId, checkedMap)}
            loading={isSaving}
            disabled={!isDirty || !activeSocietyId || isLoading}
            radius="xl"
            leftSection={<IconDeviceFloppy size={16} stroke={1.8} />}
            style={{
              background: isDirty && activeSocietyId
                ? `linear-gradient(135deg, ${CORAL} 0%, ${CORAL_LIGHT} 100%)`
                : "#e0e0e0",
              border: "none",
              fontWeight: 800,
              boxShadow: isDirty && activeSocietyId ? `0 4px 14px ${CORAL}55` : "none",
              transition: "all 0.2s ease",
            }}
          >
            Save Changes
          </Button>
        </Group>
      </Group>

      {/* ── Body ────────────────────────────────────────────────────────── */}
      {isLoading ? (
        <Group justify="center" mt={80}>
          <Stack align="center" gap="sm">
            <Loader color={CORAL} size="md" />
            <Text fz="sm" c="dimmed" fw={600}>Loading amenities…</Text>
          </Stack>
        </Group>
      ) : !activeSocietyId && type === "site_admin" ? (
        // No society selected yet
        <Group justify="center" mt={80}>
          <Stack align="center" gap="sm">
            <Box fz={40}>🏘️</Box>
            <Text fw={700} fz="md" c="#1a1a1a">Select a society to get started</Text>
            <Text fz="sm" c="dimmed" ta="center" maw={320}>
              Choose a society from the dropdown above to view and manage its amenity mappings.
            </Text>
          </Stack>
        </Group>
      ) : categories.length === 0 ? (
        // Society selected but no data
        <Group justify="center" mt={80}>
          <Stack align="center" gap="sm">
            <Box fz={40}>📭</Box>
            <Text fw={700} fz="md" c="#1a1a1a">No categories found</Text>
            <Text fz="sm" c="dimmed">No amenity categories are mapped to this society yet.</Text>
          </Stack>
        </Group>
      ) : (
        <Stack gap="md">
          {categories.map((cat) => {
            const { amenityNames, amenityStatuses, amenityDisplayOrders } = buildCategoryProps(cat);
            const activeCount = countActive(cat.amenityDetails);

            return (
              <Box key={cat.categoryCode}>
                {/* Category header row */}
                <Group gap="xs" mb="xs" px={2}>
                  <Text fz="xs" fw={800} tt="uppercase" style={{ color: CORAL, letterSpacing: "0.08em" }}>
                    {cat.categoryName}
                  </Text>
                  <Badge
                    size="xs"
                    variant="light"
                    color="red"
                    fw={700}
                  >
                    {activeCount} / {cat.amenityDetails.length} active
                  </Badge>
                  {/* Fading line */}
                  <Box style={{
                    flex: 1, height: 1.5,
                    background: "linear-gradient(to right, #FFD5D5, transparent)",
                    borderRadius: 99,
                  }} />
                </Group>

                <CommonCategory
                  title={cat.categoryName}
                  amenities={amenityNames}
                  amenityStatuses={amenityStatuses}
                  amenityDisplayOrders={amenityDisplayOrders}
                  onEdit={() => {
                    // Toggle all amenities in this category
                    const allChecked = cat.amenityDetails.every((a) => checkedMap[a.id]);
                    const update: AmenityCheckedMap = {};
                    cat.amenityDetails.forEach((a) => {
                      update[a.id] = !allChecked;
                    });
                    setCheckedMap((prev) => ({ ...prev, ...update }));
                  }}
                  editLabel={
                    cat.amenityDetails.every((a) => checkedMap[a.id])
                      ? "Deselect all in category"
                      : "Select all in category"
                  }
                />
              </Box>
            );
          })}
        </Stack>
      )}
    </Box>
  );
}