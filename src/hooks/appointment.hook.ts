import { bookAppointment } from "@/api";
import { useMutation } from "@tanstack/react-query";

export function useBookAppointment() {
  return useMutation({
    mutationFn: bookAppointment,
  });
}
