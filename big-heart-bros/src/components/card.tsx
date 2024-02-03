import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/card"

import { cn } from "../lib/utils"

import { Button } from "./ui/button"

import Link from "next/link"
import Image, { StaticImageData } from "next/image"

type CardComponentProps = {
    image: StaticImageData; // local path to image for now
    title: string;
    desc: string;
    time: string;
    skills_wanted: string[];
    link: string;
    button_desc: string;
}

const CardComponent: React.FC<CardComponentProps> = ({ image, title, desc, time, skills_wanted, link, button_desc }) => {
    return (
    <Card className={cn("w-[380px] bg-[#ffffff] rounded-3xl my-4")}>
        <CardHeader>
            <div className="flex justify-center">
                <Image
                    className="pb-4"
                    src={image}
                    alt="Event Image"
                    width={300}
                    height={150}
                />
            </div>
            <CardTitle>{title}</CardTitle>
            <CardDescription className="text-justify">{desc}</CardDescription>
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
                        <div key={index} className="bg-gray-300 p-2 rounded-xl text-sm text-center transition hover:bg-[#fcb6b6]">{skill}</div>
                    ))}
                </div>
            </div>
        </CardFooter>
        <CardFooter className="flex justify-center">
            <Button className="w-full my-1 bg-red-400 rounded-2xl text-white hover:bg-gray-00">
                <Link href={link}>{button_desc}</Link>
            </Button>
        </CardFooter>

    </Card>
    )
}

export default CardComponent;