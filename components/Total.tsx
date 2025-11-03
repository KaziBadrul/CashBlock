"use client";

import { useUser } from "@clerk/nextjs";
import { Calendar, EyeClosed, EyeOff, Moon, Sun } from "lucide-react";
import React, { useEffect, useState } from "react";

const Total = () => {
  const [budget, setBudget] = useState<number | null>(null);
  const [netWorth, setNetWorth] = useState<number>(0);
  const [netWorthVisible, setNetWorthVisible] = useState<boolean>(true);
  const currency = localStorage.getItem("currency") || "$";

  const today = new Date();
  const hour = today.getHours();

  const isDay = hour >= 6 && hour < 18;
  const options: Intl.DateTimeFormatOptions = {
    // weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const currentDate = String(today.toLocaleDateString(undefined, options));

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

    const fetchNetWorth = async () => {
      const res = await fetch("/api/transactions/networth");
      const data = await res.json();
      if (data.data.netWorth) {
        setNetWorth(data.data.netWorth);
      }
    };
    fetchNetWorth();

    const storedVisibility = localStorage.getItem("netWorthVisible");
    if (storedVisibility !== null) {
      setNetWorthVisible(storedVisibility === "true");
    }
  }, []);

  const handleNetWorthVisibility = () => {
    const newValue = !netWorthVisible;
    setNetWorthVisible(newValue);
    localStorage.setItem("netWorthVisible", String(newValue));
  };

  if (budget === null)
    return (
      <div className="flex items-center justify-center w-3/4 p-8 text-2xl font-bold border-4 border-black bg-yellow-200 ">
        Loading...
      </div>
    );

  return (
    <div className="w-3/4 md:w-full lg:w-3/4">
      <div
        className={`${
          isDay ? "bg-chart-3 text-black" : "bg-gray-800 text-white"
        }  py-2 w-full md:w-3/4 lg:w-2/4 flex items-center justify-center gap-2 text-center text-lg font-semibold border-4 border-black mb-6 shadow-[8px_8px_0px_0px_black] hover:scale-105 transition-all`}
      >
        {isDay ? <Sun /> : <Moon />} <span>{currentDate}</span>
      </div>
      <div className="flex gap-2 items-baseline justify-center w-full p-8 text-5xl font-extrabold border-4 border-black bg-chart-4 md:mb-6 shadow-[8px_8px_0px_0px_black] hover:scale-105 transition-all hover:animate-wiggle">
        {budget.toLocaleString()}
        <p className="text-lg">{currency}</p>
      </div>
      <div className="flex items-center justify-center w-full py-2 sm:text-lg md:text-xl gap-5 font-extrabold border-4 border-black bg-chart-4 md:mb-6 shadow-[8px_8px_0px_0px_black]">
        <p className={netWorthVisible ? "" : "hidden"}>
          Networth: {currency} {netWorth.toLocaleString()}
        </p>
        <EyeClosed
          className={netWorthVisible ? "hidden" : "ml-2 w-6 h-6"}
          onClick={handleNetWorthVisibility}
        />
        <EyeOff
          className={netWorthVisible ? "ml-2 w-6 h-6" : "hidden"}
          onClick={handleNetWorthVisibility}
        />
      </div>
    </div>
  );
};

export default Total;
