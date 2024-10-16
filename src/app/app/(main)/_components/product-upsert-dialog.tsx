"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CirclePlus, LoaderCircle } from 'lucide-react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { upsertProductSchema } from "../schema";
import { upsertProduct } from "../actions";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function ProductUpsertDialog() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(upsertProductSchema),
    defaultValues: {
      id: "",
      title: "",
      amount: undefined,
      value: undefined,
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      setLoading(true);

      await upsertProduct(data);

      setOpen(false);
      router.refresh();
      form.reset();
    } catch (error) {
      console.error("Erro ao salvar produto:", error);
    } finally {
      setLoading(false);
    }
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className=" text-xs lg:text-sm px-2 lg:px-4">
          <CirclePlus className="w-4 h-4 mr-2 lg:mr-3"/>
          Adicionar produto
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[345px] rounded-lg lg:max-w-[425px] bg-[#05050a]">
        <DialogHeader>
          <DialogTitle className="text-slate-12">Adicionar Produto</DialogTitle>
          <DialogDescription className="">
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={onSubmit} className="grid gap-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel className="text-slate-12">Item</FormLabel>
                  <FormControl>
                    <Input placeholder="Item" className="text-slate-12" {...field} required />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel className="text-slate-12">Quantidade</FormLabel>
                  <FormControl>
                    <Input placeholder="Quantidade" className="text-slate-12" type="number" {...field} required/>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel className="text-slate-12">Valor</FormLabel>
                  <FormControl>
                    <Input placeholder="Valor" className="text-slate-12" type="number" {...field} required />
                  </FormControl>
                </FormItem>
              )}
            />
            <DialogFooter className="mt-8 flex flex-row justify-center gap-3">
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <LoaderCircle className="w-4 h-4 mr-2 animate-spin"/>
                    Salvando
                  </>
                ) : (
                  "Salvar"
                )}
              </Button>

              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Cancelar
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
