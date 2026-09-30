export interface BudgetSummaryData {
  month: string;
  totalBudget: number;
  totalSpent: number;
  remainingBudget: number;
  percentageUsed: number;
  status: 'safe' | 'warning' | 'danger';
}

export interface BudgetProgressProps {
  totalBudget: number;
  totalSpent: number;
  percentageUsed: number;
  status: 'safe' | 'warning' | 'danger';
}

export interface BudgetSummaryProps {
  summary: BudgetSummaryData | null;
  loading?: boolean;
  error?: string | null;
}