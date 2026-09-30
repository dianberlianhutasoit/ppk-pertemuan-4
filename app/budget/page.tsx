'use client';

import { useCallback, useEffect, useState } from 'react';
import { Budget } from '@/types/budget';
import {
  deleteBudget,
  getBudgets,
} from '@/lib/budget-actions';
import BudgetForm from '@/components/budget/BudgetForm';

export default function BudgetPage() {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [editingBudget, setEditingBudget] =
    useState<Budget | null>(null);

  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fetchBudgets = useCallback(async () => {
    try {
      setLoading(true);
      setErrorMsg(null);

      const data = await getBudgets();
      setBudgets(data ?? []);
    } catch (error) {
      setErrorMsg(
        error instanceof Error
          ? error.message
          : 'Gagal memuat anggaran.'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBudgets();
  }, [fetchBudgets]);

  async function handleDelete(id: string) {
    const confirmed = confirm(
      'Yakin ingin menghapus anggaran ini?'
    );

    if (!confirmed) return;

    try {
      await deleteBudget(id);
      await fetchBudgets();
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : 'Gagal menghapus anggaran.'
      );
    }
  }

  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="mb-6 text-2xl font-bold">
        Pengelolaan Anggaran Bulanan
      </h1>

      <BudgetForm
        initialData={editingBudget}
        onSuccess={() => {
          setEditingBudget(null);
          fetchBudgets();
        }}
        onCancel={() => setEditingBudget(null)}
      />

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">
          Daftar Anggaran
        </h2>

        {errorMsg && (
          <p className="text-red-600">{errorMsg}</p>
        )}

        {loading ? (
          <p>Memuat anggaran...</p>
        ) : budgets.length === 0 ? (
          <p>Belum ada anggaran.</p>
        ) : (
          <div className="space-y-3">
            {budgets.map((budget) => {
              const monthName = new Date(
                budget.year,
                budget.month - 1
              ).toLocaleString('id-ID', {
                month: 'long',
              });

              const formattedAmount =
                new Intl.NumberFormat('id-ID', {
                  style: 'currency',
                  currency: 'IDR',
                  minimumFractionDigits: 0,
                }).format(budget.amount);

              return (
                <div
                  key={budget.id}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div>
                    <p className="font-semibold">
                      {monthName} {budget.year}
                    </p>

                    <p className="text-gray-600">
                      {formattedAmount}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingBudget(budget)}
                      className="rounded border px-3 py-1"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(budget.id)}
                      className="rounded bg-red-600 px-3 py-1 text-white"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}