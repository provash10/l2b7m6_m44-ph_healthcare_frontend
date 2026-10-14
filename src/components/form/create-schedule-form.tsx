"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { useCreateSchedule } from "@/hooks";
import { toast } from "@/components/ui/toast";
import { Spinner } from "../ui/spinner";
import { format } from "date-fns";
import { scheduleSchema } from "@/validation";

interface Props {
  handleClose: () => void;
}

export default function CreateScheduleForm({ handleClose }: Props) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const { mutate: create, isPending } = useCreateSchedule();

  const form = useForm({
    defaultValues: {
      date: "",
      startTime: "",
      endTime: "",
      meetingLink: "https://meet.google.com/aiu-ctor-moh",
    },
    validators: {
      onSubmit: scheduleSchema,
    },
    onSubmit: ({ value }) => {
      const scheduleValue = {
        startDateTime: new Date(
          `${value.date}T${value.startTime}`
        ).toISOString(),
        endDateTime: new Date(`${value.date}T${value.endTime}`).toISOString(),
        meetingLink: value.meetingLink,
      };

      console.log(scheduleValue);

      create(
        scheduleValue,
        {
          onSuccess: (res) => {
            if (!res.success) {
              toast.add({
                title: "Server Failure",
                description: "Something went wrong. Please try again",
                type: "error",
              });
              return;
            }

            toast.add({
              title: "Schedule Created",
              description: "Your schedule has been created successfully.",
              type: "success",
            });
            handleClose();
          },
          onError: (err: any) => {
            toast.add({
              title: "Schedule Creation Failed",
              description:
                err?.message || "Something went wrong. Please try again",
              type: "error",
            });
            handleClose();
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
            const selected = field.state.value
              ? new Date(`${field.state.value}T00:00:00`)
              : undefined;

            console.log({ selected });

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Date</FieldLabel>
                <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                  <PopoverTrigger render={<Button type="button" variant="outline" />}>
                    {selected ? `${format(selected, "PPP")}` : "Select Date"}
                  </PopoverTrigger>

                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={selected}
                      disabled={{ before: new Date() }}
                      onSelect={(date) => {
                        if (date) {
                          field.handleChange(format(date, "yyyy-MM-dd"));
                          field.handleBlur();
                          setIsCalendarOpen(false);
                        }
                      }}
                    />
                  </PopoverContent>
                </Popover>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        <div className="grid grid-cols-2 gap-3">
          <form.Field name="startTime">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Start Time</FieldLabel>
                  <Input
                    type="time"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
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
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>End Time</FieldLabel>
                  <Input
                    type="time"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>
        </div>

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
                  placeholder="https://meet.google.com/aiu-ctor-moh"
                  value={field.state.value}
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

        <Button type="submit" disabled={isPending} className="mt-10 w-full">
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
