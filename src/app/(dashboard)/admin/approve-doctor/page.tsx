
import DoctorApprovalTabs from "@/components/modules/doctor-approval/doctor-approval-tabs";

export default function ApproveDoctor() {
  return (
    <section className="p-5">
      <div>
      <h1>Doctor Approval</h1>
      <p>Please Review and amke sure the given data is real</p>
    </div>
    <DoctorApprovalTabs></DoctorApprovalTabs>
    </section>
  );
}


