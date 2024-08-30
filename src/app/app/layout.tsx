import { PropsWithChildren } from "react";
import { MainSidebar } from "./_components/main-sidebar";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="flex">
      <MainSidebar />
      <main className="w-full">
        <div>
          <div className="border-b border-[#252529] h-[60px] ">Header</div>
          {children}
        </div>
      </main>
    </div>
  );
}
