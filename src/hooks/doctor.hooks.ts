import { applyAsdoctor } from "@/api";
import { useMutation } from "@tanstack/react-query";

export function useApplyAsDoctor(){
    return useMutation({
        mutationFn: applyAsdoctor
    })
}