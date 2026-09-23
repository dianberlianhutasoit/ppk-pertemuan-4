'use server';

import { createClient } from '@/lib/supabase/server';
import { TransactionInput } from '@/types/transaction';
import { revalidatePath } from 'next/cache';

async function getAuthenticatedUser() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    throw new Error('Akses ditolak: Anda harus login terlebih dahulu.');
  }

  return { supabase, user };
}

export async function getTransactions() {
  const { supabase } = await getAuthenticatedUser();

  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .order('date', { ascending: false })
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching transactions:', error.message);
    throw new Error('Gagal mengambil data transaksi.');
  }

  return data;
}

export async function createTransaction(input: TransactionInput) {
  const { supabase, user } = await getAuthenticatedUser();

  if (!input.amount || input.amount <= 0) {
    throw new Error('Jumlah transaksi harus lebih dari 0.');
  }

  const { error } = await supabase.from('transactions').insert([
    {
      user_id: user.id,
      type: input.type,
      amount: input.amount,
      description: input.description.trim(),
      date: input.date,
    },
  ]);

  if (error) {
    console.error('Error creating transaction:', error.message);
    throw new Error('Gagal menambah transaksi.');
  }

  revalidatePath('/transactions');
}

export async function updateTransaction(id: string, input: TransactionInput) {
  const { supabase } = await getAuthenticatedUser();

  if (!input.amount || input.amount <= 0) {
    throw new Error('Jumlah transaksi harus lebih dari 0.');
  }

  const { error } = await supabase
    .from('transactions')
    .update({
      type: input.type,
      amount: input.amount,
      description: input.description.trim(),
      date: input.date,
    })
    .eq('id', id);

  if (error) {
    console.error('Error updating transaction:', error.message);
    throw new Error('Gagal memperbarui transaksi.');
  }

  revalidatePath('/transactions');
}

export async function deleteTransaction(id: string) {
  const { supabase } = await getAuthenticatedUser();

  const { error } = await supabase
    .from('transactions')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting transaction:', error.message);
    throw new Error('Gagal menghapus transaksi.');
  }

  revalidatePath('/transactions');
}