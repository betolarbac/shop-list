import { useAuth, useUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  LogOut,
  CircleUser,
  Link2,
  SunMoon,
  ChevronsUpDown,
} from "lucide-react";
import { SignOutButton } from "@clerk/nextjs";
import Link from "next/link";

export function UserInfo() {
  const { user, isLoaded } = useUser();
  const { isSignedIn } = useAuth();

  useEffect(() => {
    if (isSignedIn) {
      fetch("/api/create-user", {
        method: "POST",
      });
    }
  }, [isSignedIn]);

  return (
    <>
      {isLoaded ? (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex gap-3 items-center delay-100 hover:bg-[#d3edf81d] py-2 px-3 rounded-md cursor-pointer">
                <div>
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={user?.imageUrl} alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </div>

                <div className="hidden lg:block">
                  <h2 className="flex items-center justify-between text-base capitalize leading-5 line-clamp-1 text-slate-11">
                    {user?.fullName || user?.username}
                    <ChevronsUpDown className="w-[18px] h-[18px]" />
                  </h2>
                  <p className="text-sm line-clamp-1 text-slate-11">
                    {user?.emailAddresses[0]?.emailAddress}
                  </p>
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 p-2 bg-[#05050a] text-slate-11">
              <DropdownMenuItem
                disabled
                className="flex h-8 cursor-pointer items-center gap-1.5 rounded px-2 text-sm font-semibold "
              >
                <SunMoon className="w-[18px] h-[18px]" />
                Toggle thema
              </DropdownMenuItem>

              <Link href="/">
                <DropdownMenuItem className="flex h-8 cursor-pointer items-center gap-1.5 rounded px-2 text-sm font-semibold hover:bg-[#d3edf81d]">
                  <Link2 className="w-[18px] h-[18px]" />
                  Homepage
                </DropdownMenuItem>
              </Link>

              <Link href="/app/profile">
                <DropdownMenuItem className="flex h-8 cursor-pointer items-center gap-1.5 rounded px-2 text-sm font-semibold hover:bg-[#d3edf81d]">
                  <CircleUser className="w-[18px] h-[18px]" />
                  Perfil
                </DropdownMenuItem>
              </Link>
              <SignOutButton>
                <DropdownMenuItem className="flex h-8 cursor-pointer items-center gap-1.5 rounded px-2 text-sm font-semibold hover:bg-[#d3edf81d]">
                  <LogOut className="w-[18px] h-[18px]" />
                  Log out
                </DropdownMenuItem>
              </SignOutButton>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      ) : (
        <div className="flex gap-3 items-center py-2 px-3">
          <Skeleton className="h-8 w-8 rounded-full" />
          <div className="space-y-2 hidden lg:block">
            <Skeleton className="h-4 w-[152px]" />
            <Skeleton className="h-4 w-[152px]" />
          </div>
        </div>
      )}
    </>
  );
}
