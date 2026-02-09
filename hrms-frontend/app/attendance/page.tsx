"use client"

import { Users } from "lucide-react"
import { AppShell } from "@/components/app-shell"
import { MarkAttendanceForm } from "@/components/mark-attendance-form"
import { AttendanceTable } from "@/components/attendance-table"
import { EmptyState } from "@/components/empty-state"
import { Loader } from "@/components/loader"
import { ErrorMessage } from "@/components/error-message"
import { useEmployees } from "@/hooks/use-employees"
import { Card, CardContent } from "@/components/ui/card"

export default function AttendancePage() {
  const { employees, isLoading, isError, error, mutate } = useEmployees()

  return (
    <AppShell title="Attendance" description="Track daily employee attendance">
      {isLoading ? (
        <Loader text="Loading employees..." />
      ) : isError ? (
        <ErrorMessage message={error?.message} onRetry={() => mutate()} />
      ) : employees.length === 0 ? (
        <Card>
          <CardContent className="py-6">
            <EmptyState
              icon={Users}
              title="No employees found"
              description="You need to add employees before marking attendance. Go to the Employees page to add some."
            />
          </CardContent>
        </Card>
      ) : (
        <div className="flex flex-col gap-6">
          <MarkAttendanceForm
            employees={employees}
            onSuccess={() => mutate()}
          />
          <AttendanceTable employees={employees} />
        </div>
      )}
    </AppShell>
  )
}
