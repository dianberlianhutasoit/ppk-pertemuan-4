'use client';

import { useCallback, useEffect, useState } from 'react';
import { Transaction } from '@/types/transaction';
import { getTransactions } from '@/lib/transactions';
import TransactionForm from '@/components/transactions/transaction-form';
import TransactionItem from '@/components/transactions/transaction-item';

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fetchTransactions = useCallback(async () => {
    try {
      setLoading(true);
      setErrorMsg(null);
      const data = await getTransactions();
      setTransactions(data || []);
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'Gagal memuat transaksi.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return (
    <div style={{ padding: '24px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Kelola Transaksi (DUITku)</h1>

      <div style={{ marginBottom: '32px' }}>
        <TransactionForm onSuccess={fetchTransactions} />
      </div>

      <hr style={{ margin: '24px 0' }} />

      <h2>Riwayat Transaksi</h2>
      {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}

      {loading ? (
        <p>Memuat data transaksi...</p>
      ) : transactions.length === 0 ? (
        <p>Belum ada transaksi.</p>
      ) : (
        transactions.map((tx) => (
          <TransactionItem key={tx.id} item={tx} onSuccess={fetchTransactions} />
        ))
      )}
    </div>
  );
}
