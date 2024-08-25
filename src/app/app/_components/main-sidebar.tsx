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
import { currentUser } from "@clerk/nextjs/server";
import { usePathname } from "next/navigation";
export async function MainSidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  const user = await currentUser()

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

        <DashboardSidebarNav className="mt-auto">
          <DashboardSidebarNavMain>
            <DashboardSidebarNavLink href="/">
              Suporte
            </DashboardSidebarNavLink>
            <DashboardSidebarNavLink href="/">Settings</DashboardSidebarNavLink>
          </DashboardSidebarNavMain>
        </DashboardSidebarNav>
      </DashboardSidebarMain>

      <DashboardSidebarFooter>
        <h1>user name</h1>
      </DashboardSidebarFooter>
    </DashboardSidebar>
  );
}
