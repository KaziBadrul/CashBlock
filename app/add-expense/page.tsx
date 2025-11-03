"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function AddExpensePage() {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const expenseCategories = [
    "Groceries",
    "Transportation",
    "Housing",
    "Utilities",
    "Healthcare",
    "Education",
    "Entertainment",
    "Restaurants",
    "Shopping",
    "Travel",
    "Debt",
    "Savings",
    "Insurance",
    "Subscriptions",
    "Personal Care",
    "Gifts",
    "Unexpected",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        category,
        amount: parseFloat(amount),
        description,
        type: "expense",
      }),
    });

    setLoading(false);
    if (res.ok) {
      alert("Expense added successfully!");
      router.push("/");
    } else {
      alert("Error adding expense");
    }
  };

  return (
    <div className="flex z-50 items-center justify-center min-h-screen bg-red-300 border-8 border-black font-mono relative">
      {/* 🔙 Back Button */}
      <div className="absolute top-6 left-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 px-4 py-2 bg-black text-white border-4 border-black text-lg font-bold uppercase hover:bg-white hover:text-black transition-all"
        >
          <ArrowLeft className="w-5 h-5" /> Back
        </button>
      </div>

      {/* 🧱 Main Brutalist Card */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 p-6 bg-white border-8 border-black shadow-[8px_8px_0px_0px_black] w-96"
      >
        <h1 className="text-3xl font-extrabold text-center uppercase border-b-4 border-black pb-2">
          Add Expense
        </h1>

        <select
          className="p-3 border-4 border-black bg-red-100 text-lg font-semibold focus:outline-none focus:bg-red-50"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="" disabled>
            Select Category
          </option>
          {expenseCategories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <input
          className="p-3 border-4 border-black bg-red-100 text-lg font-semibold focus:outline-none focus:bg-red-50"
          placeholder="Amount"
          type="number"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        <textarea
          className="p-3 border-4 border-black bg-red-100 text-lg font-semibold focus:outline-none focus:bg-red-50"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="p-3 text-xl font-bold uppercase bg-black text-white border-4 border-black hover:bg-white hover:text-black transition-all disabled:opacity-60"
        >
          {loading ? "Adding..." : "Add Expense"}
        </button>
      </form>
    </div>
  );
}
