'use client';

import { AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ErrorMessageProps {
  message?: string
  onRetry?: () => void
}

export function ErrorMessage({
  message = "Something went wrong. Please try again.",
  onRetry,
}: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10">
        <AlertCircle className="h-7 w-7 text-destructive" />
      </div>
      <h3 className="mt-4 text-base font-semibold text-foreground">Error</h3>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">{message}</p>
      {onRetry && (
        <Button variant="outline" className="mt-4 bg-transparent" onClick={onRetry}>
          Try Again
        </Button>
      )}
    </div>
  )
}
