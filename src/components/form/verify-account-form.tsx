"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { Field, FieldLabel } from "../ui/field";
import { REGEXP_ONLY_DIGITS } from "input-otp";

export default function VerifyAccountForm() {
  const searchParams = useSearchParams();
  const [otp, setOtp] = useState("");
  // console.log(searchParams.get("email"));

  const email = searchParams.get("email");

  const handleOTP = () => {
    // console.log("Click");
    console.log("otp");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Verify Account</CardTitle>
        <CardDescription>
          Please Provide the OTP.We send you in your Email.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          id="otp-form"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleOTP();
          }}
        >
          <Field>
            <FieldLabel htmlFor="otp">OTP</FieldLabel>
            <InputOTP
              id="otp"
              maxLength={6}
              value={otp}
              onChange={(value) => setOtp(value)}
              autoComplete="off"
              name= "otp"
              pattern={REGEXP_ONLY_DIGITS}
            
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </Field>
        </form>
      </CardContent>

      <CardFooter>
        <Button>Resend</Button>
        <Button type="submit" form="otp-form">
          Submit
        </Button>
      </CardFooter>
    </Card>
  );
}
