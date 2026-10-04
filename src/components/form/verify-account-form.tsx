"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
import { Field, FieldError, FieldLabel } from "../ui/field";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useVerifyAccount } from "@/hooks";
import { toast } from "../ui/toast";

export default function VerifyAccountForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [otp, setOtp] = useState("");
  const email = searchParams.get("email");
  const [isInvalid, setIsInvalid] = useState(false);
  const { mutate: verify, isPending: verifyPending } = useVerifyAccount();

  useEffect(() => {
    if (!email) {
      router.push("/");
    }
  }, [email, router]);

  const handleOTP = () => {
    if (otp.length !== 6) {
      setIsInvalid(true);
      return;
    }

    if (!email) {
      return;
    }

    const verifyData = {
      email,
      otp,
    };

    verify(verifyData, {
      onSuccess: (res) => {
        if (!res.success) {
          toast.add({
            title: "Server Failure",
            description: "Something went wrong. Please try again later",
            type: "error",
          });
          return;
        }

        toast.add({
          title: "Registration Success",
          description: "Please Verify Your Account",
          type: "success",
        });

        router.push("/login");
      },
      onError: (err) => {
        console.log(err);
        toast.add({
          title: "Authentication Failure",
          description:
            err.message || "Something went wrong. Please try again later",
          type: "error",
        });
      },
    });
  };

  if (!email) {
    return null;
  }

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
          <Field data-invalid={isInvalid}>
            <FieldLabel htmlFor="otp">OTP</FieldLabel>
            <InputOTP
              id="otp"
              maxLength={6}
              value={otp}
              onChange={(value) => {
                setOtp(value);
                if (isInvalid) {
                  setIsInvalid(false);
                }
              }}
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
            {isInvalid && (
              <FieldError>Invalid Code. Please try again</FieldError>
            )}
          </Field>
        </form>
      </CardContent>

      <CardFooter>
        <Button>Resend</Button>
        <Button type="submit" form="otp-form" disabled={verifyPending}>
          Submit
        </Button>
      </CardFooter>
    </Card>
  );
}
