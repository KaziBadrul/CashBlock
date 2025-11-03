"use client";

import React, { useEffect, useState } from "react";

interface Transaction {
  id: number;
  category: string;
  type: "income" | "expense";
  amount: string;
  description?: string;
  occurredAt: string;
}

const ExpenseList = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const res = await fetch("/api/transactions");
      const data = await res.json();
      if (data.transactions) {
        setTransactions(data.transactions);
      }
    };
    fetchTransactions();
  }, []);

  return (
    <div className="flex flex-col w-full h-full p-6 overflow-y-clip bg-chart-5 border-black">
      <h2 className="mb-6 text-4xl font-extrabold text-black uppercase border-b-4 border-black text-center">
        Transactions
      </h2>

      {transactions.length === 0 ? (
        <p className="text-xl font-semibold text-black text-center uppercase">
          No Transactions Yet.
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {transactions.map((t) => (
            <div
              key={t.id}
              className={`p-4 border-4 border-black text-black font-bold rounded-none ${
                t.type === "income" ? "bg-lime-300" : "bg-red-300"
              }`}
            >
              <div className="flex justify-between">
                <h3>{t.category}</h3>
                <span>
                  {t.type === "income" ? "+" : "-"}৳
                  {parseFloat(t.amount).toLocaleString()}
                </span>
              </div>
              {t.description && (
                <p className="text-sm font-normal italic">{t.description}</p>
              )}
              <p className="text-xs opacity-80">
                {new Date(t.occurredAt).toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExpenseList;
