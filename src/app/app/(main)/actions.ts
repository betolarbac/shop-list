"use server";

import { prisma } from "@/services/database/prisma";
import { auth } from "@clerk/nextjs/server";

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
