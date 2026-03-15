"use client";

import { useEffect, useState } from "react";
import { Target, TrendingUp, Edit2 } from "lucide-react";

interface SavingsGoalData {
    name: string;
    targetAmount: string;
}

const SavingsGoal = ({ totalSavings }: { totalSavings: number }) => {
    const [goal, setGoal] = useState<SavingsGoalData | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);
    const currency = localStorage.getItem("currency") || "$";

    useEffect(() => {
        const fetchGoal = async () => {
            const res = await fetch("/api/savings-goal");
            const data = await res.json();
            if (data.savingsGoal) {
                setGoal(data.savingsGoal);
                setName(data.savingsGoal.name);
                setAmount(data.savingsGoal.targetAmount);
            }
        };
        fetchGoal();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const res = await fetch("/api/savings-goal", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name,
                targetAmount: parseFloat(amount),
            }),
        });

        if (res.ok) {
            const data = await res.json();
            setGoal(data.savingsGoal);
            setIsEditing(false);
        }
        setLoading(false);
    };

    const progress = goal ? Math.min((totalSavings / parseFloat(goal.targetAmount)) * 100, 100) : 0;

    return (
        <div className="w-full mt-6 p-6 bg-white border-4 border-black shadow-[8px_8px_0px_0px_black] font-mono">
            <div className="flex justify-between items-center mb-4 border-b-2 border-black pb-2">
                <h3 className="text-xl font-black uppercase flex items-center gap-2">
                    <Target className="w-6 h-6" /> Savings Goal
                </h3>
                {!isEditing && goal && (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="p-1 hover:bg-yellow-200 border-2 border-transparent hover:border-black transition-all"
                    >
                        <Edit2 className="w-4 h-4" />
                    </button>
                )}
            </div>

            {isEditing || !goal ? (
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input
                        className="p-2 border-2 border-black text-sm font-bold bg-yellow-100 focus:outline-none"
                        placeholder="Goal Name (e.g. New Bike)"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <div className="flex gap-2">
                        <input
                            className="flex-1 p-2 border-2 border-black text-sm font-bold bg-yellow-100 focus:outline-none"
                            placeholder="Target Amount"
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                        />
                        <span className="flex items-center font-bold">{currency}</span>
                    </div>
                    <div className="flex gap-2">
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 bg-black text-white p-2 text-sm font-bold uppercase hover:bg-white hover:text-black border-2 border-black transition-all shadow-[2px_2px_0px_0px_black]"
                        >
                            {loading ? "Saving..." : goal ? "Update Goal" : "Set Goal"}
                        </button>
                        {goal && (
                            <button
                                type="button"
                                onClick={() => setIsEditing(false)}
                                className="flex-1 bg-gray-200 p-2 text-sm font-bold uppercase hover:bg-white border-2 border-black transition-all shadow-[2px_2px_0px_0px_black]"
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            ) : (
                <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-baseline">
                        <span className="text-lg font-bold italic">{goal.name}</span>
                        <span className="text-sm font-black">
                            {currency}{totalSavings.toLocaleString()} / {currency}{parseFloat(goal.targetAmount).toLocaleString()}
                        </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-8 bg-gray-100 border-4 border-black relative overflow-hidden">
                        <div
                            className="h-full bg-blue-500 transition-all duration-500 border-r-4 border-black"
                            style={{ width: `${progress}%` }}
                        />
                        <span className="absolute inset-0 flex items-center justify-center font-black text-sm mix-blend-difference text-white">
                            {progress.toFixed(1)}% REACHED
                        </span>
                    </div>

                    {progress >= 100 && (
                        <div className="bg-green-400 border-2 border-black p-2 text-center font-bold animate-bounce text-xs">
                            🎉 GOAL ACHIEVED! WELL DONE! 🎉
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SavingsGoal;
