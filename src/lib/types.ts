export type Transaction = {
  date: string;
  merchant: string;
  amount: number;
};

export type CardInfo = {
  variant: string;
  last4: string;
};

export type StatementData = {
  cardInfo: CardInfo;
  billingCycle: {
    startDate: string;
    endDate: string;
  };
  paymentDueDate: string;
  totalBalance: number;
  transactions: Transaction[];
};
