import React from 'react';
import { BudgetSummaryProps } from '@/types/monitoring';
import BudgetProgress from './BudgetProgress';

export default function BudgetSummary({ summary, loading, error }: BudgetSummaryProps) {
  if (loading) {
    return (
      <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="h-8 bg-gray-200 rounded w-full mb-2"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
        Terjadi kesalahan: {error}
      </div>
    );
  }

  if (!summary || summary.totalBudget === 0) {
    return (
      <div className="p-6 bg-blue-50 border border-blue-100 text-blue-800 rounded-xl">
        <h3 className="font-semibold text-sm">Belum Ada Anggaran</h3>
        <p className="text-xs mt-1 text-blue-600">Anda belum menetapkan anggaran untuk bulan ini. Silakan buat anggaran terlebih dahulu.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {summary.status === 'danger' && (
        <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-xl text-sm shadow-sm">
          <span className="font-bold">Peringatan Kritis!</span> Anggaran bulanan Anda telah mencapai {summary.percentageUsed}%. Harap batasi pengeluaran Anda.
        </div>
      )}

      {summary.status === 'warning' && (
        <div className="p-4 bg-yellow-50 border-l-4 border-yellow-500 text-yellow-800 rounded-r-xl text-sm shadow-sm">
          <span className="font-bold">Perhatian:</span> Penggunaan anggaran Anda sudah melewati 75%. Kelola keuangan dengan bijak.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <span className="text-xs text-gray-500 block">Total Anggaran</span>
          <span className="text-lg font-bold text-gray-800">Rp {summary.totalBudget.toLocaleString('id-ID')}</span>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <span className="text-xs text-gray-500 block">Sisa Anggaran</span>
          <span className={`text-lg font-bold ${summary.remainingBudget < 0 ? 'text-red-600' : 'text-green-600'}`}>
            Rp {summary.remainingBudget.toLocaleString('id-ID')}
          </span>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <span className="text-xs text-gray-500 block">Bulan Periode</span>
          <span className="text-lg font-bold text-gray-800">{summary.month}</span>
        </div>
      </div>

      <BudgetProgress 
        totalBudget={summary.totalBudget}
        totalSpent={summary.totalSpent}
        percentageUsed={summary.percentageUsed}
        status={summary.status}
      />
    </div>
  );
}