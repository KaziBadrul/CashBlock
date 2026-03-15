"use client";

import SavingsList from "@/components/SavingsList";
import Total from "@/components/Total";
import Tools from "@/components/Tools";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SavingsPage() {
    const router = useRouter();

    return (
        <div className="w-full h-screen pt-16 grid md:grid-cols-2 border-8 border-black font-mono bg-black overflow-hidden">
            {/* LEFT PANEL */}
            <div className="flex flex-col items-center justify-center bg-chart-4 md:border-r-8 border-black p-6 relative">
                <div className="absolute top-6 left-6">
                    <button
                        onClick={() => router.push("/")}
                        className="flex items-center gap-2 px-4 py-2 bg-black text-white border-4 border-black text-lg font-bold uppercase hover:bg-white hover:text-black transition-all"
                    >
                        <ArrowLeft className="w-5 h-5" /> Dashboard
                    </button>
                </div>
                <Total />
                <Tools />
            </div>

            {/* RIGHT PANEL */}
            <div className="flex flex-col h-full md:overflow-y-auto bg-chart-4">
                <SavingsList />
            </div>
        </div>
    );
}
