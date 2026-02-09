"use client"

import { useState } from "react"
import { Trash2, Users, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { EmptyState } from "@/components/empty-state"
import { Loader } from "@/components/loader"
import { ErrorMessage } from "@/components/error-message"
import { employeesApi } from "@/lib/api"
import type { Employee } from "@/lib/types"

interface EmployeeListProps {
  employees: Employee[]
  isLoading: boolean
  isError: boolean
  error: Error | undefined
  onMutate: () => void
}

export function EmployeeList({
  employees,
  isLoading,
  isError,
  error,
  onMutate,
}: EmployeeListProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [confirmDelete, setConfirmDelete] = useState<Employee | null>(null)
  const [deleteError, setDeleteError] = useState("")

  async function handleDelete() {
    if (!confirmDelete) return
    const id = confirmDelete.id || confirmDelete.employeeId
    setDeletingId(id)
    setDeleteError("")

    try {
      await employeesApi.delete(id)
      onMutate()
      setConfirmDelete(null)
    } catch (err) {
      setDeleteError(err instanceof Error ? err.message : "Failed to delete employee")
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="font-heading">Employee Directory</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Loader text="Loading employees..." />
          ) : isError ? (
            <ErrorMessage message={error?.message} onRetry={onMutate} />
          ) : employees.length === 0 ? (
            <EmptyState
              icon={Users}
              title="No employees yet"
              description="Add your first employee using the form above."
            />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee ID</TableHead>
                  <TableHead>Full Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employees.map((employee) => (
                  <TableRow key={employee.id || employee.employeeId}>
                    <TableCell className="font-mono text-sm">
                      {employee.employeeId}
                    </TableCell>
                    <TableCell className="font-medium">
                      {employee.fullName}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {employee.email}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{employee.department}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                        onClick={() => setConfirmDelete(employee)}
                        disabled={deletingId === (employee.id || employee.employeeId)}
                      >
                        {deletingId === (employee.id || employee.employeeId) ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                        <span className="sr-only">Delete {employee.fullName}</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Dialog open={!!confirmDelete} onOpenChange={() => setConfirmDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Employee</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-semibold text-foreground">
                {confirmDelete?.fullName}
              </span>
              ? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {deleteError && (
            <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
              {deleteError}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmDelete(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={!!deletingId}
            >
              {deletingId ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
