"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LogIn } from "lucide-react";
import { Header } from "./_components/header";
import { BorderBeam } from "@/components/ui/border-beam";
import Feature from "./_components/feature-section";
import { Footer } from "./_components/footer";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <Header />

      <section className="h-[35rem] w-full rounded-md bg-transparent relative flex flex-col items-center justify-center antialiased animate-fade-up animate-once">
        <span className="text-xs uppercase text-primary font-semibold mx-auto text-center rounded-md bg-primary/10 p-2 mb-2 inline-block">
          Gerencie seus produtos
        </span>
        <h1 className="relative z-10 mb-6 max-w-4xl mx-auto text-4xl/tight font-bold text-center md:text-6xl/tight md:mb-6 text-transparent bg-clip-text xl:bg-gradient-to-br from-foreground via-foreground to-zinc-600 text-white xl:text-transparent">
          Organize suas compras e vencimentos com facilidade!
        </h1>
        <h2 className="relative z-10 max-w-2xl mx-auto text-center text-muted-foreground text-lg md:text-xl">
          Gerencie suas compras e vencimentos de forma eficiente, cadastre e
          monitore os produtos que estão próximos de vencer.
        </h2>

        <div className="z-10 flex items-center justify-center gap-6 mt-8 md:mt-14 flex-col md:flex-row">
          <Button className="gap-1 transition duration-300 ease-in-out" asChild>
            <Link href="/auth/sign-in">
              <LogIn className="w-4 h-4" />
              <span>Iniciar teste grátis</span>
            </Link>
          </Button>
        </div>
      </section>

      <section className="flex justify-center animate-fade-up animate-once container relative">
        <div className="relative md:w-[1220px] md:h-[765px] rounded-lg">
          <Image
            src="/hero.png"
            alt="hero-section"
            width={1220}
            height={765}
            className="h-full w-full rounded-lg object-cover md:w-[1220px] border-4"
            style={{
              maskImage: `linear-gradient(to top, transparent, black 20%)`,
            }}
          />

          <BorderBeam duration={6} delay={9} className="hidden xl:block" />
        </div>
      </section>

      <Feature />

      <Footer />
    </main>
  );
}
