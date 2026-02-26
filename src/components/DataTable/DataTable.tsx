"use client";

import { UILoader } from "@/components";
import {
  Container,
  Flex,
  Pagination,
  ScrollArea,
  Table,
  Text,
  UnstyledButton,
} from "@mantine/core";
import {
  IconArrowDown,
  IconArrowsUpDown,
  IconArrowUp,
} from "@tabler/icons-react";
import { useMemo, useState } from "react";
import styles from "./DataTable.module.css";

/* ================= TYPES ================= */

export type Column<T> = {
  header: string;
  accessor?: keyof T;
  align?: "left" | "center" | "right";
  sortable?: boolean;
  width?: string; // Add width property
  render?: (
    value: T[keyof T] | undefined,
    row: T,
    index: number
  ) => React.ReactNode;
};

interface DataTableProps<T extends object> {
  data: T[];
  columns: Column<T>[];
  pageSize?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  totalRecords?: number; // server-side pagination support
  loading?: boolean;
}

/* ================= COMPONENT ================= */

const DataTable = <T extends object>({
  data,
  columns,
  pageSize = 10,
  currentPage = 1,
  onPageChange,
  totalRecords,
  loading = false,
}: DataTableProps<T>) => {
  const [search] = useState("");

  const [sortConfig, setSortConfig] = useState<{
    key: keyof T;
    direction: "asc" | "desc";
  } | null>(null);

  /* ================= FILTER ================= */

  const filteredData = useMemo(() => {
    return data.filter((row) =>
      Object.values(row).join(" ").toLowerCase().includes(search.toLowerCase())
    );
  }, [data, search]);

  /* ================= SORT ================= */

  const sortedData = useMemo(() => {
    if (!sortConfig) return filteredData;

    const { key, direction } = sortConfig;

    return [...filteredData].sort((a, b) => {
      const aValue = a[key];
      const bValue = b[key];

      if (aValue == null) return 1;
      if (bValue == null) return -1;

      if (typeof aValue === "number" && typeof bValue === "number") {
        return direction === "asc" ? aValue - bValue : bValue - aValue;
      }

      return direction === "asc"
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue));
    });
  }, [filteredData, sortConfig]);

  /* ================= PAGINATION ================= */

  const startIndex = (currentPage - 1) * pageSize;
  // If server-side pagination, do NOT slice again
  const paginatedData = totalRecords
    ? sortedData
    : sortedData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const totalItems = totalRecords ?? filteredData.length;
  const start = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const end = Math.min(start + data.length - 1, totalItems);

  /* ================= SORT HANDLER ================= */

  const handleSort = (col: Column<T>) => {
    if (!col.sortable || !col.accessor) return;

    const key = col.accessor;

    setSortConfig((prev) => {
      if (prev?.key === key) {
        return {
          key,
          direction: prev.direction === "asc" ? "desc" : "asc",
        };
      }
      return { key, direction: "asc" };
    });
  };

  /* ================= LOADER ================= */

  if (loading) {
    return (
      <div className="w-full h-[50vh] flex justify-center items-center">
        <UILoader size="lg" />
      </div>
    );
  }

  /* ================= RENDER ================= */

  return (
    <div className="mx-1">
      <Container fluid>
        <ScrollArea>
          <Table stickyHeader className={styles.tableWrapper}>
            <Table.Thead>
              <Table.Tr>
                {columns.map((col, index) => {
                  const isSorted = sortConfig?.key === col.accessor;

                  return (
                    <Table.Th
                      key={`header-${String(col.accessor)}-${index}`}
                      bg="primary.6"
                      className={`${styles.tableHeader} ${
                        styles[`align_${col.align}`]
                      }`}
                      style={{
                        width: col.width,
                        minWidth: col.width,
                        maxWidth: col.width,
                      }}
                    >
                      <div
                        className={`${styles.columnBorder} ${
                          styles[`align_${col.align}`]
                        }`}
                      >
                        {col.sortable ? (
                          <UnstyledButton
                            className={`${styles.sortButton} ${
                              styles[`align_${col.align}`]
                            }`}
                            onClick={() => handleSort(col)}
                          >
                            <span>{col.header}</span>

                            {isSorted ? (
                              sortConfig!.direction === "asc" ? (
                                <IconArrowUp size={16} />
                              ) : (
                                <IconArrowDown size={16} />
                              )
                            ) : (
                              <IconArrowsUpDown size={16} color="#fff" />
                            )}
                          </UnstyledButton>
                        ) : (
                          <span>{col.header}</span>
                        )}
                      </div>
                    </Table.Th>
                  );
                })}
              </Table.Tr>
            </Table.Thead>

            <Table.Tbody>
              {paginatedData.map((row, rowIndex) => (
                <Table.Tr key={rowIndex} className={styles.tableRow}>
                  {columns.map((col, colIndex) => {
                    const value = col.accessor ? row[col.accessor] : undefined;

                    return (
                      <Table.Td
                        key={`${String(col.accessor)}-${colIndex}`}
                        style={{
                          textAlign: col.align || "left",
                          padding: "5px 14px",
                          width: col.width,
                          minWidth: col.width,
                          maxWidth: col.width,
                        }}
                        data-label={col.header}
                      >
                        <span className={styles.columnBorder}>
                          {col.render
                            ? col.render(value, row, rowIndex)
                            : value != null
                            ? String(value)
                            : ""}
                        </span>
                      </Table.Td>
                    );
                  })}
                </Table.Tr>
              ))}

              {paginatedData.length === 0 && (
                <Table.Tr>
                  <Table.Td colSpan={columns.length} align="center">
                    No data found
                  </Table.Td>
                </Table.Tr>
              )}
            </Table.Tbody>
          </Table>
        </ScrollArea>

        <Flex justify="space-between" mb="md" mt="xs">
          <Text size="sm" c="#919191">
            Showing {start} to {end} of {totalItems} entries
          </Text>

          <Pagination
            color="primary.5"
            total={Math.ceil(totalItems / pageSize)}
            value={currentPage}
            onChange={onPageChange}
            size="xs"
          />
        </Flex>
      </Container>
    </div>
  );
};

export default DataTable;