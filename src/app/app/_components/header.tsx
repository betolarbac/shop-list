import { Button } from "@/components/ui/button";
import { MessageCircleMore } from "lucide-react";
import Link from "next/link";

export function Header() {
  return (
    <div className="border-b border-[#252529] h-[60px] hidden lg:flex items-center justify-end px-6 gap-4">
      <Button className="bg-[#ddeaf814] hover:bg-[#d3edf81d] border lg:gap-1 transition duration-200 ease-in-out">
        <MessageCircleMore className="w-4 h-4 mr-2 lg:mr-0 text-[#70757E] " />
        <span className="text-slate-11">FeedBack</span>
      </Button>

      <Link href="#">
        <span className="text-sm transition duration-200 ease-in-out text-slate-11 hover:text-slate-12">Help</span>
      </Link>
    </div>
  );
}
