"use client";

import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { BanknoteArrowDown, BanknoteArrowUp, SquarePen } from "lucide-react";

const Tools = () => {
  return (
    <div className="grid grid-cols-1 gap-3 mt-10 text-xl w-3/4">
      <Link href="/add-income">
        <Button className="w-full bg-chart-5 text-black border-4 border-black rounded-none hover:bg-green-800 hover:text-white hover:scale-105 font-bold py-5 hover:shadow-[4px_4px_0px_0px_black]">
          <BanknoteArrowUp className="mx-5 scale-200" />{" "}
          <span className="hidden sm:block text-xl">ADD INCOME</span>
        </Button>
      </Link>
      <Link href="/add-expense">
        <Button className="w-full bg-chart-1 text-black border-4 border-black rounded-none hover:bg-red-800 hover:text-white hover:scale-105 font-bold py-5 hover:shadow-[4px_4px_0px_0px_black]">
          <BanknoteArrowDown className="mx-5 scale-200" />{" "}
          <span className="hidden sm:block text-xl">ADD EXPENSE</span>
        </Button>
      </Link>
      <Link href="/set-budget">
        <Button className="w-full bg-chart-4 text-black border-4 border-black rounded-none hover:bg-yellow-400 hover:text-black hover:scale-105 font-bold py-5 hover:shadow-[4px_4px_0px_0px_black]">
          <SquarePen className="mx-5 scale-200" />{" "}
          <span className="hidden sm:block text-xl">SET BUDGET</span>
        </Button>
      </Link>
    </div>
  );
};

export default Tools;
