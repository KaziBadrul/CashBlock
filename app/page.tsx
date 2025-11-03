import ExpenseList from "@/components/ExpenseList";
import Login from "@/components/Login";
import Tools from "@/components/Tools";
import Total from "@/components/Total";
import { auth, currentUser } from "@clerk/nextjs/server";
import { ensureUserRow } from "@/lib/user";
import Image from "next/image";

export default async function Home() {
  const { isAuthenticated } = await auth();

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center w-screen h-screen bg-yellow-300 border-black">
        <div className="flex flex-col items-center justify-center w-2/3 gap-4 p-10 bg-white border-4 border-black">
          <Image
            src="/CashBlockLogoName.png"
            alt="CashBlock"
            width={500}
            height={500}
          />
          <h2 className="font-mono font-bold text-sm md:text-2xl uppercase italic border-b-4 border-black pb-2">
            manage cash, monthly
          </h2>
          <Login />
        </div>
      </div>
    );
  }

  // const user = await ensureUserRow();

  return (
    <div className="w-full h-screen pt-16 grid md:grid-cols-2 border-8 border-black font-mono bg-black">
      {/* LEFT PANEL */}
      <div className="flex flex-col items-center justify-center bg-chart-3 md:border-r-8 border-black p-6">
        <Total />
        <Tools />
      </div>

      {/* RIGHT PANEL */}
      <div className="flex flex-col h-full md:overflow-y-auto bg-chart-5">
        <ExpenseList />
      </div>
    </div>
  );
}
