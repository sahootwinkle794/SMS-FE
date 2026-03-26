export type BillingRecord = {
  invoiceId: string
  packageName: string
  // planName: string
  societyName: string
  societyAddress: string
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
  customerName: string
  customerPhone: string
  tax: number
  discount: number
}