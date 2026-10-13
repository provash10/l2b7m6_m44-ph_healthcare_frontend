"use client";

import { BriefcaseBusiness, GraduationCap, Stethoscope } from "lucide-react";
import Link from "next/link";
import { type Dispatch, type SetStateAction, Suspense, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import TablePagination from "@/components/ui/table-pagination";
import { useSuspenseGetPublicDoctors } from "@/hooks";
import type { PublicDoctorParams } from "@/types";

const SKELETON_ITEMS = ["s1", "s2", "s3", "s4", "s5", "s6"];

function PublicDoctorListLoading() {
  return (
    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {SKELETON_ITEMS.map((key) => (
        <Card key={key} className="space-y-4 p-6">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <div className="space-y-2 pt-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
          <Skeleton className="h-10 w-full mt-4" />
        </Card>
      ))}
    </div>
  );
}

export default function PublicDoctorList() {
  const [page, setPage] = useState(1);

  const queryParams: PublicDoctorParams = {
    page,
    limit: 100,
  };

  return (
    <div>
      <Suspense fallback={<PublicDoctorListLoading />}>
        <PublicDoctorGrid {...queryParams} onPageChange={setPage} />
      </Suspense>
    </div>
  );
}

function PublicDoctorGrid({
  onPageChange,
  ...params
}: PublicDoctorParams & {
  onPageChange: Dispatch<SetStateAction<number>> | ((page: number) => void);
}) {
  const { data } = useSuspenseGetPublicDoctors(params);

  const doctors = data?.data ?? [];

  if (doctors.length === 0) {
    return (
      <p className="py-10 text-center text-muted-foreground">
        No doctors found.
      </p>
    );
  }

  return (
    <div className="mt-6 space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {doctors.map((doctor) => (
          <Card key={doctor.id}>
            <CardHeader>
              <CardTitle>{doctor.name}</CardTitle>
              <CardDescription className="flex items-center gap-1.5">
                <Stethoscope className="size-3.5" />
                {doctor.specialization}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-muted-foreground">
              <p className="flex items-center gap-1.5">
                <GraduationCap className="size-4 shrink-0" />
                {doctor.qualifications}
              </p>
              <p className="flex items-center gap-1.5">
                <BriefcaseBusiness className="size-4 shrink-0" />
                {doctor.experienceYears}{" "}
                {doctor.experienceYears === 1 ? "year" : "years"} of experience
              </p>
            </CardContent>
            <CardFooter>
              <Link href={`/doctors/${doctor.id}`} className="w-full">
                <Button className="w-full">View Profile</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
      <TablePagination
        page={params.page ?? 1}
        totalPages={data?.meta?.totalPages ?? 1}
        handlePageChange={onPageChange}
      />
    </div>
  );
}

export { PublicDoctorList as DoctorList };
