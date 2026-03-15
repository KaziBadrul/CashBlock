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

        const savingsGoal = await prisma.savingsGoal.findUnique({
            where: { userId: user.id },
        });

        return NextResponse.json({ savingsGoal });
    } catch (error) {
        console.error("Error fetching savings goal:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function POST(req: Request) {
    try {
        const clerkUser = await currentUser();
        if (!clerkUser)
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const { name, targetAmount } = await req.json();

        if (!name || isNaN(targetAmount)) {
            return NextResponse.json({ error: "Missing fields or invalid amount" }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { clerkId: clerkUser.id },
        });

        if (!user)
            return NextResponse.json({ error: "User not found" }, { status: 404 });

        const savingsGoal = await prisma.savingsGoal.upsert({
            where: { userId: user.id },
            update: {
                name,
                targetAmount,
            },
            create: {
                userId: user.id,
                name,
                targetAmount,
            },
        });

        return NextResponse.json({ success: true, savingsGoal });
    } catch (error) {
        console.error("Error updating savings goal:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
