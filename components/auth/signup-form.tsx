"use client"

import { register, type FormState } from "@/app/actions/register"
import { useActionState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { useState, useEffect } from "react"

interface SignupFormProps {
  onSignupSuccess: () => void
  onSwitchTab: (tab: string) => void
}

export function SignupForm({ onSignupSuccess, onSwitchTab }: SignupFormProps) {
  const [state, action, isPending] = useActionState<FormState, FormData>(register, undefined)
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    if (state?.success) {
      onSignupSuccess() // Call the success handler from AuthDialog
    }
  }, [state, onSignupSuccess])

  return (
    <form action={action} className="space-y-4">
      <div>
        <Label htmlFor="fullName">Full Name</Label>
        <Input id="fullName" name="fullName" type="text" placeholder="John Doe" required />
        {state?.errors?.fullName && <p className="text-red-500 text-sm mt-1">{state.errors.fullName}</p>}
      </div>
      <div>
        <Label htmlFor="mobile">Mobile Number</Label>
        <Input id="mobile" name="mobile" type="tel" placeholder="9876543210" required />
        {state?.errors?.mobile && <p className="text-red-500 text-sm mt-1">{state.errors.mobile}</p>}
      </div>
      <div>
        <Label htmlFor="address">Full Address</Label>
        <Textarea id="address" name="address" placeholder="123 Main St, City, State, Zip" required />
        {state?.errors?.address && <p className="text-red-500 text-sm mt-1">{state.errors.address}</p>}
      </div>
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
          onClick={() => setShowPassword((prev) => !prev)}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
        </Button>
        {state?.errors?.password && (
          <div className="text-red-500 text-sm mt-1">
            <p>Password must:</p>
            <ul className="list-disc list-inside">
              {state.errors.password.map((error) => (
                <li key={error}>- {error}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {state?.message && (
        <p className={`mt-2 text-sm ${state.errors ? "text-red-500" : "text-green-500"}`}>{state.message}</p>
      )}
      <Button
        type="submit"
        className="w-full bg-accent-yellow text-primary-dark-blue hover:bg-accent-yellow/90"
        disabled={isPending}
      >
        {isPending ? "Signing Up..." : "Sign Up"}
      </Button>
      <p className="text-center text-sm text-gray-400">
        Already have an account?{" "}
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
