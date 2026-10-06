"use client";

import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import Link from "next/link";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Stethoscope,
  Award,
  GraduationCap,
  Briefcase,
  CreditCard,
  FileUp,
  X,
  FileText,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldDescription,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  MAX_FILE_SIZE,
  MAX_FILE_SIZE_BYTES,
  isAcceptedFileSize,
  isAcceptedFileType,
} from "@/validation/doctor.application.validation";
import { useApplyAsDoctor } from "@/hooks/doctor.hooks";
import { DoctorApplicationData } from "@/types";

// * Data signature
function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

// {
//   "user": {
//     "name": "Dr. Sarah Jenkins",
//     "email": "dr.sarah.jenkins@example.com"
//   },
//   "doctor": {
//     "address": "123 Medical Plaza, Suite 400, New York, NY",
//     "specialization": "Cardiology",
//     "licenseNumber": "MED-2026-98765",
//     "qualifications": "MD, FACC - Harvard Medical School",
//     "experienceYears": 12,
//     "bio": "Dedicated cardiologist with over a decade of experience specializing in non-invasive cardiovascular imaging a
//     "consultationFee": 150,
//     "contactNumber": "+1-555-0199"
//   }
// }

export default function DoctorApplyForm() {
  const router = useRouter();
  const { mutate: apply, isPending: applyPending } = useApplyAsDoctor();

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      specialization: "",
      licenseNumber: "",
      qualifications: "",
      experienceYears: "",
      consultationFee: "",
      bio: "",
      resume: null as File | null,
      additionalFiles: [] as File[],
    },
    onSubmit: async ({ value }) => {
      // Doctor data payload matching DoctorApplicationData interface
      const doctorData: DoctorApplicationData = {
        user: {
          name: value.name.trim(),
          email: value.email.trim(),
        },
        doctor: {
          specialization: value.specialization.trim(),
          licenseNumber: value.licenseNumber.trim(),
          qualifications: value.qualifications.trim(),
          experienceYears: Number(value.experienceYears),
          contactNumber: value.phone.trim(),
          address: value.address.trim(),
          consultationFee: value.consultationFee.trim()
            ? Number(value.consultationFee)
            : undefined,
          bio: value.bio.trim(),
        },
      };

      console.log(doctorData);

      // Submit application with resume and additional files
      apply(
        {
          data: doctorData,
          resume: value.resume as File,
          additionalFiles: value.additionalFiles,
        },
        {
          onSuccess: (res: any) => {
            console.log(res);
            toast.add({
              title: "Application Submitted",
              description: res?.message || "Applied As Doctor Successfully",
              type: "success",
            });
          },
          onError: (err: any) => {
            console.log(err);
            toast.add({
              title: "Application Failed",
              description:
                err?.message || "Something went wrong. Please try again.",
              type: "error",
            });
          },
        }
      );
    },
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold tracking-tight">
          Apply to join PH Healthcare
        </h1>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="flex flex-col gap-5"
      >
        <FieldGroup className="gap-5">
          <div className="grid gap-5 sm:grid-cols-2">
            {/* form.Field */}
            <form.Field name="name">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Full name</FieldLabel>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                      <Input
                        id={field.name}
                        name={field.name}
                        placeholder="Dr. John Doe"
                        className="pl-9"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                      />
                    </div>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            <form.Field name="email">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Email address</FieldLabel>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                      <Input
                        id={field.name}
                        name={field.name}
                        type="email"
                        placeholder="doctor@example.com"
                        className="pl-9"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                      />
                    </div>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            <form.Field name="phone">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Contact number</FieldLabel>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                      <Input
                        id={field.name}
                        name={field.name}
                        placeholder="+880 1712 345678"
                        className="pl-9"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                      />
                    </div>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            <form.Field name="address">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      Practice address{" "}
                      <span className="font-normal text-muted-foreground">
                        (optional)
                      </span>
                    </FieldLabel>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                      <Input
                        id={field.name}
                        name={field.name}
                        placeholder="Chamber or hospital address"
                        className="pl-9"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                      />
                    </div>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            <form.Field name="specialization">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Specialization</FieldLabel>
                    <div className="relative">
                      <Stethoscope className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                      <Input
                        id={field.name}
                        name={field.name}
                        placeholder="Cardiology"
                        className="pl-9"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                      />
                    </div>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            <form.Field name="licenseNumber">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      BMDC registration number
                    </FieldLabel>
                    <div className="relative">
                      <Award className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                      <Input
                        id={field.name}
                        name={field.name}
                        placeholder="A-12345"
                        className="pl-9"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                      />
                    </div>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            <form.Field name="qualifications">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Qualifications</FieldLabel>
                    <div className="relative">
                      <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                      <Input
                        id={field.name}
                        name={field.name}
                        placeholder="MBBS, FCPS (Medicine)"
                        className="pl-9"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                      />
                    </div>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            <form.Field name="experienceYears">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      Years of experience
                    </FieldLabel>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                      <Input
                        id={field.name}
                        name={field.name}
                        type="number"
                        placeholder="10"
                        className="pl-9"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                      />
                    </div>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            <form.Field name="consultationFee">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      Consultation fee (BDT){" "}
                      <span className="font-normal text-muted-foreground">
                        (optional)
                      </span>
                    </FieldLabel>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                      <Input
                        id={field.name}
                        name={field.name}
                        type="number"
                        placeholder="1000"
                        className="pl-9"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                      />
                    </div>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>
          </div>

          <form.Field name="bio">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>
                    Professional bio{" "}
                    <span className="font-normal text-muted-foreground">
                      (optional)
                    </span>
                  </FieldLabel>
                  <Textarea
                    id={field.name}
                    name={field.name}
                    rows={4}
                    placeholder="Share your background, areas of interest and patient care philosophy..."
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                  />
                  <div className="flex items-center justify-between gap-2">
                    <FieldDescription>
                      Shown on your public profile after approval.
                    </FieldDescription>
                    <span className="text-xs text-muted-foreground">
                      {field.state.value.length}/1000
                    </span>
                  </div>
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="resume">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              //
              const file = field.state.value;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor="resume-field">Resume</FieldLabel>
                  <div className="flex flex-wrap items-center gap-3">
                    <Button
                      render={<label htmlFor="resume-field" />}
                      nativeButton={false}
                      variant="outline"
                      className="cursor-pointer"
                    >
                      <FileUp size="4" />
                      Upload resume
                    </Button>

                    <input
                      id="resume-field"
                      type="file"
                      className="sr-only"
                      name={field.name}
                      onChange={(e) => {
                        const selected = e.target.files?.[0] ?? null;

                        if (
                          selected &&
                          (!isAcceptedFileSize(selected.size) ||
                            !isAcceptedFileType(selected?.type))
                        ) {
                          field.handleBlur();
                          e.target.value = "";
                          return;
                        }

                        field.handleChange(selected);
                        e.target.value = "";
                      }}
                    />
                    {file ? (
                      <div className="inline-flex items-center gap-2 rounded-md border bg-muted/40 px-2.5 py-1 text-sm text-foreground">
                        <FileText className="size-4 text-blue-500 shrink-0" />
                        <span className="font-medium truncate max-w-[200px] sm:max-w-xs">
                          {file.name}
                        </span>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {formatFileSize(file.size)}
                        </span>
                        <button
                          type="button"
                          onClick={() => field.handleChange(null)}
                          className="text-muted-foreground hover:text-foreground cursor-pointer ml-1 transition-colors"
                        >
                          <X className="size-3.5" />
                        </button>
                      </div>
                    ) : (
                      <span className="text-xs text-muted-foreground">
                        Supported File: .pdf, .doc, .docx, .png, .jpg and size{" "}
                        {MAX_FILE_SIZE}MB
                      </span>
                    )}
                  </div>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          {/* aditional files */}
          <form.Field name="additionalFiles">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              const files = field.state.value ?? [];

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor="additional-file-field">
                    Resume
                  </FieldLabel>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <Button
                        render={<label htmlFor="additional-file-field" />}
                        nativeButton={false}
                        variant="outline"
                        className="cursor-pointer"
                        disabled={files.length >= 5}
                      >
                        <Plus size="4" />
                        Add Files
                      </Button>

                      <span className="text-sm text-muted-foreground">
                        {files.length} of 5 added
                      </span>

                      <input
                        id="additional-file-field"
                        type="file"
                        multiple
                        className="sr-only"
                        name={field.name}
                        disabled={files.length >= 5}
                        onChange={(e) => {
                          const incoming = Array.from(e.target.files ?? []);
                          if (incoming.length === 0) return;

                          const invalid = incoming.some(
                            (file) =>
                              !isAcceptedFileSize(file.size) ||
                              !isAcceptedFileType(file.type)
                          );

                          if (invalid) {
                            field.handleBlur();
                            e.target.value = "";
                            return;
                          }

                          // Maximum 5 files
                          const combined = [...files, ...incoming].slice(0, 5);
                          field.handleChange(combined);
                          e.target.value = "";
                        }}
                      />
                    </div>

                    {/* Added files list */}
                    {files.length > 0 && (
                      <div className="flex flex-col gap-2">
                        {files.map((item: File, index: number) => (
                          <div
                            key={`${item.name}-${index}`}
                            className="flex items-center justify-between rounded-md border bg-muted/30 px-3.5 py-2 text-sm"
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <FileText className="size-4 text-blue-500 shrink-0" />
                              <span className="font-medium text-foreground truncate">
                                {item.name}
                              </span>
                              <span className="text-xs text-muted-foreground shrink-0">
                                {formatFileSize(item.size)}
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() =>
                                field.handleChange(
                                  files.filter((_, i) => i !== index)
                                )
                              }
                              className="text-muted-foreground hover:text-foreground cursor-pointer shrink-0 ml-2 transition-colors"
                            >
                              <X className="size-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <div className="flex justify-end w-full mt-5">
            <Button type="submit" size="lg" disabled={applyPending}>
              {applyPending ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </FieldGroup>
      </form>

      <p className="text-xs leading-relaxed text-muted-foreground">
        Already an approved doctor?{" "}
        <Link
          href="/login"
          className="font-medium underline underline-offset-4 hover:text-primary"
        >
          Sign in to the Doctor Portal
        </Link>
        . Patient applications should use the{" "}
        <Link
          href="/register"
          className="font-medium underline underline-offset-4 hover:text-primary"
        >
          patient registration
        </Link>{" "}
        form instead.
      </p>
    </div>
  );
}
