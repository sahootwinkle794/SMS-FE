"use client";
import { STATUS_OPTIONS } from "@/utils/constants";
import {
  Modal, TextInput, Button, Group, Stack, Select,
  useMantineTheme, Grid,
} from "@mantine/core";
import { TimeInput } from "@mantine/dates";
import { useEffect, useState } from "react";
import { Slot } from "@/types/admin/leadManagement/slotSetup/slotSetup";

type SlotFormState = {
  slotName: string;
  startTime: string;
  endTime: string;
  status: string;
};

type Props = {
  opened: boolean;
  onClose: () => void;
  onSubmit: (data: SlotFormState) => void;
  onEdit?: Slot | null;
};

const EMPTY_FORM: SlotFormState = {
  slotName: "",
  startTime: "",
  endTime: "",
  status: "",
};

const FIELD_LABELS: Record<keyof SlotFormState, string> = {
  slotName: "Slot Name",
  startTime: "Start Time",
  endTime: "End Time",
  status: "Status",
};

type FormErrors = Partial<Record<keyof SlotFormState, string>>;

const SlotManagementModalForm = ({ opened, onClose, onSubmit, onEdit }: Props) => {
  const theme = useMantineTheme();
  const [form, setForm] = useState<SlotFormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (form: SlotFormState): FormErrors => {
    const errors: FormErrors = {};
    (Object.keys(form) as (keyof SlotFormState)[]).forEach((key) => {
      if (!form[key]?.trim()) {
        errors[key] = `${FIELD_LABELS[key]} is required`;
      }
    });
    return errors;
  };

  const handleChange = (key: keyof SlotFormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const handleSubmit = async () => {
    try {
      const newErrors = validateForm(form);
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
      setIsSubmitting(true);
      await onSubmit(form);
      setForm(EMPTY_FORM);
      setErrors({});
    } catch (error) {
      console.error("Error submitting slot:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  
  useEffect(() => {
    if (opened && onEdit) {
      console.log("Populating form with edit data:", onEdit);
      setForm({
      
        slotName: onEdit.slot_Name || "",
        startTime: onEdit.start_Time || "",
        endTime: onEdit.end_Time || "",
        status: String(onEdit.status ?? ""),
      });
      setErrors({});
    } else if (opened && !onEdit) {
      setForm(EMPTY_FORM);
      setErrors({});
    }
  }, [opened, onEdit]);

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={onEdit ? "Edit Time Slot" : "Add Time Slot"}
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
      <Stack>
        <TextInput
          label="Slot Name"
          placeholder="Enter slot name"
          value={form.slotName}
          error={errors.slotName}
          onChange={(e) => handleChange("slotName", e.target.value)}
          required
        />

        <Grid>
          <Grid.Col span={{ base: 12, sm: 4 }}>
            <TimeInput
              label="Start Time"
              value={form.startTime}
              error={errors.startTime}
              required
              onChange={(e) => handleChange("startTime", e.currentTarget.value)}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 4 }}>
            <TimeInput
              label="End Time"
              value={form.endTime}
              error={errors.endTime}
              required
              onChange={(e) => handleChange("endTime", e.currentTarget.value)}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 4 }}>
            <Select
              label="Status"
              value={form.status}
              data={STATUS_OPTIONS}
              required
              error={errors.status}
              placeholder="Select status"
              onChange={(value) => handleChange("status", value || "")}
            />
          </Grid.Col>
        </Grid>

        <Group justify="flex-end" mt="md">
          <Button variant="outline" onClick={onClose} color="primary.5">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            loading={isSubmitting}
            color="primary.5"
          >
            {onEdit ? "Update Slot" : "Save Slot"}
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
};

export default SlotManagementModalForm;