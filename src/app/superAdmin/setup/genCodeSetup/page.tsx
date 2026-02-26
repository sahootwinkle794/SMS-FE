"use client";
import React, { useCallback, useEffect, useState } from "react";
import {
  Affix,
  Button,
  Group,
  Modal,
  Text,
  useMantineTheme,
  Grid,
  Select,
  TextInput,
  ActionIcon,
  Divider,
  Badge,
  Tooltip,
} from "@mantine/core";
import {
  IconCheck,
  IconEdit,
  IconPlus,
  IconRestore,
  IconTrash,
} from "@tabler/icons-react";
import {
  RECORDS_PER_PAGE,
  STATUS_CONFIG,
  STATUS_OPTIONS,
} from "@/utils/constants";
import { CustomModal, DataTable } from "@/components";
import { Column } from "@/components/DataTable";
import { deleteRequest, getRequest, postRequest, putRequest } from "@/service";
import { API_PATH } from "@/utils/apiPath";
import { notifications } from "@mantine/notifications";
import {
  genCodeApiResAll,
  genCodeApiResponse, GenCodeGroup, ModalState
} from "@/types/superAdmin/setup/genCodeSetup/genCodeSetup";
import { IMAGES } from "@/utils/images";

const GenCodeSetup = () => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);//to open the modal

  /* ---------------- State ---------------- */
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState<genCodeApiResAll[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);


  /** MAIN FORM STATE */
  const [formData, setFormData] = useState({
    genCodeGroup: "",
    genCode: "",
    description: "",
    serialNo: "",
    status: "",
  });
  const [editId, setEditId] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [addGroupError, setAddGroupError] = useState("");//when click on add show the error message
  /** EXISTING GROUPS (normally from backend) */
  const [groups, setGroups] = useState<GenCodeGroup[]>([]);
  /** TEMP ADD GROUP */
  const [showAddGroup, setShowAddGroup] = useState(false);
  const [newGroup, setNewGroup] = useState("");
  // showing custom MOdal
  const [customModal, setCustomModal] = useState<ModalState>({
    open: false,
    title: "",
    subText: "",
    actionText: "",
    onAction: () => { },
  });
  /* ---------------- Handlers ---------------- */

  const buildGroupDropdown = (data: genCodeApiResAll[]) => {
    const uniqueGroups = Array.from(
      new Set(data.map((item) => item.groupCode))
    );

    return uniqueGroups.map((group) => ({
      value: group,
      label: group,
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.genCodeGroup) {
      newErrors.genCodeGroup = "Gen Code Group is required";
    }

    if (!formData.genCode.trim()) {
      newErrors.genCode = "Gen Code is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!formData.status) {
      newErrors.status = "Status is required";
    }

    // 🔁 Duplicate check (frontend)
    // const isDuplicate = responseData.some(
    //   (item) =>
    //     item.groupCode === formData.genCodeGroup &&
    //     item.genCode.toUpperCase() === formData.genCode.toUpperCase()
    // );

    // if (isDuplicate) {
    //   newErrors.genCode = "This Gen Code already exists for the selected group";
    // }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ---------------- handle Temporary Add gen code group name  ---------------- */
  const handleAddGroupTemp = () => {
    if (!newGroup.trim()) {
      setAddGroupError("Add new Gen Code Group name");
      return;
    }

    const value = newGroup.toUpperCase().replace(/\s+/g, "_");

    if (groups.some((g) => g.value === value)) {
      setAddGroupError("This Gen Code Group already exists");
      return;
    }

    setGroups((prev) => [...prev, { value, label: value }]);
    setFormData((prev) => ({ ...prev, genCodeGroup: value }));

    // ✅ clear states
    setNewGroup("");
    setShowAddGroup(false);
    setAddGroupError("");
    setErrors((prev) => ({ ...prev, genCodeGroup: "" }));
  };


  /* ---------------- reset Gencode Details ---------------- */
  const resetFormState = () => {
    setFormData({
      genCodeGroup: "",
      genCode: "",
      description: "",
      serialNo: "",
      status: "",
    });
    setErrors({});
    setEditId(null);
    setShowAddGroup(false);
    setNewGroup("");
  };

  /* ---------------- Add and update Gencode Details ---------------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    const payload = {
      groupCode: formData.genCodeGroup,
      genCode: formData.genCode,
      genName: formData.description,
      status: Number(formData.status),
    };


    try {
      setLoading(true);

      if (editId) {
        // UPDATE
        await putRequest(`${API_PATH.GET_GEN_CODE}/${editId}`, payload);
      } else {
        //  CREATE
        await postRequest(API_PATH.GET_GEN_CODE, payload);
      }

      notifications.show({
        title: "Success",
        message: editId
          ? "Gen Code updated successfully"
          : "Gen Code saved successfully",
        color: "green",
      });

      fetchGenCodeDetails();
      setOpened(false);
      handleReset();
      setEditId(null);
    } catch (err) {
      console.error(err);
      notifications.show({
        title: "Error!",
        message: "Failed to save Gen Code",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    resetFormState();
  };

  /* ---------------- Delete Gencode Details ---------------- */
  const handleDelete = (id: string) => {
    setCustomModal({
      open: true,
      title: "Delete Gen Code",
      subText: "Are you sure you want to delete this Gen Code? ",
      actionText: "Yes, Delete",
      onAction: async () => {
        try {
          setLoading(true);

          await deleteRequest(`${API_PATH.GET_GEN_CODE}/${id}`);
          notifications.show({
            title: "Deleted",
            message: "Gen Code deleted successfully",
            color: "green",
          });

          fetchGenCodeDetails();
        } catch (err) {
          console.error(err);
          notifications.show({
            title: "Error!",
            message: "Failed to delete Gen Code",
            color: "red",
          });
        } finally {
          setLoading(false);
          setCustomModal((prev) => ({ ...prev, open: false }));
        }
      },
    });
  };

  /* ---------------- Edit Gencode Details ---------------- */
  const handleEdit = async (id: string) => {
    try {
      setLoading(true);

      const response = await getRequest<genCodeApiResponse>(
        `${API_PATH.GET_GEN_CODE}/${id}`
      );

      const data = response?.data;

      setFormData({
        genCodeGroup: data.groupCode,
        genCode: data.genCode,
        description: data.genName,
        serialNo: "",
        status: String(data.status),
      });

      setEditId(id); // 🔑 edit mode
      setOpened(true); // 🔓 open customModal
    } catch (err) {
      console.error(err);
      notifications.show({
        title: "Error!",
        message: "Failed to load Gen Code details",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- fetch Gencode Details ---------------- */

  const fetchGenCodeDetails = useCallback(async () => {
    try {
      setLoading(true);
      const payload = {
        page: currentPage,  // This will use the latest currentPage
        limit: RECORDS_PER_PAGE,
      }
      const response = await getRequest<genCodeApiResponse>(
        API_PATH.GET_GEN_CODE, payload
      );

      const list = response?.data?.data || [];
      setResponseData(list);
      setTotalRecords(response.data.total);
      setGroups(buildGroupDropdown(list));
    } catch (err) {
      notifications.show({
        title: "Error!",
        message: "Failed to load Gen Codes",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchGenCodeDetails();
  }, [fetchGenCodeDetails]);

  const columns: Column<genCodeApiResAll>[] = [
    {
      header: "Sl. No",
      accessor: "id",
      align: "left",
      render: (_value, _row, index) => (
        <Text>{(currentPage - 1) * RECORDS_PER_PAGE + index + 1}</Text>
      ),
    },
    {
      header: "Actions",
      accessor: "id",
      align: "left",
      render: (_value, row) => {
        const id = row.id; // ✅ always string

        return (
          <Group justify="center" gap={8}>
            <Tooltip label="Edit Gencode">
              <ActionIcon
                color="blue"
                variant="light"
                onClick={() => {
                  handleEdit(id);
                }}
              >
                <IconEdit size={16} />
              </ActionIcon>
            </Tooltip>

            <Tooltip label="Delete Gencode">
              <ActionIcon
                color="red"
                variant="light"
                onClick={() => {
                  handleDelete(id);
                }}
              >
                <IconTrash size={16} />
              </ActionIcon>
            </Tooltip>
          </Group>
        );
      },
    },
    {
      header: "Group Code",
      accessor: "groupCode",
    },
    {
      header: "Gen Code",
      accessor: "genCode",
    },
    {
      header: "Gen Name",
      accessor: "genName",
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
  ];

  return (
    <>
      <Affix position={{ bottom: 40, right: 20 }}>
        <Button
          leftSection={<IconPlus size={20} />}
          radius="lg"
          color="primary.5"
          onClick={() => {
            resetFormState();
            setOpened(true);
          }}
        >
          Add Gen Code Desc
        </Button>
      </Affix>

      <Modal
        opened={opened}
        onClose={() => {
          setOpened(false);
          resetFormState();
        }}
        title={
          <Text fw={600}>{editId ? "Update Gen Code" : "Gen Code Setup"}</Text>
        }
        size="lg"
        centered
        styles={{
          header: {
            backgroundColor: theme.colors.primary[5],
            color: "white",
            margin: "-1px -1px 16px -1px",
          },
          title: { color: "white" },
          close: { color: "white" },
        }}
      >
        <form onSubmit={handleSubmit}>
          <Grid>
            {/* GEN CODE GROUP */}
            <Grid.Col span={12}>
              <Group align="flex-start">
                <Select
                  label="Gen Code Group"
                  placeholder="Select group"
                  data={groups}
                  required
                  value={formData.genCodeGroup}
                  clearable
                  onChange={(value) => {
                    setFormData({ ...formData, genCodeGroup: value || "" });

                    // ✅ clear error immediately after select
                    if (errors.genCodeGroup) {
                      setErrors((prev) => ({ ...prev, genCodeGroup: "" }));
                    }
                  }}
                  error={errors.genCodeGroup}
                  style={{ flex: 1 }}
                />


                <ActionIcon
                  color="primary.5"
                  variant="filled"
                  mt={24}
                  onClick={() => setShowAddGroup((p) => !p)}
                  disabled={!!editId}
                >
                  <IconPlus size={20} />
                </ActionIcon>
              </Group>
            </Grid.Col>


            {/* ADD GROUP INLINE */}
            {showAddGroup && (
              <Grid.Col span={12}>
                <Group align="flex-start">
                  <TextInput
                    placeholder="Enter new group name"
                    value={newGroup}
                    onChange={(e) => {
                      setNewGroup(e.target.value);
                      if (addGroupError) setAddGroupError("");
                    }}
                    style={{ flex: 1 }}
                    error={addGroupError}
                  />

                  <Button
                    type="button"          // ✅ prevents form submit
                    onClick={handleAddGroupTemp}
                    variant="light"
                    color="primary.5"
                  >
                    Add
                  </Button>
                </Group>
              </Grid.Col>
            )}


            <Grid.Col span={12}>
              <Divider />
            </Grid.Col>

            {/* GEN CODE */}
            <Grid.Col span={6}>
              <TextInput
                label="Gen Code"
                required
                placeholder="Ex: M, F, A, I"
                value={formData.genCode}
                error={errors.genCode}
                onChange={(e) => {
                  setFormData({ ...formData, genCode: e.target.value })
                  if (errors.genCode) {
                    setErrors((prev) => ({ ...prev, genCode: "" }))
                  }
                }
                }
              />
            </Grid.Col>

            {/* DESCRIPTION */}
            <Grid.Col span={6}>
              <TextInput
                label="Description"
                required
                placeholder="Ex: Male, Active"
                value={formData.description}
                error={errors.description}
                onChange={(e) => {
                  setFormData({ ...formData, description: e.target.value })
                  if (errors.description) {
                    setErrors((prev) => ({ ...prev, description: "" }))
                  }
                }
                }
              />
            </Grid.Col>

            {/* SERIAL NO */}
            <Grid.Col span={6}>
              <TextInput
                label="Serial No"
                type="number"
                required
                value={formData.serialNo}
                onChange={(e) =>
                  setFormData({ ...formData, serialNo: e.target.value })
                }
              />
            </Grid.Col>

            {/* STATUS */}
            <Grid.Col span={6}>
              <Select
                label="Status"
                placeholder="Select status"
                data={STATUS_OPTIONS}
                value={formData.status}
                error={errors.status}
                clearable
                onChange={(value) =>
                  setFormData({ ...formData, status: value || " " })
                }
              />
            </Grid.Col>
          </Grid>

          {/* ACTIONS */}
          <Group justify="flex-end" mt="md">
            <Button
              variant="outline"
              onClick={handleReset}
              leftSection={<IconRestore size={16} />}
              color="primary.5"
            >
              Reset
            </Button>
            <Button
              type="submit"
              leftSection={<IconCheck size={16} />}
              color="primary.5"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Group>
        </form>
      </Modal>

      <DataTable
        data={responseData}
        columns={columns}
        pageSize={RECORDS_PER_PAGE}
        loading={loading}
        onPageChange={setCurrentPage}
        totalRecords={totalRecords}
        currentPage={currentPage}
      />

      <CustomModal
        opened={customModal.open}
        onClose={() => setCustomModal({ ...customModal, open: false })}
        icon={IMAGES.QUESTION}
        title={customModal.title}
        actionText={customModal.actionText}
        subtext={customModal.subText}
        onAction={customModal.onAction}
        showCancel
        cancelText="No"
      />
    </>
  );
};

export default GenCodeSetup;
