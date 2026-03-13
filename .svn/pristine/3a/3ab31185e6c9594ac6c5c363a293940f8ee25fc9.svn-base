"use client";

import { useCallback, useEffect, useState } from "react";
import {
    Modal,
    Select,
    Button,
    Group,
    Stack,
    Grid,
    useMantineTheme,
    MultiSelect,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import {
    PersonListResponse,
    SlotAvailabilityData,
    SlotAvailabilityFormState,
} from "@/types/admin/leadManagement/slotAvailability/slotAvailability";
import { ApiError, Slot, SlotListResponse } from "@/types/admin/leadManagement/slotSetup/slotSetup";
import { API_PATH } from "@/utils/apiPath";
import { notifications } from "@mantine/notifications";
import { COMMON_MESSAGE, USER_ROLES } from "@/utils/constants";
import { getRequest, postRequest } from "@/service";
type SlotPayload = {
    demoBy: string;
    slotDate: string;
    slots: {
        slotId: string;
        slotName: string;
    }[];
    status: number;
};
type Props = {
    opened: boolean;
    onClose: () => void;
    onSubmit: (payload: SlotPayload) => void;
    onEdit?: SlotAvailabilityData | null;
};

const EMPTY_FORM: SlotAvailabilityFormState = {
    slotDate: "",
    slotTime: [],
    personName: "",
};


const PERSON_OPTIONS = [
    { label: "Rahul", value: "Rahul" },
    { label: "Amit", value: "Amit" },
    { label: "Priya", value: "Priya" },
];

const notifyError = (message: string) =>
    notifications.show({ title: "Error", message, color: "red" });
const SlotAvailabilityModalForm = ({
    opened,
    onClose,
    onSubmit,
    onEdit,
}: Props) => {
    const theme = useMantineTheme();

    const [form, setForm] = useState<SlotAvailabilityFormState>(EMPTY_FORM);
    const [errors, setErrors] = useState<Partial<SlotAvailabilityFormState>>({});
    const [loading, setLoading] = useState(false);

    const [slotData, setSlotData] = useState<Slot[]>([]);
    const [slotOptions, setSlotOptions] = useState<{ label: string; value: string }[]>([]);
    const [personOptions, setPersonOptions] = useState<
        { label: string; value: string }[]
    >([]);

    const handleChange = (
        key: keyof SlotAvailabilityFormState,
        value: string | string[]
    ) => {
        setForm((prev) => ({
            ...prev,
            [key]: value,
        }));

        setErrors((prev) => ({
            ...prev,
            [key]: "",
        }));
    };

    const validateForm = () => {
        const newErrors: Partial<SlotAvailabilityFormState> = {};

        if (!form.slotDate) newErrors.slotDate = "Date is required";
        if (!form.personName) newErrors.personName = "Person name is required";

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        try {
            setLoading(true);

            const selectedSlots = slotData
                .filter((slot) => form.slotTime.includes(slot.slot_Id))
                .map((slot) => ({
                    slotId: slot.slot_Id,
                    slotName: slot.slot_Name,
                }));

            const payload = {
                demoBy: form.personName,
                slotDate: form.slotDate,
                slots: selectedSlots,
                status: 1,
            };

            await onSubmit(payload);

            setForm(EMPTY_FORM);
            onClose();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };


    const fetchDemoRequestData = useCallback(async () => {
        try {
            const payload = {
                sortBy: "created_at",
                sortOrder: "DESC",
            };

            const response = await getRequest<SlotListResponse>(
                API_PATH.GET_SLOT_DATA,
                payload
            );

            const slots = response?.data?.data || [];

            setSlotData(slots);

            const options = slots.map((slot: Slot) => ({
                label: `${slot.slot_Name} (${slot.start_Time} - ${slot.end_Time})`,
                value: slot.slot_Id,
            }));

            setSlotOptions(options);
        } catch (err) {
            console.error(err);
            const error = err as ApiError;
            notifyError(
                error?.response?.data?.message || COMMON_MESSAGE.SLOT_SETUP_FETCH_FAIL
            );
        }
    }, []);

    const fetchPersonName = useCallback(async () => {
        try {
            const payload = {
                roleCode: USER_ROLES?.ADMIN,
            };
            const response = await postRequest(
                API_PATH.GET_USER_LIST_BY_ROLE,
                payload
            ) as PersonListResponse;

            const users = response?.data?.data ?? [];

            const options = users.map((user) => ({
                label: user.name,
                value: user.id,
            }));

            setPersonOptions(options);

        } catch (err) {
            console.error(err);
            const error = err as ApiError;
            notifyError(
                error?.response?.data?.message || COMMON_MESSAGE.SLOT_SETUP_FETCH_FAIL
            );
        }
    }, []);

    useEffect(() => {
        fetchDemoRequestData();
        fetchPersonName();
    }, [fetchDemoRequestData, fetchPersonName]);

    /* Reset form when modal opens */
    useEffect(() => {
        if (opened && !onEdit) {
            setForm(EMPTY_FORM);
            setErrors({});
        }
    }, [opened, onEdit]);

    /* Populate form for edit */

    useEffect(() => {
        if (onEdit && slotData.length) {
            const selectedSlotIds = slotData
                .filter(slot => onEdit.slotTime.includes(slot.slot_Name))
                .map(slot => slot.slot_Id);

            setForm({
                slotDate: onEdit.slotDate,
                slotTime: selectedSlotIds,
                personName: onEdit.personName,
            });
        }
    }, [onEdit, slotData]);

    return (
        <Modal
            opened={opened}
            onClose={onClose}
            title={onEdit ? "Edit Slot Availability" : "Add Slot Availability"}
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

                <Grid>

                    <Grid.Col span={{ base: 12, sm: 6 }}>
                        <Select
                            label="Person Name"
                            placeholder="Select person"
                            data={personOptions}
                            value={form.personName}
                            onChange={(value) => handleChange("personName", value || "")}
                            error={errors.personName}
                            required
                        />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 6 }}>
                        <DateInput
                            label="Select Date"
                            placeholder="Pick date"
                            value={form.slotDate ? new Date(form.slotDate) : null}
                            valueFormat="DD/MM/YYYY"
                            minDate={new Date()}
                            onChange={(date) =>
                                handleChange(
                                    "slotDate",
                                    date ? date.toString().split("T")[0] : ""
                                )
                            }
                            error={errors.slotDate}
                            required
                        />
                    </Grid.Col>

                </Grid>

                <MultiSelect
                    label="Slot Time"
                    placeholder="Select slot"
                    data={slotOptions}
                    value={form.slotTime}
                    onChange={(value) => handleChange("slotTime", value)}
                    error={errors.slotTime}
                    searchable
                    clearable
                />

                {/* <Select
                    label="Status"
                    placeholder="Select status"
                    data={STATUS_OPTIONS}
                    value={form.status}
                    onChange={(value) => handleChange("status", value || "")}
                    error={errors.status}
                    required
                /> */}

                <Group justify="flex-end" mt="md">
                    <Button variant="outline" onClick={onClose} color="primary.5">
                        Cancel
                    </Button>

                    <Button onClick={handleSubmit} loading={loading} color="primary.5">
                        {onEdit ? "Update Slot" : "Save Slot"}
                    </Button>
                </Group>

            </Stack>
        </Modal>
    );
};

export default SlotAvailabilityModalForm;

