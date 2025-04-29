export type SubscriptionType = {
  id: string;
  status: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
};

export type InvoicesType = {
  id: string;
  stripeInvoiceId: string;
  amountDue: number;
  amountPaid: number;
  invoiceUrl: string;
  status: string;
  dueDate?: string;
  createdAt: string;
};

