"use client";
import { useState } from "react";
import Layout from "../components/Layout";
import api from "../utils/axios";

export default function CreateAccount() {
  const [form, setForm] = useState({ firstName: "", lastName: "", accountNumber: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await api.post("/account", form);
      setMessage(`✅ Account created with ID: ${res.data.data._id}`);
      setForm({ firstName: "", lastName: "", accountNumber: "" });
    } catch (err) {
      setMessage("❌ Failed to create account");
    }
  };

  return (
    <Layout>
      <div className="p-6 max-w-md mx-auto">
        <h1 className="text-xl font-bold mb-4">Create New Account</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="border p-2 w-full rounded"
            type="text"
            name="firstName"
            placeholder="First Name"
            value={form.firstName}
            onChange={handleChange}
            required
          />
          <input
            className="border p-2 w-full rounded"
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={form.lastName}
            onChange={handleChange}
            required
          />
          <input
            className="border p-2 w-full rounded"
            type="text"
            name="accountNumber"
            placeholder="Account Number (6 digits)"
            value={form.accountNumber}
            onChange={handleChange}
            required
          />
          <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">
            Create Account
          </button>
        </form>
        {message && <p className="mt-4 text-sm">{message}</p>}
      </div>
    </Layout>
  );
}
