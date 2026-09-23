export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  user_id: string;
  type: TransactionType;
  amount: number;
  description: string;
  date: string;
  created_at: string;
}

export type TransactionInput = Omit<Transaction, 'id' | 'user_id' | 'created_at'>;