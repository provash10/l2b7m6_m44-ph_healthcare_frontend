// export default function RoleGuard(){
//     return(
//         <div>
//             <h1>role-guard component</h1>
//         </div>
//     )
// }

"use client";

import { useGetMe } from "@/hooks";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import AuthLoading from "./auth-loading";
import AccessDenied from "./access-denied";
import { UserRole } from "@/types";

interface IProps {
    children: ReactNode
    roles: UserRole[]
}

export default function RoleGuard({ children, roles }: IProps) {
  const router = useRouter();

  // Fetch logged in user profile data
  const { data, isPending, isError } = useGetMe();

  const user = data?.data;

  const isAuthorized = !!user && roles.includes(user.role);

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

  if (isAuthorized) {
    return <>{children}</>;
  }

  return <AccessDenied />;
}
