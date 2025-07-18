import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { categoriesData } from "@/lib/data" // Import categoriesData

export function MainCategoryGrid() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">Our Core Categories</h2>
          <p className="mx-auto max-w-[900px] text-gray-300 md:text-xl mt-4">
            Explore the diverse range of fitness and lifestyle categories we offer.
          </p>
        </div>

        {/* Responsive grid: 2 columns on mobile, 3 columns on larger screens */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 py-12">
          {categoriesData.map(({ name, icon: Icon, description, slug }) => (
            <Link key={name} href={`/categories/${slug}`} className="group">
              <Card className="flex flex-col items-center p-6 text-center bg-secondary-light-blue text-white transition-all duration-300 hover:scale-105 hover:shadow-lg h-full">
                <CardHeader>
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-dark-blue text-accent-yellow">
                    <Icon className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-xl font-bold">{name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-200">{description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
