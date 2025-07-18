"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { membershipPlansData } from "@/lib/data"
import { PencilIcon, Trash2Icon, PlusCircleIcon } from "lucide-react"

export default function AdminMembershipPlansPage() {
  const [plans, setPlans] = useState(membershipPlansData)

  const handleAdd = () => {
    console.log("Add Membership Plan clicked")
    // Implement dialog/form for adding
  }

  const handleEdit = (id: string) => {
    console.log("Edit Membership Plan clicked for:", id)
    // Implement dialog/form for editing
  }

  const handleDelete = (id: string) => {
    console.log("Delete Membership Plan clicked for:", id)
    // Implement confirmation and actual deletion
    setPlans(plans.filter((plan) => plan.id !== id))
  }

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Manage Membership Plans</h1>
        <Button onClick={handleAdd}>
          <PlusCircleIcon className="mr-2 h-4 w-4" />
          Add Plan
        </Button>
      </div>
      <p className="text-gray-500 dark:text-gray-400">
        Configure and manage your application's membership and subscription plans.
      </p>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {plans.map((plan) => (
              <TableRow key={plan.id}>
                <TableCell className="font-medium">{plan.name}</TableCell>
                <TableCell>{plan.category}</TableCell>
                <TableCell>${plan.price.toFixed(2)}</TableCell>
                <TableCell>{plan.duration}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(plan.id)}>
                    <PencilIcon className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(plan.id)}>
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
