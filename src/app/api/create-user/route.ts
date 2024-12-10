import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse, NextRequest } from "next/server";
import { prisma } from "../../../services/database/prisma";

export async function POST(_req: NextRequest) {
  try {
    const { userId }: { userId: string | null } = auth();

    if (!userId) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    // Verificar se o usuário já existe no banco de dados
    const userExists = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (userExists) {
      return NextResponse.json({ error: "Usuário já existe" }, { status: 400 });
    }

    // Obter informações do usuário pelo Clerk
    const clerkUser = await clerkClient.users.getUser(userId);

    if (!clerkUser) {
      return NextResponse.json(
        { error: "Usuário não encontrado no Clerk" },
        { status: 404 }
      );
    }

    // Validar campos obrigatórios do Clerk
    const email = clerkUser.emailAddresses[0]?.emailAddress;
    const name = clerkUser.firstName;

    if (!email || !name) {
      return NextResponse.json(
        { error: "Informações do usuário incompletas" },
        { status: 400 }
      );
    }

    // Criar novo usuário no banco de dados
    const newUser = await prisma.user.create({
      data: {
        clerkId: clerkUser.id,
        email,
        name,
      },
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    return NextResponse.json(
      { error: "Erro interno no servidor" },
      { status: 500 }
    );
  }
}
