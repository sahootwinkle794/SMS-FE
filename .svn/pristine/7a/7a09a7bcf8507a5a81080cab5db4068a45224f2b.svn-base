export type BillingRecord = {
  invoiceId: string
  packageName: string
  planType: string
  subscriptionStatus: string
  paymentStatus: "Paid" | "Pending" | "Failed" | "Refunded"
  amount: number
  currency: string
  currencySymbol: string
  paymentMethod: string
  startDate: string
  endDate: string
  nextBillingDate: string
  createdAt: string
  societyName: string
  societyAddress: string
  customerName: string
  customerPhone: string
  tax: number
  discount: number
}

export type BillingTableProps = {
  data: BillingRecord[]
  onView: (record: BillingRecord) => void
}

export type Filters = {
  search: string
  subscriptionStatus: string | null
  paymentStatus: string | null
  packageName: string | null
  paymentMethod: string | null
}

export type SortKey =
  | "invoiceId"
  | "packageName"
  | "subscriptionStatus"
  | "paymentStatus"
  | "amount"
  | "createdAt"
  | "paymentMethod"