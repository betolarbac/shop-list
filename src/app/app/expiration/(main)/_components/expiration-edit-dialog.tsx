"use client";

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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarDays, Edit, LoaderCircle } from "lucide-react";
import { Expiration } from "../types";
import { useState } from "react";
import { upsertExpiration } from "../action";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { upsertExpirationSchema } from "../schema";
import dayjs from "dayjs";

export function ExpirationEditDialog(product: Expiration) {
  
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(upsertExpirationSchema),
    defaultValues: {
      id: product.id,
      title: product.title,
      amount: product.amount,
      expiration: product.expiration,
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      setLoading(true);
      await upsertExpiration(data);
      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-transparent hover:bg-transparent">
          <Edit className="text-[#ff6465eb] w-5 h-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[345px] rounded-lg lg:max-w-[425px] bg-[#05050a]">
        <DialogHeader>
          <DialogTitle className="text-slate-12">Editar Produto</DialogTitle>
          <DialogDescription className="">
            Edite um produto existente no seu estoque.
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
                    <Input
                      placeholder="Item"
                      className="text-slate-12"
                      {...field}
                      required
                    />
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
                    <Input
                      placeholder="Quantidade"
                      className="text-slate-12"
                      type="number"
                      {...field}
                      required
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="expiration"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel className="text-slate-12">
                    Data de validade
                  </FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className=" pl-3 text-left font-normal text-slate-12 bg-[#05050a] hover:bg-[#05050a]"
                          >
                            {field.value ? (
                              dayjs(field.value).format("DD/MM/YYYY")
                            ) : (
                              <span>Selecione uma data</span>
                            )}
                            <CalendarDays className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto p-0 bg-[#05050a]"
                        align="start"
                      >
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                </FormItem>
              )}
            />
            <DialogFooter className="mt-8 flex flex-row justify-center gap-3">
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <LoaderCircle className="w-4 h-4 mr-2 animate-spin" />
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