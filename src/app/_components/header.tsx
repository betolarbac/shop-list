import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LogIn, UserPlus } from "lucide-react";
import Particles from "@/components/ui/particles";

export function Header() {
  return (
    <header className="flex justify-center items-center pt-4 gap-2">
      <div className="px-4">
        <Logo />
      </div>

      <Button asChild variant={"link"} className="text-slate-12 hidden lg:block">
        <Link href="#">Recursos</Link>
      </Button>

      <Button asChild variant={"link"} className="text-slate-12 hidden lg:block">
        <Link href="#">Planos</Link>
      </Button>

      <Button
        variant={"ghost"}
        className="gap-1 transition duration-300 ease-in-out text-slate-12"
        asChild
      >
        <Link href="/auth/sign-in">
          <LogIn className="w-4 h-4" />
          <span>Entrar</span>
        </Link>
      </Button>

      <Button
        className="gap-1 transition duration-300 ease-in-out text-slate-12"
        variant={"outline"}
        asChild
      >
        <Link href="/auth/sign-up">
          <UserPlus className="w-4 h-4" />
          <span>Criar Conta</span>
        </Link>
      </Button>

      <Particles
        className="absolute inset-0"
        quantity={300}
        ease={80}
        color="#ffffff"
        refresh
      />
    </header>
  );
}
