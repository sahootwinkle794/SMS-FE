"use client";
import { useCallback, useEffect, useState } from "react";
import {
  AppBreadcrumbs,
  DrawerForm,
  FloatingButton,
  CustomModal,
  AccessRestricted,
} from "@/components";
import {
  ActionIcon,
  Badge,
  Box,
  Container,
  Flex,
  Group,
  Tooltip,
  Text,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import {
  REGEX,
  REGEX_MSG,
  RECORDS_PER_PAGE,
  STATUS_CODE,
  STATUS_OPTIONS,
  STATUS_CONFIG,
  PageTitles,
} from "@/utils/constants";
import {
  IconPlus,
  IconFilter,
  IconDotsVertical,
  IconEdit,
  IconTrash,
} from "@tabler/icons-react";
import { IMAGES } from "@/utils/images";
import { useRoles } from "@/hooks/useRoles";
import { Column, DataTable } from "@/components/DataTable";
import { deleteRequest, getRequest, postRequest, putRequest } from "@/service";
import { API_PATH } from "@/utils/apiPath";
import {
  UserDataResponse,
  User,
  SingleUserResponse,
  EditUserForm,
} from "@/types/admin/setup/userSetup/userSetup";
import moment from "moment";
import { useMenuPermissions } from "@/hooks/useMenuPermissions";
import { usePathname } from "next/navigation";

const UserSetup = () => {
  const [opened, setOpened] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [mode, setMode] = useState<"add" | "edit">("add");
  const [users, setUsers] = useState<User[]>([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<User | null>(null);
  const [editUser, setEditUser] = useState<Partial<EditUserForm>>({});
  const [editUserId, setEditUserId] = useState<string | null>(null);
  const { roles } = useRoles();
  const { canDelete, canWrite, canRead, canApprove } = useMenuPermissions();
  const roleOptions = roles.map((role) => ({
    value: role?.id,
    label: role?.roleName,
  }));
  const pathname = usePathname();
  const pageTitle = PageTitles[pathname] ?? "this page";

  useEffect(() => {
    console.log("👤 UserSetup permissions:", {
      canRead,
      canWrite,
      canDelete,
      canApprove,
    });
  }, [canRead, canWrite, canDelete, canApprove]);

  /* ================= COLUMNS ================= */
  const actionColumn: Column<User> = {
    header: "Actions",
    accessor: "id",
    align: "left",
    render: (_, row) => (
      <Group wrap="nowrap" gap={8}>
        {/* EDIT */}
        <Tooltip label="Edit User">
          <ActionIcon
            color="blue"
            variant="light"
            radius="md"
            onClick={() => handleEditUser(row)}
          >
            <IconEdit size={16} />
          </ActionIcon>
        </Tooltip>

        {/* DELETE */}
        <Tooltip label="Delete User">
          <ActionIcon
            color="red"
            variant="light"
            radius="md"
            onClick={() => handleDeleteClick(row)}
          >
            <IconTrash size={16} />
          </ActionIcon>
        </Tooltip>
      </Group>
    ),
  };

  const columns: Column<User>[] = [
    {
      header: "Sl No",
      accessor: "id",
      align: "center",
      render: (_value, _row, index) => (
        <Text>{(currentPage - 1) * RECORDS_PER_PAGE + index + 1}</Text>
      ),
    },
    ...(canWrite ? [actionColumn] : []),
    {
      header: "User Name",
      accessor: "name",
      align: "left",
    },
    {
      header: "Phone No",
      accessor: "phone",
      align: "left",
    },
    {
      header: "Email",
      accessor: "email",
      align: "left",
    },
    {
      header: "Role",
      accessor: "userCode",
      align: "left",
    },
    {
      header: "Status",
      accessor: "status",
      align: "left",
      render: (value, row) => (
        <Badge size="sm" radius="xs" variant="filled" color={row.statusColor}>
          {value}
        </Badge>
      ),
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

  /* ================= DRAWER FORM FIELDS ================= */
  const fields = [
    {
      name: "name",
      label: "User Name",
      placeholder: "Enter name",
      required: true,
      type: "text" as const,
      regex: REGEX.NAME,
      regexMessage: REGEX_MSG.NAME,
    },
    {
      name: "phone",
      label: "Phone No",
      placeholder: "Enter phone number",
      required: true,
      type: "text" as const,
      regex: REGEX.PHONE,
      regexMessage: REGEX_MSG.PHONE,
    },
    {
      name: "email",
      label: "Email",
      type: "email" as const,
      placeholder: "Enter email",
      required: true,
      regex: REGEX.EMAIL,
      regexMessage: REGEX_MSG.EMAIL,
    },
    {
      name: "role",
      label: "Role",
      type: "select" as const,
      placeholder: "Select role",
      required: true,
      options: roleOptions,
    },
    {
      name: "status",
      label: "Status",
      type: "select" as const,
      placeholder: "Select status",
      required: true,
      options: STATUS_OPTIONS.map((o) => ({ label: o.label, value: o.value })),
    },
  ];

  /* ================= DATA FETCH (EFFECT) ================= */
  const fetchUsers = useCallback(async () => {
    try {
      const payload = {
        search: "",
        page: currentPage,
        limit: RECORDS_PER_PAGE,
        sortBy: "created_at",
        sortOrder: "DESC",
      };

      const response = await getRequest<UserDataResponse>(
        API_PATH.GET_USER_MASTER,
        payload,
      );

      const apiUsers = response.data.data;

      const mappedUsers: User[] = apiUsers.map((item) => {
        // 1. Extract the status from the API (ensuring it's a valid key 1 or 2)
        const statusKey = item.status as keyof typeof STATUS_CONFIG;

        // 2. Get the config object (fallback to a default if needed)
        const config = STATUS_CONFIG[statusKey];

        return {
          id: item.id,
          name: item.name ?? "—",
          userCode: item.roleName ?? "—",
          phone: item.mobileNo,
          email: item.emailId ?? "—",
          // 3. Use the label from your config instead of hardcoding "Active"
          status: config?.label ?? "Unknown",
          // 4. Optional: You can also pass the color to your UI here
          statusColor: config?.color ?? "gray",
          createdBy: item.createdBy ?? "—",
          createdAt: item.createdAt ?? "—",
        };
      });

      setUsers(mappedUsers);
      setTotalRecords(response.data.total);
    } catch (err) {
      console.error(err);
      notifications.show({
        title: "Error!",
        message: "Failed to load users",
        color: "red",
      });
    }
  }, [currentPage]);

  /* =================  Fetch users  ================= */
  useEffect(() => {
    const fetchData = async () => {
      await fetchUsers();
    };
    fetchData();
  }, [fetchUsers]);

  /* ================= CRUD ================= */

  /* ================= Edit User  ================= */
  const handleEditUser = async (row: User) => {
    try {
      const response = await getRequest<SingleUserResponse>(
        `${API_PATH.GET_USER_MASTER}/${row.id}`,
      );

      const user = response.data;
      setEditUserId(row.id); // ⭐ store ID
      // Map API → Form fields
      setEditUser({
        name: user.name,
        phone: user.mobileNo,
        email: user.emailId,
        role: user.roleId,
        status: String(user.status) as (typeof STATUS_OPTIONS)[number]["value"],
      });

      setMode("edit");
      setOpened(true);
    } catch (error) {
      console.error(error);
      notifications.show({
        title: "Error",
        message: "Failed to load user details",
        color: "red",
      });
    }
  };

  /* =================Add and update User  ================= */
  const handleAddUser = async (formData: Partial<EditUserForm>) => {
    if (
      !formData.name ||
      !formData.phone ||
      !formData.email ||
      !formData.role ||
      !formData.status
    ) {
      return;
    }

    try {
      const payload = {
        name: formData.name,
        mobileNo: formData.phone,
        emailId: formData.email,
        roleId: formData.role,
        status: Number(formData.status),
        refreshToken: " ",
        // createdBy: "admin",
        // updatedBy: "admin",
      };

      if (mode === "add") {
        await postRequest(API_PATH.GET_USER_MASTER, payload);

        notifications.show({
          title: "Success",
          message: "User added successfully",
          color: "green",
        });
      } else {
        await putRequest(`${API_PATH.GET_USER_MASTER}/${editUserId}`, payload);

        notifications.show({
          title: "Success",
          message: "User updated successfully",
          color: "green",
        });
      }

      setOpened(false);
      setEditUser({});
      setEditUserId(null);
      fetchUsers();
    } catch (error: unknown) {
      console.error(error);
      const err = error as { status?: number; message?: string };
      if (err.status === STATUS_CODE.INTERNAL_ERROR) {
        notifications.show({
          title: "Duplicate Mobile Number",
          message: "This mobile number is already registered",
          color: "red",
        });
        return;
      }
      notifications.show({
        title: "Error",
        message: "Failed to save user",
        color: "red",
      });
    }
  };

  /* =================Delete user  ================= */
  const handleDeleteClick = (row: User) => {
    setSelectedRow(row);
    setDeleteModalOpen(true);
  };

  /* =================Confirm  Delete user  ================= */
  const handleConfirmDelete = async () => {
    if (!selectedRow) return;
    try {
      await deleteRequest(`${API_PATH.GET_USER_MASTER}/${selectedRow.id}`);

      notifications.show({
        title: "Success",
        message: "User delete successfully",
        color: "green",
      });

      setOpened(false);
      setCurrentPage(1); // optional
      fetchUsers(); // 👈 reload table
    } catch (error) {
      console.error(error);
      notifications.show({
        title: "Error",
        message: "Failed to Delete user",
        color: "red",
      });
    }
    setDeleteModalOpen(false);
    setSelectedRow(null);
  };

  if (!canRead && !canWrite) {
    return <AccessRestricted pageTitle={pageTitle} />;
  }

  return (
    <Box>
      <Container fluid>
        <Flex justify="space-between" align="center">
          <AppBreadcrumbs
            items={[{ label: "Access Control" }, { label: "User setup" }]}
            // isBackButton={true}
          />
        </Flex>
      </Container>

      {/* Drawer */}
      <DrawerForm
        opened={opened}
        onClose={() => setOpened(false)}
        title={mode === "add" ? "Add New User" : "Edit User"}
        fields={fields}
        initialValues={editUser || {}}
        onSubmit={handleAddUser}
      />

      {/* Table */}

      <DataTable<User>
        data={users}
        columns={columns}
        pageSize={RECORDS_PER_PAGE}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        totalRecords={totalRecords}
      />
      {!opened && (
        <FloatingButton
          mainTitle="Actions"
          mainIcon={<IconDotsVertical size={20} />}
          menuButtons={[
            ...(canWrite
              ? [
                  {
                    title: "Add User",
                    icon: <IconPlus size={18} />,
                    onClick: () => {
                      setMode("add");
                      setEditUser({}); // 🔥 clear edit data
                      setEditUserId(null);
                      setOpened(true);
                    },
                  },
                ]
              : []),
            {
              title: "Filter",
              icon: <IconFilter size={18} />,
              onClick: () => {},
            },
          ]}
        />
      )}

      {/* CONFIRM DELETE MODAL */}
      <CustomModal
        opened={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        icon={IMAGES.QUESTION}
        title="Confirm Deletion"
        subtext="Are you sure you want to delete this user?"
        actionText="Yes, Delete"
        onAction={handleConfirmDelete}
        showCancel
        cancelText="No"
      />
    </Box>
  );
};

export default UserSetup;
