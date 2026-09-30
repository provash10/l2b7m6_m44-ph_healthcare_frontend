import { getMyProfile, userLogin, userLogout } from "@/api";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useLogin(){
    return useMutation({
        mutationFn : userLogin,
    });
}

export function useLogout(){
    return useMutation({
        mutationFn : userLogout,
    });
}

export function useGetMyProfile(){
    return useQuery({
        queryKey: ["user"],
        queryFn : getMyProfile,
        retry: false,
    })
}