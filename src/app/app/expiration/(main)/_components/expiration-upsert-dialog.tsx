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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CirclePlus, LoaderCircle, CalendarDays } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { upsertExpirationSchema } from "../schema";
import { upsertExpiration } from "../action";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import { unknown } from "zod";

dayjs.locale("pt-br");

export function ExpirationUpsertDialog() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(upsertExpirationSchema),
    defaultValues: {
      id: "",
      title: "",
      amount: undefined,
      expiration: "" as unknown as Date,
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      setLoading(true);
      await upsertExpiration(data);

      setOpen(false);
      router.refresh();
      form.reset();
    } catch (error) {
      console.error("Erro ao salvar item:", error);
    } finally {
      setLoading(false);
    }
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className=" text-xs lg:text-sm px-2 lg:px-4">
          <CirclePlus className="w-4 h-4 mr-2 lg:mr-3" />
          Adicionar produto
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[345px] rounded-lg lg:max-w-[425px] bg-[#05050a]">
        <DialogHeader>
          <DialogTitle className="text-slate-12">Adicionar Produto</DialogTitle>
          <DialogDescription className="">
            Adicione um novo produto ao seu estoque. Insira o nome do produto, a
            quantidade e a data de validade.
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
