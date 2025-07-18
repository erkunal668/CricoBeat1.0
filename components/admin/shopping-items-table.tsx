"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { categoriesData, type ShoppingItem } from "@/lib/data"
import { PencilIcon, Trash2Icon, PlusCircleIcon, ImageIcon } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { AddEditShoppingItemForm } from "@/components/admin/add-edit-shopping-item-form"
import Image from "next/image"
import { deleteShoppingItem } from "@/app/actions/shopping-items"
import { toast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

interface Props {
  initialItems: ShoppingItem[]
}

export default function ShoppingItemsTable({ initialItems }: Props) {
  const router = useRouter()
  const [items, setItems] = useState(initialItems)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<ShoppingItem | undefined>()

  /* helpers -------------------------------------------------------------- */
  const subName = (slug: string) =>
    categoriesData.find((c) => c.slug === "shopping")?.subcategories.find((s) => s.slug === slug)?.name ?? slug

  /* CRUD handlers -------------------------------------------------------- */
  const onAdd = () => {
    setEditing(undefined)
    setDialogOpen(true)
  }

  const onEdit = (item: ShoppingItem) => {
    setEditing(item)
    setDialogOpen(true)
  }

  const onDelete = async (id: string) => {
    if (!confirm("Delete this item?")) return
    const res = await deleteShoppingItem(id)
    toast({
      title: res.success ? "Deleted" : "Error",
      description: res.message,
      variant: res.success ? "default" : "destructive",
    })
    if (res.success) router.refresh() // fetch latest list from server
  }

  /* after a save we just refresh the whole page ------------------------- */
  const closeAndRefresh = () => {
    setDialogOpen(false)
    setEditing(undefined)
    router.refresh()
  }

  /* UI ------------------------------------------------------------------ */
  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Manage Shopping Items</h1>
        <Button onClick={onAdd}>
          <PlusCircleIcon className="mr-2 h-4 w-4" />
          Add Item
        </Button>
      </div>

      <div className="border rounded-lg overflow-hidden">
        {items.length === 0 ? (
          <div className="p-6 text-center text-gray-500">No shopping items found.</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Subcategory</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((it) => (
                <TableRow key={it.id}>
                  <TableCell>
                    {it.image_urls?.[0] ? (
                      <Image
                        src={it.image_urls[0] || "/placeholder.svg"}
                        alt={it.name}
                        width={40}
                        height={40}
                        className="rounded-md object-cover"
                      />
                    ) : (
                      <ImageIcon className="h-8 w-8 text-gray-400" />
                    )}
                  </TableCell>
                  <TableCell className="font-medium">{it.name}</TableCell>
                  <TableCell>{subName(it.subcategory_slug)}</TableCell>
                  <TableCell>₹{it.price.toLocaleString("en-IN")}</TableCell>
                  <TableCell>{it.discount ? `${it.discount}%` : "—"}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => onEdit(it)}>
                      <PencilIcon className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => onDelete(it.id)}>
                      <Trash2Icon className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Shopping Item" : "Add Shopping Item"}</DialogTitle>
          </DialogHeader>
          <AddEditShoppingItemForm
            initialData={editing}
            onSave={closeAndRefresh}
            onCancel={() => setDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}
