import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { coursesData } from "@/lib/data" // Import new coursesData

export function CoursesGrid() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 py-12 lg:grid-cols-3 xl:grid-cols-5">
          {coursesData.map(({ name, description, slug, highlighted }) => (
            <Link key={name} href={`/courses/${slug}`} className="group">
              <Card
                className={`flex flex-col items-center p-6 text-center bg-secondary-light-blue text-white transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                  highlighted ? "border-2 border-accent-yellow" : "border-2 border-transparent"
                }`}
              >
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-accent-yellow">{name}</CardTitle>
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
