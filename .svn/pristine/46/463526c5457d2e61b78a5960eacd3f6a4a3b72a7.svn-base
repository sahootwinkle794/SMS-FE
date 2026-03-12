"use client";

import { useState } from "react";
import { AppBreadcrumbs, DataTable } from "@/components";
import { Column } from "@/components/DataTable";
import { Text, Badge, ActionIcon, Group, Affix, Button } from "@mantine/core";
import { IconEdit, IconEyePlus, IconTrash } from "@tabler/icons-react";
import { PAGE_TITLE, RECORDS_PER_PAGE, STATUS_CONFIG } from "@/utils/constants";
import { RouteConfig } from "@/utils/routeConfig";
import SlotManagementModalForm from "./ModalForm";
import { SlotItem } from "@/types/admin/leadManagement/slotManagement/slotManagement";

/* ---------------- Dummy Data ---------------- */

const DUMMY_SLOTS: SlotItem[] = [
  {
    id: "1",
    slotName: "Morning Slot",
    startTime: "09:00 AM",
    endTime: "11:00 AM",
    status: 1,
  },
  {
    id: "2",
    slotName: "Midday Slot",
    startTime: "11:30 AM",
    endTime: "01:30 PM",
    status: 1,
  },
  {
    id: "3",
    slotName: "Afternoon Slot",
    startTime: "02:00 PM",
    endTime: "04:00 PM",
    status: 0,
  },
  {
    id: "4",
    slotName: "Evening Slot",
    startTime: "05:00 PM",
    endTime: "07:00 PM",
    status: 1,
  },
];

/* ---------------- Component ---------------- */

const SlotManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [opened, setOpened] = useState(false);
  const columns: Column<SlotItem>[] = [
    {
      header: "S.No",
      width: "8%",
      align: "center",
      render: (_value, _row, index) => (
        <Text>{(currentPage - 1) * RECORDS_PER_PAGE + index + 1}</Text>
      ),
    },
    {
      header: "Actions",
      width: "15%",
      align: "center",
      render: () => (
        <Group gap={6} justify="center">
          <ActionIcon color="blue" variant="light">
            <IconEdit size={16} />
          </ActionIcon>

          <ActionIcon color="red" variant="light">
            <IconTrash size={16} />
          </ActionIcon>
        </Group>
      ),
    },
    {
      header: "Slot Name",
      accessor: "slotName",
      width: "25%",
    },
    {
      header: "Start Time",
      accessor: "startTime",
      width: "20%",
    },
    {
      header: "End Time",
      accessor: "endTime",
      width: "20%",
    },
    {
      header: "Status",
      accessor: "status",
      align: "center",
      width: "12%",
      render: (value) => {
        const status = Number(value) as 0 | 1;
        return (
          <Badge size="sm" radius="xs" variant="filled" color={STATUS_CONFIG[status]?.color}>
            {STATUS_CONFIG[status]?.label}
          </Badge>
        );
      },
    },

  ];

  const handleSubmit = (data: Record<string, string>) => {
    console.log("Slot Data", data);
  };

  return (
    <>
      <AppBreadcrumbs
        items={[
          { label: PAGE_TITLE.SOCIETY_MANAGEMENT, path: RouteConfig.SOCIETY_MGT },
          { label: "Slot Management" },
        ]}
      />

      <DataTable
        data={DUMMY_SLOTS}
        columns={columns}
        loading={false}
        pageSize={RECORDS_PER_PAGE}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        totalRecords={DUMMY_SLOTS.length}
      />

      <Affix position={{ bottom: 40, right: 20 }}>
        <Button
          leftSection={<IconEyePlus size={20} />}
          radius="xl"
          size="md"
          color="primary.5"
          onClick={() => setOpened(true)}
          style={{
            position: "fixed",
            bottom: 32,
            right: 32,
            zIndex: 100,
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
          }}
        >
          Add TIme Slot
        </Button>
      </Affix>

      <SlotManagementModalForm
        opened={opened}
        onClose={() => setOpened(false)}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default SlotManagement;