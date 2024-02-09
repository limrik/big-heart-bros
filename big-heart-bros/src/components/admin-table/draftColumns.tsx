"use client";

import { ColumnDef } from "@tanstack/react-table";
import { EventType, Skills } from "@prisma/client";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Button } from "../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import Link from "next/link";

export type Event = {
  id: string;
  name: string;
  description: string;
  location: string;
  capacity: number;
  type: EventType;
  registrationDeadline: Date;
  startDate: Date;
  startTime: Date;
  endDate: Date;
  endTime: Date;
  skills: Skills[];
  createdAt: Date;
  posterId: string;
  approved: boolean;
};

const handleApprove = async (id: String) => {
  try {
    console.log(id);
    const data = await fetch(`/api/approve/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    });
    window.location.reload();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const draftColumns: ColumnDef<Event>[] = [
  {
    id: "actions",
    cell: ({ row }) => {
      const event = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <Link href={`/event/${event.id}`} className="w-full h-full">View</Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleApprove(event.id)}>
              Approve
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "type",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "startDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Start Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const startDate = new Date(
        row.getValue("startDate")
      ).toLocaleDateString();
      return <div suppressHydrationWarning>{startDate}</div>;
    },
  },
  {
    accessorKey: "endDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          End Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const endDate = new Date(row.getValue("endDate")).toLocaleDateString();
      return <div suppressHydrationWarning>{endDate}</div>;
    },
  },
];
