import { PropsWithChildren } from "react";
import { MainSidebar } from "./_components/main-sidebar";
import { Header } from "./_components/header";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col-reverse lg:flex-row">
      <MainSidebar />
      <main className="w-full">
        <div>
          <Header />
          {children}
        </div>
      </main>
    </div>
  );
}
