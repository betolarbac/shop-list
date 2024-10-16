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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Expiration} from "../types";
import { Trash2, LoaderCircle } from "lucide-react";
import { deleteExpiration } from "../action";
import { useRouter } from "next/navigation";
import { useState } from "react";
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime);
dayjs.locale('pt-br');

type ExpirationTable = {
  data: Expiration[];
};

export function ExpirationTable({ data }: ExpirationTable) {
  const router = useRouter();
  const [loadingProductId, setLoadingProductId] = useState<string | null>(null);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [expirationFilter, setExpirationFilter] = useState<string>("all");

  const filteredData = React.useMemo(() => {
    if (expirationFilter === "all") return data;
    const now = dayjs();
    switch (expirationFilter) {
      case "expired":
        return data.filter(item => dayjs(item.expiration).isBefore(now));
      case "week":
        return data.filter(item => dayjs(item.expiration).diff(now, 'day') <= 7 && dayjs(item.expiration).isAfter(now));
      case "month":
        return data.filter(item => dayjs(item.expiration).diff(now, 'day') <= 30 && dayjs(item.expiration).isAfter(now));
      default:
        return data;
    }
  }, [data, expirationFilter]);

  const handleDeleteExpiration = async (product: Expiration) => {
    try {
      setLoadingProductId(product.id);
      await deleteExpiration({ id: product.id });
      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingProductId(null);
    }
  };

  const columns: ColumnDef<Expiration>[] = [
    {
      accessorKey: "title",
      header: "Nome",
      cell: ({ row }) => (
        <div className="capitalize text-slate-12">{row.getValue("title")}</div>
      ),
    },
    {
      accessorKey: "amount",
      header: "Quantidade",
      cell: ({ row }) => (
        <div className="capitalize text-slate-12">{row.getValue("amount")}</div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: () => <div className="hidden lg:block">Data de cadastro</div>,
      cell: ({ row }) => { 
        const date = row.getValue("createdAt") as Date;
        const formattedDate = new Intl.DateTimeFormat("pt-BR", {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        }).format(date);


      return <div className="text-slate-12 hidden lg:block">{formattedDate}</div>;
      },
    },
    {
      accessorKey: "expiration",
      header: "Data de validade",
      cell: ({ row }) => { 
        const date = dayjs(row.getValue("expiration"));
        const formattedDate = date.format('DD/MM/YYYY');
        const daysUntilExpiration = date.diff(dayjs(), 'day')

      let statusColor = 'text-green-500';
      if (daysUntilExpiration <= 30) {
        statusColor = 'text-yellow-500';
      }
      if (daysUntilExpiration <= 7) {
        statusColor = 'text-red-500';
      }
      if (daysUntilExpiration < 0) {
        statusColor = 'text-gray-500';
      }

      return (
        <div className="flex flex-col">
          <span className="text-slate-12">{formattedDate}</span>
          <span className={`text-sm ${statusColor}`}>
            {daysUntilExpiration >= 0
              ? `Vence em ${date.fromNow(true)}`
              : `Venceu há ${date.fromNow(true)}`}
          </span>
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
            onClick={() => handleDeleteExpiration(product)}
            disabled={isLoading}
          >
            {isLoading ? (
              <LoaderCircle className="text-[#ff6465eb] w-5 h-5 animate-spin" />
            ) : (
              <Trash2 className="text-[#ff6465eb] w-5 h-5" />
            )}
          </Button>
        );
      },
    },
  ];

  const table = useReactTable({
    data: filteredData,
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
      <div className="mb-4 flex justify-end">
        <Select onValueChange={setExpirationFilter} defaultValue="all">
          <SelectTrigger className="w-[180px] text-slate-12">
            <SelectValue placeholder="Filtrar por validade" />
          </SelectTrigger>
          <SelectContent className="bg-[#05050a] ">
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="expired">Vencidos</SelectItem>
            <SelectItem value="week">Vence em 7 dias</SelectItem>
            <SelectItem value="month">Vence em 30 dias</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="rounded-md border ">
        <Table>
          <TableHeader className="h-8 rounded-md bg-[#ddeaf814] border-b-[1px]">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead className="bg-[#05050a]" key={header.id}>
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
                  Sem Produtos
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center space-x-2 py-4 justify-end">

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
