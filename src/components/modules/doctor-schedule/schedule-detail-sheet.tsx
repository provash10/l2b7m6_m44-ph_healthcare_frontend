"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import type { Schedule } from "@/types";

interface Props {
  schedule?: Schedule | null;
  open: boolean;
  onClose: (open: boolean) => void;
}

export default function ScheduleDetailSheet({
  schedule,
  open,
  onClose,
}: Props) {
  if (!schedule) return null;
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="p-6 sm:max-w-md">
        <SheetHeader className="p-0">
          <SheetTitle className="text-lg font-semibold">Schedule details</SheetTitle>
          <SheetDescription>
            {new Date(schedule.startDateTime).toLocaleDateString(undefined, {
              dateStyle: "full",
            })}
          </SheetDescription>
        </SheetHeader>
        <dl className="mt-6 flex flex-col gap-3 text-sm">
          <div className="flex justify-between items-center py-2 border-b border-border/50">
            <dt className="text-muted-foreground font-medium">Start</dt>
            <dd className="font-semibold text-foreground">
              {new Date(schedule.startDateTime).toLocaleTimeString(undefined, {
                timeStyle: "short",
              })}
            </dd>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-border/50">
            <dt className="text-muted-foreground font-medium">End</dt>
            <dd className="font-semibold text-foreground">
              {new Date(schedule.endDateTime).toLocaleTimeString(undefined, {
                timeStyle: "short",
              })}
            </dd>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-border/50">
            <dt className="text-muted-foreground font-medium">Status</dt>
            <dd>
              <span
                className={
                  schedule.status === "PUBLISHED"
                    ? "font-semibold text-green-600"
                    : "font-semibold text-amber-600"
                }
              >
                {schedule.status}
              </span>
            </dd>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-border/50">
            <dt className="text-muted-foreground font-medium">Slots</dt>
            <dd className="font-medium text-foreground">
              {schedule.totalSlots - schedule.availableSlots}/
              {schedule.totalSlots} booked
            </dd>
          </div>
          <div className="flex justify-between items-center py-2">
            <dt className="text-muted-foreground font-medium">Meeting link</dt>
            <dd className="truncate">
              <a
                href={schedule.meetingLink}
                target="_blank"
                rel="noreferrer"
                className="font-medium text-primary underline underline-offset-4 hover:opacity-80"
              >
                Join
              </a>
            </dd>
          </div>
        </dl>
      </SheetContent>
    </Sheet>
  );
}
