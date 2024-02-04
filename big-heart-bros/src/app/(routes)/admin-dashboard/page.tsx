"use client"

import React from 'react';
import Navbar from '../../../components/navbar';
import Image from 'next/image';
import ProfilePhoto from '../../assets/profile-photo.png'
import { useState, useEffect } from "react";
import { EventType, Skills } from "@prisma/client";


interface Event {
  id: string;
  name: string;
  description: string;
  capacity: number;
  type: EventType;
  registrationDeadline: Date;
  startDate: Date;
  endDate: Date;
  skills: Skills[];
  createdAt: Date;
  posterId: string;
  approved: boolean;
}

const UserDashboard: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);
    
    useEffect(() => {
        async function fetchData() {
          try {
            const response = await fetch("/api/event");
            const data = await response.json();
            console.log(data.events);
    
            setEvents(data.events);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        }
    
        fetchData();
      }, []);

    return (
        <div className="bg-[#f7d9d9]">
            <Navbar></Navbar>
            <div className="w-5/6 mx-auto">
            
            <div className="flex justify-between my-4 items-center">
                <p className="text-2xl font-semibold">Admin Dashboard</p>
                <div className="rounded-md p-2 px-4 flex items-center bg-[#fcb6b6] rounded-xl">
                    <div className="text-right">
                        <p className="text-xl font-semibold ">Omar Apollo</p>
                        <p className="text-sm">+65 9100 2100</p>
                        <p className="text-md">Big At Heart</p>
                    </div>
                    <Image 
                        className="rounded-full mx-4"
                        src={ProfilePhoto}
                        alt="profile-photo" 
                        width={100} 
                        height={100}
                    />
                </div>
            </div>
            <div className="flex justify-center">
                <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-8 mx-auto">
                    {/* {listOfEvents.map((event, index) => (
                        <Card 
                            key={index} 
                            image={event.image}
                            title={event.title} 
                            desc={event.desc} 
                            time={event.time} 
                            skills_wanted={event.skills_wanted} 
                            link={event.onClick} 
                            button_desc={event.button_desc}
                        />
                    ))} */}
                </div>
            </div>
            </div>
        </div>
    );
};

export default UserDashboard;
