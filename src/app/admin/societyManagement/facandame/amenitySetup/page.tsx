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
import AmenitySetupModalForm from "./ModalForm";
import { DataTable, Column } from "@/components/DataTable";
import { AppBreadcrumbs, CustomModal } from "@/components";
import {
  getRequest,
  postRequest,
  patchRequest,
  deleteRequest,
} from "@/service";
import { API_PATH } from "@/utils/apiPath";
import { COMMON_MESSAGE, RECORDS_PER_PAGE } from "@/utils/constants";
import { RouteConfig } from "@/utils/routeConfig";
import { notifications } from "@mantine/notifications";
import {
  IconPlus,
  IconEdit,
  IconTrash,
  IconX,
  IconDotsVertical,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { IMAGES } from "@/utils/images";
import {
  AmenityItem,
  AmenityApiResponse,
  FormState,
} from "@/types/admin/societyManagement/amenitySetup/amenitySetup";

const AmenitySetup = () => {
  const [amenities, setAmenities] = useState<AmenityItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [opened, setOpened] = useState(false);
  const [editing, setEditing] = useState<AmenityItem | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<AmenityItem | null>(null);

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

  //-----------Fetch Amenity Details-----------//

  const fetchAmenityDetails = async () => {
    setLoading(true);
    try {
      const payload = {
        search: "",
        page: currentPage,
        limit: RECORDS_PER_PAGE,
        sortBy: "created_at",
        sortOrder: "DESC",
      };
      const res = (await getRequest(
        API_PATH.GET_AMENITY,
        payload,
      )) as AmenityApiResponse;

      setAmenities(res?.data?.data ?? []);
      setTotalRecords(res.data.total);
    } catch {
      notifyError(COMMON_MESSAGE.AMENITY_FETCH_FAIL);
    } finally {
      setLoading(false);
    }
  };
  //-----------------------------------------//

  useEffect(() => {
    fetchAmenityDetails();
  }, [currentPage]);

  //-----------Submit Add/Edit-----------//

  const handleSubmit = async (
    formData: Omit<FormState, "status">,
  ): Promise<void> => {
    try {
      if (editing) {
        await patchRequest(
          `${API_PATH.UPDATE_AMENITY}/${editing.amenityId}`,
          formData, // Use formData from modal instead of parent's form state
        );
        notifySuccess(COMMON_MESSAGE.AMENITY_UPDATE);
      } else {
        await postRequest(API_PATH.POST_AMENITY, formData); // Use formData from modal
        notifySuccess(COMMON_MESSAGE.AMENITY_ADDED);
      }

      setOpened(false);
      setEditing(null);
      fetchAmenityDetails();
    } catch (error) {
      notifyError(COMMON_MESSAGE.OPERATION_FAILED);
      throw error;
    }
  };

  //-------------------------------------------//

  //-----------Delete-----------//

  const handleDelete = (row: AmenityItem) => {
    console.log(row, "AmenityItem");
    setSelectedItem(row);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedItem) return;

    try {
      await deleteRequest(
        `${API_PATH.DELETE_AMENITY}/${selectedItem.amenityId}`,
      );

      notifications.show({
        title: "Success",
        message: "Amenity deleted successfully",
        color: "green",
      });

      setDeleteModalOpen(false);
      setSelectedItem(null);
      fetchAmenityDetails();
    } catch (error) {
      console.error(error);
      notifications.show({
        title: "Error",
        message: "Failed to delete amenity",
        color: "red",
      });
    }
  };

  //-------------------------------------------//

  const handleEditClick = (row: AmenityItem) => {
    setEditing(row);
    setOpened(true);
  };
  //-----------DataTable Columns-----------//

  const columns: Column<AmenityItem>[] = [
    {
      header: "S.No",
      width: "8%",
      align: "center",
      render: (_value, _row, index) => (
        <Text>{(currentPage - 1) * RECORDS_PER_PAGE + index + 1}</Text>
      ),
    },
    {
      header: "Actions",
      width: "5%",
      align: "left",
      render: (_value, row) => (
        <Group wrap="nowrap" gap={8}>
          {/* EDIT */}
          <Tooltip label="Edit Amenity">
            <ActionIcon
              color="blue"
              variant="light"
              radius="md"
              onClick={() => handleEditClick(row)}
            >
              <IconEdit size={16} />
            </ActionIcon>
          </Tooltip>

          {/* DELETE */}
          <Tooltip label="Delete Amenity">
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
      header: "Amenity Code",
      accessor: "amenityCode",
      width: "8%",
      render: (_value, row) => (
        <Badge variant="dot" color="primary.5" size="sm">
          {row.amenityCode}
        </Badge>
      ),
    },
    {
      header: "Amenity Name",
      accessor: "amenityName",
      width: "10%",
    },
    {
      header: "Description",
      accessor: "description",
      width: "20%",
    },
    // {
    //   header: "Icon Url",
    //   accessor: "iconUrl",
    //   width: "6%",
    // },
    {
      header: "Status",
      width: "6%",
      align: "center",
      render: (_value, row) => (
        <Badge
          size="sm"
          radius="xs"
          variant="filled"
          color={row.status ? "success.5" : "danger.5"}
        >
          {row.status ? "Active" : "Inactive"}
        </Badge>
      ),
    },
  ];

  return (
    <>
      <AppBreadcrumbs
        items={[
          { label: "Society Management", path: RouteConfig.SOCIETY_MGT },
          {
            label: "Facilities & Amenities",
            path: () => window.history.back(),
          },
          { label: "Amenity Setup" },
        ]}
      />

      <Group justify="space-between" mt="md" mb="sm">
        <Text fw={600} size="lg">
          Amenity Setup
        </Text>
      </Group>

      <DataTable
        data={amenities}
        columns={columns}
        loading={loading}
        pageSize={RECORDS_PER_PAGE}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        totalRecords={totalRecords}
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
          Add Amenity
        </Button>
      </Affix>

      {/* Add/Edit Modal */}
      <AmenitySetupModalForm
        opened={opened}
        editing={editing}
        onClose={() => {
          setOpened(false);
          setEditing(null);
        }}
        onSubmit={handleSubmit}
      />

      <CustomModal
        opened={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        icon={IMAGES.QUESTION}
        title="Confirm Deletion"
        subtext="Are you sure you want to delete this amenity?"
        actionText="Yes, Delete"
        onAction={handleConfirmDelete}
        showCancel
        cancelText="No"
      />
    </>
  );
};

export default AmenitySetup;
