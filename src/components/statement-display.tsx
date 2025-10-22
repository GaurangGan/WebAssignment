import type { StatementData } from "@/lib/types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  CreditCard,
  CalendarRange,
  CalendarClock,
  CircleDollarSign,
  ShoppingCart,
} from "lucide-react";

interface StatementDisplayProps {
  data: StatementData;
}

const SummaryCard = ({ icon, title, value, accentValue }: { icon: React.ReactNode, title: string, value: string, accentValue?: string }) => (
  <Card className="hover:shadow-md transition-shadow">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      {accentValue && <p className="text-xs text-muted-foreground">{accentValue}</p>}
    </CardContent>
  </Card>
);

export function StatementDisplay({ data }: StatementDisplayProps) {
  const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const formatDate = (dateString: string) => {
    // Replace dashes with slashes to avoid timezone issues where 'YYYY-MM-DD' is treated as UTC
    return new Date(dateString.replace(/-/g, '/')).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in-0 duration-500">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <SummaryCard 
          icon={<CreditCard className="h-4 w-4 text-muted-foreground" />}
          title="Card"
          value={data.cardInfo.variant}
          accentValue={`**** **** **** ${data.cardInfo.last4}`}
        />
        <SummaryCard 
          icon={<CalendarRange className="h-4 w-4 text-muted-foreground" />}
          title="Billing Cycle"
          value={formatDate(data.billingCycle.startDate)}
          accentValue={`to ${formatDate(data.billingCycle.endDate)}`}
        />
        <SummaryCard 
          icon={<CalendarClock className="h-4 w-4 text-muted-foreground" />}
          title="Payment Due"
          value={formatDate(data.paymentDueDate)}
        />
        <SummaryCard 
          icon={<CircleDollarSign className="h-4 w-4 text-accent" />}
          title="Total Balance"
          value={currencyFormatter.format(data.totalBalance)}
        />
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <ShoppingCart className="h-6 w-6" />
            <CardTitle>Transactions</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Merchant</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.transactions.length > 0 ? data.transactions.map((tx, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{formatDate(tx.date)}</TableCell>
                  <TableCell>{tx.merchant}</TableCell>
                  <TableCell className="text-right font-mono">{currencyFormatter.format(tx.amount)}</TableCell>
                </TableRow>
              )) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center text-muted-foreground">No transactions found for this period.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
