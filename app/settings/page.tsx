"use client";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function Settings() {
  const [currency, setCurrency] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("currency") || "$";
    }
    return "$";
  });

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrency(e.target.value);
    localStorage.setItem("currency", e.target.value);
  };

  const router = useRouter();

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
      <div className="flex flex-col gap-4 w-80 p-6 bg-white border-8 border-black shadow-[8px_8px_0px_0px_black]">
        <h1 className="text-3xl font-extrabold text-center border-b-4 border-black pb-2 uppercase">
          Currency
        </h1>
        <input
          className="p-3 border-4 border-black text-lg font-semibold bg-yellow-200 focus:outline-none focus:bg-yellow-100"
          placeholder="Currency"
          type="text"
          value={currency}
          onChange={(e) => handleCurrencyChange(e)}
          required
        />
      </div>
    </div>
  );
}
