"use client";

import {
  Button,
  Group,
  Modal,
  Stack,
  Text,
  Badge,
  Tooltip,
  ActionIcon,
  Paper,
  useMantineTheme,
} from "@mantine/core";
import SocietyLevelModalForm from "./ModalForm";
import { DataTable, Column } from "@/components/DataTable";
import { AppBreadcrumbs } from "@/components";
import {
  getRequest,
  postRequest,
  patchRequest,
  deleteRequest,
} from "@/service";
import { API_PATH } from "@/utils/apiPath";
import { COMMON_MESSAGE } from "@/utils/constants";
import { RouteConfig } from "@/utils/routeConfig";
import { SOCIETY_RULES } from "@/utils/constants";
import { notifications } from "@mantine/notifications";
import {
  IconPlus,
  IconEdit,
  IconTrash,
  IconX,
  IconEye,
  IconSettings,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import {
  SocietyLevels,
  SocietyLevelResponse,
  RuleDefinition,
  FormState,
} from "@/types/admin/societyManagement/societyLevel/societyLevel";

const DEFAULT_RULE_DEFINITION: RuleDefinition = {
  maxMembers: 0,
};

const SocietyLevel = () => {
  const [levels, setLevels] = useState<SocietyLevels[]>([]);
  const [loading, setLoading] = useState(false);

  const [opened, setOpened] = useState(false);
  const [viewRules, setViewRules] = useState<RuleDefinition | null>(null);
  const [editing, setEditing] = useState<SocietyLevels | null>(null);
  const theme = useMantineTheme();

  const [form, setForm] = useState<FormState>({
    levelCode: "",
    levelName: "",
    description: "",
    displayOrder: 1,
    isActive: true,
    ruleDefinition: DEFAULT_RULE_DEFINITION,
  });

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

  //-----------Fetch Society Levels-----------//

  const fetchSocietyLevels = async () => {
    setLoading(true);
    try {
      const res = (await getRequest(
        API_PATH.GET_SOCIETY_LEVELS
      )) as SocietyLevelResponse;

      setLevels(res?.data?.data ?? []);
    } catch {
      notifyError(COMMON_MESSAGE.SOCIETY_LEVEL_FETCH_FAIL);
    } finally {
      setLoading(false);
    }
  };
  //-----------------------------------------//

  useEffect(() => {
    fetchSocietyLevels();
  }, []);

  //-----------Submit Add/Edit-----------//

  const handleSubmit = async (formData: FormState) => {
    try {
      if (editing) {
        await patchRequest(
          `${API_PATH.GET_SOCIETY_LEVELS}/${editing.societyLevelId}`,
          formData // Use formData from modal instead of parent's form state
        );
        notifySuccess(COMMON_MESSAGE.SOCIETY_LEVEL_UPDATE);
      } else {
        await postRequest(API_PATH.GET_SOCIETY_LEVELS, formData); // Use formData from modal
        notifySuccess(COMMON_MESSAGE.SOCIETY_LEVEL_ADDED);
      }

      setOpened(false);
      setEditing(null);
      fetchSocietyLevels();
    } catch (error) {
      notifyError(COMMON_MESSAGE.OPERATION_FAILED);
      throw error;
    }
  };

  //-------------------------------------------//

  //-----------Delete-----------//

  const handleDelete = async (id: string) => {
    try {
      await deleteRequest(`${API_PATH.GET_SOCIETY_LEVELS}/${id}`);
      notifySuccess(COMMON_MESSAGE.SOCIETY_LEVEL_DELETED);
      fetchSocietyLevels();
    } catch {
      notifyError("Delete failed");
    }
  };

  //-------------------------------------------//

  const handleEditClick = (row: SocietyLevels) => {
    setEditing(row);
    setOpened(true);
  };

  const handleAddClick = () => {
    setEditing(null);
    setOpened(true);
  };

  //-----------DataTable Columns-----------//

  const columns: Column<SocietyLevels>[] = [
    {
      header: "Level Code",
      accessor: "levelCode",
      sortable: true,
      width: "8%",
      render: (_value, row) => (
        <Badge variant="dot" color="primary.5" size="sm">
          {row.levelCode}
        </Badge>
      ),
    },
    {
      header: "Level Name",
      accessor: "levelName",
      sortable: true,
      width: "10%",
    },
    {
      header: "Description",
      accessor: "description",
      width: "20%",
    },
    {
      header: "Rules",
      width: "8%",
      render: (_value, row) => (
        <Button
          size="xs"
          variant="subtle"
          leftSection={<IconEye size={14} />}
          onClick={() => setViewRules(row?.ruleDefinition || {})}
        >
          View
        </Button>
      ),
    },
    {
      header: "Order",
      accessor: "displayOrder",
      sortable: true,
      width: "6%",
    },
    {
      header: "Status",
      width: "6%",
      align: "center",
      render: (_value, row) => (
        <Badge
          size="sm"
          radius="xs"
          variant="filled"
          color={row.isActive ? "success.5" : "danger.5"}
        >
          {row.isActive ? "Active" : "Inactive"}
        </Badge>
      ),
    },
    {
      header: "Actions",
      width: "5%",
      align: "left",
      render: (_value, row) => (
        <Group wrap="nowrap" gap={8}>
          {/* EDIT */}
          <Tooltip label="Edit Level">
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
          <Tooltip label="Delete Level">
            <ActionIcon
              color="red"
              variant="light"
              radius="md"
              onClick={() => handleDelete(row.societyLevelId)}
            >
              <IconTrash size={16} />
            </ActionIcon>
          </Tooltip>
        </Group>
      ),
    },
  ];

  return (
    <>
      <AppBreadcrumbs
        items={[
          { label: "Society Management", path: RouteConfig.SOCIETY_MGT },
          { label: "Society Level",},
        ]}
      />

      <Group justify="space-between" mt="md" mb="sm">
        <Text fw={600} size="lg">
          Society Levels
        </Text>
        <Button
          leftSection={<IconPlus size={16} />}
          onClick={() => {
            setEditing(null);
            setForm({
              levelCode: "",
              levelName: "",
              description: "",
              displayOrder: 1,
              isActive: true,
              ruleDefinition: DEFAULT_RULE_DEFINITION,
            });
            setOpened(true);
          }}
          color="primary.5"
        >
          Add Society Level
        </Button>
      </Group>

      <DataTable
        data={levels}
        columns={columns}
        loading={loading}
        pageSize={10}
        totalRecords={levels.length}
      />

      {/* Add/Edit Modal */}
      <SocietyLevelModalForm
        opened={opened}
        editing={editing}
        onClose={() => {
          setOpened(false);
          setEditing(null);
        }}
        onSubmit={handleSubmit}
      />

      {/* View Rules Modal */}
      <Modal
        opened={!!viewRules}
        onClose={() => setViewRules(null)}
        title={
          <Group gap="xs">
            <IconSettings size={20} />
            <span>Rule Definition</span>
          </Group>
        }
        size="lg"
        styles={{
          header: {
            backgroundColor: theme.colors.primary[5],
            color: "white",
            padding: "16px 20px",
            margin: "-1px -1px 16px -1px",
          },
          title: {
            color: "white",
            fontWeight: 600,
          },
          close: {
            color: "white",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            },
          },
        }}
      >
        <Stack gap="md">
          {viewRules && Object.keys(viewRules).length > 0 ? (
            <>
              {/* Simple Rules (non-object types) */}
              {Object.entries(viewRules).map(([key, value]) => {
                const ruleConfig =
                  SOCIETY_RULES[key as keyof typeof SOCIETY_RULES];
                const label = ruleConfig?.label || key;

                // Skip object types for now, they'll be handled separately
                if (ruleConfig?.type === "object") return null;

                return (
                  <Paper key={key} p="sm" withBorder radius="md">
                    <Group justify="space-between" wrap="nowrap">
                      <div style={{ flex: 1 }}>
                        <Text size="sm" fw={500} c="dark.7">
                          {label}
                        </Text>
                        <Text size="xs" c="dimmed" mt={2}>
                          {key}
                        </Text>
                      </div>
                      <Badge
                        size="lg"
                        variant="light"
                        color={
                          typeof value === "boolean"
                            ? value
                              ? "green"
                              : "gray"
                            : "blue"
                        }
                      >
                        {typeof value === "boolean"
                          ? value
                            ? "Enabled"
                            : "Disabled"
                          : String(value)}
                      </Badge>
                    </Group>
                  </Paper>
                );
              })}

              {/* Object Type Rules */}
              {Object.entries(viewRules).map(([key, value]) => {
                const ruleConfig =
                  SOCIETY_RULES[key as keyof typeof SOCIETY_RULES];

                // Only handle object types
                if (ruleConfig?.type !== "object" || !value) return null;

                return (
                  <Paper key={key} p="md" withBorder radius="md" bg="gray.0">
                    <Group mb="sm" gap="xs">
                      <Badge variant="filled" color="primary.5">
                        {ruleConfig.label || key}
                      </Badge>
                      <Text size="xs" c="dimmed">
                        {Object.keys(value as object).length} properties
                      </Text>
                    </Group>

                    <Stack gap="xs">
                      {Object.entries(value as object).map(
                        ([subKey, subValue]) => {
                          const fieldConfig = (ruleConfig as any).fields?.[
                            subKey
                          ];
                          const fieldLabel = fieldConfig?.label || subKey;

                          return (
                            <div
                              key={`${key}.${subKey}`}
                              style={{
                                padding: "10px 12px",
                                backgroundColor: "white",
                                borderRadius: "6px",
                                border: "1px solid #e9ecef",
                              }}
                            >
                              <Group justify="space-between">
                                <div>
                                  <Text size="sm" fw={500}>
                                    {fieldLabel}
                                  </Text>
                                  <Text size="xs" c="dimmed">
                                    {subKey}
                                  </Text>
                                </div>

                                <div style={{ maxWidth: "60%" }}>
                                  {Array.isArray(subValue) ? (
                                    <Group
                                      gap="xs"
                                      wrap="wrap"
                                      justify="flex-end"
                                    >
                                      {subValue.map((item, index) => (
                                        <Badge
                                          key={index}
                                          size="sm"
                                          variant="light"
                                          color="blue"
                                        >
                                          {item}
                                        </Badge>
                                      ))}
                                    </Group>
                                  ) : typeof subValue === "boolean" ? (
                                    <Badge
                                      size="sm"
                                      variant={subValue ? "filled" : "light"}
                                      color={subValue ? "green" : "gray"}
                                    >
                                      {subValue ? "Yes" : "No"}
                                    </Badge>
                                  ) : typeof subValue === "number" ? (
                                    <Badge
                                      size="sm"
                                      variant="light"
                                      color="indigo"
                                    >
                                      {subValue}
                                    </Badge>
                                  ) : (
                                    <Text size="sm" c="dark.7">
                                      {String(subValue)}
                                    </Text>
                                  )}
                                </div>
                              </Group>
                            </div>
                          );
                        }
                      )}
                    </Stack>
                  </Paper>
                );
              })}
            </>
          ) : (
            <Paper
              p="xl"
              withBorder
              radius="md"
              style={{
                textAlign: "center",
                backgroundColor: "#f8f9fa",
              }}
            >
              <IconSettings size={48} color="gray" />
              <Text c="dimmed" size="sm" mt="md">
                No rules defined for this level
              </Text>
            </Paper>
          )}
        </Stack>
      </Modal>
    </>
  );
};

export default SocietyLevel;
