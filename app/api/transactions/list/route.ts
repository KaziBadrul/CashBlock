// app/api/transactions/list/route.ts
import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prismadb";

export async function GET() {
  const clerkUser = await currentUser();
  if (!clerkUser)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { clerkId: clerkUser.id },
  });
  if (!user) return NextResponse.json({ data: [] });

  const txns = await prisma.transaction.findMany({
    where: { userId: user.id },
    orderBy: { occurredAt: "desc" },
  });

  return NextResponse.json({ txns });
}
