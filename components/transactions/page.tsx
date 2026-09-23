import { getTransactions } from '@/app/transactions/actions';
import TransactionForm from '@/components/transactions/transaction-form';

function TransactionItem({ item }: { item: { id: string | number; [key: string]: unknown } }) {
  return (
    <div style={{ padding: '12px 0', borderBottom: '1px solid #ddd' }}>
      {Object.entries(item).map(([key, value]) => (
        <div key={key}>
          <strong>{key}:</strong> {String(value)}
        </div>
      ))}
    </div>
  );
}

export default async function TransactionsPage() {
  let transactions = [];
  let errorMsg = null;

  try {
    transactions = await getTransactions();
  } catch (err: unknown) {
    errorMsg = err instanceof Error ? err.message : String(err);
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