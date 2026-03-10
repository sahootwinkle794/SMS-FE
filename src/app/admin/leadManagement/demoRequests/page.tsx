"use client";

import { useState } from "react";
import { AppBreadcrumbs, AccessRestricted } from "@/components";
import {
    Box,
    Container,
    Flex,
    Text,
    Badge,
    Tooltip,
    Group,
    Stack,
    ActionIcon,
    Modal,
    Button,
    Textarea,
    useMantineTheme,
} from "@mantine/core";
import { DatePickerInput, TimeInput } from "@mantine/dates";
import { IconCheck, IconRestore, IconX, } from "@tabler/icons-react";
import { Column, DataTable } from "@/components/DataTable";
import { RECORDS_PER_PAGE, PageTitles } from "@/utils/constants";
import { useMenuPermissions } from "@/hooks/useMenuPermissions";
import { usePathname } from "next/navigation";
import moment from "moment";

/* ================= TYPES ================= */

type RequestStatus = "pending" | "scheduled" | "rejected";

type DemoRequest = {
    id: string;
    name: string;
    mobile: string;
    email: string;
    city: string;
    description: string;
    createdAt: string;
    status?: RequestStatus;
};

type ScheduleForm = {
    target: DemoRequest | null;
    date: string | null;
    time: string;
    note: string;
};

/* ================= CONSTANTS ================= */

const SCHEDULE_INITIAL: ScheduleForm = {
    target: null,
    date: null,
    time: "",
    note: "",
};


/* ================= DUMMY DATA ================= */

const dummyDemoRequests: DemoRequest[] = [
    {
        id: "1",
        name: "Rahul Sharma",
        mobile: "9876543210",
        email: "rahul.sharma@gmail.com",
        city: "Delhi",
        description: "Need a demo for society management system.",
        createdAt: "2026-03-08T10:30:00",
        status: "pending",
    },
    {
        id: "2",
        name: "Priya Das",
        mobile: "9123456780",
        email: "priya.das@gmail.com",
        city: "Bhubaneswar",
        description: "Interested in features and pricing demo.",
        createdAt: "2026-03-08T12:15:00",
        status: "pending",
    },
    {
        id: "3",
        name: "Amit Verma",
        mobile: "9988776655",
        email: "amit.verma@gmail.com",
        city: "Mumbai",
        description: "Looking for demo for apartment management.",
        createdAt: "2026-03-09T09:45:00",
        status: "pending",
    },
];

/* ================= HELPERS ================= */

const isNew = (createdAt: string) =>
    moment().diff(moment(createdAt), "hours") < 24;

const truncate = (text: string, maxLength = 50) =>
    text.length > maxLength ? `${text.slice(0, maxLength)}…` : text;

/* ================= STATUS BADGE ================= */

const StatusBadge = ({ status }: { status: RequestStatus }) => {
    const map: Record<RequestStatus, { color: string; label: string }> = {
        pending: { color: "yellow", label: "Pending" },
        scheduled: { color: "blue", label: "Scheduled" },
        rejected: { color: "red", label: "Rejected" },
    };
    const { color, label } = map[status];
    return (
        <Badge size="sm" color={color} variant="light" radius="sm">
            {label}
        </Badge>
    );
};

/* ================= COMPONENT ================= */

const DemoRequests = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const { canRead } = useMenuPermissions();

    const pathname = usePathname();
    const pageTitle = PageTitles[pathname] ?? "this page";

    const [requests, setRequests] = useState<DemoRequest[]>(dummyDemoRequests);

    const theme = useMantineTheme();
    /* ================= SCHEDULE MODAL STATE (optimized) ================= */

    const [scheduleForm, setScheduleForm] = useState<ScheduleForm>(SCHEDULE_INITIAL);

    const updateSchedule = <K extends keyof ScheduleForm>(
        key: K,
        value: ScheduleForm[K]
    ) => setScheduleForm((prev) => ({ ...prev, [key]: value }));

    /* ================= SORT: New first → descending date ================= */

    const sortedRequests = [...requests].sort((a, b) => {
        const aIsNew = isNew(a.createdAt) ? 1 : 0;
        const bIsNew = isNew(b.createdAt) ? 1 : 0;
        if (bIsNew !== aIsNew) return bIsNew - aIsNew;
        return moment(b.createdAt).valueOf() - moment(a.createdAt).valueOf();
    });

    const newCount = sortedRequests.filter((r) => isNew(r.createdAt)).length;

    /* ================= HANDLERS ================= */

    const handleScheduleConfirm = () => {
        if (!scheduleForm.target) return;
        setRequests((prev) =>
            prev.map((r) =>
                r.id === scheduleForm.target!.id
                    ? { ...r, status: "scheduled" }
                    : r
            )
        );
        setScheduleForm(SCHEDULE_INITIAL);
    };

    const handleReject = (id: string) => {
        setRequests((prev) =>
            prev.map((r) => (r.id === id ? { ...r, status: "rejected" } : r))
        );
    };

    /* ================= COLUMNS ================= */

    const columns: Column<DemoRequest>[] = [
        {
            header: "Sl No",
            accessor: "id",
            align: "center",
            render: (_value, _row, index) => (
                <Text size="sm" c="dimmed">
                    {(currentPage - 1) * RECORDS_PER_PAGE + index + 1}
                </Text>
            ),
        },
        {
            header: "Name",
            accessor: "name",
            align: "left",
            render: (value, row) => (
                <Group gap="xs">
                    <Text size="sm" fw={500}>
                        {value as string}
                    </Text>
                    {isNew(row.createdAt) && (
                        <Badge size="xs" color="green" variant="filled" radius="xs">
                            New
                        </Badge>
                    )}
                </Group>
            ),
        },
        {
            header: "Mobile",
            accessor: "mobile",
            align: "left",
        },
        {
            header: "Email",
            accessor: "email",
            align: "left",
        },
        {
            header: "City",
            accessor: "city",
            align: "left",
            render: (value) => (
                <Badge variant="light" color="violet" radius="sm" size="sm">
                    {value as string}
                </Badge>
            ),
        },
        {
            header: "Description",
            accessor: "description",
            align: "left",
            render: (value) => {
                const text = value as string;
                return text.length > 50 ? (
                    <Tooltip label={text} multiline w={280} withArrow>
                        <Text size="sm" c="dimmed" style={{ cursor: "default" }}>
                            {truncate(text)}
                        </Text>
                    </Tooltip>
                ) : (
                    <Text size="sm" c="dimmed">{text}</Text>
                );
            },
        },
        {
            header: "Requested At",
            accessor: "createdAt",
            align: "left",
            render: (value) => (
                <Stack gap={2}>
                    <Text size="sm">
                        {value ? moment(value as string).format("DD MMM YYYY") : "-"}
                    </Text>
                    <Text size="xs" c="dimmed">
                        {value ? moment(value as string).format("hh:mm A") : ""}
                    </Text>
                </Stack>
            ),
        },
        {
            header: "Status",
            accessor: "status",
            align: "center",
            render: (value) => (
                <StatusBadge status={(value as RequestStatus) ?? "pending"} />
            ),
        },
        {
            header: "Action",
            accessor: "id",
            align: "center",
            render: (_value, row) => {
                const isPending = (row.status ?? "pending") === "pending";

                if (!isPending) {
                    return <Text size="xs" c="dimmed">—</Text>;
                }

                return (
                    <Group gap="xs" justify="center" wrap="nowrap">
                        <Tooltip label="Schedule Demo" withArrow>
                            <ActionIcon
                                size="sm"
                                radius="xl"
                                variant="light"
                                color="green"
                                onClick={() => updateSchedule("target", row)}
                            >
                                <IconCheck size={14} />
                            </ActionIcon>
                        </Tooltip>

                        <Tooltip label="Reject Request" withArrow>
                            <ActionIcon
                                size="sm"
                                radius="xl"
                                variant="light"
                                color="red"
                                onClick={() => handleReject(row.id)}
                            >
                                <IconX size={14} />
                            </ActionIcon>
                        </Tooltip>
                    </Group>
                );
            },
        },
    ];

    if (!canRead) {
        return <AccessRestricted pageTitle={pageTitle} />;
    }

    return (
        <Box>
            <Container fluid>
                {/* BREADCRUMB */}
                <Flex justify="space-between" align="center" mb="md">
                    <AppBreadcrumbs
                        items={[{ label: "Lead Management" }, { label: "Demo Requests" }]}
                        newCount={newCount}
                    />
                </Flex>
            </Container>

            {/* TABLE */}
            <DataTable<DemoRequest>
                data={sortedRequests}
                columns={columns}
                pageSize={RECORDS_PER_PAGE}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                totalRecords={sortedRequests.length}
            />

            {/* ===== SCHEDULE DEMO MODAL ===== */}
            <Modal
                opened={!!scheduleForm.target}
                onClose={() => setScheduleForm(SCHEDULE_INITIAL)}
                title={
                    <Text fw={600} size="md">
                        Schedule Demo — {scheduleForm.target?.name}
                    </Text>
                }
                styles={{
                    header: { backgroundColor: theme.colors.primary[5], color: "white", padding: "16px 20px", margin: "-1px -1px 16px -1px" },
                    title: { color: "white", fontWeight: 600 },
                    close: { color: "white", "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.7)" } },
                }}
                centered
                radius="md"
                size="sm"
            >
                <Stack gap="md">
                    <DatePickerInput
                        label="Demo Date"
                        placeholder="Pick a date"
                        value={scheduleForm.date}
                        onChange={(val) => updateSchedule("date", val)}
                        minDate={new Date()}
                        required
                    />

                    <TimeInput
                        label="Demo Time"
                        value={scheduleForm.time}
                        onChange={(e) => updateSchedule("time", e.currentTarget.value)}
                        required
                    />


                    <Textarea
                        label="Note (optional)"
                        placeholder="Any instructions for the client..."
                        value={scheduleForm.note}
                        onChange={(e) => updateSchedule("note", e.currentTarget.value)}
                        rows={3}
                    />

                    <Group justify="flex-end" mt="xs">
                        <Button
                            variant="outline" color="primary.5" leftSection={<IconRestore size={16} />}
                            onClick={() => setScheduleForm(SCHEDULE_INITIAL)}
                        >
                            Cancel
                        </Button>
                        <Button
                            color="primary.5" leftSection={<IconCheck size={16} />}
                            onClick={handleScheduleConfirm}
                            disabled={!scheduleForm.date || !scheduleForm.time}
                        >
                            Confirm Schedule
                        </Button>
                    </Group>
                </Stack>
            </Modal>
        </Box>
    );
};

export default DemoRequests;