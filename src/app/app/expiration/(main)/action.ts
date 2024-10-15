"use server";
import { prisma } from "@/services/database/prisma";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import { deleteExpirationSchema, upsertExpirationSchema } from "./schema";

export async function getExpiration() {
  const { userId }: { userId: string | null } = auth();

  const expiration = await prisma.expiration.findMany({
    where: {
      userId: userId ?? undefined,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return expiration;
}

export async function upsertExpiration(
  input: z.infer<typeof upsertExpirationSchema>
) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("Usuaário não autenticado");
  }

  const expiration = await prisma.expiration.upsert({
    where: {
      id: input.id,
    },
    update: {
      title: input.title,
      expiration: input.expiration,
    },
    create: {
      title: input.title,
      expiration: input.expiration,
      userId,
    },
  });

  return expiration;
}

export async function deleteExpiration(input: z.infer<typeof deleteExpirationSchema>) { 
  const { userId } = auth();

  if (!userId) {
    throw new Error("Usuaário não autenticado");
  }

  const expiration = await prisma.expiration.delete({
    where: {
      id: input.id,
    },

    select: {
      id: true,
    }
  });

  if (!expiration) {
    throw new Error("Expiração não encontrada");
  }

  await prisma.expiration.deleteMany({
    where: {
      id: input.id,
      userId,
    }
  })

  return {
    error: null,
    data: "Expiração excluída",
  }
}