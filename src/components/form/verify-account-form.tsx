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
import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useVerifyAccount } from "@/hooks";
import { toast } from "../ui/toast";

const RESEND_COOLDOWN =120

export default function VerifyAccountForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [otp, setOtp] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);
  // const [resendTimer, setResendTimer] = useState(0);
    const [resendTimer, setResendTimer] = useState(RESEND_COOLDOWN);

  const email = searchParams.get("email") || "";
  const { mutate: verify, isPending: verifyPending } = useVerifyAccount();

  useEffect(() => {
    if (!email) {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendTimer > 0) {
      timer = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [resendTimer]);

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
          title: "Verification Successfull",
          description: "Welcome on board",
          type: "success",
        });

        router.push("/login");
      },
      onError: (err: any) => {
        console.log("Verification error:", err);
        toast.add({
          title: "Verification Failure",
          description:
            err?.data?.message ||
            err?.message ||
            "Something went wrong. Please try again later",
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

            <FieldDescription>
              Resend in {resendTimer}
            </FieldDescription>
          </Field>
        </form>
      </CardContent>

      <CardFooter>
        <Button
          type="button"
          disabled={resendTimer > 0}
          onClick={() => {
            setResendTimer(60);
          }}
        >
          {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend"}
        </Button>
        <Button type="submit" form="otp-form" disabled={verifyPending}>
          Submit
        </Button>
      </CardFooter>
    </Card>
  );
}
