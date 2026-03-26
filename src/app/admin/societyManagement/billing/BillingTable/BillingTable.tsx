'use client'

import {
  ActionIcon, Badge, Flex, Pagination, Select,
  Text, TextInput, Tooltip, UnstyledButton,
} from "@mantine/core"
import {
  IconArrowDown, IconArrowsUpDown, IconArrowUp,
  IconFileInvoice, IconSearch, IconX,
} from "@tabler/icons-react"
import { useMemo, useState } from "react"
import type { BillingRecord, BillingTableProps, Filters, SortKey } from "./BillingTable.types"

/* ================= CONSTANTS ================= */

const PAGE_SIZE = 6

const EMPTY_FILTERS: Filters = {
  search: "",
  subscriptionStatus: null,
  paymentStatus: null,
  packageName: null,
  paymentMethod: null,
}

const subscriptionColor: Record<string, string> = {
  Active: "green", Inactive: "gray", Cancelled: "red", Expired: "orange", Paused: "yellow",
}

const paymentColor: Record<string, string> = {
  Paid: "green", Pending: "yellow", Failed: "red", Refunded: "blue",
}

const packageColor: Record<string, string> = {
  Basic: "gray", Standard: "blue", Pro: "violet", Premium: "orange",
}

/* ================= HELPERS ================= */

const fmt = (sym: string, n: number) => `${sym}${n.toLocaleString("en-IN")}`

/* ================= FILTER BAR (internal) ================= */

const FilterBar = ({
  filters,
  onChange,
  onClear,
}: {
  filters: Filters
  onChange: (f: Partial<Filters>) => void
  onClear: () => void
}) => {
  const hasActive =
    filters.search ||
    filters.subscriptionStatus ||
    filters.paymentStatus ||
    filters.packageName ||
    filters.paymentMethod

  return (
    <Flex gap="sm" mb="md" wrap="wrap" align="flex-end">
      <TextInput
        placeholder="Search name, invoice ID, phone..."
        leftSection={<IconSearch size={14} />}
        value={filters.search}
        onChange={e => onChange({ search: e.currentTarget.value })}
        size="sm"
        style={{ flex: "1 1 200px", minWidth: 180 }}
      />

      <Select
        placeholder="Package"
        data={["Basic", "Standard", "Pro", "Premium"]}
        value={filters.packageName}
        onChange={val => onChange({ packageName: val })}
        clearable
        size="sm"
        style={{ width: 130 }}
      />

      <Select
        placeholder="Subscription"
        data={["Active", "Inactive", "Cancelled", "Expired", "Paused"]}
        value={filters.subscriptionStatus}
        onChange={val => onChange({ subscriptionStatus: val })}
        clearable
        size="sm"
        style={{ width: 140 }}
      />

      <Select
        placeholder="Payment"
        data={["Paid", "Pending", "Failed", "Refunded"]}
        value={filters.paymentStatus}
        onChange={val => onChange({ paymentStatus: val })}
        clearable
        size="sm"
        style={{ width: 130 }}
      />

      <Select
        placeholder="Method"
        data={["UPI", "Card", "Net Banking", "Wallet"]}
        value={filters.paymentMethod}
        onChange={val => onChange({ paymentMethod: val })}
        clearable
        size="sm"
        style={{ width: 130 }}
      />

      {hasActive && (
        <Tooltip label="Clear all filters" withArrow>
          <ActionIcon variant="light" color="red" size="md" onClick={onClear}>
            <IconX size={14} />
          </ActionIcon>
        </Tooltip>
      )}
    </Flex>
  )
}

/* ================= BILLING TABLE ================= */

export const BillingTable = ({ data, onView }: BillingTableProps) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: "asc" | "desc" } | null>(null)
  const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS)

  const updateFilter = (partial: Partial<Filters>) => {
    setFilters(prev => ({ ...prev, ...partial }))
    setCurrentPage(1)
  }

  const clearFilters = () => {
    setFilters(EMPTY_FILTERS)
    setCurrentPage(1)
  }

  const filteredData = useMemo(() => {
    return data.filter(row => {
      const q = filters.search.toLowerCase()
      if (q && ![row.customerName, row.invoiceId, row.customerPhone, row.packageName, row.societyName]
        .some(v => v.toLowerCase().includes(q))) return false
      if (filters.subscriptionStatus && row.subscriptionStatus !== filters.subscriptionStatus) return false
      if (filters.paymentStatus && row.paymentStatus !== filters.paymentStatus) return false
      if (filters.packageName && row.packageName !== filters.packageName) return false
      if (filters.paymentMethod && row.paymentMethod !== filters.paymentMethod) return false
      return true
    })
  }, [data, filters])

  const sortedData = useMemo(() => {
    if (!sortConfig) return filteredData
    const { key, direction } = sortConfig
    return [...filteredData].sort((a, b) => {
      const aVal = a[key], bVal = b[key]
      if (typeof aVal === "number" && typeof bVal === "number")
        return direction === "asc" ? aVal - bVal : bVal - aVal
      return direction === "asc"
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal))
    })
  }, [filteredData, sortConfig])

  const totalItems = sortedData.length
  const paginated = sortedData.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
  const start = totalItems === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1
  const end = Math.min(start + paginated.length - 1, totalItems)

  const toggleSort = (key: SortKey) => {
    setSortConfig(prev =>
      prev?.key === key
        ? { key, direction: prev.direction === "asc" ? "desc" : "asc" }
        : { key, direction: "asc" }
    )
  }

  const SortIcon = ({ k }: { k: SortKey }) => {
    if (sortConfig?.key !== k) return <IconArrowsUpDown size={13} color="rgba(255,255,255,0.4)" />
    return sortConfig.direction === "asc" ? <IconArrowUp size={13} /> : <IconArrowDown size={13} />
  }

  const thS: React.CSSProperties = {
    background: "var(--mantine-color-primary-6, #1971c2)",
    color: "#fff", fontWeight: 600, fontSize: 12,
    padding: "9px 12px", whiteSpace: "nowrap",
    borderRight: "1px solid rgba(255,255,255,0.1)",
  }

  type ColDef = {
    label: string
    key: SortKey | null
    width: string
    right?: boolean
    center?: boolean
  }

  const columns: ColDef[] = [
    { label: "Invoice ID",   key: "invoiceId",          width: "110px" },
    { label: "Customer",     key: null,                 width: "150px" },
    { label: "Package",      key: "packageName",        width: "105px" },
    { label: "Subscription", key: "subscriptionStatus", width: "115px" },
    { label: "Payment",      key: "paymentStatus",      width: "100px" },
    { label: "Method",       key: "paymentMethod",      width: "115px" },
    { label: "Amount",       key: "amount",             width: "100px", right: true },
    { label: "Date",         key: "createdAt",          width: "100px" },
    { label: "Invoice",      key: null,                 width: "68px",  center: true },
  ]

  return (
    <div style={{ width: "100%", minWidth: 0 }}>
      <FilterBar filters={filters} onChange={updateFilter} onClear={clearFilters} />

      <div style={{
        overflowX: "auto",
        WebkitOverflowScrolling: "touch",
        borderRadius: 8,
        border: "1px solid var(--mantine-color-gray-2, #e9ecef)",
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
      }}>
        <table style={{ width: "100%", minWidth: 780, borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr>
              {columns.map(({ label, key, width, right, center }) => (
                <th
                  key={label}
                  style={{ ...thS, width, minWidth: width, textAlign: right ? "right" : center ? "center" : "left" }}
                >
                  {key ? (
                    <UnstyledButton
                      onClick={() => toggleSort(key)}
                      style={{
                        display: "flex", alignItems: "center", gap: 4,
                        color: "#fff", fontSize: 12, fontWeight: 600,
                        justifyContent: right ? "flex-end" : "flex-start",
                      }}
                    >
                      {label} <SortIcon k={key} />
                    </UnstyledButton>
                  ) : label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={columns.length} style={{ textAlign: "center", padding: 32, color: "#94a3b8", fontSize: 13 }}>
                  No records match your filters
                </td>
              </tr>
            ) : (
              paginated.map((row, i) => (
                <tr
                  key={row.invoiceId}
                  style={{ background: i % 2 === 0 ? "#fff" : "#f8fafc", borderBottom: "1px solid #f1f5f9", transition: "background 0.15s" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#eff6ff")}
                  onMouseLeave={e => (e.currentTarget.style.background = i % 2 === 0 ? "#fff" : "#f8fafc")}
                >
                  <td style={{ padding: "8px 12px", fontFamily: "monospace", fontSize: 12, color: "#475569", fontWeight: 600 }}>
                    {row.invoiceId}
                  </td>

                  <td style={{ padding: "8px 12px" }}>
                    <div style={{ fontWeight: 700, fontSize: 13, color: "#0f172a" }}>{row.societyName}</div>
                    <div style={{ fontSize: 12, color: "#475569", marginTop: 1 }}>{row.customerName}</div>
                    <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 1 }}>{row.customerPhone}</div>
                  </td>

                  <td style={{ padding: "8px 12px" }}>
                    <Badge color={packageColor[row.packageName] ?? "gray"} variant="light" size="sm" radius="sm">
                      {row.packageName}
                    </Badge>
                    <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 3 }}>{row.planType}</div>
                  </td>

                  <td style={{ padding: "8px 12px" }}>
                    <Badge color={subscriptionColor[row.subscriptionStatus] ?? "gray"} variant="light" size="sm" radius="sm">
                      {row.subscriptionStatus}
                    </Badge>
                  </td>

                  <td style={{ padding: "8px 12px" }}>
                    <Badge color={paymentColor[row.paymentStatus] ?? "gray"} variant="filled" size="sm" radius="sm">
                      {row.paymentStatus}
                    </Badge>
                  </td>

                  <td style={{ padding: "8px 12px" }}>
                    <Badge variant="outline" color="blue" size="sm" radius="sm">
                      {row.paymentMethod}
                    </Badge>
                  </td>

                  <td style={{ padding: "8px 12px", textAlign: "right", fontWeight: 700, color: "#0f172a" }}>
                    {fmt(row.currencySymbol, row.amount + row.tax - row.discount)}
                  </td>

                  <td style={{ padding: "8px 12px", fontSize: 12, color: "#64748b" }}>
                    {row.createdAt}
                  </td>

                  <td style={{ padding: "8px 12px", textAlign: "center" }}>
                    <Tooltip label="View Invoice" withArrow position="left" fz="xs">
                      <ActionIcon variant="light" color="primary" size="sm" radius="sm" onClick={() => onView(row)}>
                        <IconFileInvoice size={15} />
                      </ActionIcon>
                    </Tooltip>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Flex justify="space-between" mt="xs" mb="md" align="center" px={2}>
        <Text size="sm" c="dimmed">
          Showing {start} to {end} of {totalItems}
          {totalItems !== data.length ? ` (filtered from ${data.length})` : ""} entries
        </Text>
        <Pagination
          color="primary.5"
          total={Math.ceil(totalItems / PAGE_SIZE)}
          value={currentPage}
          onChange={setCurrentPage}
          size="xs"
        />
      </Flex>
    </div>
  )
}