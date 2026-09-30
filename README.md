# DUITku

DUITku adalah aplikasi web Expense Tracker yang memungkinkan mahasiswa mengelola keuangan pribadinya secara sederhana. Pengguna dapat membuat akun dan masuk ke dalam aplikasi untuk mencatat pemasukan dan pengeluaran, melihat riwayat transaksi, serta mengetahui kondisi keuangannya melalui informasi saldo, total pemasukan, dan total pengeluaran. Setiap transaksi terhubung dengan pengguna yang sedang login sehingga masing-masing pengguna hanya dapat mengakses dan mengelola data miliknya sendiri. Aplikasi juga mempertahankan informasi login selama session masih berlaku dan menggunakan cookies untuk menyimpan preferensi pengguna. Melalui dashboard, pengguna dapat menambahkan, mengubah, menghapus, dan melihat transaksi keuangannya.

Selain itu, aplikasi kini dilengkapi dengan fitur Filter Transaksi Interaktif berbasis AJAX untuk memfilter riwayat transaksi per bulan secara cepat tanpa reload halaman, serta Manajemen & Monitoring Budget Bulanan yang memungkinkan pengguna menetapkan limit anggaran pengeluaran dan memantau persentase penggunaannya secara real-time.

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

Fitur Tambahan

- Filter Transaksi Interaktif (AJAX)
- Pengelolaan Anggaran Bulanan
- Monitoring & Indikator Visual Anggaran
  
## Software Requirements Specification (SRS)

### Marchella
- **SRS-01**    : Pengguna dapat membuat akun.
- **SRS-02**    : Pengguna dapat login ke aplikasi.
- **SRS-03**    : Session login tetap aktif selama masih berlaku.
- **SRS-04**    : Preferensi pengguna disimpan menggunakan cookies.
- **SRS-FT-03** : Pengguna dapat memantau penggunaan dan indikator visual anggaran bulanan.

### Argifari
- **SRS-05**    : Pengguna dapat menambahkan transaksi.
- **SRS-06**    : Pengguna dapat mengubah transaksi.
- **SRS-07**    : Pengguna dapat menghapus transaksi.
- **SRS-08**    : Transaksi hanya dapat diakses oleh pemiliknya.
- **SRS-FT-01** : Pengguna dapat memfilter transaksi interaktif berbasis bulan (AJAX).

### Kayla
- **SRS-09**    : Pengguna dapat melihat riwayat transaksi.
- **SRS-10**    : Pengguna dapat melihat saldo saat ini.
- **SRS-11**    : Pengguna dapat melihat total pemasukan dan pengeluaran.

### Dian
- **SRS-FT-02** : Pengguna dapat mengelola anggaran bulanan (CRUD Budget).

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
├── budget/
│   └── page.tsx                  
├── transactions/
│   └── page.tsx
└── page.tsx                      

components/
├── budget/
│   ├── BudgetForm.tsx            
│   ├── BudgetProgress.tsx        
│   └── BudgetSummary.tsx         
├── transactions/
│   └── TransactionFilter.tsx     
├── CurrentBalance.tsx
├── IncomeExpenseSummary.tsx
├── TransactionHistory.tsx
├── logout-button.tsx
└── theme-toggle.tsx

lib/
├── budget-actions.ts            
├── filter-actions.ts             
├── monitoring-actions.ts         
└── transactions.ts

types/
├── budget.ts                    
├── filter.ts                    
├── monitoring.ts                 
└── transaction.ts

utils/
└── supabase/
    └── client.ts                 

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

Fitur utama (Autentikasi & CRUD Transaksi dasar) telah selesai dikerjakan. Pengembangan saat ini berfokus pada fitur tambahan:
- **Filter Transaksi Interaktif (AJAX):** Filter transaksi per bulan (`SRS-FT-01`).
- **Manajemen Budget Bulanan:** Pengelolaan limit anggaran bulanan pengguna (`SRS-FT-02`).
- **Monitoring Budget:** Indikator progress penggunaan anggaran real-time (`SRS-FT-03`).
