"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import CreateScheduleForm from "@/components/form/create-schedule-form";

export default function ScheduleCreateDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg">Create Schedule</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Schedule</DialogTitle>
          <DialogDescription>
            This Schedule Will Be Visible To Patient
          </DialogDescription>
        </DialogHeader>
        <CreateScheduleForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}