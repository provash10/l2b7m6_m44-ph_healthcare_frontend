"use client";

import { useGetMe } from "@/hooks";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import AuthLoading from "./auth-loading";

export default function AuthGuard({ children }: { children: ReactNode }) {
  const router = useRouter();

  // Fetch logged in user profile data
  const { data, isPending, isError } = useGetMe();

  const user = data?.data;

  console.log(user)

  useEffect(() => {
    // Wait until profile query finishes loading
    if (isPending) {
      return;
    }

    // Redirect to login if request fails or user does not exist
    if (isError || !user) {
      router.replace("/login");
    }
  }, [isPending, isError, user, router]);

  if (isPending) {
    return <AuthLoading />;
  }

  if (isError || !user) {
    return <AuthLoading label="Redirecting..." />;
  }

  return <>{children}</>;
}
