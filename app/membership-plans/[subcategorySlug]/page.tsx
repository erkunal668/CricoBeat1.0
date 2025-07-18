import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { CheckIcon } from "lucide-react"
import { membershipPlansData, WHATSAPP_NUMBER } from "@/lib/data"
import { notFound } from "next/navigation"

interface MembershipPlansPageProps {
  params: {
    subcategorySlug: string
  }
}

export default function MembershipPlansPage({ params }: MembershipPlansPageProps) {
  const plans = membershipPlansData.filter((plan) => plan.subcategorySlug === params.subcategorySlug)

  if (plans.length === 0) {
    notFound() // Or display a message that no plans are available for this subcategory
  }

  return (
    <div className="flex min-h-screen flex-col bg-primary-dark-blue text-white">
      <Header />
      <main className="flex-1 py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-white">
              Membership Plans for {params.subcategorySlug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl mt-4">
              Choose the perfect plan to kickstart your training journey.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {plans.map((plan) => (
              <Card key={plan.id} className="bg-secondary-light-blue text-white rounded-xl shadow-lg p-6">
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-3xl font-bold text-accent-yellow">{plan.name}</CardTitle>
                  <div className="text-5xl font-extrabold mt-2">₹{plan.price.toLocaleString("en-IN")}</div>
                  <p className="text-gray-300">{plan.duration}</p>
                </CardHeader>
                <CardContent className="pt-4">
                  <ul className="space-y-2 text-lg">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckIcon className="h-5 w-5 text-green-400" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                      `Hello Cricobeat, I'm interested in the "${plan.name}" plan for ${params.subcategorySlug.replace(
                        /-/g,
                        " ",
                      )}. The price is ₹${plan.price}. Please provide more details.`,
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 inline-block w-full rounded-md bg-accent-yellow px-4 py-3 text-center text-lg font-semibold text-primary-dark-blue hover:bg-accent-yellow/90"
                  >
                    Choose Plan
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
