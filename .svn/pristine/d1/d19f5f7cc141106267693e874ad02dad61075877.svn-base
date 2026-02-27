"use client";

import {
  ActionIcon,
  Affix,
  Badge,
  Box,
  Button,
  Group,
  Stack,
  Text,
  Tooltip,
  useMantineTheme,
} from "@mantine/core";
import { DataTable } from "@/components/DataTable";
import { AppBreadcrumbs, CustomModal } from "@/components";
import { RouteConfig } from "@/utils/routeConfig";
import { IconEdit, IconPlus, IconTrash, IconX } from "@tabler/icons-react";
import { DrawerForm } from "@/components/DrawerForm";
import { FieldsetConfig } from "@/components/DrawerForm/DrawerForm";
import { getRequest, postRequest } from "@/service";
import { PackageApiResponse } from "@/types/admin/societyManagement/packageSetup/packageSetup";
import { ApiResponse } from "@/types/admin/societyManagement/package/packageToTierMapping/packageToTierMapping";
import { API_PATH } from "@/utils/apiPath";
import { notifications } from "@mantine/notifications";
import { useCallback, useEffect, useState } from "react";
import { COMMON_MESSAGE, STATUS_OPTIONS } from "@/utils/constants";
import { AmenityTier } from "@/types/admin/societyManagement/facandame/amenitiesMapping/amenitiesMapping";
import { IMAGES } from "@/utils/images";

const RECORDS_PER_PAGE = 10;

const PackageTierMapping = () => {
  const [packages, setPackages] = useState<any[]>([]);
  const [packageOptions, setPackageOptions] = useState<any[]>([]);
  const [tierOptions, setTierOptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [drawerOpened, setDrawerOpened] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedMapping, setSelectedMapping] = useState<any>(null);
  const [mappings, setMappings] = useState<any[]>([]);
  const [mappingsLoading, setMappingsLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [removedAmenities, setRemovedAmenities] = useState<
    { tierCode: string; status: number }[]
  >([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [mappingToDelete, setMappingToDelete] = useState<any>(null);

  const theme = useMantineTheme();

  const notifyError = (msg: string) =>
    notifications.show({
      title: "Error",
      message: msg,
      color: "red",
      icon: <IconX size={16} />,
    });

  const notifySuccess = (msg: string) =>
    notifications.show({
      title: "Success",
      message: msg,
      color: "green",
    });

  /* ------------------ FETCH MAPPINGS ------------------ */
  const fetchPackageTierMappings = useCallback(async () => {
    setMappingsLoading(true);
    try {
      const response = await getRequest<any>(API_PATH.PACKAGE_TIER_MAPPING);
      const allMappings: any[] = response?.data?.data || [];

      //check if all mappings if all tierDetails have status 2, then filter them out
      const filtered = allMappings.filter(
        (mapping) =>
          !Array.isArray(mapping.tierDetails) ||
          mapping.tierDetails.some((t: any) => t.status !== 2),
      );

      setMappings(filtered);
    } catch (err) {
      console.error(err);
      notifyError(COMMON_MESSAGE.PACKAGE_TIER_MAPPING_FETCH_FAIL);
    } finally {
      setMappingsLoading(false);
    }
  }, []);

  /* ------------------ FETCH PACKAGES ------------------ */
  const fetchPackage = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getRequest<PackageApiResponse>(
        API_PATH.GET_PACKAGE,
      );
      const responseData = response?.data?.data || [];
      setPackages(responseData);
      setPackageOptions(
        responseData.map((pkg: any) => ({
          value: pkg.id,
          label: pkg.packageName,
        })),
      );
    } catch (err) {
      console.error(err);
      notifyError(COMMON_MESSAGE.DATA_FETCH_FAIL);
    } finally {
      setLoading(false);
    }
  }, []);

  /* ------------------ FETCH TIERS ------------------ */
  const fetchTier = async () => {
    try {
      const res = (await getRequest(
        `${API_PATH.GET_GEN_CODE}?groupCode=AMENITY_TIER`,
      )) as ApiResponse<AmenityTier>;
      setTierOptions(res?.data?.data ?? []);
    } catch (error) {
      notifyError(COMMON_MESSAGE.DATA_FETCH_FAIL);
      console.error("Error fetching tier data:", error);
    }
  };

  /* ------------------ Delete Mapping ------------------ */

  const handleConfirmDelete = async () => {
    if (!mappingToDelete) return;

    const matchedPackage = packages.find(
      (pkg: any) =>
        pkg.packageCode.toLowerCase() ===
        mappingToDelete.packageCode.toLowerCase(),
    );

    if (!matchedPackage) {
      notifyError("Package not found");
      setDeleteModalOpen(false);
      return;
    }

    try {
      const payload = {
        packageId: matchedPackage.id,
        tierDetails: mappingToDelete.tierDetails.map((t: any) => ({
          tierCode: t.tierCode,
          status: 2,
        })),
      };

      await postRequest(API_PATH.PACKAGE_TIER_MAPPING, payload);
      notifySuccess(COMMON_MESSAGE.PACKAGE_TIER_MAPPING_DELETE_SUCCESS);
      fetchPackageTierMappings();
    } catch (err) {
      console.error(err);
      notifyError(COMMON_MESSAGE.PACKAGE_TIER_MAPPING_DELETE_FAIL);
    } finally {
      setDeleteModalOpen(false);
      setMappingToDelete(null);
    }
  };

  useEffect(() => {
    fetchPackage();
    fetchTier();
    fetchPackageTierMappings();
  }, []);

  /* ------------------ SUBMIT HANDLER ------------------ */
  const handleSubmit = async (values: Record<string, any>) => {
    setSubmitting(true);
    try {
      const activeTierDetails = (values.tierDetails || []).map(
        (entry: any) => ({
          tierCode: entry.tier,
          status: entry.status === "1" ? 1 : 0,
        }),
      );

      const payload = {
        packageId: values.package,
        tierDetails: [...activeTierDetails, ...removedAmenities],
      };

      await postRequest(API_PATH.PACKAGE_TIER_MAPPING, payload);
      notifySuccess(COMMON_MESSAGE.PACKAGE_TIER_MAPPING_SAVE_SUCCESS);
      setRemovedAmenities([]);
      setDrawerOpened(false);
      fetchPackageTierMappings();
    } catch (err) {
      console.error(err);
      notifyError(COMMON_MESSAGE.PACKAGE_TIER_MAPPING_SAVE_FAIL);
    } finally {
      setSubmitting(false);
    }
  };

  /* ------------------ Handle the removed rows in the form ------------------ */

  const handleRemoveEntry = (
    _fieldsetId: string,
    _index: number,
    entryValues: Record<string, any>,
  ) => {
    if (!editMode) return;
    if (!entryValues.tier) return;

    setRemovedAmenities((prev) => [
      ...prev,
      { tierCode: entryValues.tier, status: 2 },
    ]);
  };

  /* ------------------ TABLE COLUMNS ------------------ */
  const columns = [
    {
      header: "Sl No",
      accessor: "packageCode",
      align: "center",
      width: "7%",
      render: (_: any, __: any, index: number) => (
        <Text size="sm">
          {(currentPage - 1) * RECORDS_PER_PAGE + index + 1}
        </Text>
      ),
    },
    {
      header: "Actions",
      accessor: "actions",
      align: "center",
      width: "10%",
      render: (_: any, row: any) => (
        <>
          <Tooltip label="Edit Mapping">
            <ActionIcon
              color="blue"
              variant="light"
              radius="md"
              onClick={() => {
                setEditMode(true);
                const matchedPackage = packages.find(
                  (pkg: any) => pkg.packageCode === row.packageCode,
                );

                const formattedRow = {
                  package: matchedPackage?.id ?? "",
                  tierDetails: Array.isArray(row.tierDetails)
                    ? row.tierDetails.map((t: any) => ({
                        tier: t.tierCode,
                        status: t.status === 1 ? "1" : "0",
                      }))
                    : [{ tier: "", status: "1" }],
                };
                setSelectedMapping(formattedRow);
                setDrawerOpened(true);
              }}
            >
              <IconEdit size={16} />
            </ActionIcon>
          </Tooltip>

          <Tooltip label="Delete Mapping">
            <ActionIcon
              color="red"
              variant="light"
              radius="md"
              onClick={() => {
                setMappingToDelete(row);
                setDeleteModalOpen(true);
              }}
            >
              <IconTrash size={16} />
            </ActionIcon>
          </Tooltip>
        </>
      ),
    },
    {
      header: "Package Name",
      accessor: "packageName",
      align: "left",
    },
    {
      header: "Amenity Tiers",
      accessor: "tierDetails",
      align: "left",
      render: (value: any[]) => (
        <Group gap={4}>
          {Array.isArray(value) && value.length > 0 ? (
            value.map((tier) => (
              <Badge
                key={tier.id}
                size="sm"
                radius="xs"
                variant="light"
                color={
                  tier.status === 1
                    ? theme.colors.success[5]
                    : theme.colors.danger[2]
                }
              >
                {tier.tierName}
              </Badge>
            ))
          ) : (
            <Text size="sm" c="dimmed">
              —
            </Text>
          )}
        </Group>
      ),
    },
  ];

  /* ------------------ FIELDSET CONFIGURATION ------------------ */
  const fieldsetConfigs: FieldsetConfig[] = [
    {
      id: "PackageInfo",
      legend: "Package",
      description: "Select the package to map",
    },
    {
      id: "TierDetails",
      legend: "Tier Details",
      description: "Add one or more amenity tiers with their status",
      isMultipleEntry: true,
      multipleEntryKey: "tierDetails",
    },
  ];

  /* ------------------ FORM FIELDS ------------------ */
  const formFields = [
    // ── Package fieldset ──
    {
      name: "package",
      label: "Package Name",
      type: "select",
      required: true,
      options: packageOptions,
      fieldset: "PackageInfo",
      colSpan: 12,
    },

    // ── TierDetails multiple-entry fieldset ──
    {
      name: "tier",
      label: "Amenity Tier",
      type: "select",
      required: true,
      options: tierOptions
        .filter((t) => t.status === 1)
        .map((t) => ({
          value: t.genCode,
          label: t.genName,
        })),
      fieldset: "TierDetails",
      colSpan: 5,
      dedupSelect: true,
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      required: true,
      options: STATUS_OPTIONS.map((o) => ({ label: o.label, value: o.value })),
      fieldset: "TierDetails",
      colSpan: 5,
    },
  ];

  return (
    <Stack gap="md">
      <AppBreadcrumbs
        items={[
          { label: "Society Management", path: RouteConfig.SOCIETY_MGT },
          { label: "Package", path: () => window.history.back() },
          { label: "Package to Tier mapping" },
        ]}
      />

      <Group justify="space-between">
        <Affix position={{ bottom: 40, right: 20 }}>
          <Button
            leftSection={<IconPlus size={20} />}
            radius="xl"
            size="md"
            style={{
              position: "fixed",
              bottom: 32,
              right: 32,
              zIndex: 100,
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
            }}
            color="primary.5"
            onClick={() => {
              setEditMode(false);
              setSelectedMapping(null);
              setRemovedAmenities([]);
              setDrawerOpened(true);
            }}
          >
            Add New Mapping
          </Button>
        </Affix>
      </Group>

      <Box>
        <DataTable
          data={mappings}
          columns={columns as any}
          pageSize={RECORDS_PER_PAGE}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          totalRecords={mappings.length}
          loading={mappingsLoading}
        />
      </Box>

      <DrawerForm
        position="right"
        opened={drawerOpened}
        onClose={() => {
          setRemovedAmenities([]);
          setDrawerOpened(false);
        }}
        title={editMode ? "Edit Mapping" : "Add Mapping"}
        fields={formFields as any}
        fieldsets={fieldsetConfigs}
        initialValues={editMode ? selectedMapping : undefined}
        onSubmit={handleSubmit}
        size="xl"
        onRemoveEntry={handleRemoveEntry}
      />

      <CustomModal
        opened={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        icon={IMAGES.QUESTION}
        title="Confirm Deletion"
        subtext="Are you sure you want to delete this Mapping?"
        actionText="Yes, Delete"
        onAction={handleConfirmDelete}
        showCancel
        cancelText="No"
      />
    </Stack>
  );
};

export default PackageTierMapping;
