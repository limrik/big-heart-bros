import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
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
} from "@tanstack/react-table";

import { Button } from "../components/ui/button";
import { Checkbox } from "../components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Input } from "../components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import EventFeedbackModal from "../components/event-feedback-modal";
import React, { useState } from "react";
import {
  EventType,
  EventStatus,
  PrismaClient,
  Skills,
  GenderType,
  CommitmentLevelType,
  Feedback,
  ResidentialStatusType,
  Interests,
} from "@prisma/client";
import Link from "next/link";
import { Row } from "react-day-picker";

interface User {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  gender: GenderType;
  occupation?: string | null;
  dob: Date;
  canDrive: boolean;
  ownVehicle: boolean;
  commitmentLevel: CommitmentLevelType;
  skills: Skills[];
  feedback?: Feedback[];
  residentialStatus: ResidentialStatusType;
  interests: Interests[];
  eventId?: string;
  organisationId?: string;
  attended: boolean;
  startDate: Date;
}

interface EventAttendanceProps {
  users: User[];
  startDate: Date;
  endDate: Date;
  status: EventStatus;
}

export const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => row.getValue("name"),
  },
  {
    accessorKey: "gender",
    header: "Gender",
    cell: ({ row }) => row.getValue("gender"),
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone No.",
    cell: ({ row }) => row.getValue("phoneNumber"),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => row.getValue("email"),
  },
  {
    accessorKey: "skills",
    header: "Skills",
    cell: ({ row }) => row.getValue("skills"),
  },
  {
    accessorKey: "canDrive",
    header: "Can Drive?",
    cell: ({ row }) => (row.getValue("canDrive") ? "Yes" : "No"),
  },
  {
    accessorKey: "ownVehicle",
    header: "Owns Vehicle?",
    cell: ({ row }) => (row.getValue("ownVehicle") ? "Yes" : "No"),
  },
  {
    accessorKey: "attended",
    header: "Attended",
    cell: ({ row }) => {
      const attended = row.getValue("attended");
      const startDate = row.original.startDate;
      const currentDate = new Date();

      return attended
        ? "✅"
        : startDate && startDate.getTime() < currentDate.getTime()
          ? "❌"
          : "Not Yet";
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const [isOpen, setIsOpen] = useState(false); // State to control modal visibility
      const user = row.original;

      const openModal = () => setIsOpen(true);
      const closeModal = () => setIsOpen(false);

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(user.id)}
              >
                Copy user ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={openModal}>
                Give Feedback
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  className="pt-2 cursor-default"
                  href={`/profile/${user.id}`}
                >
                  View Profile
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Modal component */}
          <EventFeedbackModal
            isOpen={isOpen}
            onClose={closeModal}
            userId={user.id}
            userName={user.name}
            eventId={user.eventId}
            organisationId={user.organisationId}
          />
        </>
      );
    },
  },
];

export default function EventAttendance({
  users,
  startDate,
  endDate,
  status,
}: EventAttendanceProps) {
  console.log("hi", users);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: users,
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
  });

  const calculateHoursDifference = (startDate, endDate) => {
    // Calculate the difference in milliseconds
    const differenceInMs = endDate.getTime() - startDate.getTime();

    // Convert milliseconds to hours
    const hoursDifference = differenceInMs / (1000 * 60 * 60);

    // Round the result to two decimal places
    return Math.round(hoursDifference * 100) / 100;
  };

  const handleCompleteEvent = (eventId: string) => {
    const requestData = { eventId };

    fetch("/api/updateEventStatus", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Event status updated successfully:", data.message);
        // Optionally, you can perform any action after updating the event status
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error updating event status:", error);
      });
  };

  const handleAttendance = (selectedRows: User[]) => {
    if (selectedRows.length == 0) return null;

    const selectedRowIds = selectedRows.map((user) => user.id);

    const requestData = {
      attendedUserIds: selectedRowIds, // Array of selected user IDs
      eventId: users[0].eventId, // ID of the event
    };

    fetch("/api/updateAttendance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Attendance updated successfully:", data.message);
      })
      .catch((error) => {
        console.error("Error updating attendance:", error);
      });

    const notAttendedUserIds = selectedRows
      .filter((user) => !user.attended)
      .map((user) => user.id);

    const requestDataHours = {
      hoursToAdd: calculateHoursDifference(
        new Date(startDate),
        new Date(endDate),
      ),
      userIds: notAttendedUserIds,
    };

    fetch("/api/updateHours", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestDataHours),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Hours updated successfully:", data.message);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error updating hours:", error);
      });
  };

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter by name..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
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
                        cell.getContext(),
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
          {table.getFilteredRowModel().rows.length} person(s) selected for
          attendance.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>{" "}
      <div>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-600 py-2 pl-2">
              Total of{" "}
              {calculateHoursDifference(new Date(startDate), new Date(endDate))}{" "}
              hours given
            </p>
            {startDate.getTime() < new Date().getTime() ? (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full shadow-md text-sm mr-2"
                onClick={() =>
                  handleAttendance(
                    table
                      .getFilteredSelectedRowModel()
                      .rows.map((row) => row.original),
                  )
                }
              >
                Submit Attendance
              </button>
            ) : (
              <button
                className="bg-gray-300 text-gray-600 font-semibold py-2 px-4 rounded-full cursor-not-allowed text-sm"
                disabled
              >
                Attendance Available on {startDate.toLocaleDateString()}
              </button>
            )}
          </div>
          <div>
            {status === "Approved" && new Date() > new Date(endDate) ? (
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-full shadow-md text-sm"
                onClick={() => handleCompleteEvent(users[0].eventId ?? "")}
              >
                Complete Event
              </button>
            ) : (
              <button
                className="bg-gray-300 text-gray-600 font-semibold py-2 px-4 rounded-full cursor-not-allowed text-sm"
                disabled
              >
                Event not complete yet
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
