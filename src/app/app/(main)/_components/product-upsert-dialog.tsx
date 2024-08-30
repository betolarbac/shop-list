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
import { PlusIcon, ReloadIcon } from "@radix-ui/react-icons";
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
      amount: 0,
      value: 0,
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
        <Button className="bg-[#7450AC] hover:bg-[#7450AC]">
          <PlusIcon className="w-4 h-4 mr-3" />
          Adicionar produto
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#05050a]">
        <DialogHeader>
          <DialogTitle>Adicionar Produto</DialogTitle>
          <DialogDescription>
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
                  <FormLabel>Item</FormLabel>
                  <FormControl>
                    <Input placeholder="Item" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel>Quantidade</FormLabel>
                  <FormControl>
                    <Input placeholder="Quantidade" type="number" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel>Valor</FormLabel>
                  <FormControl>
                    <Input placeholder="Valor" type="number" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <DialogFooter className="mt-8">
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <ReloadIcon className="w-4 h-4 mr-2 animate-spin" />
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
