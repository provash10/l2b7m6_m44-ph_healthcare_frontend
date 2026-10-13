"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "@/components/ui/toast";
import {
  useBookAppointment,
  useGetMe,
  useGetTodayScheduleByDoctor,
} from "@/hooks";
import apiClient from "@/lib/apiClient";
import type { BookingConfirmation, Schedule } from "@/types";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DoctorBooking({ doctorId }: { doctorId: string }) {
  const router = useRouter();

  const { data: me, isPending: mePending } = useGetMe();
  const { data, isPending, error } = useGetTodayScheduleByDoctor({ doctorId });
  const { mutate: book, isPending: bookingPending } = useBookAppointment();
  const [confirmation, setConfirmation] = useState<BookingConfirmation | null>(
    null
  );

  const schedules = data?.data ?? [];

  // Automatically check if logged-in patient already has a pending appointment for this doctor
  useEffect(() => {
    if (!me?.data) return;

    apiClient("/appointment/my-appointments?status=PENDING")
      .then((res: any) => {
        const pendingAppointments = res?.data || [];
        const existingForDoctor = pendingAppointments.find(
          (app: any) => app.doctorId === doctorId && app.status === "PENDING"
        );

        const existingUrl =
          existingForDoctor?.payment?.gatewayResponse?.bkashURL;

        if (existingUrl) {
          console.log(
            "%c👉 Payment URL (Existing Pending Booking): " + existingUrl,
            "color: #10b981; font-size: 16px; font-weight: bold;"
          );
          setConfirmation({
            paymentUrl: existingUrl,
            schedule: existingForDoctor?.schedule,
          });
        }
      })
      .catch(() => {
        // Silently ignore if not authorized or error
      });
  }, [doctorId, me?.data]);

  const handleBooking = (schedule: Schedule) => {
    if (!mePending && !me?.data) {
      router.push("/login");
      return;
    }

    book(
      { scheduleId: schedule.id },
      {
        onSuccess: (res) => {
          console.log(res);

          setConfirmation({ paymentUrl: res.data.paymentUrl, schedule });
        },
        onError: async (err: any) => {
          console.error("Booking error details:", err);

          let url =
            err?.data?.data?.paymentUrl ||
            err?.data?.paymentUrl;

          // If backend didn't attach paymentUrl in error body, fetch it directly from my-appointments
          if (!url) {
            try {
              const res: any = await apiClient(
                "/appointment/my-appointments?status=PENDING"
              );
              const pendingApps = res?.data || [];
              const pending = pendingApps.find(
                (item: any) =>
                  item.scheduleId === schedule.id || item.doctorId === doctorId
              );
              url = pending?.payment?.gatewayResponse?.bkashURL;
            } catch (fetchErr) {
              console.error("Failed to fetch pending payment:", fetchErr);
            }
          }

          if (url) {
            console.log(
              "%c👉 Payment URL (Pending Appointment): " + url,
              "color: #10b981; font-size: 16px; font-weight: bold;"
            );
            setConfirmation({ paymentUrl: url, schedule });
          }

          toast.add({
            title: "Booking Notice",
            description:
              err?.data?.message ||
              err?.message ||
              "You already have a pending appointment for this schedule.",
            type: "error",
          });
        },
      }
    );
  };

  if (isPending) {
    return <p className="text-sm text-muted-foreground">Loading schedules...</p>;
  }

  if (schedules.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No schedules available for today.
      </p>
    );
  }

  return (
    <>
    <div className="space-y-4">
      {confirmation?.paymentUrl && (
        <div className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 p-4 space-y-2">
          <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">
            Payment link generated! Click below to pay:
          </p>
          <a
            href={confirmation.paymentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition"
          >
            Pay with bKash
          </a>
        </div>
      )}

      <div className="space-y-3">
        {schedules.map((schedule) => (
          <div
            key={schedule.id}
            className="flex flex-wrap items-center justify-between gap-4 rounded-lg border p-4 shadow-xs"
          >
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <span className="font-medium text-foreground">
                {format(new Date(schedule.startDateTime), "EEEE MMM d, yyyy")}
              </span>
              <span className="text-muted-foreground text-xs">
                Starts at {format(new Date(schedule.startDateTime), "h:mm a")}
              </span>
              <span className="text-muted-foreground text-xs">
                Ends at {format(new Date(schedule.endDateTime), "h:mm a")}
              </span>
            </div>

            <Button
              disabled={bookingPending || schedule.availableSlots === 0}
              onClick={() => handleBooking(schedule)}
            >
              {bookingPending ? "Booking..." : "Book Now"}
            </Button>
          </div>
        ))}
      </div>
    </div>


    {/* dialog */}
    <Dialog open={!!confirmation} onOpenChange={(open) => {if(!open){
        setConfirmation(null);
    }}}>
        <DialogContent>
            <DialogHeader>
                  <DialogTitle>
                    Booking Successfull
                   </DialogTitle>  
                   <DialogDescription>
                    Please Pay within 15 minutes to keep yout booking.
                   </DialogDescription>
                   <span>
                    Date and Time:{" "} 
                    {confirmation? format(confirmation?.schedule.startDateTime!, "PPP")  : "-"}
                   </span>
            </DialogHeader>

            <DialogFooter>
                <Button variant="outline" onClick={() => setConfirmation(null)}>Pay Later</Button>
                <Button onClick={() => {
                    if (confirmation?.paymentUrl) {
                        window.location.href = confirmation.paymentUrl;
                    }
                }}>
                    Pay Now
                </Button>
            </DialogFooter>
            
        </DialogContent>
    </Dialog>
    </>
  );
}
