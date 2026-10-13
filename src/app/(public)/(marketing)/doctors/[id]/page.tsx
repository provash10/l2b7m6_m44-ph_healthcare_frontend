import { getAllPublicDoctors, getPublicDoctorProfile } from "@/api";

const fallbackDoctors = [
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

export default async function page({params} : {params: Promise<{id: string}>}) {
  
  const {id} = await params;
  console.log(id);


  const data = await getPublicDoctorProfile(id) ;
  console.log(data)

  const doctor = data.data || undefined;

  if(!doctor) {
    return <p>No Doctor Found With This ID</p>
  }

  return (
    <div>
      {/* <h1> This is doctor details page </h1> */}
      <p>Name : {doctor.name}</p>
      <p>Specialization : {doctor.specialization}</p>
      <p>Fee : {doctor.consultationFee ? `${doctor.consultationFee} BDT` : "-"}</p>
    </div>
  );
}