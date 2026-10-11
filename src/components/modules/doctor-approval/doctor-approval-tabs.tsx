"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DoctorApprovalTable from "./doctor-approval-table";
import { Suspense, useState } from "react";
import DoctorApprovalTableLoading from "./doctor-approval-table-loading";
import { DoctorVerificationStatus } from "@/types/doctor.type";
import { Input } from "@/components/ui/input";

const verificationStatus: ["All" | DoctorVerificationStatus, string][] = [
//  tuple
  ["APPROVED", "Approved"],
  ["PENDING", "Pending"],
  ["REJECTED", "Rejected"],
  ["All", "All"],
];

export default function DoctorApprovalTabs() {
  const [tab, settab] = useState("All");

  console.log(tab);

  return (
    <>
    <div className="flex justify-between items-center my-5">
      <div>
        <Input type="search" placeholder="Search By Name or Email"/>
      </div>
      <Tabs value={tab} onValueChange={(value) => settab(value)}>
      <TabsList>
        {/* {verificationStatus.map((status)=>
        <TabsTrigger value={status}>{status}</TabsTrigger>
        )} */}

        {verificationStatus.map(([value, label]) => (
          <TabsTrigger key={value} value={value}>
            {label}
          </TabsTrigger>
        ))}


        {/* <TabsTrigger value="pending">Pending</TabsTrigger>
        <TabsTrigger value="approved">Approved</TabsTrigger>
        <TabsTrigger value="rejected">Rejected</TabsTrigger>
        <TabsTrigger value="all">All</TabsTrigger> */}
      </TabsList>
    </Tabs>
    </div>

    {/* <Suspense fallback={<p>Loading...</p>}>
      <DoctorApprovalTable/>
    </Suspense> */}

    <Suspense fallback={<DoctorApprovalTableLoading/>}>
      <DoctorApprovalTable/>
    </Suspense>

    </>
  );
}