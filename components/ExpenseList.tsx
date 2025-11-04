"use client";

import { Trash2 } from "lucide-react";
import Image from "next/image";
// TODO: Add category images/icons
// TODO: Add a delete button for each transaction
// TODO: Refactor to use SWR for data fetching and caching

import { useEffect, useState } from "react";

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

  const handleDelete = (id: number) => {
    const updatedTransactions = transactions.filter((t) => t.id !== id);
    setTransactions(updatedTransactions);
    console.log("Deleted transaction with id:", id);
  };

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
      <div className="group flex justify-around mb-6 p-4 border-4 border-black bg-white shadow-[4px_4px_0px_0px_black] hover:scale-102 hover:shadow-[8px_8px_0px_0px_black] transition-all">
        <div className="flex flex-col items-center">
          <span className="flex gap-1 items-baseline md:text-lg font-bold uppercase group-hover:scale-80 transition-all">
            Income{" "}
            <p className="hidden md:block text-xs lg:text-lg">(This Month)</p>
          </span>
          <span className="text-2xl font-extrabold text-lime-700 group-hover:scale-150 transition-all ">
            {currency} {totals.income.toLocaleString()}
          </span>
        </div>
        <div className="flex flex-col items-center">
          <span className="flex gap-1 items-baseline md:text-lg font-bold uppercase group-hover:scale-80 transition-all">
            Expense{" "}
            <p className="hidden md:block text-xs lg:text-lg ">(This Month)</p>
          </span>
          <span className="text-2xl font-extrabold text-red-700 group-hover:scale-150 transition-all">
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
              className={`group p-4 border-4 border-black text-black font-bold rounded-none hover:scale-102 hover:shadow-[4px_4px_0px_0px_black] transition-all ${
                t.type === "income" ? "bg-lime-300" : "bg-red-300"
              }`}
              onTouchEnd={() => console.log("Held")}
            >
              <div className="flex justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className={`${
                      t.type == "income" ? "bg-chart-5" : "bg-chart-4"
                    } rounded-full p-2 shadow-[2px_2px_0px_0px_black] border-black border-3 group-hover:scale-105 transition-all`}
                  >
                    <Image
                      src={`/categories/${t.category
                        .toLocaleLowerCase()
                        .replace(/\s+/g, "-")}.png`}
                      alt={`${t.category} icon`}
                      width={35}
                      height={35}
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex gap-1 items-center">
                      <Trash2
                        className="w-0 text-red-800 group-hover:w-5 group-active:w-5 transition-all"
                        onClick={() => handleDelete(t.id)}
                      />
                      <h3 className="text-xl group-hover:text-2xl transition-all">
                        {t.category}
                      </h3>
                    </div>
                    {t.description && (
                      <p className="text-sm font-normal italic">
                        {t.description}
                      </p>
                    )}
                    <p className="text-xs opacity-80">
                      {new Date(t.occurredAt).toLocaleDateString("en-US", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
                <div className="text-2xl flex items-baseline justify-center gap-1 group-hover:scale-125 transition-all">
                  {t.type === "income" ? "+" : "-"}
                  {parseFloat(t.amount).toLocaleString()}
                  <p className="text-sm">{currency}</p>
                </div>
              </div>
              {/* {t.description && (
                <p className="text-sm font-normal italic">{t.description}</p>
              )}
              <p className="text-xs opacity-80">
                {new Date(t.occurredAt).toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </p> */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExpenseList;
