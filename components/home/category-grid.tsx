import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { categoriesData } from "@/lib/data" // Import categoriesData

export function CategoryGrid() {
  return (
    <section className="w-full bg-gray-100 py-12 dark:bg-gray-800 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Explore Our Categories</h2>
          <p className="mx-auto max-w-[900px] text-gray-500 dark:text-gray-400 md:text-xl">
            Discover a wide range of fitness and lifestyle categories tailored for you.
          </p>
        </div>

        <div className="grid gap-6 py-12 lg:grid-cols-3 xl:grid-cols-5">
          {categoriesData.map(({ name, icon: Icon, description, slug }) => (
            <Link key={name} href={`/categories/${slug}`} className="group">
              <Card className="flex flex-col items-center p-6 text-center transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <CardHeader>
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-xl font-bold">{name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500 dark:text-gray-400">{description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
