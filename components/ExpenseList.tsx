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
  const [totals, setTotals] = useState({ income: 0, expense: 0 });
  const currency = localStorage.getItem("currency") || "$";

  useEffect(() => {
    const fetchTransactions = async () => {
      const res = await fetch("/api/transactions");
      const data = await res.json();
      if (data.transactions) {
        setTransactions(data.transactions);

        // Calculate totals for current month
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();

        let income = 0;
        let expense = 0;

        data.transactions.forEach((t: Transaction) => {
          const date = new Date(t.occurredAt);
          if (
            date.getMonth() === currentMonth &&
            date.getFullYear() === currentYear
          ) {
            if (t.type === "income") income += parseFloat(t.amount);
            else expense += parseFloat(t.amount);
          }
        });

        setTotals({ income, expense });
      }
    };
    fetchTransactions();
  }, []);

  return (
    <div className="flex flex-col w-full h-full p-6 bg-chart-5 border-black">
      <h2 className="mb-6 text-4xl font-extrabold text-black uppercase border-b-4 border-black text-center">
        Transactions
      </h2>

      {/* Total Income & Expense */}
      <div className="flex justify-around mb-6 p-4 border-4 border-black bg-white shadow-[4px_4px_0px_0px_black]">
        <div className="flex flex-col items-center">
          <span className="text-lg font-bold uppercase">
            Income (This Month)
          </span>
          <span className="text-2xl font-extrabold text-lime-700">
            {currency} {totals.income.toLocaleString()}
          </span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-lg font-bold uppercase">
            Expense (This Month)
          </span>
          <span className="text-2xl font-extrabold text-red-700">
            {currency} {totals.expense.toLocaleString()}
          </span>
        </div>
      </div>

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
                <h3 className="text-xl">{t.category}</h3>
                <div className="text-2xl flex items-baseline justify-center gap-1">
                  {t.type === "income" ? "+" : "-"}
                  {parseFloat(t.amount).toLocaleString()}
                  <p className="text-sm">{currency}</p>
                </div>
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
