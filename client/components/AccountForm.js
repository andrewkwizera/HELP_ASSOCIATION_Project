"use client";
import { useState } from "react";

export default function AccountForm({ title, onSubmit, actionLabel, color }) {
  const [accountId, setAccountId] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("")
  const [description, setDescription] = useState("")
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    const msg = await onSubmit(accountId, amount,date,description);
    setMessage(msg);
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">{title}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="border p-2 w-full rounded"
          type="text"
          placeholder="Account ID"
          value={accountId}
          onChange={(e) => setAccountId(e.target.value)}
          required
        />
        <input
          className="border p-2 w-full rounded"
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <input
          className="border p-2 w-full rounded"
          type="date"
          placeholder="Transaction Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <input
          className="border p-2 w-full rounded"
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button
          type="submit"
          className={`text-white px-4 py-2 rounded hover:opacity-90 ${color}`}
        >
          {actionLabel}
        </button>
      </form>
      {message && <p className="mt-4 text-sm">{message}</p>}
    </div>
  );
}