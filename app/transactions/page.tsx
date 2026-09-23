import { getTransactions } from './actions';
import TransactionForm from '@/components/transactions/transaction-form';
import TransactionItem from '@/components/transactions/transaction-item';

export default async function TransactionsPage() {
  let transactions = [];
  let errorMsg = null;

  try {
    transactions = await getTransactions();
  } catch (err: unknown) {
    errorMsg = err instanceof Error ? err.message : 'Terjadi kesalahan.';
  }

  return (
    <div style={{ padding: '24px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Kelola Transaksi (DUITku)</h1>

      <div style={{ marginBottom: '32px' }}>
        <TransactionForm />
      </div>

      <hr style={{ margin: '24px 0' }} />

      <h2>Riwayat Transaksi</h2>
      {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
      
      {transactions.length === 0 ? (
        <p>Belum ada transaksi.</p>
      ) : (
        transactions.map((tx) => (
          <TransactionItem key={tx.id} item={tx} />
        ))
      )}
    </div>
  );
}