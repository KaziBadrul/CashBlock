"use client";

import React, { useEffect, useState } from "react";

const Total = () => {
  const [budget, setBudget] = useState<number | null>(null);

  useEffect(() => {
    const fetchBudget = async () => {
      const res = await fetch("/api/transactions/budget");
      const data = await res.json();
      if (data.budget) {
        const net =
          Number(data.budget.setBudget) - Number(data.budget.totalExpense);
        setBudget(net);
      }
    };
    fetchBudget();
  }, []);

  if (budget === null)
    return (
      <div className="flex items-center justify-center w-3/4 p-8 text-2xl font-bold border-4 border-black bg-yellow-200 ">
        Loading...
      </div>
    );

  return (
    <div className="flex items-center justify-center w-3/4 p-8 text-5xl font-extrabold border-4 border-black bg-chart-4 mb-6 shadow-[8px_8px_0px_0px_black] hover:scale-105 transition-all hover:animate-wiggle">
      ৳ {budget.toLocaleString()}
    </div>
  );
};

export default Total;
