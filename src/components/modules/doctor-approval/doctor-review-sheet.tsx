import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface Props {
  selectedId : string;
  onClose : () => void;
}

export default function DoctorReviewSheet({ selectedId, onClose }: Props) {
  return (
    <Sheet open={!!selectedId} onOpenChange={() => onClose()}>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          <SheetDescription>This action cannot be undone.</SheetDescription>
        </SheetHeader>
        Doctor ID {selectedId}
      </SheetContent>
    </Sheet>
  );
}