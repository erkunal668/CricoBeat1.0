import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { categoriesData } from "@/lib/data"
import { notFound } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { CheckCircle2 } from "lucide-react" // Example icon for subcategories
import { Loader } from "@/components/ui/loader"

interface CategoryPageProps {
  params: {
    categorySlug: string
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  !params.categorySlug && Loader;
  const category = categoriesData.find((cat) => cat.slug === params.categorySlug)

  if (!category) {
    notFound() // Render a 404 page if category not found
  }

  return (
    <div className="flex min-h-screen flex-col bg-primary-dark-blue text-white">
      <Header />
      <main className="flex-1 py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-white">
              {category.name} Subcategories
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl mt-4">
              Explore the specialized areas within {category.name}.
            </p>
          </div>

          {/* Responsive grid: 2 columns on mobile, 3 columns on larger screens */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {category.subcategories.map((sub) => {
              const SubIcon = sub.icon || CheckCircle2 // Use specific icon if available, else a generic one
              // Determine the correct link based on the parent category
              const href =
                category.slug === "shopping"
                  ? `/shopping/category/${sub.slug}` // New route for shopping items
                  : `/membership-plans/${sub.slug}` // Existing route for membership plans

              return (
                <Link key={sub.slug} href={href} className="group">
                  <Card className="flex flex-col items-center p-6 text-center bg-white text-primary-dark-blue rounded-xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl h-full">
                    <CardHeader>
                      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary-light-blue text-accent-yellow">
                        <SubIcon className="h-8 w-8" />
                      </div>
                      <CardTitle className="text-xl font-bold">{sub.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700">{sub.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
