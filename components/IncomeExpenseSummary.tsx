import React from 'react';

interface SummaryProps {
  totalIncome: number;
  totalExpense: number;
}

export default function IncomeExpenseSummary({ totalIncome, totalExpense }: SummaryProps) {
  const formatRupiah = (amount: number) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
        <p className="text-sm font-medium text-gray-500 mb-1">Total Pemasukan</p>
        <h3 className="text-2xl font-bold text-green-600">{formatRupiah(totalIncome)}</h3>
      </div>
      <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
        <p className="text-sm font-medium text-gray-500 mb-1">Total Pengeluaran</p>
        <h3 className="text-2xl font-bold text-red-600">{formatRupiah(totalExpense)}</h3>
      </div>
    </div>
  );
}