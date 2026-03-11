"use client";

import { REGEX } from "@/utils/constants";
import {
    Modal,
    Grid,
    TextInput,
    Textarea,
    Button,
    Group,
    Stack,
    useMantineTheme,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { DemoRequestFormState } from "@/types/admin/leadManagement/demoRequests/demoRequests";

interface DemoRequestModalFormProps {
    opened: boolean;
    editing: DemoRequestFormState | null;
    onClose: () => void;
    onSubmit: (data: DemoRequestFormState) => Promise<void>;
}

const EMPTY_FORM: DemoRequestFormState = {
    fullName: "",
    mobileNo: "",
    email: "",
    city: "",
    projectDescription: "",
};

type FormErrors = Partial<Record<keyof DemoRequestFormState, string>>;

const validateForm = (form: DemoRequestFormState): FormErrors => {
    const errors: FormErrors = {};

    if (!form.fullName.trim()) errors.fullName = "Full name is required";
    if (!form.mobileNo.trim()) errors.mobileNo = "Mobile number is required";
    if (!form.email.trim()) errors.email = "Email is required";
    else if (!REGEX.EMAIL.test(form.email)) {
        errors.email = "Invalid Email Address";
    }
    if (!form.city.trim()) errors.city = "City is required";

    return errors;
};

const DemoRequestModalForm = ({
    opened,
    editing,
    onClose,
    onSubmit,
}: DemoRequestModalFormProps) => {
    const theme = useMantineTheme();

    const [form, setForm] = useState<DemoRequestFormState>(EMPTY_FORM);
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (opened) {
            setErrors({});
            setForm(editing ?? EMPTY_FORM);
        }
    }, [opened, editing]);

    const handleInputChange = <K extends keyof DemoRequestFormState>(
        field: K,
        value: DemoRequestFormState[K]
    ) => {
        setForm((prev) => ({ ...prev, [field]: value }));

        setErrors((prev) => {
            const next = { ...prev };
            delete next[field];
            return next;
        });
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
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Modal
            opened={opened}
            onClose={onClose}
            title="Add Demo Request"
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
                            label="Full Name"
                            placeholder="Enter full name"
                            value={form.fullName}
                            error={errors.fullName}
                            onChange={(e) =>
                                handleInputChange("fullName", e.target.value)
                            }
                            required
                        />
                    </Grid.Col>

                    <Grid.Col span={{ base: 12, sm: 6 }}>
                        <TextInput
                            label="Mobile No"
                            placeholder="+91 XXXXX XXXXX"
                            value={form.mobileNo}
                            error={errors.mobileNo}

                            maxLength={10}
                            onChange={(e) =>
                                handleInputChange("mobileNo", e.target.value.replace(/\D/g, ""))
                            }
                            required
                        />
                    </Grid.Col>

                    <Grid.Col span={{ base: 12, sm: 6 }}>
                        <TextInput
                            label="Email"
                            type="email"
                            placeholder="your.email@example.com"
                            value={form.email}
                            error={errors.email}
                            onChange={(e) =>
                                handleInputChange("email", e.target.value)
                            }
                            required
                        />
                    </Grid.Col>

                    <Grid.Col span={{ base: 12, sm: 6 }}>
                        <TextInput
                            label="City"
                            placeholder="Enter your city"
                            value={form.city}
                            error={errors.city}
                            onChange={(e) =>
                                handleInputChange("city", e.target.value)
                            }
                            required
                        />
                    </Grid.Col>

                    <Grid.Col span={12}>
                        <Textarea
                            label="Project projectDescription"
                            placeholder="Describe your project"
                            minRows={4}
                            value={form.projectDescription}
                            onChange={(e) =>
                                handleInputChange("projectDescription", e.target.value)
                            }
                        />
                    </Grid.Col>
                </Grid>

                <Group justify="flex-end">
                    <Button variant="outline" onClick={onClose} color="primary.5">
                        Cancel
                    </Button>

                    <Button
                        onClick={handleSubmit}
                        loading={isSubmitting}
                        color="primary.5"
                    >
                        Submit Request
                    </Button>
                </Group>
            </Stack>
        </Modal>
    );
};

export default DemoRequestModalForm;