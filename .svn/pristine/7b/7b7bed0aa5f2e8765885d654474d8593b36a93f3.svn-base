'use client'

import { AppBreadcrumbs } from "@/components"
import { RouteConfig } from "@/utils/routeConfig"
import { useDisclosure } from "@mantine/hooks"
import { useState } from "react"
import { InvoiceModal } from "@/components/InvoiceModal"
import { InvoiceData } from "@/components/InvoiceModal/InvoiceModal.types"
import { BillingTable } from "./BillingTable"
import { BillingRecord } from "./BillingTable/BillingTable.types"
import { STATIC_DATA } from "@/mock/mockBillingData"
import { PAGE_TITLE } from "@/utils/constants"

/* ================= MAPPER: BillingRecord → InvoiceData ================= */

const toInvoiceData = (r: BillingRecord): InvoiceData => ({
  invoiceId: r.invoiceId,
  issuedDate: r.createdAt,
  nextBillingDate: r.nextBillingDate,

  companyName: "Society Management System - Prath Technologies Pvt. Ltd.",
  companyAddress: "Plot 364 2nd floor, Kalamandir Royale, Rupali Square, Bhubaneswar\nOdisha – 751024, India",
  companyEmail: "billing@prathtech.com",

  customerName: r.customerName,
  customerPhone: r.customerPhone,
  societyName: r.societyName,
  societyAddress: r.societyAddress,

  lineItems: [
    {
      description: "Society Management System",
      package: r.packageName,
      period: `${r.startDate} – ${r.endDate}`,
      type: r.planType,
      amount: r.amount,
    },
  ],

  currency: r.currency,
  currencySymbol: r.currencySymbol,
  discount: r.discount,
  tax: r.tax,
  taxLabel: "GST 18%",

  paymentStatus: r.paymentStatus,
  paymentMethod: r.paymentMethod,
})

/* ================= PAGE ================= */

const Billing = () => {
  const [opened, { open, close }] = useDisclosure(false)
  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null)

  const handleView = (record: BillingRecord) => {
    setInvoiceData(toInvoiceData(record))
    open()
  }

  return (
    <>
      <AppBreadcrumbs
        items={[
          { label: PAGE_TITLE.SOCIETY_MANAGEMENT, path: RouteConfig.SOCIETY_MGT },
          { label: "Billing & Subscriptions" },
        ]}
      />

      <BillingTable 
        data={STATIC_DATA} 
        onView={handleView} 
      />

      <InvoiceModal opened={opened} onClose={close} invoice={invoiceData} />
    </>
  );
}

export default Billing