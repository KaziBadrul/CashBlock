"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import CustomAlert from "@/components/Alert";

export default function AddIncomePage() {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const alertMessage = "Income added successfully!";
  const router = useRouter();

  const incomeCategories = [
    "Salary",
    "Business",
    "Investments",
    "Gifts",
    "Rental Income",
    "Other Income",
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
        type: "income",
      }),
    });

    setLoading(false);
    if (res.ok) {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        router.push("/");
      }, 2000);
    } else {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    }
  };

  return (
    <div className="z-50 flex flex-col items-center justify-center min-h-screen bg-chart-5 border-8 border-black font-mono relative">
      {/* Header with back button */}
      <div className="absolute top-6 left-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 px-4 py-2 bg-black text-white border-4 border-black text-lg font-bold uppercase hover:bg-white hover:text-black transition-all"
        >
          <ArrowLeft className="w-5 h-5" /> Back
        </button>
      </div>

      {/* Main form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-80 p-6 bg-white border-8 border-black shadow-[8px_8px_0px_0px_black]"
      >
        <h1 className="text-3xl font-extrabold text-center border-b-4 border-black pb-2 uppercase">
          Add Income
        </h1>

        <select
          className="p-3 border-4 border-black text-lg font-semibold bg-yellow-200 focus:outline-none focus:bg-yellow-100"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="" disabled>
            Select Category
          </option>
          {incomeCategories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <input
          className="p-3 border-4 border-black text-lg font-semibold bg-yellow-200 focus:outline-none focus:bg-yellow-100"
          placeholder="Amount"
          type="number"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        <textarea
          className="p-3 border-4 border-black text-lg font-semibold bg-yellow-200 focus:outline-none focus:bg-yellow-100"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="mt-2 bg-black text-white border-4 border-black py-3 font-bold text-xl uppercase hover:bg-white hover:text-black transition-all disabled:opacity-60"
        >
          {loading ? "Adding..." : "Add Income"}
        </button>
      </form>
      {showAlert && <CustomAlert message={alertMessage} />}
    </div>
  );
}
