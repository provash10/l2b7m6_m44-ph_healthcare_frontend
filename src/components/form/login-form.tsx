"use client";

import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import { useForm } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { loginSchema } from "@/validation";
import { useGoogleOAuth, useLogin } from "@/hooks";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/toast";
import { Spinner } from "../ui/spinner";
import { GoogleLogin } from "@react-oauth/google";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router =useRouter();

  const { mutate: login, isPending: loginPending } = useLogin();
  const {mutate: googleLogin} = useGoogleOAuth();

  const form = useForm({
    defaultValues: {
      email: "superadmin@gmail.com",
      password: "Super@admin12345",
    },
    validators: {
      onSubmit: loginSchema,
    },
    onSubmit: ({ value }) => {
      const loginData = {
        email: value.email,
        password: value.password,
      };

      login(loginData, {
        onSuccess: (res) => {
          // console.log(res);
          toast.add({
  title: "Login Success",
  description: "Welcome Back",
  type : "success"
})
          router.push("/");
        },
        onError: (err) => {
          console.log(err);
           toast.add({
  title: "Authentication Failure",
  description: err.message || "Something went wrong. Please try again later",
  type : "error",
})
        },
      });
    },
  });

  const handleGoogleSuccess = (credentialResponse : {credential?: string}) =>{
    const idToken = credentialResponse.credential;

    if(!idToken){
      toast.add({
      title: "Google OAuth Failed",
      description : "Something went wrong. Please Try Again",
      type: "error"
    })
    return;
    }
    googleLogin({idToken},{
      onSuccess : ()=> {
        toast.add({
      title: "Google Logged In Successfully",
      description : "Welcome Back",
      type: "success"
    })
    router.push("/");
      },

      onError : (err)=> {
        toast.add({
      title: "Google OAuth Failed",
      description : err.message || "Something went wrong. Please Try Again",
      type: "error"
    })
      }
    });
  }

  const handleGoogleError = () => {
    toast.add({
      title: "Google OAuth Failed",
      description : "Something went wrong. Please Try Again",
      type: "error"
    })
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="flex flex-col gap-4"
      >
        <FieldGroup>
          <form.Field name="email">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    value={field.state.value}
                    autoComplete="off"
                    aria-invalid={isInvalid}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="password">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                  <div className="relative">
                    <Input
                      id={field.name}
                      name={field.name}
                      type={showPassword ? "text" : "password"}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      value={field.state.value}
                      autoComplete="off"
                      aria-invalid={isInvalid}
                    />
                    <button
                      className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? <EyeClosed /> : <Eye />}
                    </button>
                  </div>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <Button disabled={loginPending} type="submit">
            {loginPending ? <> <Spinner/> submitting</> : "Submit"}
           </Button>
        </FieldGroup>
      </form>

      {/* google oauth */}
      <div className="relative my-2 text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
        <span className="relative z-10 font-bold bg-background px-2 text-muted-foreground">
          Or Continue With
        </span>
      </div>

      <div className="flex justify-center">
        <GoogleLogin
        // theme="outline"
        theme="filled_black"
        shape="pill"
        text="continue_with"
           onSuccess={handleGoogleSuccess}
           onError={handleGoogleError} />
      </div>
    </div>
  );
}
