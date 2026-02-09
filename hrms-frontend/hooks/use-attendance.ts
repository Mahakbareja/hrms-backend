import useSWR from "swr"
import { attendanceApi } from "@/lib/api"
import type { AttendanceRecord } from "@/lib/types"

export function useAttendance(employeeId: string | null) {
  const { data, error, isLoading, mutate } = useSWR<AttendanceRecord[]>(
    employeeId ? `attendance-${employeeId}` : null,
    () => (employeeId ? attendanceApi.getByEmployee(employeeId) : [])
  )

  return {
    attendance: data ?? [],
    isLoading,
    isError: !!error,
    error,
    mutate,
  }
}
