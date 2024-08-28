import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function UserInfo() {
  const { user } = useUser();

  console.log("usuario", user);

  return (
    <div className="flex gap-3 items-center">
      <div>
        <Avatar className="w-8 h-8">
          <AvatarImage src={user?.imageUrl} alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>

      <div>
        <h2 className="text-base capitalize leading-5 line-clamp-1">{user?.fullName}</h2>
        <p className="text-sm line-clamp-1">{user?.emailAddresses[0]?.emailAddress}</p>
      </div>
    </div>
  );
}
