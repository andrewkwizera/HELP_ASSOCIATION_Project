"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white px-6 py-3 mb-6">
      <ul className="flex gap-4">
        <li>
          <Link href="/">🏠 Home</Link>
        </li>
        <li>
          <Link href="/account">🆕 Create Account</Link>
        </li>
        <li>
          <Link href="/deposit">💰 Deposit</Link>
        </li>
        <li>
          <Link href="/withdraw">🏧 Withdraw</Link>
        </li>
        <li>
          <Link href="/loans">🏧 Loans</Link>
        </li>
      </ul>
    </nav>
  );
}