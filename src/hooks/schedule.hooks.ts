import {
  createSchedule,
  deleteSchedule,
  getMySchedules,
  publishSchedule,
} from "@/api";
import { CreateSchedulePayload, ScheduleParams } from "@/types";
import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";

export function useCreateSchedule() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSchedule,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
    },
  });
}

export function useMySchedules(params?: ScheduleParams) {
  return useQuery({
    queryKey: ["schedules", params],
    queryFn: () => getMySchedules(params),
  });
}

export const useGetMySchedules = useMySchedules;

export function useSuspenseMySchedules(params?: ScheduleParams) {
  return useSuspenseQuery({
    queryKey: ["schedules", params],
    queryFn: () => getMySchedules(params),
  });
}

export const useSuspenseGetMySchedules = useSuspenseMySchedules;

export function usePublishSchedule() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (scheduleId: string) => publishSchedule(scheduleId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
    },
  });
}

export function useDeleteSchedule() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (scheduleId: string) => deleteSchedule(scheduleId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
    },
  });
}
