"use client";

import { useCallback, useEffect, useState } from "react";
import { AppBreadcrumbs, CustomModal, DataTable } from "@/components";
import { Column } from "@/components/DataTable";
import { Text, Badge, ActionIcon, Group, Affix, Button } from "@mantine/core";
import { IconEdit, IconEyePlus, IconTrash } from "@tabler/icons-react";
import {
    COMMON_MESSAGE,
    PAGE_TITLE,
    RECORDS_PER_PAGE,
    STATUS_CONFIG,
} from "@/utils/constants";
import SubCategoryModalForm from "./ModalForm";
import {
    SubCategory,
    SubCategoryFormState,
} from "@/types/admin/complaintMaster/subCategorySetup/subCategorySetup";
import { notifications } from "@mantine/notifications";
import { IMAGES } from "@/utils/images";
import { RouteConfig } from "@/utils/routeConfig";

const notify = (message: string, success = true) =>
    notifications.show({
        title: success ? "Successful!" : "Error",
        message,
        color: success ? "green" : "red",
    });

// Dummy category options for the dropdown
const CATEGORY_OPTIONS = [
    { value: "CAT001", label: "Network Issue" },
    { value: "CAT002", label: "Hardware Failure" },
    { value: "CAT003", label: "Software Bug" },
    { value: "CAT004", label: "Billing Dispute" },
    { value: "CAT005", label: "Service Outage" },
    { value: "CAT006", label: "Account Access" },
    { value: "CAT007", label: "Performance Degradation" },
    { value: "CAT008", label: "Data Loss" },
];

const DUMMY_SUB_CATEGORIES: SubCategory[] = [
    {
        subCategoryCode: "SUB001",
        categoryCode: "CAT001",
        categoryName: "Network Issue",
        subCategoryName: "DNS Failure",
        description: "Domain name resolution errors causing connectivity issues",
        status: "1",
    },
    {
        subCategoryCode: "SUB002",
        categoryCode: "CAT001",
        categoryName: "Network Issue",
        subCategoryName: "VPN Disconnect",
        description: "Frequent disconnections from VPN tunnel",
        status: "1",
    },
    {
        subCategoryCode: "SUB003",
        categoryCode: "CAT002",
        categoryName: "Hardware Failure",
        subCategoryName: "Hard Disk Crash",
        description: "Physical hard drive failure or bad sectors detected",
        status: "0",
    },
    {
        subCategoryCode: "SUB004",
        categoryCode: "CAT002",
        categoryName: "Hardware Failure",
        subCategoryName: "RAM Fault",
        description: "Memory module not detected or causing system instability",
        status: "1",
    },
    {
        subCategoryCode: "SUB005",
        categoryCode: "CAT003",
        categoryName: "Software Bug",
        subCategoryName: "App Crash",
        description: "Application exits unexpectedly without user action",
        status: "1",
    },
    {
        subCategoryCode: "SUB006",
        categoryCode: "CAT004",
        categoryName: "Billing Dispute",
        subCategoryName: "Duplicate Charge",
        description: "Same transaction billed more than once",
        status: "0",
    },
    {
        subCategoryCode: "SUB007",
        categoryCode: "CAT005",
        categoryName: "Service Outage",
        subCategoryName: "API Downtime",
        description: "External or internal API endpoints not responding",
        status: "1",
    },
    {
        subCategoryCode: "SUB008",
        categoryCode: "CAT006",
        categoryName: "Account Access",
        subCategoryName: "Password Reset Failure",
        description: "User unable to receive or use password reset link",
        status: "0",
    },
];

const SubCategorySetup = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [subCategoryData, setSubCategoryData] = useState<SubCategory[]>([]);

    // undefined = closed | null = add mode | SubCategory = edit mode
    const [modalState, setModalState] = useState<SubCategory | null | undefined>(
        undefined,
    );
    const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

    const fetchSubCategoryData = useCallback(() => {
        const start = (currentPage - 1) * RECORDS_PER_PAGE;
        setSubCategoryData(
            DUMMY_SUB_CATEGORIES.slice(start, start + RECORDS_PER_PAGE),
        );
    }, [currentPage]);

    useEffect(() => {
        fetchSubCategoryData();
    }, [fetchSubCategoryData]);

    const columns: Column<SubCategory>[] = [
        {
            header: "S.No",
            width: "8%",
            align: "center",
            render: (_v, _r, index) => (
                <Text>{(currentPage - 1) * RECORDS_PER_PAGE + index + 1}</Text>
            ),
        },
        {
            header: "Actions",
            width: "12%",
            align: "center",
            render: (_v, row) => (
                <Group gap={6} justify="center">
                    <ActionIcon
                        color="blue"
                        variant="light"
                        onClick={() =>
                            setModalState(
                                subCategoryData.find(
                                    (c) => c.subCategoryCode === row.subCategoryCode,
                                ),
                            )
                        }
                    >
                        <IconEdit size={16} />
                    </ActionIcon>
                    <ActionIcon
                        color="red"
                        variant="light"
                        onClick={() => setDeleteTarget(row.subCategoryCode)}
                    >
                        <IconTrash size={16} />
                    </ActionIcon>
                </Group>
            ),
        },
        { header: "Category Name", accessor: "categoryName", width: "20%" },
        { header: "Sub Category Name", accessor: "subCategoryName", width: "20%" },
        { header: "Description", accessor: "description", width: "28%" },
        {
            header: "Status",
            accessor: "status",
            align: "center",
            width: "12%",
            render: (value) => {
                const status = Number(value) as 0 | 1;
                return (
                    <Badge
                        size="sm"
                        radius="xs"
                        variant="filled"
                        color={STATUS_CONFIG[status]?.color}
                    >
                        {STATUS_CONFIG[status]?.label}
                    </Badge>
                );
            },
        },
    ];

    const handleSubmit = async (data: SubCategoryFormState) => {
        try {
            const categoryName =
                CATEGORY_OPTIONS.find((c) => c.value === data.categoryCode)?.label ||
                "";

            if (modalState) {
                const index = DUMMY_SUB_CATEGORIES.findIndex(
                    (c) => c.subCategoryCode === modalState.subCategoryCode,
                );
                if (index !== -1)
                    DUMMY_SUB_CATEGORIES[index] = {
                        ...DUMMY_SUB_CATEGORIES[index],
                        ...data,
                        categoryName,
                    };
                notify(COMMON_MESSAGE.CATEGORY_UPDATE_SUCCESS);
            } else {
                const subCategoryCode = `SUB${String(DUMMY_SUB_CATEGORIES.length + 1).padStart(3, "0")}`;
                DUMMY_SUB_CATEGORIES.push({ subCategoryCode, categoryName, ...data });
                notify(COMMON_MESSAGE.CATEGORY_CREATE_SUCCESS);
            }

            setModalState(undefined);
            fetchSubCategoryData();
        } catch (err) {
            console.error(err);
            notify(COMMON_MESSAGE.CATEGORY_ADD_FAIL, false);
        }
    };

    const handleConfirmDelete = async () => {
        if (!deleteTarget) return;
        try {
            const index = DUMMY_SUB_CATEGORIES.findIndex(
                (c) => c.subCategoryCode === deleteTarget,
            );
            if (index !== -1) DUMMY_SUB_CATEGORIES.splice(index, 1);
            notify(COMMON_MESSAGE.CATEGORY_DELETE_SUCCESS);
            setDeleteTarget(null);
            fetchSubCategoryData();
        } catch {
            notify(COMMON_MESSAGE.CATEGORY_DELETE_FAIL, false);
        }
    };

    return (
        <>
            <AppBreadcrumbs
                items={[
                    { label: PAGE_TITLE.COMPLAINT_MASTER, path: RouteConfig.COMPLAINT_MASTER },
                    { label: PAGE_TITLE.SUB_CATEGORY_SET_UP },
                ]}
            />

            <DataTable
                data={subCategoryData}
                columns={columns}
                loading={false}
                pageSize={RECORDS_PER_PAGE}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                totalRecords={DUMMY_SUB_CATEGORIES.length}
            />

            <Affix position={{ bottom: 40, right: 20 }}>
                <Button
                    leftSection={<IconEyePlus size={20} />}
                    radius="xl"
                    size="md"
                    color="primary.5"
                    onClick={() => setModalState(null)}
                    style={{
                        position: "fixed",
                        bottom: 32,
                        right: 32,
                        zIndex: 100,
                        boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                    }}
                >
                    Add Sub Category
                </Button>
            </Affix>

            <SubCategoryModalForm
                opened={modalState !== undefined}
                onClose={() => setModalState(undefined)}
                onSubmit={handleSubmit}
                onEdit={modalState ?? null}
                categoryOptions={CATEGORY_OPTIONS}
            />

            <CustomModal
                opened={!!deleteTarget}
                onClose={() => setDeleteTarget(null)}
                icon={IMAGES.WARNING}
                title="Confirm Deletion"
                subtext="Are you sure you want to delete this Sub Category?"
                actionText="Yes, Delete"
                onAction={handleConfirmDelete}
                showCancel
                cancelText="No"
            />
        </>
    );
};

export default SubCategorySetup;
