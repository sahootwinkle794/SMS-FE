// ModalForm.tsx
import {
  Modal,
  Grid,
  Button,
  Group,
  Stack,
  Select,
  NumberInput,
} from "@mantine/core";
import { useState, useEffect, useMemo } from "react";
import { FormState } from "@/types/admin/societyManagement/facandame/tiertoCategory/TierToCategory";
import { useMantineTheme } from "@mantine/core";

interface TierToCategoryMappingModalProps {
  opened: boolean;
  editing: FormState | null;
  onClose: () => void;
  onSubmit: (formData: FormState) => Promise<void>;
  tierOptions: { value: string; label: string }[];
  categoryOptions: { value: string; label: string }[];
}

const TierToCategoryMappingModal = ({
  opened,
  editing,
  onClose,
  onSubmit,
  tierOptions,
  categoryOptions,
}: TierToCategoryMappingModalProps) => {
  const theme = useMantineTheme();
  const [form, setForm] = useState<FormState>({
    tierCode: "",
    categoryDetails: [{ categoryCode: "", displayOrder: 1, status: 1 }],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [removedCategories, setRemovedCategories] = useState<
    FormState["categoryDetails"]
  >([]);

  // Get form state from editing data
  const editingFormState = useMemo(() => {
    if (!editing) return null;

    return {
      tierCode: editing.tierCode,
      categoryDetails: editing.categoryDetails
        ?.filter((item) => item.status !== 2) // 👈 hide deleted rows
        .map((item) => ({
          categoryCode: item.categoryCode,
          displayOrder: item.displayOrder,
          status: item.status,
        })) || [{ categoryCode: "", displayOrder: 1, status: 1 }],
    };
  }, [editing]);
  // Reset form when modal opens
  useEffect(() => {
    if (opened) {
      if (editingFormState) {
        setForm({
          tierCode: editingFormState.tierCode,
          categoryDetails: editingFormState.categoryDetails,
        });
      } else {
        setForm({
          tierCode: "",
          categoryDetails: [{ categoryCode: "", displayOrder: 1, status: 1 }],
        });
      }

      setRemovedCategories([]);
    }
  }, [opened, editingFormState, editing]);

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const cleanRows = (rows: typeof form.categoryDetails) =>
        rows.map((item) => ({
          categoryCode: item.categoryCode,
          displayOrder: item.displayOrder,
          status: item.status,
        }));

      const payload: FormState = {
        tierCode: form.tierCode,
        categoryDetails: [
          ...cleanRows(form.categoryDetails),
          ...cleanRows(removedCategories),
        ],
      };

      await onSubmit(payload);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = <K extends keyof FormState>(
    field: K,
    value: FormState[K],
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCategoryChange = <
    K extends keyof FormState["categoryDetails"][number],
  >(
    index: number,
    field: K,
    value: FormState["categoryDetails"][number][K],
  ) => {
    setForm((prev) => {
      const updated = [...prev.categoryDetails];

      updated[index] = {
        ...updated[index],
        [field]: value,
      };

      return {
        ...prev,
        categoryDetails: updated,
      };
    });
  };

  const addCategoryRow = () => {
    setForm((prev) => ({
      ...prev,
      categoryDetails: [
        ...prev.categoryDetails,
        { categoryCode: "", displayOrder: 1, status: 1 },
      ],
    }));
  };

  const removeCategoryRow = (index: number) => {
    const itemToRemove = form.categoryDetails[index];
    if (!itemToRemove) return;

    // Store removed item with status 2
    setRemovedCategories((prev) => [
      ...prev,
      {
        ...itemToRemove,
        status: 2,
      },
    ]);

    // Remove from visible form
    const updated = form.categoryDetails.filter((_, i) => i !== index);

    setForm((prev) => ({
      ...prev,
      categoryDetails: updated,
    }));
  };
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={editing ? "Edit Mapping" : "Add Mapping"}
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
          <Grid.Col span={12}>
            <Select
              label="Select Tier"
              placeholder="Select tier"
              data={tierOptions}
              value={form.tierCode}
              onChange={(value) => handleInputChange("tierCode", value ?? "")}
              required
              disabled={isSubmitting}
              size="sm"
            />
          </Grid.Col>

          <Grid.Col span={12}>
            <Stack gap="xs">
              {form.categoryDetails.map((item, index) => {
                const selectedCodes = form.categoryDetails
                  .map((c, i) => (i !== index ? c.categoryCode : null))
                  .filter(Boolean) as string[];

                const filteredOptions = categoryOptions.filter(
                  (opt) =>
                    !selectedCodes.includes(opt.value) ||
                    opt.value === item.categoryCode,
                );

                return (
                  <Grid key={index}>
                    <Grid.Col span={{ base: 12, sm: 4 }}>
                      <Select
                        label={index === 0 ? "Category" : ""}
                        data={filteredOptions}
                        value={item.categoryCode}
                        onChange={(value) =>
                          handleCategoryChange(
                            index,
                            "categoryCode",
                            value ?? "",
                          )
                        }
                        required
                        size="sm"
                      />
                    </Grid.Col>

                    <Grid.Col span={{ base: 6, sm: 3 }}>
                      <NumberInput
                        label={index === 0 ? "Display Order" : ""}
                        value={item.displayOrder}
                        onChange={(val) =>
                          handleCategoryChange(
                            index,
                            "displayOrder",
                            Number(val) || 0,
                          )
                        }
                        size="sm"
                      />
                    </Grid.Col>

                    <Grid.Col span={{ base: 6, sm: 3 }}>
                      <Select
                        label={index === 0 ? "Status" : ""}
                        data={[
                          { value: "1", label: "Active" },
                          { value: "0", label: "Inactive" },
                        ]}
                        value={String(item.status)}
                        onChange={(value) =>
                          handleCategoryChange(index, "status", Number(value))
                        }
                        size="sm"
                      />
                    </Grid.Col>

                    <Grid.Col span={{ base: 12, sm: 2 }}>
                      <Button
                        color="red"
                        variant="subtle"
                        size="xs"
                        mt={index === 0 ? 25 : 0}
                        onClick={() => removeCategoryRow(index)}
                        disabled={form.categoryDetails.length === 1}
                      >
                        Remove
                      </Button>
                    </Grid.Col>
                  </Grid>
                );
              })}

              <Button
                variant="light"
                size="xs"
                onClick={addCategoryRow}
                mt="xs"
              >
                + Add Category
              </Button>
            </Stack>
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

export default TierToCategoryMappingModal;
