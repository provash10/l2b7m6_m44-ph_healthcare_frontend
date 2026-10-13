import apiClient from "@/lib/apiClient";
import type {
  ApiResponse,
  BookAppointmentPayload,
  BookAppointmentResponse,
} from "@/types";

export function bookAppointment(payload: BookAppointmentPayload) {
  return apiClient<ApiResponse<BookAppointmentResponse>>(
    "/appointment/book-appointment",
    {
      method: "POST",
      body: payload,
    },
  );
}
