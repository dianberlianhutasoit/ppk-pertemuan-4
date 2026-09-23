'use client';

import { useState } from 'react';
import { Transaction, TransactionInput } from '@/types/transaction';
import { createTransaction, updateTransaction } from '../../app/transactions/actions';

interface FormProps {
  initialData?: Transaction | null;
  onSuccess?: () => void;
}

export default function TransactionForm({ initialData, onSuccess }: FormProps) {
  const [type, setType] = useState<'income' | 'expense'>(initialData?.type || 'expense');
  const [amount, setAmount] = useState(initialData?.amount?.toString() || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [date, setDate] = useState(initialData?.date || new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const payload: TransactionInput = {
      type,
      amount: parseFloat(amount),
      description,
      date,
    };

    try {
      if (initialData) {
        await updateTransaction(initialData.id, payload);
      } else {
        await createTransaction(payload);
        setAmount('');
        setDescription('');
      }
      if (onSuccess) onSuccess();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Gagal menyimpan transaksi');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '400px' }}>
      <h3>{initialData ? 'Ubah Transaksi' : 'Tambah Transaksi Baru'}</h3>
      
      <div>
        <label style={{ display: 'block', marginBottom: '4px' }}>Tipe Transaksi:</label>
        <select value={type} onChange={(e) => setType(e.target.value as 'income' | 'expense')} style={{ width: '100%', padding: '8px' }}>
          <option value="expense">Pengeluaran (Expense)</option>
          <option value="income">Pemasukan (Income)</option>
        </select>
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '4px' }}>Jumlah (Rp):</label>
        <input
          type="number"
          step="0.01"
          min="1"
          required
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="contoh: 15000"
          style={{ width: '100%', padding: '8px' }}
        />
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '4px' }}>Keterangan:</label>
        <input
          type="text"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="contoh: Makan Siang"
          style={{ width: '100%', padding: '8px' }}
        />
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '4px' }}>Tanggal:</label>
        <input
          type="date"
          required
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={{ width: '100%', padding: '8px' }}
        />
      </div>

      <button type="submit" disabled={loading} style={{ padding: '10px', cursor: 'pointer' }}>
        {loading ? 'Menyimpan...' : initialData ? 'Perbarui Transaksi' : 'Tambah Transaksi'}
      </button>
    </form>
  );
}