import React from 'react';

interface CurrentBalanceProps {
  balance: number;
}

export default function CurrentBalance({ balance }: CurrentBalanceProps) {
  const formattedAmount = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(balance);

  return (
    <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
      <p className="text-sm font-medium text-gray-500 mb-1">Saldo Saat Ini</p>
      <h3 className="text-2xl font-bold text-blue-600">{formattedAmount}</h3>
    </div>
  );
}