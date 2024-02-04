import React from "react";
import Image from "next/image";

import {
  ChatBubbleIcon,
  BackpackIcon,
  Pencil2Icon,
  ClockIcon,
} from "@radix-ui/react-icons";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";
import { Input } from "../../../components/ui/input";

import Navbar from "../../../components/navbar";
import Card from "../../../components/card";
import UserCard from "../../../components/user-card";
import Profile from "../../../components/profile";
import Achievements from "../../../components/achievements";
import DashboardView from "../../../components/dashboard-view";
import Event1Photo from "../../assets/volunteer-1.jpg";
import Event2Photo from "../../assets/volunteer-2.jpg";

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
    <div className="bg-[#f7d9d9] h-screen">
      <Navbar />
      <div className="w-5/6 mx-auto flex-row flex gap-12">
        <div>
          <div className="flex justify-between my-4 items-center pt-20">
            <Profile />
          </div>
          <Achievements />
        </div>
        <div>
          <div className="flex justify-between my-4 items-center pt-16">
            <DashboardView />
          </div>
          {/* <div className="grid sm:grid-cols-1 lg:grid-cols-4 gap-4 my-4">
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
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
