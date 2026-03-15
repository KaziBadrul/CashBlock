"use client";

import { Trash2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Transaction {
    id: number;
    category: string;
    type: "savings";
    amount: string;
    description?: string;
    occurredAt: string;
}

interface SavingsListProps {
    transactions: Transaction[];
    totalSavings: number;
    onDelete: (id: number) => Promise<void>;
}

const SavingsList = ({ transactions, totalSavings, onDelete }: SavingsListProps) => {
    const currency = localStorage.getItem("currency") || "$";
    const [activeCard, setActiveCard] = useState<number | null>(null);

    const handleCardTap = (id: number) => {
        setActiveCard((prev) => (prev === id ? null : id));
    };

    const handleDelete = async (id: number) => {
        await onDelete(id);
    };

    return (
        <div className="flex flex-col w-full h-full p-4 sm:p-6 bg-chart-4 border-black">
            <h2 className="mb-4 sm:mb-6 text-2xl sm:text-4xl font-extrabold text-black uppercase border-b-4 border-black text-center">
                Savings History
            </h2>

            {/* Total Savings */}
            <div className="group flex justify-around mb-6 p-3 sm:p-4 border-4 border-black bg-white shadow-[4px_4px_0px_0px_black] hover:scale-102 hover:shadow-[8px_8px_0px_0px_black] transition-all">
                <div className="flex flex-col items-center w-full">
                    <span className="flex gap-1 items-baseline sm:text-lg font-bold uppercase group-hover:scale-80 transition-all text-sm">
                        Total Savings
                    </span>
                    <span className="text-2xl sm:text-4xl font-extrabold text-blue-700 group-hover:scale-125 transition-all ">
                        {currency} {totalSavings.toLocaleString()}
                    </span>
                </div>
            </div>

            {transactions.length === 0 ? (
                <p className="text-lg sm:text-xl font-semibold text-black text-center uppercase">
                    No Savings Yet.
                </p>
            ) : (
                <div className="flex flex-col gap-3">
                    {transactions.map((t) => {
                        const isActive = activeCard === t.id;
                        return (
                            <div
                                key={t.id}
                                onClick={() => handleCardTap(t.id)}
                                className={`group p-3 sm:p-4 select-none border-4 border-black text-black font-bold rounded-none hover:scale-102 hover:shadow-[4px_4px_0px_0px_black] transition-all bg-blue-200 ${isActive
                                    ? "scale-105 shadow-[4px_4px_0px_0px] shadow-gray-700"
                                    : ""
                                    }`}
                            >
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-3 sm:gap-4">
                                        <div
                                            className={`bg-chart-4 
                       ${isActive ? "scale-105" : ""} 
                       rounded-full p-1.5 sm:p-2 shadow-[2px_2px_0px_0px_black] border-black border-3 group-hover:scale-105 transition-all
                       `}
                                        >
                                            <Image
                                                src={`/categories/savings.png`}
                                                alt={`savings icon`}
                                                width={isActive ? 30 : 25}
                                                height={isActive ? 30 : 25}
                                                className="sm:w-[35px] sm:h-[35px]"
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <div className="flex gap-1 items-center">
                                                <Trash2
                                                    className={`text-red-800 group-hover:w-4 sm:group-hover:w-5 hover:animate-quickwiggle hover:bg-red-800 hover:text-white rounded-full transition-all ${isActive ? "w-4 sm:w-5" : "w-0"
                                                        }`}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleDelete(t.id);
                                                    }}
                                                />
                                                <h3
                                                    className={`text-sm sm:text-xl transition-all ${isActive ? "text-base sm:text-2xl" : ""
                                                        }`}
                                                >
                                                    {t.category}
                                                </h3>
                                            </div>
                                            {t.description && (
                                                <p className="text-[10px] sm:text-sm font-normal italic leading-tight">
                                                    {t.description}
                                                </p>
                                            )}
                                            <p className="text-[10px] sm:text-xs opacity-80">
                                                {new Date(t.occurredAt).toLocaleDateString("en-US", {
                                                    day: "2-digit",
                                                    month: "short",
                                                    year: "numeric",
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                    <div
                                        className={`text-base sm:text-2xl flex items-baseline justify-center gap-1 group-hover:scale-125 transition-all 
                      ${isActive ? "scale-110 sm:scale-125" : ""}`}
                                    >
                                        {parseFloat(t.amount).toLocaleString()}
                                        <p className="text-[10px] sm:text-sm">{currency}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default SavingsList;
