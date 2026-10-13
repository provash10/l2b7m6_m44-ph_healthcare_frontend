"use client";

import { useGetAllPublicDoctors } from "@/hooks";
import Link from "next/link";

export default function DoctorList() {
  const { data, isLoading, isError } = useGetAllPublicDoctors({
    limit: 100,
    page: 1,
  });

  console.log("Doctor list data:", data);

  const doctorList = data?.data || [];

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto my-10 p-4 text-muted-foreground">
        Loading doctors...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-7xl mx-auto my-10 p-4 text-red-500">
        ⚠️ Backend server-এ কানেক্ট হতে পারছে না। দয়া করে নিশ্চিত করুন আপনার Backend
        server (Port 5000) চালু আছে।
      </div>
    );
  }

  if (doctorList.length === 0) {
    return (
      <div className="max-w-7xl mx-auto my-10 p-4 text-muted-foreground">
        কোনো ডাক্তার পাওয়া যায়নি।
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto my-10">
      <div className="flex gap-3">
        {doctorList.map((doctor) => (
          <Link
            key={doctor.id}
            href={`/doctors/${doctor.id}`}
            className="font-medium hover:underline"
          >
            {doctor.name}
          </Link>
        ))}
      </div>
    </div>
  );
}