"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DoctorApprovalTable from "./doctor-approval-table";
import { Suspense, useState } from "react";
import DoctorApprovalTableLoading from "./doctor-approval-table-loading";
import type { DoctorParams, DoctorVerificationStatus } from "@/types";
import { Input } from "@/components/ui/input";

const verificationStatus: ["ALL" | DoctorVerificationStatus, string][] = [
  // tuple
  ["APPROVED", "Approved"],
  ["PENDING", "Pending"],
  ["REJECTED", "Rejected"],
  ["ALL", "All"],
];

export default function DoctorApprovalTabs() {
  const [tab, settab] = useState<"ALL" | DoctorVerificationStatus>("ALL");
  console.log(tab);

  const queryParams: DoctorParams = {
    page: 1,
    limit: 10,
    // verificationStatus: tab === "ALL" ? undefined : tab,
    ...(tab === "ALL" ? {} : {verificationStatus : tab})
  };

  return (
    <>
    <div className="flex justify-between items-center my-5">
      <div>
        <Input type="search" placeholder="Search By Name or Email"/>
      </div>
      <Tabs value={tab} onValueChange={(value) => settab(value as "ALL" | DoctorVerificationStatus)}>
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
      <DoctorApprovalTable  {...queryParams}/>
     
      {/* // verificationStatus={tab} 
      // page={1} 
      // limit={10}
      // searchTerm={"asdef"} */}

    </Suspense>

    </>
  );
}