import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prismadb";

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    // ✅ Unwrap properly even if it's a promise in Turbopack
    const resolvedParams = await Promise.resolve(params);
    const numericId = Number(resolvedParams.id);

    if (isNaN(numericId)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const clerkUser = await currentUser();
    if (!clerkUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: clerkUser.id },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const transaction = await prisma.transaction.findUnique({
      where: { id: numericId },
    });

    if (!transaction) {
      return NextResponse.json(
        { error: "Transaction not found" },
        { status: 404 }
      );
    }

    if (transaction.userId !== user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const budget = await prisma.monthlyBudget.findUnique({
      where: { id: transaction.budgetId ?? undefined },
    });

    if (!budget) {
      return NextResponse.json({ error: "Budget not found" }, { status: 404 });
    }

    const amount = Number(transaction.amount) || 0;

    if (transaction.type === "income") {
      await prisma.monthlyBudget.update({
        where: { id: budget.id },
        data: { totalIncome: { decrement: amount } },
      });
    } else {
      await prisma.monthlyBudget.update({
        where: { id: budget.id },
        data: { totalExpense: { decrement: amount } },
      });
    }

    await prisma.transaction.delete({ where: { id: numericId } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting transaction:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
