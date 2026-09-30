'use client';

import { useState, useEffect } from 'react';
import { Transaction, TransactionFilterParams } from '@/types/filter';
import { fetchTransactionsByMonth } from '@/lib/filter-actions';

interface TransactionFilterProps {
  onFilteredData: (transactions: Transaction[]) => void;
  initialMonth?: number;
  initialYear?: number;
}

export default function TransactionFilter({
  onFilteredData,
  initialMonth = new Date().getMonth() + 1,
  initialYear = new Date().getFullYear(),
}: TransactionFilterProps) {
  const [filterParams, setFilterParams] = useState<TransactionFilterParams>({
    month: initialMonth,
    year: initialYear,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const months = [
    { value: 1, label: 'Januari' },
    { value: 2, label: 'Februari' },
    { value: 3, label: 'Maret' },
    { value: 4, label: 'April' },
    { value: 5, label: 'Mei' },
    { value: 6, label: 'Juni' },
    { value: 7, label: 'Juli' },
    { value: 8, label: 'Agustus' },
    { value: 9, label: 'September' },
    { value: 10, label: 'Oktober' },
    { value: 11, label: 'November' },
    { value: 12, label: 'Desember' },
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

  const handleFetch = async (params: TransactionFilterParams) => {
    setLoading(true);
    setErrorMsg(null);

    const { data, error } = await fetchTransactionsByMonth(params);

    if (error) {
      setErrorMsg('Gagal mengambil data transaksi.');
    } else if (data) {
      onFilteredData(data);
    }

    setLoading(false);
  };

  useEffect(() => {
    handleFetch(filterParams);
  }, [filterParams.month, filterParams.year]);

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-semibold text-slate-800">Filter Transaksi</h3>
          <p className="text-xs text-slate-500">Pilih bulan dan tahun transaksi</p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={filterParams.month}
            onChange={(e) =>
              setFilterParams((prev) => ({ ...prev, month: Number(e.target.value) }))
            }
            className="px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {months.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>

          <select
            value={filterParams.year}
            onChange={(e) =>
              setFilterParams((prev) => ({ ...prev, year: Number(e.target.value) }))
            }
            className="px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading && (
        <p className="text-xs text-blue-600 mt-2 animate-pulse">Memuat data transaksi...</p>
      )}

      {errorMsg && (
        <p className="text-xs text-red-500 mt-2">{errorMsg}</p>
      )}
    </div>
  );
}