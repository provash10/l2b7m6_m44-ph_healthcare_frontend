import { getAllPublicDoctors, getPublicDoctorProfile } from "@/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BriefcaseBusiness,
  GraduationCap,
  ScrollText,
  Stethoscope,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import DoctorBooking from "@/components/modules/doctors/doctor-booking";

const fallbackDoctors = [
  { id: "a03795c3-6d46-4c88-b0bf-0b24f423bc0d" },
  { id: "e30556e1-ed37-4978-9b59-9cc15a4681a4" },
  { id: "6ca86cba-1491-474f-8d77-e5bc96f4a685" },
  { id: "268bae71-5cf0-4a9e-bbfa-8c683d0a88d1" },
];

export async function generateStaticParams() {
  try {
    const data = await getAllPublicDoctors({ limit: 100 });
    const doctorList = data?.data || [];

    if (doctorList.length > 0) {
      return doctorList.map((doctor) => ({
        id: doctor.id,
      }));
    }

    return fallbackDoctors;
  } catch (error) {
    console.warn(
      "generateStaticParams: Backend API is not reachable during build time. Using fallback doctors."
    );
    return fallbackDoctors;
  }
}

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (id === "login") {
    redirect("/login");
  }

  let doctor = null;
  try {
    const data = await getPublicDoctorProfile(id);
    doctor = data?.data;
  } catch (error) {
    console.error("Doctor profile fetch error:", error);
  }

  if (!doctor) {
    return (
      <div className="container max-w-3xl mx-auto py-10 px-4">
        <Link
          href="/doctors"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          ← Back to doctors
        </Link>
        <p className="text-muted-foreground">No Doctor Found With This ID</p>
      </div>
    );
  }

  return (
    <div className="container max-w-3xl mx-auto py-10 px-4 space-y-6">
      <div>
        <Link
          href="/doctors"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          ← Back to doctors
        </Link>

        <Card>
          <CardHeader>
            <CardTitle>{doctor.name}</CardTitle>
            <CardDescription className="flex items-center gap-1.5">
              <Stethoscope className="size-3.5" />
              {doctor.specialization}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-muted-foreground">
            <p className="flex items-center gap-2">
              <GraduationCap className="size-4 shrink-0" />
              {doctor.qualifications}
            </p>
            <p className="flex items-center gap-2">
              <BriefcaseBusiness className="size-4 shrink-0" />
              {doctor.experienceYears}{" "}
              {doctor.experienceYears === 1 ? "year" : "years"} of experience
            </p>
            <p className="flex items-center gap-2">
              <ScrollText className="size-4 shrink-0" />
              License No: {doctor.licenseNumber}
            </p>
            {doctor.consultationFee != null && (
              <p className="flex items-center gap-2">
                <Wallet className="size-4 shrink-0" />
                Consultation fee: ৳{doctor.consultationFee}
              </p>
            )}
            {doctor.bio && (
              <div className="pt-2">
                <p className="font-medium text-foreground">About</p>
                <p>{doctor.bio}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">Book appointment</h2>
          <p className="text-sm text-muted-foreground">
            Today&apos;s available slots. Booking redirects to bKash payment.
          </p>
        </div>
        <DoctorBooking doctorId = {doctor.id}/>
      </div>
    </div>
  );
}