"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

const SetBudget = () => {
  const [budget, setBudget] = useState<number | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Fetch current budget
  useEffect(() => {
    const fetchBudget = async () => {
      const res = await fetch("/api/transactions/budget");
      const data = await res.json();
      if (data.budget) {
        setBudget(Number(data.budget.setBudget));
        setInputValue(data.budget.setBudget.toString());
      }
    };
    fetchBudget();
  }, []);

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/transactions/budget", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ setBudget: Number(inputValue) }),
      });
      const data = await res.json();

      if (data.budget) {
        setBudget(Number(data.budget.setBudget));
        router.push("/");
      }
    } catch (err) {
      console.error("Error updating budget:", err);
    } finally {
      setLoading(false);
    }
  };

  if (budget === null) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-yellow-300 text-2xl font-bold">
        Loading budget...
      </div>
    );
  }

  return (
    <div className="z-50 flex flex-col items-center justify-center min-h-screen bg-yellow-300 border-8 border-black font-mono relative">
      {/* Back Button */}
      <div className="absolute top-6 left-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 px-4 py-2 bg-black text-white border-4 border-black text-lg font-bold uppercase hover:bg-white hover:text-black transition-all"
        >
          <ArrowLeft className="w-5 h-5" /> Back
        </button>
      </div>

      {/* Main Card */}
      <div className="flex flex-col items-center gap-4 p-6 w-96 bg-white border-8 border-black shadow-[8px_8px_0px_0px_black]">
        <h2 className="text-3xl font-extrabold border-b-4 border-black pb-2 uppercase text-center">
          Set Budget
        </h2>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center w-full gap-4"
        >
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full p-3 text-center text-lg font-semibold border-4 border-black bg-yellow-200 focus:outline-none focus:bg-yellow-100"
            placeholder="Enter amount"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 text-xl font-bold uppercase bg-black text-white border-4 border-black hover:bg-white hover:text-black transition-all disabled:opacity-60"
          >
            {loading ? "Saving..." : "Save Budget"}
          </button>
        </form>

        <p className="mt-2 text-lg font-semibold">
          Current Budget:{" "}
          <span className="text-black bg-yellow-200 border-4 border-black px-2 py-1">
            ৳ {budget.toLocaleString()}
          </span>
        </p>
      </div>
    </div>
  );
};

export default SetBudget;
