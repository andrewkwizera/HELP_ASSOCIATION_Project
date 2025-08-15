import Link from 'next/link';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 font-sans">
      <nav className="bg-gray-800 text-white p-4 shadow-md">
        <div className="max-w-6xl mx-auto flex gap-6 items-center">
          <Link href="/" className="hover:text-yellow-300 font-semibold flex items-center gap-1">🏠 Home</Link>
          <Link href="/account" className="hover:text-yellow-300 font-semibold flex items-center gap-1">🆕 Create Account</Link>
          <Link href="/deposit" className="hover:text-yellow-300 font-semibold flex items-center gap-1">💰 Deposit</Link>
          <Link href="/withdraw" className="hover:text-yellow-300 font-semibold flex items-center gap-1">🏧 Withdraw</Link>
          <Link href="/loans" className="hover:text-yellow-300 font-semibold flex items-center gap-1">💳 Loans</Link>
        </div>
      </nav>
      <main className="max-w-4xl mx-auto p-6 mt-6 bg-white rounded shadow">
        {children}
      </main>
    </div>
  );
}