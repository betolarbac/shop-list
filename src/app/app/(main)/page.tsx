"use client";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";
import { PlusIcon } from "@radix-ui/react-icons";
import { useEffect } from "react";
import { ProductTable } from "../_components/product-tablet";
export default function Page() {
  const { isSignedIn } = useAuth();

  useEffect(() => {
    if (isSignedIn) {
      fetch("/api/create-user", {
        method: "POST",
      });
    }
  }, [isSignedIn]);

  return (
    <>
      <div className="scrollContainer h-[calc(100vh-60px)] overflow-auto pb-10">
        <div className="justify-center items-center ">
          <div className="flex items-center justify-between mx-auto max-w-5xl px-6 py-8">
            <h3 className="text-[28px] leading-[34px] tracking-[-0.416px] text-slate-12 font-bold">
              Lista de Compras
            </h3>

            <Button className="bg-[#7450AC] hover:bg-[#7450AC]">
              <PlusIcon className="w-4 h-4 mr-3" />
              Adicionar produto
            </Button>
          </div>

          <div className="mx-auto max-w-5xl px-6">
            <ProductTable />
          </div>
        </div>
      </div>
    </>
  );
}
