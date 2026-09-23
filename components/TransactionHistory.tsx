import React from 'react';

export interface Transaction {
  id: string;
  user_id: string;
  type: 'income' | 'expense';
  amount: number;
  description: string;
  date: string;
  created_at: string;
}

interface TransactionHistoryProps {
  transactions: Transaction[];
}

export default function TransactionHistory({ transactions }: TransactionHistoryProps) {
  if (!transactions || transactions.length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl border border-gray-100 text-center text-gray-500">
        Belum ada riwayat transaksi.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-5 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800">Riwayat Transaksi</h2>
      </div>
      <div className="divide-y divide-gray-100">
        {transactions.map((tx) => {
          const isIncome = tx.type === 'income';
          const formattedDate = new Date(tx.date).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          });
          const formattedAmount = new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
          }).format(tx.amount);

          return (
            <div key={tx.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div>
                <p className="font-medium text-gray-800">{tx.description}</p>
                <p className="text-xs text-gray-400 mt-0.5">{formattedDate}</p>
              </div>
              <span className={`font-semibold text-sm ${isIncome ? 'text-green-600' : 'text-red-600'}`}>
                {isIncome ? `+ ${formattedAmount}` : `- ${formattedAmount}`}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}