export interface TransactionFilterParams {
    month: number;
    year: number;
  }
  
  export interface Transaction {
    id: string;
    user_id: string;
    title: string;
    amount: number;
    type: 'income' | 'expense';
    category: string;
    date: string;
    created_at?: string;
  }