import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prismadb";

export async function GET() {
  try {
    // Get the signed-in user from Clerk
    const clerkUser = await currentUser();
    if (!clerkUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get or create the user record in your database
    let user = await prisma.user.findUnique({
      where: { clerkId: clerkUser.id },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          clerkId: clerkUser.id,
          email: clerkUser.emailAddresses?.[0]?.emailAddress ?? null,
          fullName:
            `${clerkUser.firstName ?? ""} ${clerkUser.lastName ?? ""}`.trim() ||
            null,
        },
      });
    }

    // Determine the current month and year (e.g., "2025-10")
    const now = new Date();
    const monthYear = `${now.getUTCFullYear()}-${String(
      now.getUTCMonth() + 1
    ).padStart(2, "0")}`;

    // Get or create the current month's budget
    let budget = await prisma.monthlyBudget.findUnique({
      where: {
        userId_monthYear: {
          userId: user.id,
          monthYear,
        },
      },
    });

    if (!budget) {
      budget = await prisma.monthlyBudget.create({
        data: {
          userId: user.id,
          monthYear,
          totalIncome: 0,
          totalExpense: 0,
        },
      });
    }

    // Return the budget
    return NextResponse.json({ budget });
  } catch (error) {
    console.error("Error in GET /api/budget:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    // Get the signed-in user from Clerk
    const clerkUser = await currentUser();
    if (!clerkUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { setBudget } = await req.json();
    if (!setBudget) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Get or create the user record in your database
    let user = await prisma.user.findUnique({
      where: { clerkId: clerkUser.id },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          clerkId: clerkUser.id,
          email: clerkUser.emailAddresses?.[0]?.emailAddress ?? null,
          fullName:
            `${clerkUser.firstName ?? ""} ${clerkUser.lastName ?? ""}`.trim() ||
            null,
        },
      });
    }

    // Determine the current month and year (e.g., "2025-10")
    const now = new Date();
    const monthYear = `${now.getUTCFullYear()}-${String(
      now.getUTCMonth() + 1
    ).padStart(2, "0")}`;

    const budget = await prisma.monthlyBudget.upsert({
      where: { userId_monthYear: { userId: user.id, monthYear } },
      update: { setBudget },
      create: {
        userId: user.id,
        monthYear,
        setBudget,
        totalIncome: 0,
        totalExpense: 0,
      },
    });

    return NextResponse.json({ budget });
  } catch (error) {
    console.error("Error in POST /api/budget:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
