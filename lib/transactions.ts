import { supabase } from '@/utils/supabase/client';
import { TransactionInput } from '@/types/transaction';

/**
 * Helper internal untuk memastikan user sudah login
 */
async function getAuthenticatedUser() {
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    throw new Error('Akses ditolak: Anda harus login terlebih dahulu.');
  }

  return user;
}

// 1. READ: Mengambil riwayat transaksi user
export async function getTransactions() {
  await getAuthenticatedUser();

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

// 2. CREATE: Menambahkan transaksi baru
export async function createTransaction(input: TransactionInput) {
  const user = await getAuthenticatedUser();

  if (!input.amount || input.amount <= 0) {
    throw new Error('Jumlah transaksi harus lebih dari 0.');
  }

  const { data, error } = await supabase.from('transactions').insert([
    {
      user_id: user.id, // ID diambil langsung dari Supabase Auth
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

  return data;
}

// 3. UPDATE: Mengubah transaksi berdasarkan ID
export async function updateTransaction(id: string, input: TransactionInput) {
  await getAuthenticatedUser();

  if (!input.amount || input.amount <= 0) {
    throw new Error('Jumlah transaksi harus lebih dari 0.');
  }

  const { data, error } = await supabase
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

  return data;
}

// 4. DELETE: Menghapus transaksi berdasarkan ID
export async function deleteTransaction(id: string) {
  await getAuthenticatedUser();

  const { data, error } = await supabase
    .from('transactions')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting transaction:', error.message);
    throw new Error('Gagal menghapus transaksi.');
  }

  return data;
}