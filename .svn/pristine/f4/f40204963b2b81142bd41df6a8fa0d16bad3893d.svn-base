"use client"
import { AppBreadcrumbs, CustomModal, DataTable } from '@/components'
import { deleteRequest, getRequest, patchRequest, postRequest } from '@/service'
import { API_PATH } from '@/utils/apiPath'
import { COMMON_MESSAGE, PAGE_TITLE, RECORDS_PER_PAGE } from '@/utils/constants'
import { RouteConfig } from '@/utils/routeConfig'
import { ActionIcon, Affix, Badge, Button, Group, Text, Tooltip } from '@mantine/core'
import { IconEdit, IconPlus, IconTrash, IconX } from '@tabler/icons-react'
import { useEffect, useState } from 'react'

import { notifications } from "@mantine/notifications";
import { Column } from '@/components/DataTable'
import ServiceSetupModalForm from './ModalForm'
import { ServiceFormState, ServiceItem, ServiceApiResponse } from '@/types/admin/societyManagement/services/serviceSetup/serviceSetup'
import { IMAGES } from '@/utils/images'

export interface ApiErrorResponse {
  status: number;
  message: string;
  data: unknown[]; // empty array in error case
}

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

const ServiceSetup = () => {

  const [serviceData, setServiceData] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [opened, setOpened] = useState(false);
  const [editing, setEditing] = useState<ServiceItem | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ServiceItem | null>(null);

  //-----------Submit Add/Edit-----------//

  const handleSubmit = async (
    formData: Omit<ServiceFormState, "status">,
  ): Promise<void> => {
    try {
      if (editing) {
        await patchRequest(
          `${API_PATH.UPDATE_AMENITY}/${editing.serviceId}`,
          formData,
        );
        notifySuccess(COMMON_MESSAGE.SERVICE_UPDATE);
      } else {
        await postRequest(API_PATH.GET_SERVICE_MASTER, formData);
        notifySuccess(COMMON_MESSAGE.SERVICE_ADDED);
      }

      setOpened(false);
      setEditing(null);
      fetchServiceDetails();
    } catch (error) {
      notifyError(COMMON_MESSAGE.OPERATION_FAILED);
      throw error;
    }
  };

  //-----------Fetch Service Details-----------//

  const fetchServiceDetails = async () => {
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
        API_PATH.GET_SERVICE_MASTER,
        payload,
      )) as ServiceApiResponse;

      setServiceData(res?.data?.data ?? []);
      setTotalRecords(res?.data?.total ?? 0);
    } catch (err: unknown) {
      const error = err as ApiErrorResponse;
      notifications.show({
        title: "Error",
        message: error?.message || COMMON_MESSAGE.SERVICE_DELETED,
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  //-----------------------------------------//

  useEffect(() => {
    fetchServiceDetails();
  }, [currentPage]);

  const handleDelete = (row: ServiceItem) => {
    setSelectedItem(row);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedItem) return;

    try {
      await deleteRequest(
        `${API_PATH.GET_SERVICE_MASTER}/${selectedItem.serviceId}`,
      );

      notifications.show({
        title: "Success",
        message: COMMON_MESSAGE.SERVICE_DELETED,
        color: "green",
      });

      setDeleteModalOpen(false);
      setSelectedItem(null);
      fetchServiceDetails();
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

  const handleEditClick = (row: ServiceItem) => {
    setEditing(row);
    setOpened(true);
  };

  //-----------DataTable Columns-----------//
  const columns: Column<ServiceItem>[] = [
    {
      header: "S.No",
      width: "8%",
      align: "center",
      render: (_value, _row, index) => (
        <Text>
          {(currentPage - 1) * RECORDS_PER_PAGE + index + 1}
        </Text>
      ),
    },
    {
      header: "Actions",
      width: "5%",
      align: "left",
      render: (_value, row) => (
        <Group wrap="nowrap" gap={8}>
          {/* EDIT */}
          <Tooltip label="Edit Service">
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
          <Tooltip label="Delete Service">
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
      header: "Service Code",
      accessor: "serviceCode",
      width: "10%",
    },
    {
      header: "Service Name",
      accessor: "serviceName",
      width: "15%",
    },
    {
      header: "Service Type",
      accessor: "serviceType",
      width: "10%",
    },

    {
      header: "Description",
      accessor: "description",
      width: "20%",
    },
    {
      header: "Status",
      width: "8%",
      align: "center",
      render: (_value, row) => (
        <Badge
          size="sm"
          radius="xs"
          variant="filled"
          color={row.isActive ? "green" : "red"}
        >
          {row.isActive ? "Active" : "Inactive"}
        </Badge>
      ),
    },
  ];


  return (
    <>
      <AppBreadcrumbs
        items={[
          { label: PAGE_TITLE.SOCIETY_MANAGEMENT, path: RouteConfig.SOCIETY_MGT },
          { label: PAGE_TITLE.SERVICE_CONFIGURATION, path: () => window.history.back(), },
          { label: PAGE_TITLE.SERVICE_CATEGORY_MAPPING },
        ]}
      />


      <DataTable
        data={serviceData}
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
            console.log("hello")
            setEditing(null);
            setOpened(true);
          }}

        >
          Add Service
        </Button>
      </Affix>

      {/* Add/Edit Modal */}
      <ServiceSetupModalForm
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
  )
}

export default ServiceSetup