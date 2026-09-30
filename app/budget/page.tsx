'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';
import { Budget } from '@/types/budget';
import {
  deleteBudget,
  getBudgets,
} from '@/lib/budget-actions';
import BudgetForm from '@/components/budget/BudgetForm';

// Import komponen & action monitoring milik Marchel
import BudgetProgress from '@/components/budget/BudgetProgress';
import BudgetSummary from '@/components/budget/BudgetSummary';
import { fetchBudgetMonitoringData } from '@/lib/monitoring-actions';
import { BudgetSummaryData } from '@/types/monitoring';

export default function BudgetPage() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [editingBudget, setEditingBudget] = useState<Budget | null>(null);

  // State untuk menyimpan data monitoring Marchel
  const [monitoringSummary, setMonitoringSummary] = useState<BudgetSummaryData | null>(null);

  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // 1. Cek sesi login user
  useEffect(() => {
    async function checkUserSession() {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setCheckingAuth(false);
      } else {
        setUserEmail(user.email ?? 'Pengguna');
        setCheckingAuth(false);
      }
    }

    checkUserSession();
  }, []);

  // 2. Mengambil data budget & monitoring untuk bulan/tahun saat ini
  const fetchBudgetsAndMonitoring = useCallback(async () => {
    try {
      setLoading(true);
      setErrorMsg(null);

      // Format bulan dan tahun saat ini: "YYYY-MM"
      const now = new Date();
      const currentMonthStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

      // Fetch data budget dan monitoring bersamaan
      const [data, monitoringRes] = await Promise.all([
        getBudgets(),
        fetchBudgetMonitoringData(currentMonthStr),
      ]);

      setBudgets(data ?? []);

      if (monitoringRes.summary) {
        setMonitoringSummary(monitoringRes.summary);
      }
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
    if (!checkingAuth && userEmail) {
      fetchBudgetsAndMonitoring();
    }
  }, [checkingAuth, userEmail, fetchBudgetsAndMonitoring]);

  async function handleDelete(id: string) {
    const confirmed = confirm(
      'Yakin ingin menghapus anggaran ini?'
    );

    if (!confirmed) return;

    try {
      await deleteBudget(id);
      await fetchBudgetsAndMonitoring();
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : 'Gagal menghapus anggaran.'
      );
    }
  }

  // Tampilan loading saat mengecek status login
  if (checkingAuth) {
    return <main className="p-8 text-center">Memeriksa autentikasi pengguna...</main>;
  }

  // Tampilan jika pengguna belum login
  if (!userEmail) {
    return (
      <main className="mx-auto max-w-md p-6 my-12 bg-white rounded-lg border shadow-sm text-center space-y-4">
        <h2 className="text-xl font-bold text-gray-800">Akses Dibatasi</h2>
        <p className="text-gray-600">
          Kamu harus login terlebih dahulu untuk mengelola dan memantau anggaran.
        </p>
        <button
          onClick={() => router.push('/login')}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition"
        >
          Ke Halaman Login
        </button>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl p-6 space-y-8">
      {/* Indicator User Login */}
      <div className="flex items-center justify-between bg-blue-50 border border-blue-200 p-4 rounded-lg">
        <div>
          <p className="text-xs text-blue-600 font-medium uppercase tracking-wider">Status Sesi</p>
          <p className="text-sm font-semibold text-blue-900">Terhubung sebagai: {userEmail}</p>
        </div>
        <Link href="/" className="text-sm text-blue-600 hover:underline font-medium">
          ← Kembali ke Beranda
        </Link>
      </div>

      <h1 className="text-2xl font-bold">
        Pengelolaan Anggaran Bulanan
      </h1>

      {/* Form Manajemen Anggaran (Milik Dian) */}
      <BudgetForm
        initialData={editingBudget}
        onSuccess={() => {
          setEditingBudget(null);
          fetchBudgetsAndMonitoring();
        }}
        onCancel={() => setEditingBudget(null)}
      />

      {/* Ringkasan & Progress Monitoring Budget (Milik Marchel) */}
      {monitoringSummary && (
        <section className="rounded-lg border p-4 bg-gray-50 space-y-4">
          <h2 className="text-xl font-semibold">
            Ringkasan & Monitoring Budget
          </h2>
          
          {/* Kirim prop summary ke BudgetSummary */}
          <BudgetSummary summary={monitoringSummary} />

          {/* Kirim props ke BudgetProgress */}
          <BudgetProgress
            totalBudget={monitoringSummary.totalBudget}
            totalSpent={monitoringSummary.totalSpent}
            percentageUsed={monitoringSummary.percentageUsed}
            status={monitoringSummary.status}
          />
        </section>
      )}

      {/* Daftar Anggaran */}
      <section>
        <h2 className="mb-4 text-xl font-semibold">
          Daftar Anggaran
        </h2>

        {errorMsg && (
          <p className="text-red-600 mb-4">{errorMsg}</p>
        )}

        {loading ? (
          <p>Memuat anggaran...</p>
        ) : budgets.length === 0 ? (
          <p>Belum ada anggaran.</p>
        ) : (
          <div className="space-y-4">
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
                  className="rounded-lg border p-4 flex items-center justify-between bg-white"
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
                      className="rounded border px-3 py-1 hover:bg-gray-50"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(budget.id)}
                      className="rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700 transition"
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