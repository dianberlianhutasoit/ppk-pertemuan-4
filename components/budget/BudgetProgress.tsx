import React from 'react';
import { BudgetProgressProps } from '@/types/monitoring';

export default function BudgetProgress({ totalBudget, totalSpent, percentageUsed, status }: BudgetProgressProps) {
  let progressColor = 'bg-green-500';
  let textColor = 'text-green-600';

  if (status === 'warning') {
    progressColor = 'bg-yellow-500';
    textColor = 'text-yellow-600';
  } else if (status === 'danger') {
    progressColor = 'bg-red-500';
    textColor = 'text-red-600';
  }

  const clampedPercentage = Math.min(percentageUsed, 100);

  return (
    <div className="w-full bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">Progress Penggunaan Anggaran</span>
        <span className={`text-sm font-bold ${textColor}`}>
          {percentageUsed}%
        </span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          className={`h-3 rounded-full transition-all duration-500 ${progressColor}`}
          style={{ width: `${clampedPercentage}%` }}
        />
      </div>

      <div className="flex justify-between items-center mt-3 text-xs text-gray-500">
        <span>Terpakai: Rp {totalSpent.toLocaleString('id-ID')}</span>
        <span>Limit: Rp {totalBudget.toLocaleString('id-ID')}</span>
      </div>
    </div>
  );
}