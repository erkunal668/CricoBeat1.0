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

        <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 justify-center py-8">
          {categoriesData.map(({ name, icon: Icon, description, slug }) => (
            <Link key={name} href={`/categories/${slug}`} className="group flex justify-center">
              <Card className="flex flex-col items-center p-3 sm:p-4 text-center transition-all duration-300 hover:scale-105 hover:shadow-lg min-h-[120px] max-w-[160px] w-full aspect-square">
                <CardHeader className="p-0 mb-2">
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="h-7 w-7" />
                  </div>
                  <CardTitle className="text-base font-bold mt-1">{name}</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-tight">{description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
