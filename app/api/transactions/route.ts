import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prismadb";

export async function GET() {
  try {
    const clerkUser = await currentUser();
    if (!clerkUser)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // Get user from DB
    const user = await prisma.user.findUnique({
      where: { clerkId: clerkUser.id },
    });

    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    // Get current month (e.g., "2025-10")
    const now = new Date();
    const monthYear = `${now.getUTCFullYear()}-${String(
      now.getUTCMonth() + 1
    ).padStart(2, "0")}`;

    // Find monthly budget for that user/month
    const budget = await prisma.monthlyBudget.findUnique({
      where: { userId_monthYear: { userId: user.id, monthYear } },
    });

    if (!budget) return NextResponse.json({ transactions: [] });

    // Fetch transactions for that budget
    const transactions = await prisma.transaction.findMany({
      where: { budgetId: budget.id },
      orderBy: { occurredAt: "desc" },
    });

    return NextResponse.json({ transactions });
  } catch (error) {
    console.error("Error fetching transactions:", error);
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

    const { category, amount, description, type } = await req.json();

    if (!category || !amount || !type) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { clerkId: clerkUser.id },
    });
    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    // Get or create current month’s budget
    const now = new Date();
    const monthYear = `${now.getUTCFullYear()}-${String(
      now.getUTCMonth() + 1
    ).padStart(2, "0")}`;

    let budget = await prisma.monthlyBudget.findUnique({
      where: { userId_monthYear: { userId: user.id, monthYear } },
    });

    if (!budget) {
      budget = await prisma.monthlyBudget.create({
        data: {
          userId: user.id,
          monthYear,
          totalIncome: 0,
          totalExpense: 0,
          setBudget: 0,
        },
      });
    }

    // Create transaction
    const transaction = await prisma.transaction.create({
      data: {
        userId: user.id,
        budgetId: budget.id,
        category,
        description,
        type,
        amount,
      },
    });

    // Update totals
    if (type === "income") {
      await prisma.monthlyBudget.update({
        where: { id: budget.id },
        data: { totalIncome: { increment: amount } },
      });
    } else if (type === "expense") {
      await prisma.monthlyBudget.update({
        where: { id: budget.id },
        data: { totalExpense: { increment: amount } },
      });
    }

    return NextResponse.json({ success: true, transaction });
  } catch (error) {
    console.error("Error in POST /api/transactions:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
