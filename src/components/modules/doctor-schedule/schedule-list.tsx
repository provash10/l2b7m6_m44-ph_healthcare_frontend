"use client";

import { Suspense, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import type { ScheduleParams, ScheduleStatus } from "@/types";
import ScheduleTable from "./schedule-table";
import ScheduleListLoading from "./schedule-list-loading";
import ScheduleCreateDialog from "./schedule-create-dialog";

const statuses: ["ALL" | ScheduleStatus, string][] = [
  ["ALL", "All"],
  ["DRAFT", "Draft"],
  ["PUBLISHED", "Published"],
];

export default function ScheduleList() {
  const [tab, setTab] = useState<"ALL" | ScheduleStatus>("ALL");

  const queryParams: ScheduleParams = {
    sortOrder: "asc",
    ...(tab === "ALL" ? {} : { status: tab }),
  };

  return (
    <>
      <div className="my-5 flex flex-wrap items-center justify-between gap-3">
        <Tabs value={tab} onValueChange={(value) => setTab(value as "ALL" | ScheduleStatus)}>
          <TabsList>
            {statuses.map(([value, label]) => (
              <TabsTrigger key={value} value={value}>
                {label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <ScheduleCreateDialog />
      </div>

      <Suspense fallback={<ScheduleListLoading />}>
        <ScheduleTable {...queryParams} />
      </Suspense>
    </>
  );
}
