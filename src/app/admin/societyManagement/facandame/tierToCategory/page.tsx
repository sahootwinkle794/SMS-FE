/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import {
  Button,
  Group,
  Text,
  Badge,
  Tooltip,
  ActionIcon,
  Affix,
} from "@mantine/core";
import TierToCategoryMappingModal from "./ModalForm";
import { DataTable, Column } from "@/components/DataTable";
import { AppBreadcrumbs, CustomModal } from "@/components";
import { getRequest, postRequest } from "@/service";
import { useMantineTheme } from "@mantine/core";
import { API_PATH } from "@/utils/apiPath";
import { COMMON_MESSAGE } from "@/utils/constants";
import { RouteConfig } from "@/utils/routeConfig";
import { notifications } from "@mantine/notifications";
import { IconPlus, IconEdit, IconTrash, IconX } from "@tabler/icons-react";
import { useEffect, useMemo, useState } from "react";
import { IMAGES } from "@/utils/images";
import {
  AmenityTier,
  AmenityCategory,
} from "@/types/admin/societyManagement/facandame/amenitiesMapping/amenitiesMapping";
import { FormState } from "@/types/admin/societyManagement/facandame/tiertoCategory/TierToCategory";

// ---- Types ----
interface TierCategoryMapping {
  tierCode: string;
  tierName: string | null;
  categoryDetails: {
    id: string;
    categoryCode: string;
    categoryName: string | null;
    displayOrder: number;
    status: number;
  }[];
}

interface TierCategoryMappingResponse {
  data: {
    data: TierCategoryMapping[]; // matches res.data.data
  };
}

interface ApiResponse<T> {
  data: {
    data: T[];
    message: string;
  };
}

// ---------------

const TierToCategory = () => {
  const [mappings, setMappings] = useState<TierCategoryMapping[]>([]);
  const [loading, setLoading] = useState(false);

  const [opened, setOpened] = useState(false);
  const [editing, setEditing] = useState<TierCategoryMapping | null>(null);

  const [amenityTiers, setAmenityTiers] = useState<AmenityTier[]>([]);

  const [amenityCategory, setAmenityCategory] = useState<AmenityCategory[]>([]);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [selectedItem, setSelectedItem] = useState<TierCategoryMapping | null>(
    null,
  );

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

  const tierdata = useMemo(() => {
    return amenityTiers
      .filter((tier) => tier.status === 1)
      .map((tier) => ({
        value: tier.genCode,
        label: tier.genName,
      }));
  }, [amenityTiers]);

  const categorydata = useMemo(() => {
    return amenityCategory
      .filter((category) => category.status === 1)
      .map((category) => ({
        value: category.genCode,
        label: category.genName,
      }));
  }, [amenityCategory]);

  const fetchTierCategoryMappings = async () => {
    setLoading(true);
    try {
      const res = (await getRequest(
        API_PATH.GET_TIER_CAT_MAPPING,
      )) as TierCategoryMappingResponse;

      const tierList = res?.data?.data ?? [];

      setMappings(tierList);
    } catch {
      notifyError(COMMON_MESSAGE.TIER_MAPPING_FETCH_FAIL);
    } finally {
      setLoading(false);
    }
  };

  // ------------------------------------------------------- //

  useEffect(() => {
    fetchTierCategoryMappings();
    handleTierFetch();
    handleCategoryFetch();
  }, []);

  const handleTierFetch = async () => {
    try {
      const res = (await getRequest(
        `${API_PATH.GET_GEN_CODE}?groupCode=AMENITY_TIER`,
      )) as ApiResponse<AmenityTier>;
      const tiers: AmenityTier[] = res?.data?.data ?? [];
      setAmenityTiers(tiers);
    } catch (error) {
      console.error("Error fetching tier data:", error);
    } finally {
      //cleanup
    }
  };

  const handleCategoryFetch = async () => {
    try {
      const res = (await getRequest(
        `${API_PATH.GET_GEN_CODE}?groupCode=AMENITY_CATEGORY`,
      )) as ApiResponse<AmenityCategory>;
      const tiers: AmenityCategory[] = res?.data?.data ?? [];
      setAmenityCategory(tiers);
    } catch (error) {
      console.error("Error fetching category data:", error);
    } finally {
      //cleanup
    }
  };

  const handleSubmit = async (formData: FormState) => {
    try {
      if (editing) {
        await postRequest(
          `${API_PATH.UPDATE_TIER_CAT_MAPPING}`,
          formData, // Use formData from modal instead of parent's form state
        );
        notifySuccess(COMMON_MESSAGE.TIER_CATEGORY_MAPPING_UPDATE);
      } else {
        await postRequest(API_PATH.POST_TIER_CAT_MAPPING, formData); // Use formData from modal
        notifySuccess(COMMON_MESSAGE.TIER_CATEGORY_MAPPING_ADDED);
      }
      setOpened(false);
      setEditing(null);
      fetchTierCategoryMappings();
      handleTierFetch();
      handleCategoryFetch();
    } catch (error) {
      notifyError(COMMON_MESSAGE.OPERATION_FAILED);
      throw error;
    }
  };

  const handleDelete = (row: TierCategoryMapping) => {
    console.log(row, "TierCategoryMapping");
    setSelectedItem(row);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedItem) return;

    try {
      const payload: FormState = {
        tierCode: selectedItem.tierCode,
        categoryDetails: selectedItem.categoryDetails.map((cat) => ({
          categoryCode: cat.categoryCode,
          displayOrder: cat.displayOrder,
          status: 2, // mark ALL as deleted
        })),
      };

      await postRequest(API_PATH.UPDATE_TIER_CAT_MAPPING, payload);

      notifySuccess("Mapping deleted successfully");

      setDeleteModalOpen(false);
      setSelectedItem(null);

      fetchTierCategoryMappings();
    } catch (error) {
      console.log(error);

      notifyError("Failed to delete mapping");
    }
  };

  const handleEditClick = (row: TierCategoryMapping) => {
    console.log("Edit clicked:", row);
    setEditing(row);
    setOpened(true);
  };

  // ----------- DataTable Columns ----------- //

  const columns: Column<TierCategoryMapping>[] = [
    {
      header: "S.No",
      width: "8%",
      align: "center",
      render: (_value, _row, index) => index + 1,
    },
    {
      header: "Actions",
      width: "10%",
      align: "left",
      render: (_value, row) => (
        <Group wrap="nowrap" gap={8}>
          <Tooltip label="Edit Mapping">
            <ActionIcon
              color="blue"
              variant="light"
              radius="md"
              onClick={() => handleEditClick(row)}
            >
              <IconEdit size={16} />
            </ActionIcon>
          </Tooltip>

          <Tooltip label="Delete Mapping">
            <ActionIcon
              color="red"
              variant="light"
              radius="md"
              onClick={() => handleDelete(row)}
            >
              <IconTrash size={16} />
            </ActionIcon>
          </Tooltip>
        </Group>
      ),
    },
    {
      header: "Tier Name",
      accessor: "tierName",
      width: "20%",
      render: (_value, row) => (
        <Text size="sm" fw={500}>
          {row.tierName ?? "—"}
        </Text>
      ),
    },
    {
      header: "Category Details",
      width: "40%",
      render: (_value, row) => (
        <Group gap="xs" wrap="wrap">
          {row.categoryDetails?.length > 0 ? (
            row.categoryDetails
              .filter((cat) => cat.status !== 2)
              .sort((a, b) => a.displayOrder - b.displayOrder)
              .map((cat) => (
                <Badge
                  key={cat.id}
                  size="sm"
                  radius="xs"
                  variant="light"
                  styles={{
                    root: {
                      backgroundColor:
                        cat.status === 1
                          ? theme.colors.success[1]
                          : theme.colors.primary[1],
                      color:
                        cat.status === 1
                          ? theme.colors.success[5]
                          : theme.colors.primary[5],
                    },
                  }}
                >
                  {cat.categoryName ?? "untittled-cat"}
                </Badge>
              ))
          ) : (
            <Text size="sm" c="dimmed">
              No Categories
            </Text>
          )}
        </Group>
      ),
    },
  ];

  // ----------------------------------------- //

  const filteredMappings = mappings.filter((row) =>
    row.categoryDetails.some((cat) => cat.status !== 2),
  );

  return (
    <>
      <AppBreadcrumbs
        items={[
          { label: "Society Management", path: RouteConfig.SOCIETY_MGT },
          {
            label: "Facility and Amenities",
            path: () => window.history.back(),
          },
          { label: "Tier to Category Mapping" },
        ]}
      />

      <Group justify="space-between" mt="md" mb="sm">
        <Text fw={600} size="lg">
          Tier to Category Mapping
        </Text>
      </Group>

      <DataTable
        data={filteredMappings}
        columns={columns}
        loading={loading}
        pageSize={10}
        totalRecords={filteredMappings.length}
      />

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
            setEditing(null);
            setOpened(true);
          }}
        >
          Add Mapping
        </Button>
      </Affix>

      {/* Add/Edit Modal */}
      <TierToCategoryMappingModal
        opened={opened}
        editing={editing}
        onClose={() => {
          setOpened(false);
          setEditing(null);
        }}
        onSubmit={handleSubmit}
        tierOptions={tierdata}
        categoryOptions={categorydata}
      />

      <CustomModal
        opened={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        icon={IMAGES.QUESTION}
        title="Confirm Deletion"
        subtext="Are you sure you want to delete this mapping?"
        actionText="Yes, Delete"
        onAction={handleConfirmDelete}
        showCancel
        cancelText="No"
      />
    </>
  );
};

export default TierToCategory;
