import { Product } from './types';
"use server";

import { prisma } from "@/services/database/prisma";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import { deleteProductSchema, upsertProductSchema } from "./schema";

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
      amount: input.amount || 0,
      value: input.value || 0,
      userId,
    }
  });

  return product;
}

export async function deleteProduct(input: z.infer<typeof deleteProductSchema>) {
  const { userId } = auth();
  
  if (!userId) {
    throw new Error("Usuário não autenticado");
  }

  const Product = await prisma.products.findUnique({
    where: {
      id: input.id,
      userId,

    },
    select: {
      id: true,
    }
  })

  if (!Product) {
    throw new Error("Produto não encontrado");
  }

  await prisma.products.delete({
    where: {
      id: input.id,
      userId,
    }
  })

  return {
    error: null,
    data: "Product deleted successfully",
  }
}