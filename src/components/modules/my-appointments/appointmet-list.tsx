"use client";

import { useSearchParams } from "next/navigation";

export default function AppointmentList(){
    const params = useSearchParams();

    console.log(params.get("status"));
    
    return (
        <div>
            <h1>appointment list</h1>
        </div>
    )
}