'use client';

import { useState } from 'react';
import { Budget, BudgetInput } from '@/types/budget';
import { createBudget, updateBudget } from '@/lib/budget-actions';

interface BudgetFormProps {
  initialData?: Budget | null;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function BudgetForm({
  initialData,
  onSuccess,
  onCancel,
}: BudgetFormProps) {
  const currentDate = new Date();

  const [month, setMonth] = useState(
    initialData?.month ?? currentDate.getMonth() + 1
  );

  const [year, setYear] = useState(
    initialData?.year ?? currentDate.getFullYear()
  );

  const [amount, setAmount] = useState(
    initialData?.amount?.toString() ?? ''
  );

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setErrorMsg(null);

    const payload: BudgetInput = {
      month,
      year,
      amount: Number(amount),
    };

    try {
      if (initialData) {
        await updateBudget(initialData.id, payload);
      } else {
        await createBudget(payload);
        setAmount('');
      }

      onSuccess?.();
    } catch (error) {
      setErrorMsg(
        error instanceof Error
          ? error.message
          : 'Terjadi kesalahan.'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 rounded-lg border p-4"
    >
      <h2 className="text-lg font-semibold">
        {initialData ? 'Edit Anggaran' : 'Tambah Anggaran'}
      </h2>

      {errorMsg && (
        <p className="text-sm text-red-600">{errorMsg}</p>
      )}

      <div>
        <label className="mb-1 block">Bulan</label>

        <select
          value={month}
          onChange={(e) => setMonth(Number(e.target.value))}
          className="w-full rounded border p-2"
        >
          {Array.from({ length: 12 }, (_, index) => (
            <option key={index + 1} value={index + 1}>
              {new Date(2000, index).toLocaleString('id-ID', {
                month: 'long',
              })}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-1 block">Tahun</label>

        <input
          type="number"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className="w-full rounded border p-2"
          required
        />
      </div>

      <div>
        <label className="mb-1 block">Batas Anggaran</label>

        <input
          type="number"
          min="0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Contoh: 1500000"
          className="w-full rounded border p-2"
          required
        />
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={loading}
          className="rounded bg-blue-600 px-4 py-2 text-white"
        >
          {loading
            ? 'Menyimpan...'
            : initialData
              ? 'Simpan Perubahan'
              : 'Tambah Anggaran'}
        </button>

        {initialData && onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded border px-4 py-2"
          >
            Batal
          </button>
        )}
      </div>
    </form>
  );
}