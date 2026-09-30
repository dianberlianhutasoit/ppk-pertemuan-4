export interface Budget {
  id: string;
  user_id: string;
  month: number;
  year: number;
  amount: number;
  created_at: string;
  updated_at: string;
}

export interface BudgetInput {
  month: number;
  year: number;
  amount: number;
}