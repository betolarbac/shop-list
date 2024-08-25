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

export function MainSidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };


  return (
    <DashboardSidebar>
      <DashboardSidebarHeader>Logo</DashboardSidebarHeader>
      <DashboardSidebarMain className="flex flex-col flex-grow">
        <DashboardSidebarNav>
          <DashboardSidebarNavMain>
            <DashboardSidebarNavLink href="/app" active={isActive("/app")}>
              Produtos
            </DashboardSidebarNavLink>
            <DashboardSidebarNavLink
              href="/app/expiration"
              active={pathname.startsWith("/app/expiration")}
            >
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
  );
}
