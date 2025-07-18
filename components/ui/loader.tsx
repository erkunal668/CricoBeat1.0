import { Skeleton } from "@/components/ui/skeleton"

export function Loader() {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      {/* Cricket ball spinner */}
      <div className="animate-spin rounded-full border-8 border-accent-yellow border-t-transparent h-14 w-14 mb-4 shadow-lg" />
      <Skeleton className="h-6 w-40 mb-2 bg-secondary-light-blue" />
      <Skeleton className="h-4 w-24 bg-secondary-light-blue" />
      <span className="text-base text-accent-yellow font-semibold tracking-wide mt-2">Loading...</span>
    </div>
  )
} 