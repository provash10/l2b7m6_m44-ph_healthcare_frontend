"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DoctorApprovalTable from "./doctor-approval-table";

export default function DoctorApprovalTabs() {
  return (
    <Tabs defaultValue="pending">
      <TabsList>
        <TabsTrigger value="pending">Pending</TabsTrigger>
        <TabsTrigger value="approved">Approved</TabsTrigger>
        <TabsTrigger value="rejected">Rejected</TabsTrigger>
        <TabsTrigger value="all">All</TabsTrigger>
      </TabsList>
      <TabsContent value="pending">
        {/* Pending Table */}
        <DoctorApprovalTable/>
        </TabsContent>
      <TabsContent value="approved">
        {/* Approved Table */}
        <DoctorApprovalTable/>
        </TabsContent>
      <TabsContent value="rejected">
        {/* Rejected Table */}
        <DoctorApprovalTable/>
        </TabsContent>
      <TabsContent value="all">
        {/* All Table */}
        <DoctorApprovalTable/>
        </TabsContent>
    </Tabs>
  );
}