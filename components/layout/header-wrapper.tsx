"use client"

import type { ReactNode } from "react"

/**
 * A client component wrapper to ensure its children (Server Components)
 * are only rendered on the server and their data fetching logic is not
 * re-executed during client-side hydration.
 */
export function HeaderWrapper({ children }: { children: ReactNode }) {
  return <>{children}</>
}
