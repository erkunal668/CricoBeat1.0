import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { getShoppingItems } from "@/lib/data" // Import the new getShoppingItems
import { notFound } from "next/navigation"
import { ImageCarousel } from "@/components/shopping/image-carousel"
import { Button } from "@/components/ui/button"
import { WHATSAPP_NUMBER } from "@/lib/data"
import { ShoppingBagIcon } from "lucide-react"

interface ShoppingItemPageProps {
  params: {
    itemSlug: string
  }
}

export default async function ShoppingItemPage({ params }: ShoppingItemPageProps) {
  const allItems = await getShoppingItems() // Fetch all items from Supabase
  const item = allItems.find((i) => i.slug === params.itemSlug)

  if (!item) {
    notFound()
  }

  const finalPrice = item.discount ? item.price * (1 - item.discount / 100) : item.price

  return (
    <div className="flex min-h-screen flex-col bg-primary-dark-blue text-white">
      <Header />
      <main className="flex-1 py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6 grid md:grid-cols-2 gap-8 items-start">
          {/* Image Carousel */}
          <div className="w-full max-w-md mx-auto md:max-w-none">
            <ImageCarousel images={item.image_urls} /> {/* Use image_urls */}
          </div>

          {/* Item Details */}
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl font-bold tracking-tighter text-accent-yellow">{item.name}</h1>
            <p className="text-gray-300 text-lg">{item.description}</p>

            <div className="flex items-baseline gap-2 mt-4">
              <span className="text-5xl font-extrabold text-white">₹{finalPrice.toLocaleString("en-IN")}</span>
              {item.discount && (
                <>
                  <span className="text-xl text-gray-400 line-through">₹{item.price.toLocaleString("en-IN")}</span>
                  <span className="text-lg font-semibold text-green-400">({item.discount}% Off)</span>
                </>
              )}
            </div>

            <Button
              className="mt-6 w-full bg-accent-yellow text-primary-dark-blue hover:bg-accent-yellow/90 py-3 text-lg font-semibold flex items-center gap-2"
              asChild
            >
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                  `Hello Cricobeat, I'm interested in purchasing the "${item.name}" (Price: ₹${finalPrice.toLocaleString(
                    "en-IN",
                  )}). Please provide more details.`,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ShoppingBagIcon className="h-5 w-5" /> Buy Now
              </a>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
