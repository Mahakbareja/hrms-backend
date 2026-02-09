"use client"

import { AppShell } from "@/components/app-shell"
import { DashboardContent } from "@/components/dashboard-content"

export default function Page() {
  return (
    <AppShell title="Dashboard" description="Overview of your HR management system">
      <DashboardContent />
    </AppShell>
  )
}
