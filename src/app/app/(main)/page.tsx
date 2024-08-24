'use client'
import { SignOutButton, UserButton } from "@clerk/nextjs";
import { useAuth } from "@clerk/nextjs";
import { useEffect } from "react";
export default function Page() {
  const { isSignedIn } = useAuth();

  useEffect(() => {
    if (isSignedIn) {
      fetch("/api/create-user", {
        method: "POST",
      });
    }
  }, [isSignedIn]);

  return (
    <div className="flex justify-center items-center h-screen">
      <h1>Dashboard</h1>
      <SignOutButton redirectUrl="/auth/sign-in" />
    </div>
  )
}