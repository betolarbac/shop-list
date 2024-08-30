import { useAuth, useUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect } from "react";

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
        <div className="flex gap-3 items-center">
          <div>
            <Avatar className="w-8 h-8">
              <AvatarImage src={user?.imageUrl} alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>

          <div>
            <h2 className="text-base capitalize leading-5 line-clamp-1">
              {user?.fullName}
            </h2>
            <p className="text-sm line-clamp-1">
              {user?.emailAddresses[0]?.emailAddress}
            </p>
          </div>
        </div>
      ) : (
        <div className="flex gap-3 items-center">
          <Skeleton className="h-8 w-8 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[152px]" />
            <Skeleton className="h-4 w-[152px]" />
          </div>
        </div>
      )}
    </>
  );
}
