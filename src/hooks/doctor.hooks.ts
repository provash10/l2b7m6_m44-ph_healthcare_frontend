import { applyAsdoctor, verifyAccount } from "@/api";
import { useMutation } from "@tanstack/react-query";

export function useApplyAsDoctor(){
    return useMutation({
        mutationFn: applyAsdoctor
    })
}

export function useVerifyDoctorAccount(){
    return useMutation({
        mutationFn: verifyAccount
    })
}