"use client";

import { DataTable, CustomModal, AccessRestricted } from "@/components";
import type { Column } from "@/components/DataTable";
import { getRequest, postRequest, putRequest, deleteRequest } from "@/service";
import {
  AddRoleApiResponse,
  RoleResponse,
  DeleteRoleResponse,
  RoleListApiResponse,
} from "@/types/superAdmin/setup/roleSetup/roleSetup";
import { API_PATH } from "@/utils/apiPath";
import {
  STATUS_CODE,
  STATUS_OPTIONS,
  STATUS_CONFIG,
  PageTitles,RECORDS_PER_PAGE
} from "../../../../utils/constants";
import {
  Card,
  Flex,
  Grid,
  Select,
  Text,
  TextInput,
  Group,
  Tooltip,
  ActionIcon,
  Button,
  NumberInput,
  Badge,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import {
  IconTrash,
  IconEdit,
  IconCheck,
  IconRestore,
} from "@tabler/icons-react";
import { useCallback, useEffect, useState } from "react";
import { IMAGES } from "@/utils/images";
import { useMenuPermissions } from "@/hooks/useMenuPermissions";
import moment from "moment";
import { usePathname } from "next/navigation";
/* ================= TYPES ================= */

type EditMode = {
  id: string;
  isEdit: boolean;
};

type ModalState = {
  open: boolean;
  title: string;
  subText: string;
  actionText: string;
  onAction: () => void;
};



const RoleSetUp = () => {
  const [roles, setRoles] = useState<RoleResponse[]>([]);
  const [isEditMode, setIsEditMode] = useState<EditMode | null>(null);
  const [formKey, setFormKey] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [modal, setModal] = useState<ModalState>({
    open: false,
    title: "",
    subText: "",
    actionText: "",
    onAction: () => {},
  });
  const [loading, setLoading] = useState(false);
  const { canRead, canWrite } = useMenuPermissions();
  const pathname = usePathname();
  const pageTitle = PageTitles[pathname] ?? "this page";
  /* ================= FORM ================= */

  const form = useForm({
    initialValues: {
      roleCode: null as number | null,
      roleName: "",
      status: "",
    },

    validate: {
      roleCode: (value) =>
        !value && value !== 0 ? "Role Code is required" : null,
      roleName: (value) =>
        value.trim().length === 0 ? "Role Name is required" : null,
      status: (value) =>
        value.trim().length === 0 ? "Status is required" : null,
    },
  });

  /* ================= COLUMNS ================= */
  const actionColumn: Column<RoleResponse> = {
    header: "Actions",
    accessor: "id",
    align: "left",
    render: (_value, row) => {
      const id = row.id; // ✅ always string

      return (
        <Group justify="center" gap={8}>
          <Tooltip label="Edit Role">
            <ActionIcon
              color="blue"
              variant="light"
              onClick={() => {
                setIsEditMode({ id, isEdit: true });
                getParticularRoleId(id);
              }}
            >
              <IconEdit size={16} />
            </ActionIcon>
          </Tooltip>

          <Tooltip label="Delete Role">
            <ActionIcon
              color="red"
              variant="light"
              onClick={() => openDeleteModal(id)}
            >
              <IconTrash size={16} />
            </ActionIcon>
          </Tooltip>
        </Group>
      );
    },
  };

  const columns: Column<RoleResponse>[] = [
    {
      header: "Sl. No",
      accessor: "id",
      align: "left",
      render: (_value, _row, index) => (
        <Text>{(currentPage - 1) * RECORDS_PER_PAGE + index + 1}</Text>
      ),
    },
    ...(canWrite ? [actionColumn] : []),
    {
      header: "Role Code",
      accessor: "roleCode",
      align: "left",
      sortable: true,
    },
    {
      header: "Role Name",
      accessor: "roleName",
      align: "left",
      sortable: true,
    },

    {
      header: "Status",
      accessor: "status",
      align: "left",
      render: (value) => {
        const status = Number(value) as 0 | 1;

        return (
          <Badge
            size="sm"
            radius="xs"
            variant="filled"
            color={STATUS_CONFIG[status]?.color}
          >
            {STATUS_CONFIG[status]?.label}
          </Badge>
        );
      },
    },

    {
      header: "Created By",
      accessor: "createdBy",
      align: "left",
    },
    {
      header: "Created At",
      accessor: "createdAt",
      align: "left",
      render: (value) => (
        <Text size="sm">
          {value ? moment(value).format("DD MMM YYYY, hh:mm A") : "-"}
        </Text>
      ),
    },
  ];

  /* ================= DATA FETCH (EFFECT) ================= */

  const fetchRoles = useCallback(async () => {
    setLoading(true); // 🔹 START loader
    try {
      const payload = {
        search: "",
        page: currentPage,
        limit: RECORDS_PER_PAGE,
        sortBy: "created_at",
        sortOrder: "DESC",
      };

      const response = await getRequest<RoleListApiResponse>(
        API_PATH.GET_ROLES,
        payload,
      );

      setRoles(response.data.data);
      setTotalRecords(response.data.total);
    } catch (err) {
      console.error(err);
      notifications.show({
        title: "Error!",
        message: "Failed to load roles",
        color: "red",
      });
    } finally {
      setLoading(false); // 🔹 STOP loader (IMPORTANT)
    }
  }, [currentPage]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchRoles();
  }, [fetchRoles]);

  /* ================= REUSABLE REFRESH ================= */

  const refreshRoles = async () => {
    if (currentPage === 1) {
      fetchRoles();
    } else {
      setCurrentPage(1);
    }
  };

  /* ================= CRUD ================= */

  const addRoleDetails = async (values: typeof form.values) => {
    const payload = {
      roleCode: Number(values.roleCode),
      roleName: values.roleName,
      status: Number(values.status),
      createdBy: "admin-user",
    };

    try {
      const response = await postRequest<typeof payload, AddRoleApiResponse>(
        API_PATH.GET_ROLES,
        payload,
      );

      if (
        response.status === STATUS_CODE.SUCCESS ||
        response.status === STATUS_CODE.CREATED
      ) {
        notifications.show({
          title: "Success!",
          message: response.message,
          color: "green",
        });

        form.reset();
        setFormKey((k) => k + 1);
        refreshRoles();
      }
    } catch (error: unknown) {
      const err = error as { status?: number; message?: string };

      const status = err.status;
      if (status === STATUS_CODE.INTERNAL_ERROR) {
        notifications.show({
          title: "Duplicate Role Code",
          message: err.message || "Duplicate role code",
          color: "red",
        });
        return;
      }
      notifications.show({
        title: "Error",
        message: "Server error",
        color: "red",
      });
    }
  };

  const deleteRow = async (roleId: string) => {
    try {
      const response = await deleteRequest<DeleteRoleResponse>(
        `${API_PATH.GET_ROLES}/${roleId}`,
      );

      if (response?.status === STATUS_CODE.SUCCESS) {
        notifications.show({
          title: "Success",
          message: "Role Deleted",
          color: "green",
        });
        refreshRoles();
      }
    } catch {
      notifications.show({
        title: "Error!",
        message: "Failed to delete role",
        color: "red",
      });
    }
  };

  const openDeleteModal = (roleId: string) => {
    setModal({
      open: true,
      title: "Confirm Deletion",
      subText: "Are you sure you want to delete this role?",
      actionText: "Yes, Delete",
      onAction: () => {
        deleteRow(roleId);
        setModal((p) => ({ ...p, open: false }));
      },
    });
  };

  const getParticularRoleId = async (roleId: string) => {
    try {
      const response = await getRequest<{ data: RoleResponse }>(
        `${API_PATH.GET_ROLES}/${roleId}`,
      );
      const role = response.data;
      form.setValues({
        roleCode: role.roleCode,
        roleName: role.roleName,
        status: String(role.status),
      });
    } catch {
      notifications.show({
        title: "Error!",
        message: "Failed to fetch role",
        color: "red",
      });
    }
  };

  const updateRoleDetails = async (values: typeof form.values) => {
    if (!isEditMode) return;

    const payload = {
      roleCode: Number(values.roleCode),
      roleName: values.roleName,
      status: Number(values.status),
      createdBy: "admin-user",
    };

    const url = `${API_PATH.GET_ROLES}/${isEditMode.id}`;

    const response = await putRequest<typeof payload, AddRoleApiResponse>(
      url,
      payload,
    );

    if (response?.data) {
      notifications.show({
        title: "Updated!",
        message: "Role updated successfully",
        color: "green",
      });

      form.reset();
      setIsEditMode(null);
      setFormKey((k) => k + 1);
      refreshRoles();
    }
  };

  const handleSubmit = (values: typeof form.values) => {
    console.log("values", values);
    isEditMode ? updateRoleDetails(values) : addRoleDetails(values);
  };

  if (!canRead && !canWrite) {
    return <AccessRestricted pageTitle={pageTitle} />;
  }

  /* ================= RENDER ================= */

  return (
    <>
      <Grid>
        <Grid.Col span={canWrite ? 9 : 12}>
          <DataTable
            data={roles}
            columns={columns}
            pageSize={RECORDS_PER_PAGE}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            totalRecords={totalRecords}
            loading={loading}
          />
        </Grid.Col>
        {canWrite && (
          <Grid.Col span={3}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Card.Section withBorder inheritPadding py="xs" mb="md">
                <strong>Add Role</strong>
              </Card.Section>

              <form onSubmit={form.onSubmit(handleSubmit)}>
                <NumberInput
                  key={formKey}
                  label="Role Code"
                  withAsterisk
                  min={1}
                  {...form.getInputProps("roleCode")}
                />

                <TextInput
                  mt="xs"
                  label="Role Name"
                  withAsterisk
                  {...form.getInputProps("roleName")}
                />

                <Select
                  mt="xs"
                  label="Status"
                  data={STATUS_OPTIONS}
                  placeholder="Select status"
                  value={form.values.status || null}
                  error={form.errors.status}
                  onChange={(v) => form.setFieldValue("status", v || "")}
                  withAsterisk
                  clearable
                />

                <Flex justify="flex-end" gap="sm">
                  <Button
                    mt="md"
                    variant="outline"
                    color="primary.5"
                    leftSection={<IconRestore size={16} />}
                    onClick={() => {
                      form.reset();
                      setIsEditMode(null);
                      setFormKey((k) => k + 1);
                    }}
                  >
                    Reset
                  </Button>

                  <Button
                    mt="md"
                    type="submit"
                    color="primary.5"
                    leftSection={<IconCheck size={16} />}
                  >
                    {/* {editingRole ? "Update" : "Submit"} */}
                    Submit
                  </Button>
                </Flex>
              </form>
            </Card>
          </Grid.Col>
        )}
      </Grid>

      <CustomModal
        opened={modal.open}
        onClose={() => setModal({ ...modal, open: false })}
        icon={IMAGES.QUESTION}
        title={modal.title}
        actionText={modal.actionText}
        subtext={modal.subText}
        onAction={modal.onAction}
        showCancel
        cancelText="No"
      />
    </>
  );
};

export default RoleSetUp;
