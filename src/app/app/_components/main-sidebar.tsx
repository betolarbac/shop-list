"use client";

import {
  DashboardSidebar,
  DashboardSidebarHeader,
  DashboardSidebarMain,
  DashboardSidebarNav,
  DashboardSidebarNavMain,
  DashboardSidebarNavLink,
  DashboardSidebarFooter,
} from "@/components/dashboard/sidebar";
import { usePathname } from "next/navigation";
import { UserInfo } from "./user-info";
import { ShoppingBasket, CalendarDays } from "lucide-react";
import { Logo } from "@/components/logo";

export function MainSidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <>
      <DashboardSidebar className="hidden lg:flex">
        <DashboardSidebarHeader>
          <Logo />
        </DashboardSidebarHeader>
        <DashboardSidebarMain className="flex flex-col flex-grow">
          <DashboardSidebarNav>
            <DashboardSidebarNavMain>
              <DashboardSidebarNavLink
                href="/app"
                active={isActive("/app")}
                className="gap-2"
              >
                <ShoppingBasket className="w-[18px] h-[18px] text-slate-11" />
                Produtos
              </DashboardSidebarNavLink>
              <DashboardSidebarNavLink
                className="gap-2"
                href="/app/expiration"
                active={pathname.startsWith("/app/expiration")}
              >
                <CalendarDays className="w-[18px] h-[18px]" />
                Vencimento
              </DashboardSidebarNavLink>
            </DashboardSidebarNavMain>
          </DashboardSidebarNav>

          {/* Sidebar footer 
        <DashboardSidebarNav className="mt-auto">
          <DashboardSidebarNavMain>
            <DashboardSidebarNavLink href="/">Suporte</DashboardSidebarNavLink>
            <DashboardSidebarNavLink href="/">Settings</DashboardSidebarNavLink>
          </DashboardSidebarNavMain>
        </DashboardSidebarNav>
        */}
        </DashboardSidebarMain>

        <DashboardSidebarFooter>
          <UserInfo />
        </DashboardSidebarFooter>
      </DashboardSidebar>

      <div className="flex h-[60px] border-t border-[#292525] justify-center items-center gap-2 fixed bottom-0 w-full bg-[#05050a] z-10 lg:hidden">
        <div className="flex">
          <DashboardSidebarNavLink
            href="/app"
            active={isActive("/app")}
            className="h-[40px] p-2"
          >
            <ShoppingBasket className="w-[28px] h-[21px] text-slate-11" />
          </DashboardSidebarNavLink>

          <DashboardSidebarNavLink
            className="h-[40px] p-2"
            href="/app/expiration"
            active={pathname.startsWith("/app/expiration")}
          >
            <CalendarDays className="w-[28px] h-[21px]" />
          </DashboardSidebarNavLink>
        </div>

        <UserInfo />
      </div>
    </>
  );
}
