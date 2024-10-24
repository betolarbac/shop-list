import { ShoppingCart } from "lucide-react";

export function Logo() {
  return (
    <div className="flex gap-2 ">
      <div className="bg-slate-12 h-6 w-6 flex items-center justify-center rounded-md p-1">
        <ShoppingCart className="w-[18px] h-[18px]  text-black" />
      </div>
      <h4 className="text-slate-12">ShopList</h4>
    </div>
  );
}
