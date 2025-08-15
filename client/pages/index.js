// pages/index.js
import Layout from "../components/Layout";
import { useState } from "react";
import api from "../utils/axios";

export default function Home() {
  const [accountId, setAccountId] = useState("");
  const [account, setAccount] = useState(null);
  const [message, setMessage] = useState("");

  const handleCheckAccount = async (e) => {
    e.preventDefault();
    setMessage("");
    setAccount(null);

    try {
      const res = await api.get(`/account/${accountId}`);
      setAccount(res.data.data);
    } catch (err) {
      setMessage("❌ Account not found");
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">🔍 Check Account</h1>

      <form onSubmit={handleCheckAccount} className="flex gap-3 mb-6">
        <input
          type="text"
          placeholder="Enter Account ID"
          value={accountId}
          onChange={(e) => setAccountId(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Check Account
        </button>
      </form>

      {message && <p className="text-red-500 text-sm mb-4">{message}</p>}

      {account && (
        <div className="border border-gray-300 rounded p-4 shadow bg-gray-50">
          <h2 className="text-lg font-semibold mb-2">Account Details</h2>
          <p><strong>Name:</strong> {account.firstName} {account.lastName}</p>
          <p><strong>Account Number:</strong> {account.accountNumber}</p>
          <p><strong>Balance:</strong> {account.balance}</p>
          <p><strong>Loan Balance:</strong> {account.loanBalance}</p>
        </div>
      )}
    </Layout>
  );
}
