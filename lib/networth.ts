// lib/networth.ts
import { prisma } from "./prismadb";

export async function computeNetWorthForUser(userId: string) {
  const incomes = await prisma.transaction.aggregate({
    where: { userId, type: "income" },
    _sum: { amount: true },
  });

  const expenses = await prisma.transaction.aggregate({
    where: { userId, type: "expense" },
    _sum: { amount: true },
  });

  const savings = await prisma.transaction.aggregate({
    where: { userId, type: "savings" },
    _sum: { amount: true },
  });

  const totalIncome = incomes._sum.amount ? Number(incomes._sum.amount) : 0;
  const totalExpense = expenses._sum.amount ? Number(expenses._sum.amount) : 0;
  const totalSavings = savings._sum.amount ? Number(savings._sum.amount) : 0;

  const netWorth = totalIncome - totalExpense - totalSavings;
  return { totalIncome, totalExpense, totalSavings, netWorth };
}
