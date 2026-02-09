"use client"

import React from "react"

import { useState } from "react"
import { CalendarCheck, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { attendanceApi } from "@/lib/api"
import type { Employee } from "@/lib/types"

interface MarkAttendanceFormProps {
  employees: Employee[]
  onSuccess: () => void
}

interface FormErrors {
  employeeId?: string
  date?: string
  status?: string
}

export function MarkAttendanceForm({ employees, onSuccess }: MarkAttendanceFormProps) {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("")
  const [date, setDate] = useState(() => new Date().toISOString().split("T")[0])
  const [status, setStatus] = useState("")
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [apiError, setApiError] = useState("")
  const [successMsg, setSuccessMsg] = useState("")

  function validate(): boolean {
    const newErrors: FormErrors = {}

    if (!selectedEmployeeId) {
      newErrors.employeeId = "Please select an employee"
    }
    if (!date) {
      newErrors.date = "Date is required"
    }
    if (!status) {
      newErrors.status = "Please select a status"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setApiError("")
    setSuccessMsg("")

    if (!validate()) return

    setIsSubmitting(true)
    try {
      await attendanceApi.mark({
        employeeId: selectedEmployeeId,
        date,
        status,
      })
      setSuccessMsg("Attendance marked successfully!")
      setStatus("")
      onSuccess()
      setTimeout(() => setSuccessMsg(""), 3000)
    } catch (err) {
      setApiError(err instanceof Error ? err.message : "Failed to mark attendance")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-heading">Mark Attendance</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {apiError && (
            <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
              {apiError}
            </div>
          )}
          {successMsg && (
            <div className="rounded-md bg-primary/10 p-3 text-sm text-primary">
              {successMsg}
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="flex flex-col gap-2">
              <Label htmlFor="attendance-employee">Employee</Label>
              <Select value={selectedEmployeeId} onValueChange={setSelectedEmployeeId}>
                <SelectTrigger id="attendance-employee" aria-invalid={!!errors.employeeId}>
                  <SelectValue placeholder="Select employee" />
                </SelectTrigger>
                <SelectContent>
                  {employees.map((emp) => (
                    <SelectItem key={emp.id || emp.employeeId} value={emp.employeeId}>
                      {emp.fullName} ({emp.employeeId})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.employeeId && (
                <p className="text-xs text-destructive">{errors.employeeId}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="attendance-date">Date</Label>
              <Input
                id="attendance-date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                aria-invalid={!!errors.date}
              />
              {errors.date && (
                <p className="text-xs text-destructive">{errors.date}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="attendance-status">Status</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger id="attendance-status" aria-invalid={!!errors.status}>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Present">Present</SelectItem>
                  <SelectItem value="Absent">Absent</SelectItem>
                </SelectContent>
              </Select>
              {errors.status && (
                <p className="text-xs text-destructive">{errors.status}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <CalendarCheck className="mr-2 h-4 w-4" />
              )}
              Mark Attendance
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
