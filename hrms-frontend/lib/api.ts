import { API_BASE_URL } from "./api-config"
import type { Employee, AttendanceRecord } from "./types"

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  })

  if (!res.ok) {
    const errorData = await res.json().catch(() => null)
    throw new Error(
      errorData?.message || `Request failed with status ${res.status}`
    )
  }

  return res.json()
}

export const employeesApi = {
  getAll: () => request<Employee[]>("/employees"),
  create: (data: Omit<Employee, "id">) =>
    request<Employee>("/employees", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    request<void>(`/employees/${id}`, { method: "DELETE" }),
}

export const attendanceApi = {
  getByEmployee: (employeeId: string) =>
    request<AttendanceRecord[]>(`/attendance?employeeId=${employeeId}`),
  mark: (data: { employeeId: string; date: string; status: string }) =>
    request<AttendanceRecord>("/attendance", {
      method: "POST",
      body: JSON.stringify(data),
    }),
}
