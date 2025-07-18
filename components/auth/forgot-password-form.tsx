"use client"

import { useActionState } from "react"
import { requestPasswordReset } from "@/app/actions/forgot-password"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect } from "react"

interface ForgotPasswordFormProps {
  onForgotPasswordSuccess: () => void
  onSwitchTab: (tab: string) => void
}

export function ForgotPasswordForm({ onForgotPasswordSuccess, onSwitchTab }: ForgotPasswordFormProps) {
  const [state, action, isPending] = useActionState(requestPasswordReset, undefined)

  useEffect(() => {
    if (state?.success) {
      onForgotPasswordSuccess() // Call the success handler from AuthDialog
    }
  }, [state, onForgotPasswordSuccess])

  return (
    <form action={action} className="space-y-4">
      <p className="text-gray-300 text-sm text-center">
        Enter your email address and we'll send you a link to reset your password.
      </p>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" placeholder="you@example.com" required />
      </div>
      {state?.message && (
        <p className={`text-sm mt-2 ${state.success ? "text-green-400" : "text-red-400"}`}>{state.message}</p>
      )}
      <Button
        type="submit"
        className="w-full bg-accent-yellow text-primary-dark-blue hover:bg-accent-yellow/90"
        disabled={isPending}
      >
        {isPending ? "Sending..." : "Send Reset Link"}
      </Button>
      <p className="text-center text-sm text-gray-400">
        Remember your password?{" "}
        <Button
          variant="link"
          onClick={() => onSwitchTab("login")}
          className="text-accent-yellow p-0 h-auto hover:underline"
        >
          Log In
        </Button>
      </p>
    </form>
  )
}
