import { BudgetSummaryData } from '@/types/monitoring';
import { createClient } from '@/utils/supabase/client';

export async function fetchBudgetMonitoringData(monthYear: string): Promise<{ summary: BudgetSummaryData | null; error: string | null }> {
  try {
    const supabase = createClient();

    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      return { summary: null, error: 'Unauthorized: Sesi pengguna tidak ditemukan.' };
    }

    const [yearStr, monthStr] = monthYear.split('-');
    const yearNum = parseInt(yearStr, 10);
    const monthNum = parseInt(monthStr, 10);

    const { data: budgetData, error: budgetError } = await supabase
      .from('budgets')
      .select('amount')
      .eq('user_id', user.id)
      .eq('month', monthNum)
      .eq('year', yearNum)
      .maybeSingle();

    if (budgetError) {
      throw new Error(budgetError.message);
    }

    const totalBudget = budgetData ? Number(budgetData.amount) : 0;

    const startDate = `${yearStr}-${monthStr.padStart(2, '0')}-01`;
    const lastDay = new Date(yearNum, monthNum, 0).getDate();
    const endDate = `${yearStr}-${monthStr.padStart(2, '0')}-${String(lastDay).padStart(2, '0')}`;

    const { data: transactionsData, error: txError } = await supabase
      .from('transactions')
      .select('amount')
      .eq('user_id', user.id)
      .eq('type', 'expense')
      .gte('date', startDate)
      .lte('date', endDate);

    if (txError) {
      throw new Error(txError.message);
    }

    const totalSpent = transactionsData 
      ? transactionsData.reduce((acc: number, curr: { amount: number }) => acc + Number(curr.amount), 0) 
      : 0;

    const remainingBudget = totalBudget - totalSpent;
    const percentageUsed = totalBudget > 0 ? Number(((totalSpent / totalBudget) * 100).toFixed(1)) : 0;

    let status: 'safe' | 'warning' | 'danger' = 'safe';
    if (percentageUsed >= 90) {
      status = 'danger';
    } else if (percentageUsed >= 75) {
      status = 'warning';
    }

    const summary: BudgetSummaryData = {
      month: monthYear,
      totalBudget,
      totalSpent,
      remainingBudget,
      percentageUsed,
      status,
    };

    return { summary, error: null };
  } catch (err: any) {
    return { summary: null, error: err.message || 'Gagal memuat data monitoring anggaran.' };
  }
}