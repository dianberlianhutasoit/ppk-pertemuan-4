import Link from 'next/link';

export default function HomePage() {
  return (
    <main
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '80vh',
        padding: '24px',
        textAlign: 'center',
        fontFamily: 'sans-serif',
      }}
    >
      <h1 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>
        DUITku 💰
      </h1>

      <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '24px' }}>
        Aplikasi Expense Tracker Mahasiswa
      </p>

      <div
        style={{
          display: 'flex',
          gap: '12px',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        <Link
          href="/auth/login"
          style={{
            padding: '12px 24px',
            backgroundColor: '#2563eb',
            color: 'white',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: '600',
          }}
        >
          Login
        </Link>

        <Link
          href="/auth/register"
          style={{
            padding: '12px 24px',
            border: '1px solid #2563eb',
            color: '#2563eb',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: '600',
          }}
        >
          Daftar
        </Link>

        <Link
          href="/transactions"
          style={{
            padding: '12px 24px',
            backgroundColor: '#111827',
            color: 'white',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: '600',
          }}
        >
          Kelola Transaksi
        </Link>
      </div>

      <p style={{ marginTop: '16px', color: '#777', fontSize: '0.9rem' }}>
        Silakan login terlebih dahulu sebelum mengelola transaksi.
      </p>
    </main>
  );
}
