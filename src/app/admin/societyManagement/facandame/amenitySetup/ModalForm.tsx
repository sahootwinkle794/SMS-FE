// ModalForm.tsx
import {
  Modal,
  Grid,
  TextInput,
  Textarea,
  Switch,
  Button,
  Group,
  Stack,
} from "@mantine/core";
import { useState, useEffect, useMemo } from "react";
import {
  AmenityItem,
  FormState,
} from "@/types/admin/societyManagement/amenitySetup/amenitySetup";
import { useMantineTheme } from "@mantine/core";

interface AmenitySetupModalFormProps {
  opened: boolean;
  editing: AmenityItem | null;
  onClose: () => void;
  onSubmit: (formData: Omit<FormState, "isActive">) => Promise<void>;
}

const AmenitySetupModalForm = ({
  opened,
  editing,
  onClose,
  onSubmit,
}: AmenitySetupModalFormProps) => {
  const theme = useMantineTheme();
  const [form, setForm] = useState<FormState>({
    amenityCode: "",
    amenityName: "",
    description: "",
    iconUrl: "",
    status: 1,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get form state from editing data
  const editingFormState = useMemo(() => {
    if (!editing) return null;
    return {
      amenityCode: editing.amenityCode,
      amenityName: editing.amenityName,
      description: editing.description || "",
      iconUrl: editing.iconUrl || "",
      status: editing.status,
    };
  }, [editing]);

  // Reset form when modal opens
  useEffect(() => {
    if (opened) {
      if (editingFormState) {
        setForm(editingFormState);
      } else {
        setForm({
          amenityCode: "",
          amenityName: "",
          description: "",
          iconUrl: "",
          status: 1,
        });
      }
    }
  }, [opened, editingFormState]);

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const {...payload } = form; 

      await onSubmit(payload); 
    } catch (error) {
      console.log("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleInputChange = (field: string, value: unknown) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={editing ? "Edit Amenity" : "Add Amenity"}
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
              label="Amenity Code"
              value={form.amenityCode}
              onChange={(e) => handleInputChange("amenityCode", e.target.value)}
              required
              disabled={editing ? true : isSubmitting}
              placeholder="Enter amenity code"
              size="sm"
            />
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 6 }}>
            <TextInput
              label="Amenity Name"
              value={form.amenityName}
              onChange={(e) => handleInputChange("amenityName", e.target.value)}
              required
              placeholder="Enter amenity name"
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
              placeholder="Enter amenity description"
              size="sm"
            />
          </Grid.Col>

          {/* <Grid.Col span={{ base: 12, sm: 6 }}>
            <TextInput
              label="Icon Url"
              value={form.iconUrl}
              onChange={(e) => handleInputChange("iconUrl", e.target.value)}
              min={1}
              disabled={isSubmitting}
              placeholder="Enter amenity icon url"
              size="sm"
            />
          </Grid.Col> */}

          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Switch
              label="Active"
              checked={form.status===1}
              onChange={(e) =>
                handleInputChange("status", e.currentTarget.checked ? 1 : 0)
              }
              disabled={isSubmitting}
              size="md"
              mt="sm"
              color="primary.5"
            />
          </Grid.Col>
        </Grid>

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

export default AmenitySetupModalForm;
