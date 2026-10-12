"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DoctorApprovalTable from "./doctor-approval-table";
import { type ChangeEvent, Suspense, useState } from "react";
import DoctorApprovalTableLoading from "./doctor-approval-table-loading";
import type { DoctorParams, DoctorVerificationStatus } from "@/types";
import { Input } from "@/components/ui/input";
import DoctorReviewSheet from "./doctor-review-sheet";
import useDebounce from "@/hooks/debounce.hook";
import TablePagination from "@/components/ui/table-pagination";

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

  const [selectedId, setSelectedId] = useState("");

  const [searchInput, setSearchInput] = useState("");
  const debounceSearch = useDebounce(searchInput);
  console.log({searchInput,debounceSearch});
    const [page, setPage] = useState(1);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    setPage(1);
  };



  const queryParams: DoctorParams = {
    // page: 1,
    // limit: 10,
    page : page,
    limit: 10,
    ...(tab === "ALL" ? {} : { verificationStatus: tab }),
    ...(debounceSearch ? { searchTerm: debounceSearch } : {}),
  };

  return (
    <>
    <div className="flex justify-between items-center my-5">
      
      <div>
        {/* <Input onChange={(e) => setSearchInput(e.target.value)}  */}
         <Input onChange={(e) => handleSearch(e)} 
        type="search" placeholder="Search By Name or Email"/>
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
      <DoctorApprovalTable
        {...queryParams}
        handleReview={setSelectedId}
        handlePageChange={setPage}
      />
     
      {/* // verificationStatus={tab} 
      // page={1} 
      // limit={10}
      // searchTerm={"asdef"} */}

    </Suspense>

    

    <DoctorReviewSheet 
      {...queryParams}
      selectedId = {selectedId}
      onClose = {() => setSelectedId("")} />

    </>
  );
}