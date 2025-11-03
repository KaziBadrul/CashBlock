// app/api/transactions/list/route.ts
import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prismadb";
import { computeNetWorthForUser } from "@/lib/networth";

export async function GET() {
  try {
    const clerkUser = await currentUser();
    if (!clerkUser)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const user = await prisma.user.findUnique({
      where: { clerkId: clerkUser.id },
    });
    if (!user) return NextResponse.json({ data: [] });

    const netWorthData = await computeNetWorthForUser(user.id);

    return NextResponse.json({ data: netWorthData });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
