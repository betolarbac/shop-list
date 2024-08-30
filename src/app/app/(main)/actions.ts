"use server";

import { prisma } from "@/services/database/prisma";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import { upsertProductSchema } from "./schema";

export async function getProducts() {
  const { userId }: { userId: string | null } = auth();
  

  const products = await prisma.products.findMany({
    where: {
      userId: userId ?? undefined,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return products;
}

export async function upsertProduct(input: z.infer<typeof upsertProductSchema>) {
  const { userId } = auth();
  
  if (!userId) {
    throw new Error("Usuário não autenticado");
  }
  
  const product = await prisma.products.upsert({
    where: { id: input.id ?? '' },
    update: {
      title: input.title,
      amount: input.amount,
      value: input.value,
    },
    create: {
      title: input.title || '',
      amount: input.amount,
      value: input.value,
      userId,
    }
  });

  return product;
}