"use server"

import { createAdminClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function seedAdminUser() {
  const adminEmail = "kkunal668@gmail.com"
  const adminPassword = "1234567890" // WARNING: Hardcoded password. Change immediately after setup!
  const adminFullName = "Kunal Admin"
  const adminMobile = "9939619930"
  const adminAddress = "Admin Address, City, State"

  const supabaseAdmin = createAdminClient()

  try {
    // Check if user already exists
    const { data: existingUsers, error: fetchError } = await supabaseAdmin.auth.admin.listUsers({
      perPage: 1,
      page: 1,
    })

    if (fetchError) {
      console.error("Error listing users:", fetchError.message)
      return { success: false, message: "Failed to check for existing admin user." }
    }

    const adminExists = existingUsers?.users.some((user) => user.email === adminEmail)

    if (adminExists) {
      return { success: true, message: "Admin user already exists. No action needed." }
    }

    // Create the user with admin privileges
    const { data: userData, error: createUserError } = await supabaseAdmin.auth.admin.createUser({
      email: adminEmail,
      password: adminPassword,
      email_confirm: true, // Automatically confirm email for admin
      user_metadata: {
        full_name: adminFullName,
      },
    })

    if (createUserError) {
      console.error("Error creating admin user:", createUserError.message)
      return { success: false, message: `Failed to create admin user: ${createUserError.message}` }
    }

    // Insert additional profile data
    if (userData.user) {
      const { error: profileError } = await supabaseAdmin.from("profiles").insert({
        id: userData.user.id,
        full_name: adminFullName,
        mobile: adminMobile,
        address: adminAddress,
        // You might add a 'role: "admin"' column here if you set it up in your profiles table
      })

      if (profileError) {
        console.error("Error creating admin profile:", profileError.message)
        // Optionally, delete the user if profile creation fails
        await supabaseAdmin.auth.admin.deleteUser(userData.user.id)
        return { success: false, message: `Failed to create admin profile: ${profileError.message}` }
      }
    }

    revalidatePath("/", "layout")
    return { success: true, message: "Admin user created successfully!" }
  } catch (error: any) {
    console.error("Unexpected error in seedAdminUser:", error.message)
    return { success: false, message: `An unexpected error occurred: ${error.message}` }
  }
}
