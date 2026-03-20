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
import CategoryModalForm from "./ModalForm";
import {
    Category,
    CategoryFormState,
} from "@/types/admin/complaintMaster/categorySetup/categorySetup";
import { notifications } from "@mantine/notifications";
import { IMAGES } from "@/utils/images";
import { RouteConfig } from "@/utils/routeConfig";

// Merged into one helper — removes notifyError + notifySuccess duplication
const notify = (message: string, success = true) =>
    notifications.show({
        title: success ? "Successful!" : "Error",
        message,
        color: success ? "green" : "red",
    });

const DUMMY_CATEGORIES: Category[] = [
    {
        categoryCode: "CAT001",
        categoryName: "Network Issue",
        description: "All complaints related to network connectivity and downtime",
        status: "1",
    },
    {
        categoryCode: "CAT002",
        categoryName: "Hardware Failure",
        description: "Complaints regarding physical device or hardware malfunction",
        status: "1",
    },
    {
        categoryCode: "CAT003",
        categoryName: "Software Bug",
        description:
            "Issues caused by software errors or unexpected application behavior",
        status: "0",
    },
    {
        categoryCode: "CAT004",
        categoryName: "Billing Dispute",
        description: "Complaints related to incorrect charges or billing errors",
        status: "1",
    },
    {
        categoryCode: "CAT005",
        categoryName: "Service Outage",
        description: "Reports of complete or partial service unavailability",
        status: "0",
    },
    {
        categoryCode: "CAT006",
        categoryName: "Account Access",
        description: "Issues with login, password reset, or account lockout",
        status: "1",
    },
    {
        categoryCode: "CAT007",
        categoryName: "Performance Degradation",
        description:
            "Complaints about slow response time or degraded service quality",
        status: "1",
    },
    {
        categoryCode: "CAT008",
        categoryName: "Data Loss",
        description: "Reports of missing, corrupted, or accidentally deleted data",
        status: "0",
    },
];

const CategorySetup = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [categoryData, setCategoryData] = useState<Category[]>([]);

    // Unified modal state: undefined = closed, null = add mode, Category = edit mode
    const [modalState, setModalState] = useState<Category | null | undefined>(
        undefined,
    );

    // Single string for delete target — replaces deleteModalOpen + selectedItem
    const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

    const fetchCategoryData = useCallback(() => {
        const start = (currentPage - 1) * RECORDS_PER_PAGE;
        setCategoryData(DUMMY_CATEGORIES.slice(start, start + RECORDS_PER_PAGE));
    }, [currentPage]);

    useEffect(() => {
        fetchCategoryData();
    }, [fetchCategoryData]);

    const columns: Column<Category>[] = [
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
            width: "15%",
            align: "left",
            render: (_v, row) => (
              <Group wrap="nowrap" gap={8}>
                    <ActionIcon
                        color="blue"
                        variant="light"
                        onClick={() =>
                            setModalState(
                                categoryData.find((c) => c.categoryCode === row.categoryCode),
                            )
                        }
                    >
                        <IconEdit size={16} />
                    </ActionIcon>
                    <ActionIcon
                        color="red"
                        variant="light"
                        onClick={() => setDeleteTarget(row.categoryCode)}
                    >
                        <IconTrash size={16} />
                    </ActionIcon>
                </Group>
            ),
        },
        { header: "Category Code", accessor: "categoryCode", width: "20%" },
        { header: "Category Name", accessor: "categoryName", width: "25%" },
        { header: "Description", accessor: "description", width: "20%" },
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

    const handleSubmit = async (data: CategoryFormState) => {
        try {
            // if (modalState) {
            //     const index = DUMMY_CATEGORIES.findIndex(
            //         (c) => c.categoryCode === modalState.categoryCode,
            //     );
            //     if (index !== -1) DUMMY_CATEGORIES[index] = { ...data };
            //     notify(COMMON_MESSAGE.CATEGORY_UPDATE_SUCCESS);
            // } else {
            //     DUMMY_CATEGORIES.push({ ...data });
            //     notify(COMMON_MESSAGE.CATEGORY_CREATE_SUCCESS);
            // }
            console.log(data)
            setModalState(undefined);
            fetchCategoryData();
        } catch (err) {
            console.error(err);
            notify(COMMON_MESSAGE.CATEGORY_ADD_FAIL, false);
        }
    };

    const handleConfirmDelete = async () => {
        if (!deleteTarget) return;
        try {
            const index = DUMMY_CATEGORIES.findIndex(
                (c) => c.categoryCode === deleteTarget,
            );
            if (index !== -1) DUMMY_CATEGORIES.splice(index, 1);
            notify(COMMON_MESSAGE.CATEGORY_DELETE_SUCCESS);
            setDeleteTarget(null);
            fetchCategoryData();
        } catch {
            notify(COMMON_MESSAGE.CATEGORY_DELETE_FAIL, false);
        }
    };

    return (
        <>
            <AppBreadcrumbs
                items={[
                    { label: PAGE_TITLE.COMPLAINT_MASTER, path: RouteConfig.COMPLAINT_MASTER },
                    { label: PAGE_TITLE.CATEGORY_SET_UP },
                ]}
            />

            <DataTable
                data={categoryData}
                columns={columns}
                loading={false}
                pageSize={RECORDS_PER_PAGE}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                totalRecords={DUMMY_CATEGORIES.length}
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
                    Add Category
                </Button>
            </Affix>

            <CategoryModalForm
                opened={modalState !== undefined}
                onClose={() => setModalState(undefined)}
                onSubmit={handleSubmit}
                onEdit={modalState ?? null}
            />

            <CustomModal
                opened={!!deleteTarget}
                onClose={() => setDeleteTarget(null)}
                icon={IMAGES.WARNING}
                title="Confirm Deletion"
                subtext="Are you sure you want to delete this Category?"
                actionText="Yes, Delete"
                onAction={handleConfirmDelete}
                showCancel
                cancelText="No"
            />
        </>
    );
};

export default CategorySetup;
