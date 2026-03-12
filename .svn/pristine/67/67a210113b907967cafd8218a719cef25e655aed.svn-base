"use client";

import {
  Modal, Grid, TextInput, Textarea, Button,
  Group, Stack, NumberInput, Select, useMantineTheme, Image, FileInput,
} from "@mantine/core";
import { useState, useEffect, useMemo } from "react";
import { ServiceFormState } from "../../../../../types/admin/societyManagement/services/serviceSetup/serviceSetup";
import { STATUS_OPTIONS, SERVICE_TYPE_OPTIONS, REGEX } from "@/utils/constants";
import { IconPaperclip } from "@tabler/icons-react";

interface ServiceSetupModalFormProps {
  opened: boolean;
  editing: ServiceFormState | null;
  onClose: () => void;
  onSubmit: (data: ServiceFormState) => Promise<void>;
}

const EMPTY_FORM: ServiceFormState = {
  serviceCode: "",
  serviceName: "",
  description: "",
  serviceType: "",
  iconUrl: "",
  displayOrder: undefined,
  status: "",
};

type FormErrors = Partial<Record<keyof ServiceFormState, string>>;

const validateForm = (form: ServiceFormState): FormErrors => {
  const errors: FormErrors = {};

  if (!form.serviceCode.trim()) {
    errors.serviceCode = "Service Code is required";
  } else if (!REGEX.SOCIETY_CODE.test(form.serviceCode)) {
    errors.serviceCode = "Invalid Service Code format";
  }

  if (!form.serviceName.trim()) errors.serviceName = "Service Name is required";
  if (!form.serviceType.trim()) errors.serviceType = "Service Type is required";
  if (form.status === "" || form.status == null) errors.status = "Status is required";

  return errors;
};

const ServiceSetupModalForm = ({ opened, editing, onClose, onSubmit }: ServiceSetupModalFormProps) => {
  const theme = useMantineTheme();
  const [form, setForm] = useState<ServiceFormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Full data URI for preview only — never sent to API
  const [iconPreview, setIconPreview] = useState<string>("");

  const editingFormState = useMemo(() => editing ? { ...editing } : null, [editing]);

  useEffect(() => {
    if (opened) {
      setErrors({});
      setForm(editingFormState ?? EMPTY_FORM);
      // Reconstruct preview from stored raw base64 when editing
      setIconPreview(
        editingFormState?.iconUrl
          ? `data:image/svg+xml;base64,${editingFormState.iconUrl}`
          : ""
      );
    }
  }, [opened, editingFormState]);

  const handleInputChange = <K extends keyof ServiceFormState>(field: K, value: ServiceFormState[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => { const next = { ...prev }; delete next[field]; return next; });
  };

  const handleFileChange = (file: File | null) => {
    if (!file) {
      handleInputChange("iconUrl", "");
      setIconPreview("");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string; // e.g. "data:image/svg+xml;base64,PHN2Zy..."
      setIconPreview(dataUrl);                 // full URI → preview, correct mime type preserved
      const raw = dataUrl.slice(dataUrl.indexOf(",") + 1); // strip prefix → API payload
      handleInputChange("iconUrl", raw);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    const newErrors = validateForm(form);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setIsSubmitting(true);
    try {
      await onSubmit(form);
    } catch (error) {
      console.error("Error submitting service:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={editing ? "Edit Service" : "Add Service"}
      size="lg"
      styles={{
        header: {
          backgroundColor: theme.colors.primary[5],
          color: "white",
          padding: "16px 20px",
          margin: "-1px -1px 16px -1px",
        },
        title: { color: "white", fontWeight: 600 },
        close: { color: "white" },
      }}
    >
      <Stack gap="md">
        <Grid>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <TextInput
              label="Service Code"
              value={form.serviceCode}
              error={errors.serviceCode}
              placeholder="Enter service code"
              onChange={(e) => handleInputChange("serviceCode", e.target.value)}
              required
              minLength={2}
              maxLength={50}
              disabled={editing ? true : isSubmitting}
              size="sm"
            />
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 6 }}>
            <TextInput
              label="Service Name"
              value={form.serviceName}
              error={errors.serviceName}
              placeholder="Enter service name"
              minLength={2}
              maxLength={150}
              onChange={(e) => handleInputChange("serviceName", e.target.value)}
              required
              disabled={isSubmitting}
              size="sm"
            />
          </Grid.Col>

          <Grid.Col span={12}>
            <Textarea
              label="Description"
              value={form.description}
              placeholder="Enter service description"
              onChange={(e) => handleInputChange("description", e.target.value)}
              disabled={isSubmitting}
              minRows={2}
              size="sm"
            />
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Select
              label="Service Type"
              placeholder="Select service type"
              required
              value={form.serviceType}
              data={SERVICE_TYPE_OPTIONS}
              error={errors.serviceType}
              onChange={(value) => handleInputChange("serviceType", value ?? "")}
              disabled={isSubmitting}
              size="sm"
            />
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 6 }}>
            <NumberInput
              label="Display Order"
              value={form.displayOrder}
              placeholder="Enter display order"
              onChange={(value) =>
                handleInputChange("displayOrder", typeof value === "number" ? value : undefined)
              }
              min={1}
              disabled={isSubmitting}
              size="sm"
            />
          </Grid.Col>

          {/* Icon Upload */}
          <Grid.Col span={12}>
            <Group align="flex-end" gap="sm">
              <FileInput
                label="Service Icon"
                placeholder="Choose Image (SVG file)"
                accept="image/svg+xml"
                leftSection={<IconPaperclip size={14} />}
                onChange={handleFileChange}
                disabled={isSubmitting}
                clearable
                size="sm"
                style={{ flex: 1 }}
              />
              {iconPreview && (
                <Image
                  src={iconPreview}
                  alt="Icon preview"
                  w={36}
                  h={36}
                  fit="contain"
                  mb={1}
                  style={{
                    border: `1px solid ${theme.colors.gray[3]}`,
                    borderRadius: 6,
                    backgroundColor: theme.colors.gray[0],
                    padding: 3,
                    flexShrink: 0,
                  }}
                  onError={(e) => {
                    // If svg+xml fails (raster image), fall back to png
                    const img = e.currentTarget;
                    if (!img.src.includes("image/png")) {
                      img.src = `data:image/png;base64,${form.iconUrl}`;
                    }
                  }}
                />
              )}
            </Group>
          </Grid.Col>
        </Grid>

        <Grid>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Select
              label="Status"
              placeholder="Select Status"
              required
              data={STATUS_OPTIONS}
              value={form?.status?.toString()}
              error={errors.status}
              onChange={(value) => handleInputChange("status", Number(value) as 0 | 1)}
              disabled={isSubmitting}
            />
          </Grid.Col>

          <Grid.Col span={12}>
            <Group justify="flex-end" mt="md">
              <Button variant="outline" onClick={onClose} disabled={isSubmitting} color="primary.5" size="sm">
                Cancel
              </Button>
              <Button onClick={handleSubmit} loading={isSubmitting} color="primary.5" size="sm">
                Save
              </Button>
            </Group>
          </Grid.Col>
        </Grid>
      </Stack>
    </Modal>
  );
};

export default ServiceSetupModalForm;