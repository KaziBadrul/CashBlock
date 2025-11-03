"use client";
import { useState } from "react";

export default function CustomAlert({ message }: { message: string }) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="fixed top-6 right-6 bg-yellow-300 border-4 border-black px-6 py-3 shadow-[6px_6px_0_0_black] font-mono text-lg z-50">
      <div className="flex items-center justify-between gap-4">
        <span>{message}</span>
        <button
          onClick={() => setVisible(false)}
          className="px-3 py-1 bg-black text-white font-bold hover:bg-white hover:text-black transition"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
