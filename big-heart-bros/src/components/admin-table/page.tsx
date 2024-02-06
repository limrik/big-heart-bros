import React from 'react'
import { Event, columns } from "./columns"
import { DataTable } from "./data-table"
import { EventType } from '@prisma/client'
 
async function getData(): Promise<Event[]> {
    
  // Fetch data from your API here.
  try {
    const response = await fetch("http://localhost:3000/api/unapprovedEvent");
    const data = await response.json();
    return data.events
  } catch (error) {
    console.error("Error fetching data:", error)
    throw error
  }
}

export default async function AdminTable() {
    const data = await getData();
    return (
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data} />
      </div>
    )
}