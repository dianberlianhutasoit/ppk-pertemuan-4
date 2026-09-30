import { createBrowserClient } from '@supabase/ssr';
import { Transaction, TransactionFilterParams } from '@/types/filter';

function getSupabaseBrowserClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export async function fetchTransactionsByMonth(
  params: TransactionFilterParams
): Promise<{ data: Transaction[] | null; error: string | null }> {
  const supabase = getSupabaseBrowserClient();
  const { month, year } = params;

  const startDate = new Date(year, month - 1, 1).toISOString();
  const endDate = new Date(year, month, 0, 23, 59, 59, 999).toISOString();

  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .gte('date', startDate)
    .lte('date', endDate)
    .order('date', { ascending: false });

  if (error) {
    return { data: null, error: error.message };
  }

  return { data: data as Transaction[], error: null };
}