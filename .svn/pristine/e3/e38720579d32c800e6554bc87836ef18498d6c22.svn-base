"use client";

import { Modal, TextInput, Button, Group, Stack, Select, useMantineTheme } from "@mantine/core";
import { TimeInput } from "@mantine/dates";
import { useState } from "react";

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
};

const SlotManagementModalForm = ({ opened, onClose, onSubmit }: Props) => {
    const theme = useMantineTheme();
    const [form, setForm] = useState<SlotFormState>({
        slotName: "",
        startTime: "",
        endTime: "",
        status: "1",
    });

    const handleChange = (key: keyof SlotFormState, value: string) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = () => {
        onSubmit(form);

        setForm({
            slotName: "",
            startTime: "",
            endTime: "",
            status: "1",
        });

        onClose();
    };

    return (
        <Modal
            opened={opened}
            onClose={onClose}
            title="Add Time Slot"
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
                    onChange={(e) => handleChange("slotName", e.target.value)}
                    required
                />

                <TimeInput
                    label="Start Time"
                    value={form.startTime}
                    onChange={(e) => handleChange("startTime", e.currentTarget.value)}
                />

                <TimeInput
                    label="End Time"
                    value={form.endTime}
                    onChange={(e) => handleChange("endTime", e.currentTarget.value)}
                />

                <Select
                    label="Status"
                    value={form.status}
                    data={[
                        { label: "Active", value: "1" },
                        { label: "Inactive", value: "0" },
                    ]}
                    onChange={(value) => handleChange("status", value || "1")}
                />

                <Group justify="flex-end" mt="md">
                    <Button variant="outline" onClick={onClose} color="primary.5">
                        Cancel
                    </Button>

                    <Button onClick={handleSubmit}
                        // loading={isSubmitting}
                        color="primary.5">
                        Save Slot
                    </Button>
                </Group>

            </Stack>
        </Modal>
    );
};

export default SlotManagementModalForm;