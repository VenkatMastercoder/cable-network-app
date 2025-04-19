export interface BillTransaction {
  transactionId: string;
  paymentDate: string;
  paymentMode: string;
  billAmount: number;
}

export const billTransactions: BillTransaction[] = [
  {
    transactionId: "113680523367",
    paymentDate: "12-Mar-2025, 5:52:21 PM",
    paymentMode: "Online",
    billAmount: 471.00
  },
  {
    transactionId: "113651810402",
    paymentDate: "16-Feb-2025, 9:46:58 AM",
    paymentMode: "Online",
    billAmount: 471.00
  },
  {
    transactionId: "113612401322",
    paymentDate: "16-Jan-2025, 12:25:12 AM",
    paymentMode: "Online",
    billAmount: 471.00
  },
  {
    transactionId: "113576597557",
    paymentDate: "16-Dec-2024, 1:12:01 PM",
    paymentMode: "Online",
    billAmount: 471.00
  }
];