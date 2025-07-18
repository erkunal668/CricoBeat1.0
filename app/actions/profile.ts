"use server"

import { createClient } from "@/lib/supabase/server"
import { z } from "zod"
import { revalidatePath } from "next/cache"

// Define schema for profile update
const ProfileUpdateSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters long." }).trim(),
  mobile: z
    .string()
    .regex(/^\d{10}$/, { message: "Mobile number must be 10 digits." })
    .trim(),
  address: z.string().min(10, { message: "Address must be at least 10 characters long." }).trim(),
})

export type ProfileFormState =
  | {
      errors?: {
        fullName?: string[]
        mobile?: string[]
        address?: string[]
      }
      message?: string
      success?: boolean
    }
  | undefined

export async function updateProfile(prevState: ProfileFormState, formData: FormData) {
  const validatedFields = ProfileUpdateSchema.safeParse({
    fullName: formData.get("fullName"),
    mobile: formData.get("mobile"),
    address: formData.get("address"),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please correct the errors in the form.",
      success: false,
    }
  }

  const { fullName, mobile, address } = validatedFields.data
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { message: "User not authenticated.", success: false }
  }

  try {
    // Update the profiles table
    const { error: profileError } = await supabase
      .from("profiles")
      .update({
        full_name: fullName,
        mobile: mobile,
        address: address,
      })
      .eq("id", user.id)

    if (profileError) {
      console.error("[updateProfile] Supabase profile update error:", profileError.message)
      return { message: "Failed to update profile. Please try again.", success: false }
    }

    // Optionally, update user_metadata in auth.users if full_name is also stored there
    const { error: userUpdateError } = await supabase.auth.admin.updateUserById(user.id, {
      user_metadata: { full_name: fullName },
    })

    if (userUpdateError) {
      console.error("[updateProfile] Supabase auth user update error:", userUpdateError.message)
      // This is less critical than profile update, so we might just log it
    }

    revalidatePath("/profile") // Revalidate the profile page to show updated data
    revalidatePath("/", "layout") // Revalidate layout to update header profile name

    return { message: "Profile updated successfully!", success: true }
  } catch (error: any) {
    console.error("[updateProfile] Unexpected error:", error.message)
    return { message: "An unexpected error occurred during profile update.", success: false }
  }
}
