import { Logo } from "@/components/logo";
import { Separator } from "@/components/ui/separator";
import { InstagramLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";

export function Footer() {
  return (
    <div className="flex gap-8 flex-col md:max-w-[1220px] mx-auto py-16 px-4">
      <div className="flex flex-row justify-between">
        <Logo />

        <div className="flex gap-8">
          <TwitterLogoIcon className="w-4 h-4 text-muted-foreground" />
          <InstagramLogoIcon className="w-4 h-4 text-muted-foreground" />
        </div>
      </div>

      <Separator orientation="horizontal" />

      <div>
        <p className="text-white">© 2024 ShopList. Todos os direitos reservados.</p>
      </div>
    </div>
  );
}
