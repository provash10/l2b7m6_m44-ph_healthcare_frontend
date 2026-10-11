"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { useGetAllDoctors } from "@/hooks";
import { DoctorParams } from "@/types";
import { useState } from "react";

interface Props extends DoctorParams{
  selectedId : string;
  onClose : () => void;
}

export default function DoctorReviewSheet(
  { selectedId, onClose, ...params }:
   Props) {

    const [confirmRejection,setConfirmRejection] = useState(false);

  const {data} = useGetAllDoctors(params);
  console.log("From Inside Sheet Component", data);

 

  const selectedDoctor = data?.data?.find((doctor)=> doctor.id === selectedId);
  console.log(selectedDoctor);

  const handleReviewAction = () => {
    setConfirmRejection(false);
  };

  if(!selectedDoctor){
    return null;
  }


  return (
    <Sheet open={!!selectedId} onOpenChange={() => onClose()}>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Review and Take Action</SheetTitle>
          <SheetDescription>This action cannot be undone.</SheetDescription>
        </SheetHeader>
        Doctor Name : {selectedDoctor?.name} <br />
        Doctor ID : {selectedId}

        <SheetFooter>
          {confirmRejection ? (
            <div className="flex flex-col gap-3">
              <Textarea/>
              <Button onClick={handleReviewAction} variant="outline">Confirmed Reject</Button>
            </div>
          ) : (<div className="flex justify-between gap-3 p-5">
            <Button onClick={()=>setConfirmRejection(true)} className="flex-1 bg-amber-500" variant="destructive" size="lg">Reject</Button>
             <Button onClick={handleReviewAction} className="flex-1" variant="default" size="lg">Approve</Button>
          </div>)}
        </SheetFooter>

      </SheetContent>
    </Sheet>
  );
}