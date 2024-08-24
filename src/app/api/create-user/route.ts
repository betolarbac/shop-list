import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse, NextRequest } from "next/server";
import { prisma } from "../../services/database/prisma";

export async function POST(req: NextRequest) {
  const { userId }: { userId: string | null } = auth();

  if (!userId) {
    return NextResponse.json({ error: "não autenticado" }, { status: 401 });
  }

  const userExists = await prisma.user.findUnique({
    where: { clerkId: userId },
  });

  if (userExists) {
    return NextResponse.json({ error: "user ja existe" }, { status: 400 });
  }

  const clerkUser = await clerkClient.users.getUser(userId);

  const newUser = await prisma.user.create({
    data: {
      clerkId: clerkUser.id,
      email: clerkUser.emailAddresses[0].emailAddress,
      name: clerkUser.firstName
    }
  })

  return NextResponse.json(newUser, { status: 201 });
}
