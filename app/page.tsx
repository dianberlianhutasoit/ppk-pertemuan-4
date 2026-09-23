import Link from 'next/link';

export default function HomePage() {
  return (
    <main style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '80vh', 
      padding: '24px', 
      textAlign: 'center',
      fontFamily: 'sans-serif'
    }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>
        DUITku 💰
      </h1>
      <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '24px' }}>
        Aplikasi Expense Tracker Mahasiswa
      </p>

      <div style={{ display: 'flex', gap: '12px' }}>
        <Link 
          href="/transactions" 
          style={{
            padding: '12px 24px',
            backgroundColor: '#2563eb',
            color: 'white',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '1rem'
          }}
        >
          Kelola Transaksi
        </Link>
      </div>
    </main>
  );
}