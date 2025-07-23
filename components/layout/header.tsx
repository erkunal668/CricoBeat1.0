'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { logout } from "@/app/actions/logout"
import { Phone, Mail, Instagram, MessageCircle, MailOpen, PhoneCall } from "lucide-react"
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
    <header className="flex h-16 shrink-0 items-center justify-between px-2 md:px-6 bg-transparent w-full">
      <Link href="/" className="flex items-center gap-2 text-lg font-bold md:text-xl text-white min-w-0">
        <img src="/logo.jpeg" alt="Logo" className="h-12 w-12 object-contain flex-shrink-0" />
        <span className="text-accent-yellow text-xl md:text-2xl font-extrabold tracking-wider truncate">CRICOBEAT</span>
      </Link>

      <nav className="flex items-center gap-2 sm:gap-4 flex-wrap justify-end">
        <Button
          variant="outline"
          className="border-white text-white hover:bg-white hover:text-primary-dark-blue bg-transparent px-2 md:px-4 text-sm md:text-base"
          size="sm"
          onClick={() => setOpen(true)}
        >
          Contact Us
        </Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="bg-secondary-light-blue text-white">
            <DialogTitle>Contact Us</DialogTitle>
            <div className="flex flex-col gap-4 mt-4">
              <div className="flex items-center gap-4">
                <a href="tel:9939619930" className="flex items-center gap-2 text-lg font-semibold text-gray-100 hover:text-green-600 transition-colors">
                  <span className="bg-green-100 p-2 rounded-full"><PhoneCall className="h-6 w-6 text-green-600" /></span>
                  9939619930
                </a>
                <a href="https://wa.me/9939619930" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center bg-green-500 hover:bg-green-600 transition-colors rounded-full p-2" title="WhatsApp">
                  <MessageCircle className="h-6 w-6 text-white" />
                </a>
              </div>
              <div className="flex items-center gap-4">
                <a href="mailto:cricobeat@gmail.com" className="flex items-center gap-2 text-lg font-semibold text-gray-100 hover:text-blue-600 transition-colors">
                  <span className="bg-blue-100 p-2 rounded-full"><MailOpen className="h-6 w-6 text-blue-600" /></span>
                  cricobeat@gmail.com
                </a>
                <a href="https://instagram.com/cricobeat" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500 hover:from-pink-600 hover:via-red-600 hover:to-yellow-600 transition-colors rounded-full p-2" title="Instagram">
                  <Instagram className="h-6 w-6 text-white" />
                </a>
              </div>
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
