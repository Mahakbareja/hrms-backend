export interface Employee {
  id: string
  employeeId: string
  fullName: string
  email: string
  department: string
}

export interface AttendanceRecord {
  id: string
  employeeId: string
  date: string
  status: "Present" | "Absent"
  employeeName?: string
}

export interface DashboardStats {
  totalEmployees: number
  totalAttendanceEntries: number
  presentCount: number
}
