"use client";
import { useState } from "react";
import Layout from "../components/Layout";
import api from "../utils/axios";
import Papa from "papaparse";

export default function LoanPage() {
  const [accountNumber, setAccountNumber] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [message, setMessage] = useState("");
  const [mode, setMode] = useState("request"); // or "pay"

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const url = mode === "request" ? "/loan/" : "/payloan";
      const res = await api.post(url, {
        accountNumber,
        loanAmount: Number(loanAmount),
      });

      if (mode === "request") {
        setMessage(
          `✅ Loan of ${loanAmount} requested successfully. Installment: ${res.data.data.installmentAmount}`
        );
      } else {
        setMessage(`✅ Loan payment of ${loanAmount} successful.`);
      }

      setAccountNumber("");
      setLoanAmount("");
    } catch (err) {
      setMessage(
        `❌ ${err.response?.data?.message || "Failed to process loan request/payment"}`
      );
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
          const res = await api.post("/bulk-loan-payments", { payments: results.data });
          setMessage(`✅ ${res.data.successCount} loan payments processed successfully.`);
        } catch (err) {
          setMessage("❌ Failed to process bulk loan payments");
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
        <h1 className="text-xl font-bold mb-4">
          {mode === "request" ? "Request Loan" : "Pay Loan"}
        </h1>

        <div className="mb-4 space-x-4">
          <button
            className={`px-4 py-2 rounded ${
              mode === "request" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => setMode("request")}
          >
            Request Loan
          </button>
          <button
            className={`px-4 py-2 rounded ${
              mode === "pay" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => setMode("pay")}
          >
            Pay Loan
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Account Number"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            className="border p-2 w-full rounded"
            required
          />
          <input
            type="number"
            placeholder="Loan Amount"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            className="border p-2 w-full rounded"
            required
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:opacity-90"
          >
            {mode === "request" ? "Submit Request" : "Submit Payment"}
          </button>
        </form>

        {mode === "pay" && (
          <div className="mt-6">
            <label className="block mb-2 font-medium">📄 Upload CSV for Bulk Loan Payments</label>
            <input
              type="file"
              accept=".csv"
              onChange={handleCSVUpload}
              className="block w-full text-sm text-gray-700"
            />
          </div>
        )}

        {message && <p className="mt-4 text-sm">{message}</p>}
      </div>
    </Layout>
  );
}
