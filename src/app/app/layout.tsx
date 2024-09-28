import { PropsWithChildren } from "react";
import { MainSidebar } from "./_components/main-sidebar";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col-reverse lg:flex-row">
      <MainSidebar />
      <main className="w-full">
        <div>
          <div className="border-b border-[#252529] h-[60px] hidden lg:flex">Header</div>
          {children}
        </div>
      </main>
    </div>
  );
}
