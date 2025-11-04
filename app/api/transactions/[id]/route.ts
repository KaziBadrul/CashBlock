import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prismadb";

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const clerkUser = await currentUser();
    if (!clerkUser)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const id = Number(params.id);
    if (isNaN(id))
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });

    const user = await prisma.user.findUnique({
      where: { clerkId: clerkUser.id },
    });
    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    const transaction = await prisma.transaction.findUnique({
      where: { id },
    });
    if (!transaction)
      return NextResponse.json(
        { error: "Transaction not found" },
        { status: 404 }
      );

    if (transaction.userId !== user.id)
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const budget = await prisma.monthlyBudget.findUnique({
      where: { id: transaction.budgetId! },
    });
    if (!budget)
      return NextResponse.json({ error: "Budget not found" }, { status: 404 });

    const amount = Number(transaction.amount) || 0;

    await prisma.monthlyBudget.update({
      where: { id: budget.id },
      data:
        transaction.type === "income"
          ? { totalIncome: { decrement: amount } }
          : { totalExpense: { decrement: amount } },
    });

    await prisma.transaction.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting transaction:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
