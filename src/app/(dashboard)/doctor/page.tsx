import ScheduleList from "@/components/modules/doctor-schedule/schedule-list";

export default function DoctorSchedulePage() {
  return (
    <section className="p-5">
      <div>
        <h1 className="text-2xl font-bold">Doctor Schedules</h1>
        <p className="text-muted-foreground">Manage your schedules</p>
      </div>
      <ScheduleList />
    </section>
  );
}
