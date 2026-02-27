"use client";

import { useEffect } from "react";
import {
  Drawer,
  TextInput,
  Select,
  MultiSelect,
  Textarea,
  NumberInput,
  Flex,
  Box,
  useMantineTheme,
  Button,
  FileInput,
  Fieldset,
  Text,
  Grid,
  ActionIcon,
  Tooltip,
  Stack,
} from "@mantine/core";
import { useForm, isEmail, isNotEmpty } from "@mantine/form";
import { IconCheck, IconRestore, IconPlus, IconTrash } from "@tabler/icons-react";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Field {
  name: string;
  label: string;
  isDisabled?: boolean;
  dedupSelect?: boolean;
  type?:
  | "text"
  | "email"
  | "number"
  | "select"
  | "multiselect"
  | "textarea"
  | "date"
  | "file"
  | "password";
  placeholder?: string;
  required?: boolean;
  regex?: RegExp;
  regexMessage?: string;
  options?: { value: string; label: string }[];
  fileType?: "svg" | "png" | "jpg" | "jpeg" | "image";
  fieldset?: string;
  colSpan?: number;
  maxLength?: number;
  minLength?: number;
  liveRegex?: boolean;
  onChange?: (value: any, form: any) => void;
  liveValidation?: boolean;
}

export interface FieldsetConfig {
  id: string;
  legend: string;
  description?: string;
  collapsed?: boolean;
  isMultipleEntry?: boolean; //  NEW: Flag for multiple entries
  multipleEntryKey?: string; //  NEW: Key name for the array (e.g., "buildingInfo")
}

interface DrawerFormProps {
  opened: boolean;
  onClose: () => void;
  title: string;
  fields: Field[];
  onSubmit: (formData: Record<string, any>) => void;
  initialValues?: Record<string, any>;
  size?: string;
  position?: "left" | "right" | "top" | "bottom";
  fieldsets?: FieldsetConfig[];
  onRemoveEntry?: (fieldsetId: string, index: number, entryValues: Record<string, any>) => void;
}

export default function DrawerForm({
  opened,
  onClose,
  title,
  fields,
  onSubmit,
  initialValues,
  size,
  position = "right",
  fieldsets = [],
  onRemoveEntry,
}: DrawerFormProps) {
  const theme = useMantineTheme();

  const FILE_TYPE_MAP: Record<string, string> = {
    svg: "image/svg+xml",
    png: "image/png",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    image: "image/*",
  };

  /* -------------------- DEFAULT VALUES -------------------- */

  /* -------------------- NEW: Flag for multiple entries -------------------- */
  const defaultValues = fields.reduce((acc, field) => {
    // Check if this field belongs to a multiple entry fieldset
    const fieldset = fieldsets.find((fs) => fs.id === field.fieldset);
    if (fieldset?.isMultipleEntry && fieldset.multipleEntryKey) {
      // Initialize the array if not already done
      if (!acc[fieldset.multipleEntryKey]) {
        acc[fieldset.multipleEntryKey] = [{}];
      }
      // Set default value for this field in the first entry
      const defaultVal = field.type === "multiselect" ? [] : "";
      acc[fieldset.multipleEntryKey][0][field.name] = defaultVal;
    } else {
      acc[field.name] = field.type === "multiselect" ? [] : "";
    }
    return acc;
  }, {} as Record<string, any>);
  /* -------------------- NEW: Flag for multiple entries -------------------- */

  /* -------------------- VALIDATORS -------------------- */
  const validators = fields.reduce((acc, field) => {
    // Skip validation setup for multiple entry fields (handled differently)
    /* -------------------- NEW: Flag for multiple entries -------------------- */
    const fieldset = fieldsets.find((fs) => fs.id === field.fieldset);
    if (fieldset?.isMultipleEntry) {
      return acc;
    }
    /* -------------------- NEW: Flag for multiple entries -------------------- */
    const rules: any[] = [];

    if (field.required) {
      if (field.type === "email") {
        rules.push(isEmail("Invalid email"));
      } else if (field.type === "multiselect") {
        rules.push((value: any[]) =>
          value && value.length > 0 ? null : `${field.label} is required`
        );
      } else {
        rules.push(isNotEmpty(`${field.label} is required`));
      }
    }

    if (field.regex && field.type !== "multiselect") {
      rules.push((value: string) =>
        field.regex!.test(value)
          ? null
          : field.regexMessage || "Invalid value"
      );
    }

    acc[field.name] = (value: any) => {
      for (const rule of rules) {
        const result = rule(value);
        if (result) return result;
      }
      return null;
    };

    return acc;
  }, {} as Record<string, any>);

  /* -------------------- LIVE VALIDATION HELPER -------------------- */
  const validateFieldLive = (field: Field, value: string) => {
    if (!field.liveValidation) return;

    if (!value || value.length === 0) {
      form.clearFieldError(field.name);
      return;
    }

    if (field.regex && !field.regex.test(value)) {
      form.setFieldError(field.name, field.regexMessage || `Invalid ${field.label}`);
    } else {
      form.clearFieldError(field.name);
    }
  };

  const form = useForm({
    initialValues: defaultValues,
    validate: validators,
  });

  /* -------------------- EFFECT -------------------- */
  useEffect(() => {
    if (!opened) return;

    if (initialValues && Object.keys(initialValues).length > 0) {
      form.setValues(initialValues);
    } else {
      form.setValues(defaultValues);
    }

    form.clearErrors();
  }, [opened, initialValues]);

  /* -------------------- GET DEFAULT ENTRY FOR MULTIPLE ENTRY -------------------- */
  const getDefaultEntry = (fieldsetId: string): Record<string, any> => {
    const fieldset = fieldsets.find((fs) => fs.id === fieldsetId);
    if (!fieldset) return {};

    const fieldsInFieldset = fields.filter((f) => f.fieldset === fieldsetId);
    return fieldsInFieldset.reduce((acc, field) => {
      acc[field.name] = field.type === "multiselect" ? [] : "";
      return acc;
    }, {} as Record<string, any>);
  };


  /* -------------------- RENDER FIELD FOR MULTIPLE ENTRY -------------------- */
  const renderMultipleEntryField = (
    field: Field,
    entryKey: string,
    index: number
  ) => {
    const fieldPath = `${entryKey}.${index}.${field.name}`;

    switch (field.type) {
      case "select": {
        const filteredOptions = (() => {
          if (!field.dedupSelect) return field.options || [];
          const allEntries: any[] = form.values[entryKey] || [];
          const otherSelectedValues = allEntries
            .filter((_, i) => i !== index)
            .map((entry) => entry[field.name])
            .filter(Boolean);
          return (field.options || []).filter(
            (opt) => !otherSelectedValues.includes(opt.value),
          );
        })();

        return (
          <Select
            label={index === 0 ? field.label : undefined}
            placeholder={field.placeholder}
            data={filteredOptions}
            value={form.values[entryKey]?.[index]?.[field.name] || ""}
            onChange={(v) => form.setFieldValue(fieldPath, v ?? "")}
            error={form.errors[fieldPath]}
            searchable
            clearable
            withAsterisk={field.required && index === 0}
            disabled={field.isDisabled}
          />
        );
      }

      case "number":
        return (
          <NumberInput
            label={index === 0 ? field.label : undefined}
            placeholder={field.placeholder}
            min={0}
            value={form.values[entryKey]?.[index]?.[field.name] || ""}
            onChange={(v) => form.setFieldValue(fieldPath, v)}
            error={form.errors[fieldPath]}
            withAsterisk={field.required && index === 0}
          />
        );

      case "textarea":
        return (
          <Textarea
            label={index === 0 ? field.label : undefined}
            placeholder={field.placeholder}
            autosize
            minRows={2}
            value={form.values[entryKey]?.[index]?.[field.name] || ""}
            onChange={(e) => form.setFieldValue(fieldPath, e.currentTarget.value)}
            error={form.errors[fieldPath]}
            withAsterisk={field.required && index === 0}
          />
        );

      default:
        return (
          <TextInput
            label={index === 0 ? field.label : undefined}
            placeholder={field.placeholder}
            value={form.values[entryKey]?.[index]?.[field.name] ?? ""}
            onChange={(e) => form.setFieldValue(fieldPath, e.currentTarget.value)}
            maxLength={10}
            error={form.errors[fieldPath]}
            withAsterisk={field.required && index === 0}
          />
        );
    }
  };

  /* -------------------- RENDER MULTIPLE ENTRY SECTION -------------------- */
  // In DrawerForm.tsx — add to interface
interface DrawerFormProps {
  // ...existing props
  onRemoveEntry?: (fieldsetId: string, index: number, entryValues: Record<string, any>) => void;
}

  const renderMultipleEntrySection = (config: FieldsetConfig, fieldGroup: Field[]) => {
    const entryKey = config.multipleEntryKey || config.id;
    const entries = form.values[entryKey] || [{}];

    return (
      <Stack>
        {entries.map((_: any, index: number) => (
          <Grid key={index} align="end" gutter="md">
            {fieldGroup.map((field) => (
              <Grid.Col key={field.name} span={field.colSpan ?? 4}>
                {renderMultipleEntryField(field, entryKey, index)}
              </Grid.Col>
            ))}

            <Grid.Col span={1}>
              {entries.length > 1 && (
                <Tooltip label="Remove row">
                  <ActionIcon
                    color="red"
                    variant="light"
                    onClick={() => {
                      // ← capture entry before removing
                      onRemoveEntry?.(config.id, index, entries[index]);
                      form.removeListItem(entryKey, index);
                    }}
                  >
                    <IconTrash size={16} />
                  </ActionIcon>
                </Tooltip>
              )}
            </Grid.Col>
          </Grid>
        ))}

        <Button
          leftSection={<IconPlus size={20} />}
          variant="light"
          color="primary.5"
          onClick={() => form.insertListItem(entryKey, getDefaultEntry(config.id))}
          mt="sm"
        >
          Add More
        </Button>
      </Stack>
    );
  };

  /* -------------------- FIELD RENDERER -------------------- */
  const renderField = (field: Field) => {
    switch (field.type) {
      case "select":
        return (
          <Select
            label={field.label}
            placeholder={field.placeholder}
            data={field.options || []}
            value={form.values[field.name] || ""}
            onChange={(v) => {
              form.setFieldValue(field.name, v ?? "");
              if (field.onChange) {
                field.onChange(v, form)
              }
            }}
            error={form.errors[field.name]}
            searchable
            clearable
            withAsterisk={field.required}
            disabled={field.isDisabled}
          />
        );

      case "multiselect":
        return (
          <MultiSelect
            label={field.label}
            placeholder={field.placeholder}
            data={field.options || []}
            value={form.values[field.name] || []}
            onChange={(v) => form.setFieldValue(field.name, v)}
            error={form.errors[field.name]}
            searchable
            clearable
            withAsterisk={field.required}
          />
        );

      case "textarea":
        return (
          <Textarea
            label={field.label}
            placeholder={field.placeholder}
            autosize
            minRows={3}
            withAsterisk={field.required}
            {...form.getInputProps(field.name)}
          />
        );

      case "number":
        return (
          <NumberInput
            label={field.label}
            placeholder={field.placeholder}
            withAsterisk={field.required}
            {...form.getInputProps(field.name)}
          />
        );

      case "file": {
        const accept =
          field.fileType && FILE_TYPE_MAP[field.fileType]
            ? FILE_TYPE_MAP[field.fileType]
            : undefined;

        return (
          <FileInput
            label={field.label}
            accept={accept}
            clearable
            error={form.errors[field.name]}
            withAsterisk={field.required}
            onChange={(file) => {
              if (!file) {
                form.setFieldValue(field.name, "");
                return;
              }

              const reader = new FileReader();
              reader.onload = () => {
                const base64 = (reader.result as string).split(",")[1];
                form.setFieldValue(field.name, base64);
              };
              reader.readAsDataURL(file);
            }}
          />
        );
      }

      default:
        return (
          <TextInput
            label={field.label}
            placeholder={field.placeholder}
            value={form.values[field.name] ?? ""}
            error={form.errors[field.name]}
            withAsterisk={field.required}
            maxLength={field.maxLength}
            minLength={field.minLength}
            // onChange={(event) => {
            //   let value = event.currentTarget.value;
            //   if (field.name === "societyCode") {
            //     value = value.toUpperCase();
            //   }
            //   if (field.liveRegex && field.regex) {
            //     if (value && !field.regex.test(value)) {
            //       form.setFieldError(field.name, field.regexMessage);
            //     } else {
            //       form.clearFieldError(field.name);
            //     }
            //   }

            //   if (field.name === "phone") value = value.replace(/\D/g, "");
            //   form.setFieldValue(field.name, value);
            // }}

            onChange={(event) => {
              const value = event.currentTarget.value;
              form.setFieldValue(field.name, value);
              validateFieldLive(field, value);
              if (field.onChange) {
                field.onChange(value, form);
              }
            }}
          />
        );
    }
  };

  const handleClose = () => {
    form.setValues(defaultValues);
    form.clearErrors();
    onClose();
  };

  /* -------------------- GROUP FIELDS -------------------- */
  const groupedFields = fields.reduce((acc, field) => {
    const key = field.fieldset || "ungrouped";
    acc[key] = acc[key] || [];
    acc[key].push(field);
    return acc;
  }, {} as Record<string, Field[]>);

  /* -------------------- RENDER -------------------- */
  return (
    <Drawer
      opened={opened}
      onClose={handleClose}
      title={title}
      position={position}
      size={size || "md"}
      styles={{
        content: {
          backgroundColor: "var(--background)",
        },
        header: {
          backgroundColor: theme.colors.primary[6],
          borderBottom: "1px solid rgba(255,255,255,0.15)",
        },
        title: {
          color: theme.white,
          fontWeight: 600,
        },
      }}
    >
      <form
        onSubmit={form.onSubmit((values) => {
          onSubmit(values);
          form.reset();
        })}
        style={{ height: "100%", display: "flex", flexDirection: "column" }}
      >
        <Box style={{ flex: 1, overflowY: "auto", padding: 20 }}>
          {Object.entries(groupedFields).map(([fieldsetId, fieldGroup]) => {
            const config = fieldsets.find((fs) => fs.id === fieldsetId);

            if (fieldsetId === "ungrouped") {
              return (
                <Grid key="ungrouped" gutter="md" mb="lg">
                  {fieldGroup.map((field) => (
                    <Grid.Col key={field.name} span={field.colSpan ?? 12}>
                      {renderField(field)}
                    </Grid.Col>
                  ))}
                </Grid>
              );
            }

            return (
              <Fieldset
                variant="filled"
                key={fieldsetId}
                legend={config?.legend}
                mb="lg"
                styles={{
                  root: {
                    border: `1px solid ${theme.colors.primary[2]}`,
                    borderRadius: 8,
                    padding: 16,
                    boxShadow: "1px 1px 3px rgba(0, 0, 0, 0.2)",
                    backgroundColor: theme.colors.primary[0],
                  },
                  legend: { fontWeight: 600 },
                }}
              >
                {config?.description && (
                  <Text size="xs" c="secondary.9" mb="sm">
                    {config.description}
                  </Text>
                )}

                {/*  Check if this is a multiple entry fieldset */}
                {config?.isMultipleEntry ? (
                  renderMultipleEntrySection(config, fieldGroup)
                ) : (
                  <Grid gutter="md">
                    {fieldGroup.map((field) => (
                      <Grid.Col key={field.name} span={field.colSpan ?? 12}>
                        {renderField(field)}
                      </Grid.Col>
                    ))}
                  </Grid>
                )}
                {/*  Check if this is a multiple entry fieldset */}

              </Fieldset>
            );
          })}
        </Box>

        {/* Footer */}
        <Box
          style={{
            borderTop: "1px solid #eee",
            padding: 12,
            background: "var(--background)",
          }}
        >
          <Flex justify="flex-end" gap="sm">
            <Button
              variant="outline"
              onClick={() => { form.setValues(defaultValues); }}
              leftSection={<IconRestore size={16} />}
              color="primary.5"
            >
              Reset
            </Button>
            <Button
              type="submit"
              leftSection={<IconCheck size={16} />}
              color="primary.5"
            >
              Submit
            </Button>
          </Flex>
        </Box>
      </form>
    </Drawer>
  );
}