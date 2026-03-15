"use client";

import { useEffect, useState } from "react";
import SavingsList from "@/components/SavingsList";
import Total from "@/components/Total";
import Tools from "@/components/Tools";
import SavingsGoal from "@/components/SavingsGoal";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface Transaction {
    id: number;
    category: string;
    type: "savings";
    amount: string;
    description?: string;
    occurredAt: string;
}

export default function SavingsPage() {
    const router = useRouter();
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [totalSavings, setTotalSavings] = useState(0);

    const fetchSavings = async () => {
        const res = await fetch("/api/transactions/all-savings");
        const data = await res.json();
        if (data.transactions) {
            setTransactions(data.transactions);
            setTotalSavings(data.totalSavings);
        }
    };

    useEffect(() => {
        fetchSavings();
    }, []);

    const handleDelete = async (id: number) => {
        const transaction = transactions.find((t) => t.id === id);
        if (!transaction) return;

        // Optimistic update
        setTotalSavings((prev) => prev - parseFloat(transaction.amount));
        setTransactions((prev) => prev.filter((t) => t.id !== id));

        const res = await fetch(`/api/transactions/${id}`, {
            method: "DELETE",
        });

        if (!res.ok) {
            console.error("Failed to delete savings transaction");
            fetchSavings(); // Rollback/Refresh if failed
        }
    };

    return (
        <div className="w-full h-screen pt-16 grid md:grid-cols-2 border-8 border-black font-mono bg-black overflow-hidden">
            {/* LEFT PANEL */}
            <div className="flex flex-col items-center justify-center bg-chart-4 md:border-r-8 border-black p-6 relative overflow-y-auto">
                <div className="absolute top-6 left-6">
                    <button
                        onClick={() => router.push("/")}
                        className="flex items-center gap-2 px-4 py-2 bg-black text-white border-4 border-black text-lg font-bold uppercase hover:bg-white hover:text-black transition-all"
                    >
                        <ArrowLeft className="w-5 h-5" /> Dashboard
                    </button>
                </div>
                <div className="mt-16 w-full flex flex-col items-center">
                    <Total />
                    <SavingsGoal totalSavings={totalSavings} />
                    <Tools />
                </div>
            </div>

            {/* RIGHT PANEL */}
            <div className="flex flex-col h-full md:overflow-y-auto bg-chart-4">
                <SavingsList
                    transactions={transactions}
                    totalSavings={totalSavings}
                    onDelete={handleDelete}
                />
            </div>
        </div>
    );
}
