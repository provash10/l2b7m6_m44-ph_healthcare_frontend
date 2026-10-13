"use client";

import { Button } from "@/components/ui/button";
import { useGetMe, useGetTodayScheduleByDoctor } from "@/hooks";
import { useRouter } from "next/navigation";

export default function DoctorBooking({ doctorId }: { doctorId: string }) {
  const router = useRouter();

  const { data: me, isPending: mePending } = useGetMe();
  const { data, isPending } = useGetTodayScheduleByDoctor({ doctorId });

  console.log(data);

  const handleBooking = () => {
    if (!mePending && !me?.data) {
      router.push("/login");
      return;
    }
  };

  return (
    <div>
      <Button onClick={() => handleBooking()}>Book Now</Button>
    </div>
  );
}
