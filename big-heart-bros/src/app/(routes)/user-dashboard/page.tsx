import React from 'react';
import Image from 'next/image';

import { ChatBubbleIcon, BackpackIcon, Pencil2Icon, ClockIcon } from "@radix-ui/react-icons"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import { Input } from "../../../components/ui/input"

import Navbar from '../../../components/navbar';
import UserCard from "../../../components/user-card"

import ProfilePhoto from '../../assets/profile-photo.png'
import Event1Photo from '../../assets/volunteer-1.jpg'
import Event2Photo from '../../assets/volunteer-2.jpg'

const stats = [
    {
        title: "Total Events",
        number: 5,
        icon: BackpackIcon,
        desc: "completed",
    },
    {
        title: "Total Hours",
        number: 100,
        icon: ClockIcon,
        desc: "completed",
    },
    {
        title: "Feedback",
        number: 3,
        icon: ChatBubbleIcon,
        desc: "received",
    },   
    {
        title: "Generate Testimonial",
        icon: Pencil2Icon,
        hasButton: true,
    },
];

const listOfCurrentEvents = [
    {
        image: Event2Photo,
        title: "ECP Beach Cleanup",
        desc: "Join us for a day of fun and cleaning up the beach! We will be providing lunch for all volunteers. We hope to see you there!",
        time: "2024-02-01",
        skills_wanted: ["Teamwork", "Persistence", "Nature"],
        onClick: "/home",
        button_desc: "Join Event",
    },
    {
        image: Event2Photo,
        title: "WCP Beach Cleanup",
        desc: "Join us for a day of fun and cleaning up the beach! We will be providing lunch for all volunteers. We hope to see you there!",
        time: "2024-03-01",
        skills_wanted: ["Teamwork", "Persistence", "Nature"],
        onClick: "/home",
        button_desc: "Join Event",
    },
    {
        image: Event2Photo,
        title: "Pasir Ris Beach Cleanup",
        desc: "Join us for a day of fun and cleaning up the beach! We will be providing lunch for all volunteers. We hope to see you there!",
        time: "2024-03-24",
        skills_wanted: ["Teamwork", "Persistence", "Nature"],
        onClick: "/home",
        button_desc: "Join Event",
    },
];

const listOfEvents = [
    {
        image: Event1Photo,
        title: "Tembusu Senior Home Visit",
        desc: "Join us to interact with seniors! We will be providing lunch for all volunteers. We hope to see you there!",
        time: "2024-04-01",
        skills_wanted: ["Patience", "Dialect", "Chatting"],
        onClick: "/home",
        button_desc: "Join Event",
    },
    {
        image: Event1Photo,
        title: "Bishan Senior Home Visit",
        desc: "Join us to interact with seniors! We will be providing lunch for all volunteers. We hope to see you there!",
        time: "2024-05-03",
        skills_wanted: ["Patience", "Dialect", "Chatting"],
        onClick: "/home",
        button_desc: "Join Event",
    },
    {
        image: Event1Photo,
        title: "Clementi Senior Home Visit",
        desc: "Join us to interact with seniors! We will be providing lunch for all volunteers. We hope to see you there!",
        time: "2024-12-13",
        skills_wanted: ["Patience", "Dialect", "Chatting"],
        onClick: "/home",
        button_desc: "Join Event",
    },
    {
        image: Event2Photo,
        title: "ECP Beach Cleanup",
        desc: "Join us for a day of fun and cleaning up the beach! We will be providing lunch for all volunteers. We hope to see you there!",
        time: "2024-02-01",
        skills_wanted: ["Teamwork", "Persistence", "Nature"],
        onClick: "/home",
        button_desc: "Join Event",
    },
    {
        image: Event2Photo,
        title: "WCP Beach Cleanup",
        desc: "Join us for a day of fun and cleaning up the beach! We will be providing lunch for all volunteers. We hope to see you there!",
        time: "2024-03-01",
        skills_wanted: ["Teamwork", "Persistence", "Nature"],
        onClick: "/home",
        button_desc: "Join Event",
    },
    {
        image: Event2Photo,
        title: "Pasir Ris Beach Cleanup",
        desc: "Join us for a day of fun and cleaning up the beach! We will be providing lunch for all volunteers. We hope to see you there!",
        time: "2024-03-24",
        skills_wanted: ["Teamwork", "Persistence", "Nature"],
        onClick: "/home",
        button_desc: "Join Event",
    },
];

const UserDashboard: React.FC = () => {
    return (
        <div className="bg-[#f7d9d9]">
            <Navbar></Navbar>
            <div className="w-5/6 mx-auto">
            
            <div className="flex justify-between my-4 items-center">
                <p className="text-2xl font-semibold ml-2">User Dashboard</p>
                <div className="rounded-md p-2 px-4 flex items-center bg-[#fcb6b6] rounded-xl">
                    <div className="text-right">
                        <p className="text-xl font-semibold ">Omar Apollo</p>
                        <p className="text-sm">+65 9100 2100</p>
                        <p className="text-md">Volunteer</p>
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

            <div>
                <div className="grid sm:grid-cols-1 lg:grid-cols-4 gap-4 my-4">
                    {stats.map((stat, index) => (
                        <UserCard
                            key={index} 
                            title={stat.title} 
                            number={stat.number} 
                            icon={stat.icon}
                            desc={stat.desc}
                            hasButton={stat.hasButton}
                        />
                    ))}
                </div>
            </div>

            <Tabs defaultValue="my-events" className="w-full">
                <div className="flex justify-between">
                <TabsList className="rounded-2xl">
                    <TabsTrigger className="bg-[#fcb6b6] rounded-2xl ml-1 mr-2" value="my-events">View My Events</TabsTrigger>
                    <TabsTrigger className="bg-[#fcb6b6] rounded-2xl mr-1 mr-4" value="for-you">For You</TabsTrigger>
                </TabsList>
                <Input placeholder="Search for events" className="rounded-2xl w-1/3" />
                </div>
                <TabsContent value="my-events">
                    <div className="flex justify-center">
                        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-8 mx-auto">
                            {/* {listOfCurrentEvents.map((event, index) => (
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
                </TabsContent>
                <TabsContent value="for-you">
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
                </TabsContent>
            </Tabs>




            </div>
        </div>
    );
};

export default UserDashboard;
