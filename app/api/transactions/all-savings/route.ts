import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prismadb";

export async function GET() {
    try {
        const clerkUser = await currentUser();
        if (!clerkUser)
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const user = await prisma.user.findUnique({
            where: { clerkId: clerkUser.id },
        });

        if (!user)
            return NextResponse.json({ error: "User not found" }, { status: 404 });

        const transactions = await prisma.transaction.findMany({
            where: { userId: user.id, type: "savings" },
            orderBy: { occurredAt: "desc" },
        });

        const totalSavings = transactions.reduce((acc: number, t: any) => acc + Number(t.amount), 0);

        return NextResponse.json({ transactions, totalSavings });
    } catch (error) {
        console.error("Error fetching all savings:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
