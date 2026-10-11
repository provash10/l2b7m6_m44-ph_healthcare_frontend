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
import { useApproveDoctor, useGetAllDoctors } from "@/hooks";
import { ApproveDoctorPayload, DoctorParams } from "@/types";
import { useState } from "react";

interface Props extends DoctorParams{
  selectedId : string;
  onClose : () => void;
}

export default function DoctorReviewSheet(
  { selectedId, onClose, ...params }:
   Props) {

    const [confirmRejection,setConfirmRejection] = useState(false);
    const [rejectionReason, setRejectionReason] = useState("");
    console.log(rejectionReason)


  const {data} = useGetAllDoctors(params);
  console.log("From Inside Sheet Component", data);

  const {mutate : verify, isPending} = useApproveDoctor();

 

  const selectedDoctor = data?.data?.find((doctor)=> doctor.id === selectedId);
  console.log(selectedDoctor);

  const handleClose = () => {
    setConfirmRejection(false);
    setRejectionReason("");
    onClose();

  };

  const handleReviewAction = (status: "APPROVED" | "REJECTED") => {
    const reviewData: ApproveDoctorPayload = {
      doctorId: selectedId,
      verificationStatus: status,
      rejectionReason: rejectionReason,
    };

    verify(reviewData,{
      onSuccess : (res) => {
        console.log("Success", res)
        handleClose();
      },
      onError : (error: any) => {
        console.log("Error", error)
      }
    });

    console.log(reviewData);
    // handleClose();
  };

  if(!selectedDoctor){
    return null;
  }


  return (
    <Sheet open={!!selectedId} onOpenChange={handleClose}>
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
              <Textarea
                placeholder="Enter rejection reason..."
                className="border-2 border-gray-400 focus-visible:border-primary"
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
              />

              <div className="flex gap-2">
                <Button
                  onClick={handleClose}
                  variant="outline"
                  size="lg"
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => handleReviewAction("REJECTED")}
                  variant="destructive"
                  size="lg"
                  className="flex-1"
                  disabled={!rejectionReason}
                >
                  Confirm Rejection
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex gap-2">
              <Button
                onClick={() => setConfirmRejection(true)}
                variant="destructive"
                size="lg"
                className="flex-1"
              >
                Reject
              </Button>
              <Button
                onClick={() => handleReviewAction("APPROVED")}
                variant="default"
                size="lg"
                className="flex-1"
              >
                Approve
              </Button>
            </div>
          )}
        </SheetFooter>

      </SheetContent>
    </Sheet>
  );
}