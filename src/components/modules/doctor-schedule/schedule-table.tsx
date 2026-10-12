import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import type { Schedule, ScheduleParams } from "@/types";
import { useSuspenseGetMySchedules } from "@/hooks";
import ScheduleDetailSheet from "./schedule-detail-sheet";

interface Props extends ScheduleParams {}

function formatDateTime(value: string) {
  return new Date(value).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default function ScheduleTable(params: Props) {
  const { data } = useSuspenseGetMySchedules(params);
  const schedules: Schedule[] = data?.data || [];
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(null);

  if (schedules.length === 0) {
    return (
      <div className="rounded-lg border p-10 text-center text-sm text-muted-foreground">
        No schedules found. Create your first schedule to start accepting
        appointments.
      </div>
    );
  }

  return (
    <>
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date & Time</TableHead>
              <TableHead>Slots</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {schedules.map((schedule) => (
              <TableRow key={schedule.id}>
                <TableCell>
                  <div className="font-medium">
                    {formatDateTime(schedule.startDateTime)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    to {formatDateTime(schedule.endDateTime)}
                  </div>
                </TableCell>
                <TableCell>
                  {schedule.totalSlots - schedule.availableSlots}/
                  {schedule.totalSlots} booked
                </TableCell>
                <TableCell>
                  <span
                    className={
                      schedule.status === "PUBLISHED"
                        ? "text-green-600"
                        : "text-amber-600"
                    }
                  >
                    {schedule.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedSchedule(schedule)}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <ScheduleDetailSheet
        schedule={selectedSchedule}
        open={!!selectedSchedule}
        onClose={() => setSelectedSchedule(null)}
      />
    </>
  );
}
