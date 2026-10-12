import { z } from "zod";

export const createScheduleSchema = z
  .object({
    startDate: z.string().min(1, "Start date is required"),
    startTime: z.string().min(1, "Start time is required"),
    endDate: z.string().min(1, "End date is required"),
    endTime: z.string().min(1, "End time is required"),
    meetingLink: z.string().min(1, "Meeting link is required"),
  })
  .refine(
    (data) => {
      if (!data.startDate || !data.startTime || !data.endDate || !data.endTime)
        return true;
      const start = new Date(`${data.startDate}T${data.startTime}`);
      const end = new Date(`${data.endDate}T${data.endTime}`);
      return end > start;
    },
    {
      message: "End time must be after start time",
      path: ["endTime"],
    }
  );

export type CreateScheduleValidationSchema = z.infer<
  typeof createScheduleSchema
>;
