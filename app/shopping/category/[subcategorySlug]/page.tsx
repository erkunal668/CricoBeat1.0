import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { categoriesData, getShoppingItems } from "@/lib/data" // Import getShoppingItems
import { notFound } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import Image from "next/image"
import { Button } from "@/components/ui/button"

interface ShoppingCategoryPageProps {
  params: {
    subcategorySlug: string
  }
}

export default async function ShoppingCategoryPage({ params }: ShoppingCategoryPageProps) {
  // Find the parent "Shopping" category
  const shoppingCategory = categoriesData.find((cat) => cat.slug === "shopping")

  // Find the specific subcategory within "Shopping"
  const subcategory = shoppingCategory?.subcategories.find((sub) => sub.slug === params.subcategorySlug)

  if (!subcategory) {
    notFound() // Render a 404 if the subcategory is not found under "Shopping"
  }

  // Fetch all shopping items from Supabase
  const allShoppingItems = await getShoppingItems()

  // Filter shopping items by the current subcategory slug
  const itemsInSubcategory = allShoppingItems.filter((item) => item.subcategory_slug === params.subcategorySlug) // Use subcategory_slug

  return (
    <div className="flex min-h-screen flex-col bg-primary-dark-blue text-white">
      <Header />
      <main className="flex-1 py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-white">
              {subcategory.name} Items
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl mt-4">
              Browse our selection of {subcategory.name.toLowerCase()} products.
            </p>
          </div>

          {itemsInSubcategory.length === 0 ? (
            <div className="text-center text-gray-400 text-xl mt-12">No items found for this category.</div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {itemsInSubcategory.map((item) => (
                <Card
                  key={item.id}
                  className="bg-secondary-light-blue text-white rounded-xl shadow-lg overflow-hidden flex flex-col"
                >
                  <div className="relative w-full h-48 bg-gray-800 flex items-center justify-center">
                    {item.image_urls && item.image_urls.length > 0 ? (
                      <Image
                        src={item.image_urls[0] || "/placeholder.svg"} // Display the first image
                        alt={item.name}
                        fill
                        style={{ objectFit: "contain" }}
                        className="transition-transform duration-300 hover:scale-105"
                      />
                    ) : (
                      <span className="text-gray-400">No Image</span>
                    )}
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl font-bold text-accent-yellow">{item.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col justify-between">
                    <p className="text-gray-300 text-sm mb-2 line-clamp-2">{item.description}</p>
                    <div className="flex items-baseline gap-2 mt-auto">
                      <span className="text-2xl font-bold">₹{item.price.toLocaleString("en-IN")}</span>
                      {item.discount !== null && item.discount !== undefined && item.discount > 0 && (
                        <>
                          <span className="text-sm text-gray-400 line-through">
                            ₹{(item.price / (1 - item.discount / 100)).toLocaleString("en-IN")}
                          </span>
                          <span className="text-sm font-semibold text-green-400">({item.discount}% Off)</span>
                        </>
                      )}
                    </div>
                    <Link href={`/shopping/${item.slug}`} className="mt-4 w-full">
                      <Button className="w-full bg-accent-yellow text-primary-dark-blue hover:bg-accent-yellow/90">
                        View Details
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
