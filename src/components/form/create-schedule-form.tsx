"use client";

import { useForm } from "@tanstack/react-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useCreateSchedule } from "@/hooks";
import { toast } from "@/components/ui/toast";
import { Spinner } from "../ui/spinner";

interface Props {
  onSuccess?: () => void;
}

export default function CreateScheduleForm({ onSuccess }: Props) {
  const { mutate: create, isPending } = useCreateSchedule();

  const form = useForm({
    defaultValues: {
      date: "",
      startTime: "10:30:00",
      endTime: "10:30:00",
      meetingLink: "",
    },
    onSubmit: ({ value }) => {
      const startTime = value.startTime || "10:30:00";
      const endTime = value.endTime || "10:30:00";

      const startDateTime = new Date(`${value.date}T${startTime}`).toISOString();
      const endDateTime = new Date(`${value.date}T${endTime}`).toISOString();

      create(
        {
          startDateTime,
          endDateTime,
          meetingLink: value.meetingLink,
        },
        {
          onSuccess: (res) => {
            if (res.success) {
              toast.add({
                title: "Schedule Created",
                description: "Your schedule has been created successfully.",
                type: "success",
              });
              onSuccess?.();
            } else {
              toast.add({
                title: "Failed",
                description: res.message || "Failed to create schedule",
                type: "error",
              });
            }
          },
          onError: (err: any) => {
            toast.add({
              title: "Error",
              description:
                err?.message || "Something went wrong while creating schedule",
              type: "error",
            });
          },
        }
      );
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <FieldGroup>
        <form.Field name="date">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Date</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  type="date"
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  autoComplete="off"
                  aria-invalid={isInvalid}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        <form.Field name="startTime">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field className="w-32" data-invalid={isInvalid}>
                <FieldLabel htmlFor="start-time-picker">Start Time</FieldLabel>
                <Input
                  type="time"
                  id="start-time-picker"
                  step="1"
                  defaultValue="10:30:00"
                  className="appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        <form.Field name="endTime">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field className="w-32" data-invalid={isInvalid}>
                <FieldLabel htmlFor="end-time-picker">End Time</FieldLabel>
                <Input
                  type="time"
                  id="end-time-picker"
                  step="1"
                  defaultValue="10:30:00"
                  className="appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        <form.Field name="meetingLink">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Meeting Link</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  type="url"
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  autoComplete="off"
                  aria-invalid={isInvalid}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? (
            <span className="flex items-center gap-2">
              <Spinner className="size-4" /> Submitting...
            </span>
          ) : (
            "Submit"
          )}
        </Button>
      </FieldGroup>
    </form>
  );
}
