import { PropsWithChildren } from "react";
import { MainSidebar } from "./_components/main-sidebar";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="grid grid-cols-[16rem_1fr]">
      <MainSidebar />
      <main>
        <div>
          <div className="border-b border-[#252529] h-[60px] ">Header</div>
          {children}
        </div>
      </main>
    </div>
  );
}
