"use client";

import Link from "next/link";
import Logo from "@/assets/svg/logo";
import { Button } from "@/components/ui/button";
import { useGetMyProfile, useLogout } from "@/hooks";
import { toast } from "@/components/ui/toast";
import { useQueryClient } from "@tanstack/react-query";

export default function Header() {
  const routes = [
    { name: "Home", url: "/" },
    { name: "About us", url: "/about-us" },
  ];

  //have any user? 45-5 cls
  const {data, isLoading} = useGetMyProfile();
  const {mutate: logout} = useLogout()
  const queryClient = useQueryClient();

  const handleLogout = () => {
    logout(undefined,{
      onSuccess: () =>{
        toast.add({
          title:"Tata",
          description: "Logged Out Successfully",
          type: "success"
        });
        queryClient.removeQueries({
          queryKey:["user"]
        })
      },
      onError: () =>{
        toast.add({
          title:"Logout Failed",
          description: "Something Went Wrong",
          type: "error",
        });
      }
    });
  };

  return (
    <header className="w-full h-16 border border-b">
      <div className="flex justify-between items-center h-full max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <Logo />
          <span>PH Healthcare</span>
        </div>
        <nav className="flex gap-5">
          {routes.map((route) => (
            <Link key={route.url} href={route.url}>
              {route.name}
            </Link>
          ))}
        </nav>
        {/* <div>
          <Button
            variant="outline"
            render={<Link href="/login">Login</Link>}
            nativeButton={false}
          >
            login
          </Button>
        </div> */}

        <div>
          {!isLoading && !data &&(
            <Button
            variant="outline"
            render={<Link href="/login">Login</Link>}
            nativeButton={false}
          >
            login
          </Button>
          )}

          {/* logout */}
          {!isLoading && data &&(
            <Button onClick={handleLogout}
            variant="destructive"
          >
            logout
          </Button>
          )}
        </div>

      </div>
    </header>
  );
}
