import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { getUserAndProfile } from "@/app/actions/auth"
import { ProfileForm } from "@/components/profile/profile-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { redirect } from "next/navigation"

export default async function ProfilePage() {
  const { user, profile } = await getUserAndProfile()

  if (!user) {
    redirect("/login?message=You must be logged in to view your profile.")
  }

  return (
    <div className="flex min-h-screen flex-col bg-primary-dark-blue text-white">
      <Header />
      <main className="flex-1 py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-white">Your Profile</h1>
            <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl mt-4">Update your personal information.</p>
          </div>

          <Card className="w-full max-w-md mx-auto bg-secondary-light-blue text-white">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-accent-yellow">Edit Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <ProfileForm
                initialData={{
                  fullName: profile?.full_name || "",
                  mobile: profile?.mobile || "",
                  address: profile?.address || "",
                  email: user.email || "", // Email from auth.user
                }}
              />
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
