import { supabase } from '@/utils/supabase/client';
import { BudgetInput } from '@/types/budget';

async function getAuthenticatedUser() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    throw new Error('Anda harus login terlebih dahulu.');
  }

  return user;
}

export async function getBudgets() {
  await getAuthenticatedUser();

  const { data, error } = await supabase
    .from('budgets')
    .select('*')
    .order('year', { ascending: false })
    .order('month', { ascending: false });

  if (error) {
    console.error(error.message);
    throw new Error('Gagal mengambil data anggaran.');
  }

  return data;
}

export async function createBudget(input: BudgetInput) {
  const user = await getAuthenticatedUser();

  const { data, error } = await supabase
    .from('budgets')
    .insert([
      {
        user_id: user.id,
        month: input.month,
        year: input.year,
        amount: input.amount,
      },
    ])
    .select()
    .single();

  if (error) {
    if (error.code === '23505') {
      throw new Error('Anggaran untuk bulan tersebut sudah ada.');
    }

    throw new Error('Gagal menambahkan anggaran.');
  }

  return data;
}

export async function updateBudget(
  id: string,
  input: BudgetInput
) {
  await getAuthenticatedUser();

  const { data, error } = await supabase
    .from('budgets')
    .update({
      month: input.month,
      year: input.year,
      amount: input.amount,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    if (error.code === '23505') {
      throw new Error('Anggaran untuk bulan tersebut sudah ada.');
    }

    throw new Error('Gagal memperbarui anggaran.');
  }

  return data;
}

export async function deleteBudget(id: string) {
  await getAuthenticatedUser();

  const { error } = await supabase
    .from('budgets')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error('Gagal menghapus anggaran.');
  }
}