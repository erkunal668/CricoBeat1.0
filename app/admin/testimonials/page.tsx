"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { testimonialsData } from "@/lib/data"
import { PencilIcon, Trash2Icon, PlusCircleIcon, CheckCircle2Icon, XCircleIcon } from "lucide-react"

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState(testimonialsData)

  const handleAdd = () => {
    console.log("Add Testimonial clicked")
    // Implement dialog/form for adding
  }

  const handleEdit = (id: string) => {
    console.log("Edit Testimonial clicked for:", id)
    // Implement dialog/form for editing
  }

  const handleDelete = (id: string) => {
    console.log("Delete Testimonial clicked for:", id)
    // Implement confirmation and actual deletion
    setTestimonials(testimonials.filter((test) => test.id !== id))
  }

  const handleToggleApproval = (id: string) => {
    setTestimonials(testimonials.map((test) => (test.id === id ? { ...test, approved: !test.approved } : test)))
    console.log("Toggle approval for:", id)
  }

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Manage Testimonials</h1>
        <Button onClick={handleAdd}>
          <PlusCircleIcon className="mr-2 h-4 w-4" />
          Add Testimonial
        </Button>
      </div>
      <p className="text-gray-500 dark:text-gray-400">Approve, edit, and remove user testimonials.</p>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Author</TableHead>
              <TableHead>Quote</TableHead>
              <TableHead>Approved</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {testimonials.map((testimonial) => (
              <TableRow key={testimonial.id}>
                <TableCell className="font-medium">{testimonial.author}</TableCell>
                <TableCell className="max-w-[300px] truncate">{testimonial.quote}</TableCell>
                <TableCell>
                  {testimonial.approved ? (
                    <CheckCircle2Icon className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircleIcon className="h-5 w-5 text-red-500" />
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => handleToggleApproval(testimonial.id)}>
                    {testimonial.approved ? (
                      <>
                        <XCircleIcon className="h-4 w-4" />
                        <span className="sr-only">Unapprove</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2Icon className="h-4 w-4" />
                        <span className="sr-only">Approve</span>
                      </>
                    )}
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(testimonial.id)}>
                    <PencilIcon className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(testimonial.id)}>
                    <Trash2Icon className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
