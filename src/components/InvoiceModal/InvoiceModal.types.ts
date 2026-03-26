export type InvoiceLineItem = {
  description: string
  package: string
  period: string
  type: string
  amount: number
}

export type InvoiceData = {
  // Invoice meta
  invoiceId: string
  issuedDate: string
  nextBillingDate?: string

  // Company
  companyName: string
  companyAddress: string  // use "\n" for line breaks
  companyEmail: string

  // Customer
  societyName: string
  societyAddress: string
  customerName: string
  customerPhone: string

  // Line items
  lineItems: InvoiceLineItem[]

  // Financials
  currency: string
  currencySymbol: string
  discount: number
  tax: number
  taxLabel?: string       // e.g. "GST 18%", defaults to "Tax"

  // Payment
  paymentStatus: "Paid" | "Pending" | "Failed" | "Refunded"
  paymentMethod: string
}

export type InvoiceModalProps = {
  opened: boolean
  onClose: () => void
  invoice: InvoiceData | null
}