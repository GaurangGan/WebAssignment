
import { ai } from '../genkit';
import { z } from 'zod';
import type { StatementData } from '@/lib/types';

// This is a mock implementation of the statement parser flow.
// In a real application, this would use Genkit's features to parse the PDF.
export const statementParserFlow = ai.defineFlow(
  {
    name: 'statementParserFlow',
    inputSchema: z.string(), // base64 encoded PDF
    outputSchema: z.any(),
  },
  async (base64Pdf: string): Promise<StatementData> => {
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simulate a successful parse with mock data
    if (base64Pdf) {
      const providers = [
        'Chase Sapphire Reserve',
        'Amex Gold',
        'Citi Double Cash',
        'Capital One Venture X',
        'Discover It Miles'
      ];
      const randomProvider = providers[Math.floor(Math.random() * providers.length)];

      return {
        cardInfo: {
          variant: randomProvider,
          last4: String(Math.floor(1000 + Math.random() * 9000)),
        },
        billingCycle: {
          startDate: '2023-10-01',
          endDate: '2023-10-31',
        },
        paymentDueDate: '2023-11-25',
        totalBalance: parseFloat((Math.random() * 2000 + 500).toFixed(2)),
        transactions: [
          { date: '2023-10-02', merchant: 'The Daily Grind', amount: 4.50 },
          { date: '2023-10-05', merchant: 'Groceries & More', amount: 75.21 },
          { date: '2023-10-10', merchant: 'Apex Electronics', amount: 129.99 },
          { date: '2023-10-15', merchant: 'The Corner Bistro', amount: 55.40 },
          { date: '2023-10-22', merchant: 'Quick Fuel', amount: 45.33 },
          { date: '2023-10-28', merchant: 'Cinema Plex', amount: 32.00 },
        ],
      };
    } else {
      throw new Error("No PDF data provided.");
    }
  }
);
