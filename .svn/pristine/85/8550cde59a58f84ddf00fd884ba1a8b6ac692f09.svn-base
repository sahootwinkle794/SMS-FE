import {
  Box, Group, Pagination, Select, Table, Text, TextInput,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useState, useMemo } from "react";
import { CORAL, PEACH, softCard } from "@/utils/constants";
import { SocietyAdminTableColumn } from "./SocietyAdmin.types";

// ─── Types ────────────────────────────────────────────────────────────────────

interface SocietyAdminTableProps<T> {
  data: T[];
  columns: SocietyAdminTableColumn<T>[];
  rowKey: keyof T;
  /** Placeholder for the search input */
  searchPlaceholder?: string;
  /** Page size options — default [10, 20, 50] */
  pageSizeOptions?: string[];
  /** Extra filter controls rendered beside the search bar */
  filterSlot?: React.ReactNode;
  /** Empty state message */
  emptyMessage?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function SocietyAdminTable<T extends Record<string, unknown>>({
  data,
  columns,
  rowKey,
  searchPlaceholder = "Search…",
  pageSizeOptions = ["10", "20", "50"],
  filterSlot,
  emptyMessage = "No records found.",
}: SocietyAdminTableProps<T>) {

  const [search,   setSearch]   = useState("");
  const [page,     setPage]     = useState(1);
  const [pageSize, setPageSize] = useState(Number(pageSizeOptions[0]));

  // Searchable column keys
  const searchableKeys = columns
    .filter((c) => c.searchable !== false)
    .map((c) => c.key as string);

  // Filter
  const filtered = useMemo(() => {
    if (!search.trim()) return data;
    const q = search.toLowerCase();
    return data.filter((row) =>
      searchableKeys.some((key) =>
        String((row as Record<string, unknown>)[key] ?? "").toLowerCase().includes(q)
      )
    );
  }, [data, search]);

  // Paginate
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated  = filtered.slice((page - 1) * pageSize, page * pageSize);

  const handleSearch = (val: string) => {
    setSearch(val);
    setPage(1);
  };

  const inputStyle = {
    input: { borderColor: "#FFE5E5", borderRadius: 12, fontWeight: 600, background: "#fff" },
  };

  return (
    <Box>
      {/* ── Toolbar ─────────────────────────────────────────────────────── */}
      <Group justify="space-between" mb="md" wrap="wrap" gap="sm">
        <TextInput
          placeholder={searchPlaceholder}
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          leftSection={<IconSearch size={15} color={CORAL} />}
          w={{ base: "100%", sm: 260 }}
          styles={inputStyle}
          radius="xl"
        />
        <Group gap="sm" wrap="wrap">
          {filterSlot}
          <Select
            data={pageSizeOptions.map((v) => ({ value: v, label: `${v} / page` }))}
            value={String(pageSize)}
            onChange={(v) => { setPageSize(Number(v)); setPage(1); }}
            w={110}
            styles={inputStyle}
          />
        </Group>
      </Group>

      {/* ── Table ───────────────────────────────────────────────────────── */}
      <Box style={{ ...softCard, borderRadius: 16, overflow: "hidden" }}>
        <Table highlightOnHover horizontalSpacing="md" verticalSpacing="sm">
          <Table.Thead>
            <Table.Tr style={{ background: PEACH }}>
              {columns.map((col) => (
                <Table.Th
                  key={String(col.key)}
                  style={{
                    width: col.width,
                    fontWeight: 800,
                    fontSize: 11,
                    textTransform: "uppercase",
                    letterSpacing: "0.07em",
                    color: CORAL,
                    borderBottom: "1.5px solid #FFE5E5",
                    whiteSpace: "nowrap",
                  }}
                >
                  {col.label}
                </Table.Th>
              ))}
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {paginated.length === 0 ? (
              <Table.Tr>
                <Table.Td colSpan={columns.length}>
                  <Text ta="center" c="dimmed" fw={600} py="xl" fz="sm">
                    {emptyMessage}
                  </Text>
                </Table.Td>
              </Table.Tr>
            ) : (
              paginated.map((row) => (
                <Table.Tr
                  key={String(row[rowKey as string])}
                  style={{ borderBottom: "1px solid #FFF0F0" }}
                >
                  {columns.map((col) => (
                    <Table.Td key={String(col.key)} style={{ fontSize: 13, fontWeight: 600, color: "#333" }}>
                      {col.render
                        ? col.render(row)
                        : String((row as Record<string, unknown>)[col.key as string] ?? "—")}
                    </Table.Td>
                  ))}
                </Table.Tr>
              ))
            )}
          </Table.Tbody>
        </Table>
      </Box>

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <Group justify="space-between" mt="md" align="center" wrap="wrap" gap="sm">
        <Text fz="xs" c="dimmed" fw={600}>
          Showing {Math.min((page - 1) * pageSize + 1, filtered.length)}–{Math.min(page * pageSize, filtered.length)} of {filtered.length} records
        </Text>
        <Pagination
          total={totalPages}
          value={page}
          onChange={setPage}
          size="sm"
          radius="xl"
          styles={{
            control: {
              border: "1.5px solid #FFE5E5",
              "&[dataActive]": { background: CORAL, borderColor: CORAL },
            },
          }}
        />
      </Group>
    </Box>
  );
}