"use client"

import { useActionState } from "react"
import { login } from "@/app/actions/login"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { useState, useEffect } from "react"

interface LoginFormProps {
  onLoginSuccess: () => void
  onSwitchTab: (tab: string) => void
}

export function LoginForm({ onLoginSuccess, onSwitchTab }: LoginFormProps) {
  const [state, action, pending] = useActionState(login, undefined)
  const [showPassword, setShowPassword] = useState(false)

  // redirect on success
  useEffect(() => {
    if (state?.success) {
      onLoginSuccess() // Call the success handler from AuthDialog
    }
  }, [state, onLoginSuccess])

  return (
    <form action={action} className="space-y-4">
      {state?.message && state.success && <p className="text-green-500 text-sm text-center">{state.message}</p>}
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" placeholder="you@example.com" required />
        {state?.errors?.email && <p className="text-red-500 text-sm mt-1">{state.errors.email}</p>}
      </div>

      <div className="relative">
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type={showPassword ? "text" : "password"} required />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2"
          onClick={() => setShowPassword((v) => !v)}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
        </Button>
        {state?.errors?.password && <p className="text-red-500 text-sm mt-1">{state.errors.password}</p>}
      </div>

      {state?.message && !state.success && <p className="text-red-500 text-sm mt-2">{state.message}</p>}

      <Button className="w-full bg-accent-yellow text-primary-dark-blue hover:bg-accent-yellow/90" disabled={pending}>
        {pending ? "Logging In..." : "Log In"}
      </Button>

      <div className="flex justify-between text-sm mt-4">
        <Button
          variant="link"
          onClick={() => onSwitchTab("forgot-password")}
          className="text-accent-yellow p-0 h-auto hover:underline"
        >
          Forgot Password?
        </Button>
        <Button
          variant="link"
          onClick={() => onSwitchTab("signup")}
          className="text-accent-yellow p-0 h-auto hover:underline"
        >
          Sign Up
        </Button>
      </div>
    </form>
  )
}
