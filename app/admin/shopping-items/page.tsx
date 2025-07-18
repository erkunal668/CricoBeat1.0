import { getShoppingItems } from "@/lib/data" // server-side fetch
import ShoppingItemsTable from "@/components/admin/shopping-items-table" // client table

export default async function AdminShoppingItemsPage() {
  const items = await getShoppingItems() // runs on the server – safe
  return <ShoppingItemsTable initialItems={items} />
}
