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
  Image,
  FileInput,
} from "@mantine/core";
import { useState, useEffect, useMemo } from "react";
import {
  AmenityItem,
  FormState,
} from "@/types/admin/societyManagement/amenitySetup/amenitySetup";
import { useMantineTheme } from "@mantine/core";
import { IconPaperclip } from "@tabler/icons-react";

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
  const [errors, setErrors] = useState({ amenityCode: "", amenityName: "" });

  // iconPreview holds the full data URI (e.g. "data:image/svg+xml;base64,...")
  // used only for <img> — the raw base64 (without prefix) is sent to the API
  const [iconPreview, setIconPreview] = useState<string>("");

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

  useEffect(() => {
    if (opened) {
      if (editingFormState) {
        setForm(editingFormState);
        setIconPreview(
          editingFormState.iconUrl
            ? `data:image/svg+xml;base64,${editingFormState.iconUrl}`
            : ""
        );
      } else {
        setForm({
          amenityCode: "",
          amenityName: "",
          description: "",
          iconUrl: "",
          status: 1,
        });
        setIconPreview("");
      }
      setErrors({ amenityCode: "", amenityName: "" });
    }
  }, [opened, editingFormState]);

  const handleFileChange = (file: File | null) => {
    if (!file) {
      handleInputChange("iconUrl", "");
      setIconPreview("");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string; // e.g. "data:image/svg+xml;base64,PHN2Zy..."
      setIconPreview(dataUrl);                 // full URI → <img src>, correct mime type
      const raw = dataUrl.slice(dataUrl.indexOf(",") + 1); // strip prefix → API payload
      handleInputChange("iconUrl", raw);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    const newErrors = { amenityCode: "", amenityName: "" };
    if (!form.amenityCode.trim()) newErrors.amenityCode = "Amenity Code is required";
    if (!form.amenityName.trim()) newErrors.amenityName = "Amenity Name is required";
    setErrors(newErrors);
    if (newErrors.amenityCode || newErrors.amenityName) return;

    setIsSubmitting(true);
    try {
      await onSubmit(form); // form.iconUrl is already raw base64
    } catch (error) {
      console.log("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: unknown) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
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
        title: { color: "white", fontWeight: 600 },
        close: {
          color: "white",
          "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.7)" },
        },
      }}
    >
      <Stack gap="md">
        <Grid>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <TextInput
              label="Amenity Code"
              value={form.amenityCode}
              onChange={(e) => handleInputChange("amenityCode", e.target.value)}
              error={errors.amenityCode}
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
              error={errors.amenityName}
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

          {/* Icon Upload */}
          <Grid.Col span={12}>
            <Group align="flex-end" gap="sm">
              <FileInput
                label="Amenity Icon"
                placeholder="Choose an svg icon file"
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
                />
              )}
            </Group>
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Switch
              label="Active"
              checked={form.status === 1}
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

        <Group justify="flex-end" mt="md">
          <Button
            variant="outline"
            color="primary.5"
            onClick={() => {
              setErrors({ amenityCode: "", amenityName: "" });
              onClose();
            }}
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