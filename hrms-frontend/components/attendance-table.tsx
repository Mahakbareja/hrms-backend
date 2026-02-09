"use client"

import { useState } from "react"
import { CalendarDays, Filter } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { EmptyState } from "@/components/empty-state"
import { Loader } from "@/components/loader"
import { ErrorMessage } from "@/components/error-message"
import { useAttendance } from "@/hooks/use-attendance"
import type { Employee } from "@/lib/types"

interface AttendanceTableProps {
  employees: Employee[]
}

export function AttendanceTable({ employees }: AttendanceTableProps) {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(
    employees.length > 0 ? employees[0].employeeId : null
  )
  const [dateFilter, setDateFilter] = useState("")
  const { attendance, isLoading, isError, error, mutate } = useAttendance(selectedEmployeeId)

  const selectedEmployee = employees.find((e) => e.employeeId === selectedEmployeeId)

  const filteredAttendance = dateFilter
    ? attendance.filter((a) => a.date === dateFilter)
    : attendance

  const presentCount = attendance.filter((a) => a.status === "Present").length
  const absentCount = attendance.filter((a) => a.status === "Absent").length

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle className="font-heading">Attendance Records</CardTitle>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="filter-employee" className="text-xs">
                Employee
              </Label>
              <Select
                value={selectedEmployeeId ?? ""}
                onValueChange={setSelectedEmployeeId}
              >
                <SelectTrigger id="filter-employee" className="w-[200px]">
                  <SelectValue placeholder="Select employee" />
                </SelectTrigger>
                <SelectContent>
                  {employees.map((emp) => (
                    <SelectItem key={emp.id || emp.employeeId} value={emp.employeeId}>
                      {emp.fullName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="filter-date" className="text-xs flex items-center gap-1">
                <Filter className="h-3 w-3" /> Filter by Date
              </Label>
              <Input
                id="filter-date"
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-[180px]"
              />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {!selectedEmployeeId ? (
          <EmptyState
            icon={CalendarDays}
            title="Select an employee"
            description="Choose an employee to view their attendance records."
          />
        ) : isLoading ? (
          <Loader text="Loading attendance..." />
        ) : isError ? (
          <ErrorMessage message={error?.message} onRetry={() => mutate()} />
        ) : filteredAttendance.length === 0 ? (
          <EmptyState
            icon={CalendarDays}
            title="No attendance records"
            description={
              dateFilter
                ? "No records found for the selected date. Try removing the date filter."
                : `No attendance records found for ${selectedEmployee?.fullName ?? "this employee"}.`
            }
          />
        ) : (
          <>
            {attendance.length > 0 && (
              <div className="mb-4 flex gap-4">
                <div className="flex items-center gap-2 rounded-md bg-primary/10 px-3 py-1.5">
                  <span className="text-xs font-medium text-primary">Present</span>
                  <span className="text-sm font-bold text-primary">{presentCount}</span>
                </div>
                <div className="flex items-center gap-2 rounded-md bg-destructive/10 px-3 py-1.5">
                  <span className="text-xs font-medium text-destructive">Absent</span>
                  <span className="text-sm font-bold text-destructive">{absentCount}</span>
                </div>
              </div>
            )}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Employee</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAttendance.map((record, index) => (
                  <TableRow key={record.id || `${record.employeeId}-${record.date}-${index}`}>
                    <TableCell className="font-mono text-sm">
                      {record.date}
                    </TableCell>
                    <TableCell className="font-medium">
                      {selectedEmployee?.fullName ?? record.employeeId}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={record.status === "Present" ? "default" : "destructive"}
                      >
                        {record.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        )}
      </CardContent>
    </Card>
  )
}
