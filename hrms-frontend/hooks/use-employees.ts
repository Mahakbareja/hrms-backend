import useSWR from "swr"
import { employeesApi } from "@/lib/api"
import type { Employee } from "@/lib/types"

export function useEmployees() {
  const { data, error, isLoading, mutate } = useSWR<Employee[]>(
    "employees",
    () => employeesApi.getAll()
  )

  return {
    employees: data ?? [],
    isLoading,
    isError: !!error,
    error,
    mutate,
  }
}
