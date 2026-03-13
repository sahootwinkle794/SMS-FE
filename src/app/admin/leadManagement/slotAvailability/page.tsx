/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useCallback, useEffect, useState } from "react";
import {
    Button,
    Group,
    Text,
    Badge,
    Tooltip,
    ActionIcon,
    Affix,
} from "@mantine/core";
import { IconEyePlus, IconEdit, IconTrash } from "@tabler/icons-react";

import { DataTable, Column } from "@/components/DataTable";
import { AppBreadcrumbs } from "@/components";
import SlotAvailabilityModalForm from "./ModalForm";
import { COMMON_MESSAGE } from "@/utils/constants";
import { API_PATH } from "@/utils/apiPath";
import { SlotAvailabilityData, SlotListResponse } from "@/types/admin/leadManagement/slotAvailability/slotAvailability";
import { getRequest, patchRequest, postRequest } from "@/service";
import { notifications } from "@mantine/notifications";
import { ApiError } from "next/dist/server/api-utils";

const notifyError = (message: string) =>
    notifications.show({ title: "Error", message, color: "red" });

const notifySuccess = (message: string) =>
    notifications.show({ title: "Successful!", message, color: "green" });

const SlotAvailability = () => {
    const [data, setData] = useState<SlotAvailabilityData[]>([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [opened, setOpened] = useState(false);
    const [editing, setEditing] = useState<SlotAvailabilityData | null>(null);
    const [totalRecords, setTotalRecords] = useState<number>(0);

    // ---------------------------------- //

    const handleEdit = (row: SlotAvailabilityData) => {
        setEditing(row);
        setOpened(true);
    };

    const handleDelete = (row: SlotAvailabilityData) => {
        console.log("Delete", row);
    };

    const handleSubmit = async (payload: any) => {
        try {
            setLoading(true);
            if (editing) {
                // UPDATE
                await patchRequest(
                    `${API_PATH.PATCH_SLOT_SCHEDULE}/${editing.id}`,
                    payload
                );

                notifySuccess("Slot updated successfully");
            } else {
                // CREATE
                await postRequest(API_PATH.POST_SLOT_SCHEDULE, payload);

                notifySuccess(COMMON_MESSAGE.SLOT_SCHEDULE_SETUP_CREATED);
            }

            setOpened(false);
            setEditing(null);

            // refresh table
            fetchDemoRequestData();

        } catch (err) {
            console.error(err);
            const error = err as ApiError;

            notifyError(
                error?.message || COMMON_MESSAGE.SLOT_SCHEDULE_SETUP_FAILED
            );
        } finally {
            setLoading(false);
        }
    };

    const columns: Column<SlotAvailabilityData>[] = [
        {
            header: "S.No",
            width: "8%",
            align: "center",
            render: (_value, _row, index) => index + 1,
        },
        {
            header: "Actions",
            width: "12%",
            render: (_value, row) => (
                <Group gap="xs">
                    <Tooltip label="Edit">
                        <ActionIcon
                            color="blue"
                            variant="light"
                            onClick={() => handleEdit(row)}
                        >
                            <IconEdit size={16} />
                        </ActionIcon>
                    </Tooltip>

                    <Tooltip label="Delete">
                        <ActionIcon
                            color="red"
                            variant="light"
                            onClick={() => handleDelete(row)}
                        >
                            <IconTrash size={16} />
                        </ActionIcon>
                    </Tooltip>
                </Group>
            ),
        },
        {
            header: "Date",
            accessor: "slotDate",
            render: (value) => <Text size="sm">{value}</Text>,
        },
        {
            header: "Slot Time",
            accessor: "slotTime",
            render: (value) => (
                <Group gap="xs">
                    {(value as string[]).map((slot, index) => (
                        <Badge key={index} variant="light">
                            {slot}
                        </Badge>
                    ))}
                </Group>
            ),
        },
        {
            header: "Person Name",
            accessor: "personName",
            render: (value) => <Text size="sm">{value}</Text>,
        },

    ];

    const fetchDemoRequestData = useCallback(async () => {
        try {
            setLoading(true);

            const payload = {
                search: "",
                page: currentPage,
                limit: "100",
                sortBy: "created_at",
                sortOrder: "DESC",
            };

            const response = await getRequest<SlotListResponse>(
                API_PATH.GET_SLOT_SCHEDULE,
                payload
            );

            const apiData = response?.data?.data || [];

            const formattedData: SlotAvailabilityData[] = apiData.map((item) => ({
                id: item.scheduleId,
                slotDate: item.slotDate,

                // convert slots array → slotTime string array
                slotTime: item.slots.map((slot) => slot.slotName),

                personName: item.demoBy,
                status: item.slots?.[0]?.status ?? 0,
            }));

            setData(formattedData);
            setTotalRecords(response?.data?.total ?? 0);

        } catch (err) {
            console.error(err);
            const error = err as ApiError;
            notifyError(
                error?.message || COMMON_MESSAGE.SLOT_SETUP_FETCH_FAIL
            );
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchDemoRequestData();
    }, [fetchDemoRequestData]);

    return (
        <>
            <AppBreadcrumbs
                items={[
                    { label: "Lead Management" },
                    { label: "Slot Availability" },
                ]}
            />

            <DataTable
                data={data}
                columns={columns}
                loading={loading}
                pageSize={10}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                totalRecords={totalRecords}
            />

            <Affix position={{ bottom: 40, right: 20 }}>
                <Button
                    leftSection={<IconEyePlus size={20} />}
                    radius="xl"
                    size="md"
                    color="primary.5"
                    style={{
                        position: "fixed",
                        bottom: 32,
                        right: 32,
                        zIndex: 100,
                        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
                    }}
                    onClick={() => {
                        setEditing(null);
                        setOpened(true);
                    }}
                >
                    Add Slot Availability
                </Button>
            </Affix>

            <SlotAvailabilityModalForm
                opened={opened}
                onEdit={editing}
                onClose={() => {
                    setOpened(false);
                    setEditing(null);
                }}
                onSubmit={handleSubmit}
            />
        </>
    );
};

export default SlotAvailability;