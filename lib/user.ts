// lib/user.ts
import { prisma } from "./prismadb";
import { currentUser } from "@clerk/nextjs/server";

export async function ensureUserRow() {
  const user = await currentUser();
  if (!user) return null;

  const clerkId = user.id;
  const email = user.emailAddresses?.[0]?.emailAddress ?? null;
  const fullName =
    `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim() || null;

  const record = await prisma.user.upsert({
    where: { clerkId },
    update: { email, fullName },
    create: { clerkId, email, fullName },
  });

  return record;
}
