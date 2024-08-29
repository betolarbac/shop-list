import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusIcon } from "@radix-ui/react-icons";

export function ProductUpsertDialog() {
  return (
    <Dialog >
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
        <div className="grid gap-4 py-4">
          <div className="flex flex-col items-start gap-4">
            <Label htmlFor="name" className="text-right">
              Item
            </Label>
            <Input id="name" placeholder="Item" className="col-span-3" />
          </div>
          <div className="flex flex-col items-start gap-4">
            <Label htmlFor="username" className="text-right">
              Quantidade
            </Label>
            <Input id="username" placeholder="Quantidade"  className="col-span-3" />
          </div>

          <div className="flex flex-col items-start gap-4">
            <Label htmlFor="username" className="text-right">
              Valor
            </Label>
            <Input id="username" placeholder="Valor"  className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Salvar</Button>

          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancelar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
