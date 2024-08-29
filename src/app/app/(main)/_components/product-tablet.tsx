"use client"

import * as React from "react"
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const data: Payment[] = [
  {
    id: "m5gr84i9",
    total: 316,
    name: "Arroz",
    unidade: 1,
  },
  {
    id: "3u1reuv4",
    total: 242,
    name: "Arroz",
    unidade: 1,
  },
  {
    id: "derv1ws0",
    total: 837,
    name: "Arroz",
    unidade: 1,
  },
  {
    id: "5kma53ae",
    total: 874,
    name: "Arroz",
    unidade: 1,
  },
  {
    id: "bhqecj4p",
    name: "Arroz",
    unidade: 1,
    total: 721,
  },
  {
    id: "bhqecj4p",
    total: 721,
    name: "Arroz",
    unidade: 1,
  },
  {
    id: "bhqecj4p",
    total: 721,
    name: "Arroz",
    unidade: 1,
  },
  {
    id: "bhqecj4p",
    total: 721,
    name: "Arroz",
    unidade: 1,
  },
  {
    id: "bhqecj4p",
    total: 721,
    name: "Arroz",
    unidade: 1,
  },
  {
    id: "bhqecj4p",
    total: 721,
    name: "Arroz",
    unidade: 1,
  },
  {
    id: "bhqecj4p",
    total: 721,
    name: "Arroz",
    unidade: 1,
  },
  {
    id: "bhqecj4p",
    total: 721,
    name: "Arroz",
    unidade: 1,
  },
  {
    id: "bhqecj4p",
    total: 721,
    name: "Arroz",
    unidade: 1,
  },
  {
    id: "bhqecj4p",
    total: 721,
    name: "Arroz",
    unidade: 1,
  },
  {
    id: "bhqecj4p",
    total: 721,
    name: "Arroz",
    unidade: 1,
  },
]

export type Payment = {
  id: string
  name: string
  unidade: number
  total: number
}

export const columns: ColumnDef<Payment>[] = [

  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="capitalize ">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "unidade",
    header: "Unidade",
    cell: ({ row }) => (
      <div className="capitalize ">{row.getValue("unidade")}</div>
    ),
  },
  {
    accessorKey: "total",
    header: () => <div className="text-right">Total</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("total"))

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL", 
      }).format(amount)

      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  
]

export function ProductTable() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full">
 
      <div >
        <Table>
          <TableHeader className="h-8 rounded-md bg-[#ddeaf814]">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead className="" key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            className="bg-[#7450AC] hover:bg-[#7450AC]"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
           className="bg-[#7450AC] hover:bg-[#7450AC]"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}