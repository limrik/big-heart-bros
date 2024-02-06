"use client"

import React from 'react'
import { Event, columns} from "./columns"
import { draftColumns } from './draftColumns';
import { DataTable } from "./data-table"
import { Tabs, TabsContent, TabsTrigger, TabsList } from '../ui/tabs';
import { useState, useEffect } from 'react';
 

export default function AdminTable() {
  const [data, setData] = useState([]);
  const [draftData, setDraftData] = useState([]);

  async function getData(): Promise<Event[]> {
    
    // Fetch data from your API here.
    try {
      const response = await fetch("http://localhost:3000/api/approvedEvent");
      const data = await response.json();
      setData(data.events)
      return data.events
    } catch (error) {
      console.error("Error fetching data:", error)
      throw error
    }
  }
  
  async function getDraftData(): Promise<Event[]> {
      
    // Fetch data from your API here.
    try {
      const response = await fetch("http://localhost:3000/api/pendingEvent");
      const data = await response.json();
      setDraftData(data.events)
      return data.events
    } catch (error) {
      console.error("Error fetching data:", error)
      throw error
    }
  }

  useEffect(() => {
    getData();
    getDraftData();
  }, [])

    return (
      <div className="container mx-auto pt-4 pb-20">
        <Tabs defaultValue="approved" className="bg-white">
          <TabsList>
            <TabsTrigger value="approved">Approved</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
          </TabsList>
          <TabsContent value="approved">
            <h1 className="font-bold text-xl">Approved</h1>
            <DataTable columns={columns} data={data} />
          </TabsContent>
          <TabsContent value="pending">
            <h1 className="font-bold text-xl">Pending</h1>
            <DataTable columns={draftColumns} data={draftData} />
          </TabsContent>
        </Tabs>
      </div>
    )
}