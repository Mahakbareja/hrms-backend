"use client"

import { AppShell } from "@/components/app-shell"
import { AddEmployeeForm } from "@/components/add-employee-form"
import { EmployeeList } from "@/components/employee-list"
import { useEmployees } from "@/hooks/use-employees"

export default function EmployeesPage() {
  const { employees, isLoading, isError, error, mutate } = useEmployees()

  return (
    <AppShell title="Employees" description="Manage your employee records">
      <div className="flex flex-col gap-6">
        <AddEmployeeForm onSuccess={() => mutate()} />
        <EmployeeList
          employees={employees}
          isLoading={isLoading}
          isError={isError}
          error={error}
          onMutate={() => mutate()}
        />
      </div>
    </AppShell>
  )
}
