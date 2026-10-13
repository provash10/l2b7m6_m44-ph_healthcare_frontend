import { getAllPublicDoctors } from "@/api";

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

export default function page() {
  return (
    <div>
      <h1> This is doctor details page </h1>
    </div>
  );
}