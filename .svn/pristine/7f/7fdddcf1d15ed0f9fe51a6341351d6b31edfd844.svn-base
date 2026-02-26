"use client";

import {
  Modal,
  Grid,
  TextInput,
  Textarea,
  Switch,
  Button,
  Group,
  Stack,
  NumberInput,
  Select,
} from "@mantine/core";
import { useState, useEffect, useMemo } from "react";
import { useMantineTheme } from "@mantine/core";
import { ServiceFormState } from "../../../../../types/admin/societyManagement/services/serviceSetup/serviceSetup"


interface ServiceSetupModalFormProps {
  opened: boolean;
  editing: ServiceFormState | null;
  onClose: () => void;
  onSubmit: (data: ServiceFormState) => Promise<void>;
}

const ServiceSetupModalForm = ({
  opened,
  editing,
  onClose,
  onSubmit,
}: ServiceSetupModalFormProps) => {
  const theme = useMantineTheme();

  const [form, setForm] = useState<ServiceFormState>({
    serviceCode: "",
    serviceName: "",
    description: "",
    serviceType: "INTERNAL",
    iconUrl: "",
    displayOrder: 1,
    isActive: true,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Populate form in edit mode
  const editingFormState = useMemo(() => {
    if (!editing) return null;
    return { ...editing };
  }, [editing]);

  useEffect(() => {
    if (opened) {
      if (editingFormState) {
        setForm(editingFormState);
      } else {
        setForm({
          serviceCode: "",
          serviceName: "",
          description: "",
          serviceType: "INTERNAL",
          iconUrl: "",
          displayOrder: 1,
          isActive: true,
        });
      }
    }
  }, [opened, editingFormState]);

  const handleInputChange = (field: keyof ServiceFormState, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
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
        title: {
          color: "white",
          fontWeight: 600,
        },
        close: {
          color: "white",
        },
      }}
    >
      <Stack gap="md">
        <Grid>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <TextInput
              label="Service Code"
              value={form.serviceCode}
              onChange={(e) =>
                handleInputChange("serviceCode", e.target.value)
              }
              required
              disabled={editing ? true : isSubmitting}
              size="sm"
            />
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 6 }}>
            <TextInput
              label="Service Name"
              value={form.serviceName}
              onChange={(e) =>
                handleInputChange("serviceName", e.target.value)
              }
              required
              disabled={isSubmitting}
              size="sm"
            />
          </Grid.Col>

          <Grid.Col span={12}>
            <Textarea
              label="Description"
              value={form.description}
              onChange={(e) =>
                handleInputChange("description", e.target.value)
              }
              disabled={isSubmitting}
              minRows={2}
              size="sm"
            />
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Select
              label="Service Type"
              value={form.serviceType}
              data={[
                { value: "INTERNAL", label: "Internal" },
                { value: "EXTERNAL", label: "External" },
              ]}
              onChange={(value) =>
                handleInputChange("serviceType", value)
              }
              disabled={isSubmitting}
              size="sm"
            />
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 6 }}>
            <NumberInput
              label="Display Order"
              value={form.displayOrder}
              onChange={(value) =>
                handleInputChange("displayOrder", value || 1)
              }
              min={1}
              disabled={isSubmitting}
              size="sm"
            />
          </Grid.Col>


          <Grid.Col span={{ base: 12, sm: 6 }}>
            <TextInput
              label="Icon URL"
              value={form.iconUrl}
              onChange={(e) =>
                handleInputChange("iconUrl", e.target.value)
              }
              disabled={isSubmitting}
              size="sm"
            />
          </Grid.Col>

          <Grid.Col
            span={{ base: 12, sm: 6 }}
            style={{ display: "flex", alignItems: "center" }}
          >
            <Switch
              label="Active"
              color="primary.5"
              checked={form.isActive}
              onChange={(e) =>
                handleInputChange("isActive", e.currentTarget.checked)
              }
              disabled={isSubmitting}
              mt={22}   // aligns with input field height
            />
          </Grid.Col>

        </Grid>

        <Group justify="flex-end" mt="md">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isSubmitting}
            color="primary.5"
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

export default ServiceSetupModalForm;