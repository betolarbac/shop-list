"use client";

import * as React from "react";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Product } from "../types";
import { Trash2, LoaderCircle } from "lucide-react";
import { deleteProduct } from "../actions";
import { useRouter } from "next/navigation";
import { useState } from "react";

type ProductTable = {
  data: Product[];
};

export function ProductTable({ data }: ProductTable) {
  const router = useRouter();
  const [loadingProductId, setLoadingProductId] = useState<string | null>(null);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const handleDeleteProduct = async (product: Product) => {
    try {
      setLoadingProductId(product.id);
      await deleteProduct({ id: product.id });
      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingProductId(null);
    }
  };

  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: "title",
      header: "Name",
      cell: ({ row }) => (
        <div className="capitalize text-slate-12">{row.getValue("title")}</div>
      ),
    },
    {
      accessorKey: "amount",
      header: "Unidade",
      cell: ({ row }) => (
        <div className="capitalize text-slate-12">{row.getValue("amount")}</div>
      ),
    },
    {
      accessorKey: "value",
      header: () => <div className="text-right">Total</div>,
      cell: ({ row }) => {
        const amount: number = row.getValue("amount");
        const value: number = row.getValue("value");
        const total = value * amount;

        // Format the amount as a dollar amount
        const formatted = new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(total);

        return (
          <div className="text-right font-medium text-slate-12">
            {formatted}
          </div>
        );
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const product = row.original;
        const isLoading = loadingProductId === product.id;
        return (
          <Button
            className="bg-transparent hover:bg-transparent"
            onClick={() => handleDeleteProduct(product)}
            disabled={isLoading}
          >
            {isLoading ? (
              <LoaderCircle className="text-[#ff6465eb] w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Trash2 className="text-[#ff6465eb] w-5 h-5" />
            )}
          </Button>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div>
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
                  );
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
      <div className="flex items-center space-x-2 py-4 justify-between">
        <div>
          <p className="text-slate-12">
            Valor total:{" "}
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(
              data.reduce((total, item) => total + item.value * item.amount, 0)
            )}
          </p>
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
  );
}
