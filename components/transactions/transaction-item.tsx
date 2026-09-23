'use client';

import { useState } from 'react';
import { Transaction } from '@/types/transaction';
import { deleteTransaction } from '@/lib/transactions';
import TransactionForm from './transaction-form';

interface ItemProps {
  item: Transaction;
  onSuccess?: () => void;
}

export default function TransactionItem({ item, onSuccess }: ItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    if (!confirm(`Yakin ingin menghapus transaksi "${item.description}"?`)) return;
    setDeleting(true);
    try {
      await deleteTransaction(item.id);
      if (onSuccess) onSuccess();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Gagal menghapus');
      setDeleting(false);
    }
  }

  if (isEditing) {
    return (
      <div style={{ border: '1px solid #ccc', padding: '12px', marginBottom: '12px', borderRadius: '6px' }}>
        <TransactionForm
          initialData={item}
          onSuccess={() => {
            setIsEditing(false);
            if (onSuccess) onSuccess();
          }}
        />
        <button onClick={() => setIsEditing(false)} style={{ marginTop: '8px', padding: '6px 12px' }}>
          Batal
        </button>
      </div>
    );
  }

  return (
    <div style={{ border: '1px solid #ddd', padding: '12px', marginBottom: '8px', borderRadius: '6px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <strong>{item.description}</strong>
        <span style={{ fontWeight: 'bold', color: item.type === 'income' ? 'green' : 'red' }}>
          {item.type === 'income' ? '+' : '-'} Rp {Number(item.amount).toLocaleString('id-ID')}
        </span>
      </div>
      <div style={{ fontSize: '0.85em', color: '#666', marginTop: '4px' }}>{item.date}</div>
      
      <div style={{ marginTop: '8px', display: 'flex', gap: '8px' }}>
        <button onClick={() => setIsEditing(true)}>Edit</button>
        <button onClick={handleDelete} disabled={deleting}>
          {deleting ? 'Hapus...' : 'Hapus'}
        </button>
      </div>
    </div>
  );
}