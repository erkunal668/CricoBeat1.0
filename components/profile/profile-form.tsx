"use client"

import { useActionState } from "react"
import { updateProfile } from "@/app/actions/profile"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useEffect } from "react"
import { toast } from "@/hooks/use-toast" // Assuming you have a useToast hook

interface ProfileFormProps {
  initialData: {
    fullName: string
    mobile: string
    address: string
    email: string // Email is displayed but not editable via this form
  }
}

export function ProfileForm({ initialData }: ProfileFormProps) {
  const [state, action, isPending] = useActionState(updateProfile, undefined)

  useEffect(() => {
    if (state?.message) {
      toast({
        title: state.success ? "Success!" : "Error!",
        description: state.message,
        variant: state.success ? "default" : "destructive",
      })
    }
  }, [state])

  return (
    <form action={action} className="space-y-4">
      <div>
        <Label htmlFor="fullName">Full Name</Label>
        <Input id="fullName" name="fullName" type="text" defaultValue={initialData.fullName} required />
        {state?.errors?.fullName && <p className="text-red-500 text-sm mt-1">{state.errors.fullName}</p>}
      </div>
      <div>
        <Label htmlFor="mobile">Mobile Number</Label>
        <Input id="mobile" name="mobile" type="tel" defaultValue={initialData.mobile} required />
        {state?.errors?.mobile && <p className="text-red-500 text-sm mt-1">{state.errors.mobile}</p>}
      </div>
      <div>
        <Label htmlFor="address">Full Address</Label>
        <Textarea id="address" name="address" defaultValue={initialData.address} required />
        {state?.errors?.address && <p className="text-red-500 text-sm mt-1">{state.errors.address}</p>}
      </div>
      <div>
        <Label htmlFor="email">Email (Not Editable)</Label>
        <Input
          id="email"
          name="email"
          type="email"
          defaultValue={initialData.email}
          disabled
          className="opacity-70 cursor-not-allowed"
        />
      </div>
      <Button
        type="submit"
        className="w-full bg-accent-yellow text-primary-dark-blue hover:bg-accent-yellow/90"
        disabled={isPending}
      >
        {isPending ? "Saving..." : "Save Changes"}
      </Button>
    </form>
  )
}
