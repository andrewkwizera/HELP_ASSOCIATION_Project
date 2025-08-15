"use client";
import { useState } from "react";
import Layout from "../components/Layout";
import api from "../utils/axios";
import Papa from "papaparse";

export default function Deposit() {
  const [accountId, setAccountId] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [accountName, setAccountName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.get(`/account/${accountId}`);
      const account = res.data.data;
      setAccountName(`${account.firstName} ${account.lastName}`);
      setShowConfirm(true);
    } catch (err) {
      setMessage("❌ Failed to fetch account details");
    }
  };

  const handleConfirmDeposit = async () => {
    setShowConfirm(false);
    setMessage("");

    try {
      const res = await api.post(`/deposit/${accountId}`, { amount: Number(amount) });
      const updated = res.data.data;
      setMessage(`✅ Deposit of ${amount} to ${updated.firstName} ${updated.lastName} was successful. New balance: ${updated.balance}`);
      setAmount("");
      setAccountId("");
    } catch (err) {
      setMessage(`❌ ${err.response?.data?.message || "Deposit failed"}`);
    }
  };

  const handleCSVUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        try {
          const res = await api.post("/bulk-deposit", { deposits: results.data });
          setMessage(`✅ ${res.data.successCount} deposits processed successfully.`);
        } catch (err) {
          setMessage("❌ Failed to process bulk deposits");
        }
      },
      error: () => {
        setMessage("❌ Failed to read the CSV file");
      },
    });
  };

  return (
    <Layout>
      <div className="p-6 max-w-md mx-auto">
        <h1 className="text-xl font-bold mb-4">💰 Deposit to Account</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Account Number"
            value={accountId}
            onChange={(e) => setAccountId(e.target.value)}
            className="border p-2 w-full rounded"
            required
          />
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border p-2 w-full rounded"
            required
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:opacity-90"
          >
            Deposit
          </button>
        </form>

        <div className="mt-6">
          <label className="block mb-2 font-medium">📄 Upload CSV for Bulk Deposit</label>
          <input
            type="file"
            accept=".csv"
            onChange={handleCSVUpload}
            className="block w-full text-sm text-gray-700"
          />
        </div>

        {message && <p className="mt-4 text-sm">{message}</p>}

        {showConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96">
              <h2 className="text-lg font-semibold mb-4">Confirm Deposit</h2>
              <p className="mb-6">
                You are going to deposit <strong>{amount}</strong> to account <strong>{accountName}</strong> (ID: <strong>{accountId}</strong>).
              </p>
              <div className="flex justify-end gap-4">
                <button
                  className="bg-gray-300 text-black px-4 py-2 rounded"
                  onClick={() => setShowConfirm(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-green-600 text-white px-4 py-2 rounded"
                  onClick={handleConfirmDeposit}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
