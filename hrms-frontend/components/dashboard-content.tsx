"use client"

import { Users, CalendarCheck, UserCheck, AlertCircle } from "lucide-react"
import { useEmployees } from "@/hooks/use-employees"
import { StatCard } from "@/components/stat-card"
import { Loader } from "@/components/loader"
import { ErrorMessage } from "@/components/error-message"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export function DashboardContent() {
  const { employees, isLoading, isError, error, mutate } = useEmployees()

  if (isLoading) return <Loader text="Loading dashboard..." />
  if (isError) return <ErrorMessage message={error?.message} onRetry={() => mutate()} />

  const totalEmployees = employees.length
  const departments = [...new Set(employees.map((e) => e.department))]

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Total Employees"
          value={totalEmployees}
          icon={Users}
          description="Active employees in the system"
        />
        <StatCard
          title="Departments"
          value={departments.length}
          icon={CalendarCheck}
          description="Unique departments"
        />
        <StatCard
          title="System Status"
          value="Active"
          icon={UserCheck}
          description="All systems operational"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-heading">Recent Employees</CardTitle>
        </CardHeader>
        <CardContent>
          {employees.length === 0 ? (
            <div className="flex flex-col items-center py-8 text-center">
              <AlertCircle className="h-8 w-8 text-muted-foreground" />
              <p className="mt-2 text-sm text-muted-foreground">
                No employees yet. Add your first employee to get started.
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Email</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employees.slice(0, 5).map((employee) => (
                  <TableRow key={employee.id || employee.employeeId}>
                    <TableCell className="font-mono text-sm">
                      {employee.employeeId}
                    </TableCell>
                    <TableCell className="font-medium">
                      {employee.fullName}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{employee.department}</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {employee.email}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
