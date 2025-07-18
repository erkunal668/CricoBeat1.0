import { Header } from "@/components/layout/header"
import { HeaderWrapper } from "@/components/layout/header-wrapper" // New import
import { HeroSection } from "@/components/home/hero-section"
import { MainCategoryGrid } from "@/components/home/main-category-grid"
import { TestimonialsSection } from "@/components/home/testimonials-section"
import { Footer } from "@/components/layout/footer"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <HeaderWrapper>
        <Header />
      </HeaderWrapper>
      <main className="flex-1">
        <HeroSection />
        <MainCategoryGrid />
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  )
}
