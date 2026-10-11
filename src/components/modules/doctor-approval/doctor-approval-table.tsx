import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DoctorReviewSheet from "./doctor-review-sheet";
import { useSuspenseGetAllDoctors } from "@/hooks";
import { DoctorParams, DoctorVerificationStatus } from "@/types";

// interface Props {
//   verificationStatus?:DoctorVerificationStatus;
// }

interface Props extends DoctorParams {}

export default function DoctorApprovalTable(params: Props) {
  const { data } = useSuspenseGetAllDoctors(params);

  const doctors = data?.data || [];

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>License No.</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact No.</TableHead>
            <TableHead>Specialization</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {doctors.map((doctor: any) => (
            <TableRow key={doctor.id || doctor._id || doctor.email}>
              {/* <TableCell className="font-medium">Mir Hussain</TableCell> */}
              <TableCell className="font-medium">{doctor.name}</TableCell>
              <TableCell className="font-medium">{doctor.licenseNumber}</TableCell>
              <TableCell className="font-medium">{doctor.email}</TableCell>
              <TableCell className="font-medium">{doctor.contactNumber ?doctor.contactNumber : "-"}</TableCell>
              <TableCell className="font-medium">{doctor.specialization}</TableCell>
              <TableCell className="text-right">
                <DoctorReviewSheet />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}