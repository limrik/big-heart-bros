import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"

import Link from "next/link"

type CardComponentProps = {
    image?: string; // local path to image for now
    title: string;
    desc: string;
    time: string;
    skills_wanted: string[];
    link: string;
    button_desc: string;
}

const CardComponent: React.FC<CardComponentProps> = ({ image, title, desc, time, skills_wanted, link, button_desc }) => {
    return (
    <Card className={cn("w-[380px]")}>
        <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>Description: {desc}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
            <p>Time: {time}</p>
        </CardContent>
        <CardFooter>
            <div className="grid grid-cols-auto-1fr gap-2">
                <div className="col-span-full">
                    <h3>Skills Wanted:</h3>
                </div>
                <div className="grid grid-cols-3 gap-2">
                    {skills_wanted.map((skill, index) => (
                        <div key={index} className="bg-gray-100 p-2 rounded-md text-sm">{skill}</div>
                    ))}
                </div>
            </div>
        </CardFooter>


        <Button className="w-full">
            <Link href={link}>{button_desc}</Link>
        </Button>
    </Card>
    )
}

export default CardComponent;