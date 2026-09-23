# DUITku

DUITku adalah aplikasi expense tracker sederhana untuk membantu mahasiswa mencatat dan memantau pemasukan serta pengeluaran.

Project ini dibuat untuk praktikum PPK Pertemuan 4 dengan pendekatan pengembangan berbasis branch menggunakan Git dan GitHub.

## Fitur

Fitur yang saat ini sudah tersedia di repository:

- Register
- Login
- Logout
- Session pengguna
- Dark mode & light mode menggunakan cookies
- Tambah transaksi
- Edit transaksi
- Hapus transaksi
- Riwayat transaksi
- Current balance
- Ringkasan pemasukan dan pengeluaran

> Beberapa komponen dashboard masih dapat dikembangkan lebih lanjut agar seluruh fitur tampil dalam satu halaman utama yang terintegrasi.

## Tech Stack

- Next.js
- TypeScript
- React
- Tailwind CSS
- Supabase
- Git & GitHub

## Struktur Supabase

Seluruh fitur menggunakan satu Supabase client yang berada di:

```text
utils/supabase/client.ts
```

Konfigurasi menggunakan environment variable:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
```

File `.env.local` tidak boleh di-commit ke repository.

## Menjalankan Project

### 1. Clone repository

```bash
git clone https://github.com/dianberlianhutasoit/ppk-pertemuan-4.git
```

### 2. Masuk ke folder project

```bash
cd ppk-pertemuan-4
```

### 3. Install dependencies

```bash
npm install
```

### 4. Buat file `.env.local`

Isi dengan konfigurasi Supabase:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
```

### 5. Jalankan development server

```bash
npm run dev
```

Buka aplikasi melalui:

```text
http://localhost:3000
```

## Route Utama

```text
/                Home
/auth/register   Register
/auth/login      Login
/transactions    Kelola transaksi
```

## Struktur Project

```text
app/
├── auth/
│   ├── login/
│   └── register/
├── transactions/
└── page.tsx

components/
├── transactions/
├── CurrentBalance.tsx
├── IncomeExpenseSummary.tsx
├── TransactionHistory.tsx
├── logout-button.tsx
└── theme-toggle.tsx

lib/
└── transactions.ts

types/
└── transaction.ts

utils/
└── supabase/
    └── client.ts
```

## Workflow Pengembangan

Setiap fitur dikembangkan pada branch terpisah, kemudian direview sebelum digabungkan ke `main`.

Contoh branch yang digunakan:

```text
feature/register
feature/login
feature/logout
feature/add-transactions
feature/current-balance
feature/income-expense-summary
feature/transaction-history
```

Sebelum proses merge, struktur dan penggunaan Supabase disamakan agar integrasi antarbranch tetap konsisten.

## Status

Project sudah memiliki fitur utama autentikasi dan pengelolaan transaksi. Integrasi serta penyempurnaan tampilan dashboard masih dapat dikembangkan lebih lanjut.
