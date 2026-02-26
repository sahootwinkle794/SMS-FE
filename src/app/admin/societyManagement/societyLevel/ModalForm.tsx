// ModalForm.tsx
import {
  Modal,
  Grid,
  Paper,
  TextInput,
  Textarea,
  NumberInput,
  Switch,
  Button,
  Group,
  Text,
  Title,
  Stack,
  MultiSelect,
  Collapse,
  Badge,
  Box,
} from "@mantine/core";
import { useState, useEffect, useMemo } from "react";
import { notifications } from "@mantine/notifications";
import {
  IconX,
  IconSettings,
  IconChevronDown,
  IconChevronUp,
} from "@tabler/icons-react";
import { SOCIETY_RULES } from "@/utils/constants";
import {
  SocietyLevels,
  RuleDefinition,
  FormState,
} from "@/types/admin/societyManagement/societyLevel/societyLevel";
import { useMantineTheme } from "@mantine/core";

type RuleKey = keyof RuleDefinition;

const DEFAULT_RULE_DEFINITION: RuleDefinition = {
  maxMembers: 0,
  flatCriteria: {
    minAvgFlatSizeSqFt: 1600,
    allowedFlatTypes: ["3BHK", "4BHK", "DUPLEX", "PENTHOUSE"],
  },
  societyScale: {
    minTotalFlats: 80,
    minBlocks: 2,
    maxMembers: 1000,
  },
};

interface SocietyLevelModalFormProps {
  opened: boolean;
  editing: SocietyLevels | null;
  onClose: () => void;
  onSubmit: (formData: FormState) => Promise<void>;
}

const SocietyLevelModalForm = ({
  opened,
  editing,
  onClose,
  onSubmit,
}: SocietyLevelModalFormProps) => {
  const theme = useMantineTheme();
  const [form, setForm] = useState<FormState>({
    levelCode: "",
    levelName: "",
    description: "",
    displayOrder: 1,
    isActive: true,
    ruleDefinition: DEFAULT_RULE_DEFINITION,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    flatCriteria: true,
    societyScale: true,
  });

  // Get form state from editing data
  const editingFormState = useMemo(() => {
    if (!editing) return null;
    return {
      levelCode: editing.levelCode,
      levelName: editing.levelName,
      description: editing.description || "",
      displayOrder: editing.displayOrder,
      isActive: editing.isActive,
      ruleDefinition: {
        ...DEFAULT_RULE_DEFINITION,
        ...editing.ruleDefinition,
      } as RuleDefinition,
    };
  }, [editing]);

  // Reset form when modal opens
  useEffect(() => {
    if (opened) {
      if (editingFormState) {
        setForm(editingFormState);
      } else {
        setForm({
          levelCode: "",
          levelName: "",
          description: "",
          displayOrder: 1,
          isActive: true,
          ruleDefinition: DEFAULT_RULE_DEFINITION,
        });
      }
    }
  }, [opened, editingFormState]);

  const notifyError = (msg: string) =>
    notifications.show({
      title: "Error",
      message: msg,
      color: "red",
      icon: <IconX size={16} />,
    });

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await onSubmit(form);
    } catch (error) {
      // Error is already handled in parent
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    field: keyof Omit<FormState, "ruleDefinition">,
    value: any
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleRuleChange = (ruleKey: RuleKey, value: any) => {
    setForm((prev) => ({
      ...prev,
      ruleDefinition: {
        ...prev.ruleDefinition,
        [ruleKey]: value,
      },
    }));
  };

  const handleNestedRuleChange = (
    parentKey: keyof RuleDefinition,
    fieldKey: string,
    value: any
  ) => {
    setForm((prev) => ({
      ...prev,
      ruleDefinition: {
        ...prev.ruleDefinition,
        [parentKey]: {
          ...(prev.ruleDefinition[
            parentKey as keyof typeof prev.ruleDefinition
          ] as any),
          [fieldKey]: value,
        },
      },
    }));
  };

  const toggleSection = (sectionKey: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionKey]: !prev[sectionKey],
    }));
  };

  // Helper function to render different input types
  const renderRuleInput = (
    ruleKey: string,
    cfg: any,
    value: any,
    onChange: (value: any) => void
  ) => {
    switch (cfg.type) {
      case "boolean":
        return (
          <Switch
            label={cfg.label}
            checked={Boolean(value)}
            onChange={(e) => onChange(e.currentTarget.checked)}
            disabled={isSubmitting}
            size="md"
            color="primary.5"
          />
        );

      case "number":
        return (
          <NumberInput
            label={cfg.label}
            value={Number(value)}
            onChange={(val) => onChange(val ?? 0)}
            disabled={isSubmitting}
            size="sm"
          />
        );

      case "array":
        return (
          <MultiSelect
            label={cfg.label}
            data={cfg.options || []}
            value={value || []}
            onChange={onChange}
            disabled={isSubmitting}
            size="sm"
            clearable
            searchable
          />
        );

      default:
        return (
          <TextInput
            label={cfg.label}
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            disabled={isSubmitting}
            size="sm"
          />
        );
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={editing ? "Edit Society Level" : "Add Society Level"}
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
            backgroundColor: "rgba(255, 255, 255, 0.7)",
          },
        },
      }}
    >
      <Stack gap="md">
        {/* Basic Information Section */}
        <Grid>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <TextInput
              label="Level Code"
              value={form.levelCode}
              onChange={(e) => handleInputChange("levelCode", e.target.value)}
              required
              disabled={isSubmitting}
              placeholder="Enter level code"
              size="sm"
            />
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 6 }}>
            <TextInput
              label="Level Name"
              value={form.levelName}
              onChange={(e) => handleInputChange("levelName", e.target.value)}
              required
              placeholder="Enter level name"
              disabled={isSubmitting}
              size="sm"
            />
          </Grid.Col>

          <Grid.Col span={12}>
            <Textarea
              label="Description"
              value={form.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              disabled={isSubmitting}
              minRows={2}
              maxRows={4}
              placeholder="Enter level description"
              size="sm"
            />
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 6 }}>
            <NumberInput
              label="Display Order"
              value={form.displayOrder}
              onChange={(val) =>
                handleInputChange("displayOrder", Number(val) || 1)
              }
              min={1}
              disabled={isSubmitting}
              size="sm"
            />
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Switch
              label="Active"
              checked={form.isActive}
              onChange={(e) =>
                handleInputChange("isActive", e.currentTarget.checked)
              }
              disabled={isSubmitting}
              size="md"
              mt="sm"
              color="primary.5"
            />
          </Grid.Col>
        </Grid>

        {/* Rule Definition Section */}
        <Paper
          p="md"
          bg={theme.colors.primary[0]}
          radius="md"
          mt="md"
          withBorder
        >
          <Group mb="sm">
            <IconSettings size={18} color={theme.colors.primary[5]} />
            <Title order={4} size="h5">
              Rule Definition
            </Title>
          </Group>

          <Stack gap="md">
            {/* Simple Rules */}
            <Grid>
              {Object.entries(SOCIETY_RULES)
                .map(([key, cfg]) => {
                  const ruleKey = key as RuleKey;

                  // Skip nested object types for this grid
                  if (cfg.type === "object") return null;

                  return (
                    <Grid.Col key={ruleKey} span={{ base: 12, sm: 6 }}>
                      {renderRuleInput(
                        ruleKey,
                        cfg,
                        form.ruleDefinition[ruleKey],
                        (value) => handleRuleChange(ruleKey, value)
                      )}
                    </Grid.Col>
                  );
                })
                .filter(Boolean)}
            </Grid>

            {/* Nested Object Rules */}
            {Object.entries(SOCIETY_RULES).map(([key, cfg]) => {
              if (cfg.type !== "object" || !("fields" in cfg)) return null;

              const ruleKey = key as RuleKey;
              const isExpanded = expandedSections[ruleKey] ?? true;
              const sectionValue = form.ruleDefinition[ruleKey] as any;

              return (
                <Box key={ruleKey}>
                  <Paper
                    p="xs"
                    withBorder
                    radius="sm"
                    style={{ cursor: "pointer" }}
                    onClick={() => toggleSection(ruleKey)}
                  >
                    <Group justify="space-between">
                      <Group gap="xs">
                        <Badge variant="filled" color="primary.5">
                          {cfg.label}
                        </Badge>
                        <Text size="sm" c="dimmed">
                          {Object.keys(cfg.fields).length} rules
                        </Text>
                      </Group>
                      {isExpanded ? (
                        <IconChevronUp size={16} />
                      ) : (
                        <IconChevronDown size={16} />
                      )}
                    </Group>
                  </Paper>

                  <Collapse in={isExpanded}>
                    <Grid mt="sm">
                      {Object.entries(cfg.fields).map(
                        ([fieldKey, fieldCfg]: [string, any]) => (
                          <Grid.Col
                            key={`${ruleKey}.${fieldKey}`}
                            span={{ base: 12, sm: 6 }}
                          >
                            {renderRuleInput(
                              fieldKey,
                              fieldCfg,
                              sectionValue?.[fieldKey],
                              (value) =>
                                handleNestedRuleChange(ruleKey, fieldKey, value)
                            )}
                          </Grid.Col>
                        )
                      )}
                    </Grid>
                  </Collapse>
                </Box>
              );
            })}
          </Stack>
        </Paper>

        {/* Action Buttons */}
        <Group justify="flex-end" mt="md">
          <Button
            variant="outline"
            color="primary.5"
            onClick={onClose}
            disabled={isSubmitting}
            size="sm"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            loading={isSubmitting}
            color="primary.5"
            size="sm"
          >
            Save
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
};

export default SocietyLevelModalForm;
