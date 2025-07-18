'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { logout } from "@/app/actions/logout"
import { User, ChevronDown, Phone, Mail } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AuthDialog } from "@/components/auth/auth-dialog" // Will be created in the next step
import { useState } from "react"
import { Dialog, DialogContent, DialogTitle, DialogClose } from "@/components/ui/dialog"

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="flex h-16 shrink-0 items-center justify-between px-4 md:px-6 bg-transparent">
      <Link href="/" className="flex items-center gap-2 text-lg font-bold md:text-xl text-white">
        <img src="/logo.jpeg" alt="Logo" className="h-[3.5rem] w-[4.5rem] object-contain" />
        <span className="text-accent-yellow text-2xl font-extrabold tracking-wider">CRICOBEAT</span>
      </Link>

      <nav className="flex items-center gap-2 sm:gap-4">
        <Button
          variant="outline"
          className="border-white text-white hover:bg-white hover:text-primary-dark-blue bg-transparent"
          size="sm"
          onClick={() => setOpen(true)}
        >
          Get Enquiry
        </Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="bg-secondary-light-blue text-white">
            <DialogTitle>Contact Us</DialogTitle>
            <div className="flex flex-col gap-2 mt-2">
              <a href="tel:9939619930" className="underline text-lg flex items-center gap-2"><Phone className="h-5 w-5" />9939619930</a>
              <a href="mailto:cricobeat@gmail.com" className="underline text-lg flex items-center gap-2"><Mail className="h-5 w-5" />cricobeat@gmail.com</a>
            </div>
            <DialogClose asChild>
              <Button className="mt-4" onClick={() => setOpen(false)}>Close</Button>
            </DialogClose>
          </DialogContent>
        </Dialog>
        <AuthDialog />
      </nav>
    </header>
  )
}
