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
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import { upsertProductSchema } from "../schema";

export function ProductUpsertDialog() {
  const form = useForm({
    resolver: zodResolver(upsertProductSchema),
    defaultValues: {
      Item: '', 
      Quantidade: '', 
      Valor: '', 
    }
  });

  const onSubmit = form.handleSubmit(async (data) => {
    console.log(data);
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[#7450AC] hover:bg-[#7450AC]">
          <PlusIcon className="w-4 h-4 mr-3" />
          Adicionar produto
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#05050a]">
        <DialogHeader>
          <DialogTitle>Adicionar Produto</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={onSubmit} className="grid gap-4">
            <FormField
              control={form.control}
              name="Item"
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
              name="Quantidade"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel>Quantidade</FormLabel>
                  <FormControl>
                    <Input placeholder="Quantidade" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="Valor"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel>Valor</FormLabel>
                  <FormControl>
                    <Input placeholder="Valor" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <DialogFooter className="mt-8">
              <Button type="submit">Salvar</Button>

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
