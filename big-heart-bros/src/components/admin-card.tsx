import { Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter, } from "./ui/card";
  
  import { cn } from "../lib/utils";
  
  import { Button } from "./ui/button";
  
  import Link from "next/link";
  import Image, { StaticImageData } from "next/image";
  
  import { EventType, Skills, EventStatus} from "@prisma/client";
  
  type CardComponentProps = {
    image: StaticImageData; // local path to image for now
    link: string;
    button_desc: string;
  
    // From database
    id: string;
    name: string;
    description: string;
    capacity?: number;
    type?: EventType;
    registrationDeadline?: Date;
    startDate: Date;
    endDate: Date;
    skills: Skills[];
    createdAt?: Date;
    posterId: String;
    status: EventStatus;
  };
  
  const handleClick = async (userId, eventId) => {
    try {
      const response = await fetch('/api/userEvent/addUserToEvent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, eventId}),
      });
  
      if (!response.ok) {
        throw new Error('Failed to add user to event');
      }
  
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error adding user to event:', error.message);
    }
  }
  
  const CardComponent: React.FC<CardComponentProps> = (props) => {
    console.log(props);
    return (
      <Card className={cn("w-[380px] bg-[#ffffff] rounded-3xl my-4")}>
        <CardHeader>
          <div className="flex justify-center">
            <Image
              className="pb-4"
              src={props.image}
              alt="Event Image"
              width={300}
              height={150}
            />
          </div>
          <CardTitle>{props.name}</CardTitle>
          <CardDescription className="text-justify">
            {props.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <p>
            From:{" "}
            {new Date(props.startDate).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
            <br></br>
            To:{" "}
            {new Date(props.endDate).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>
        </CardContent>
        <CardFooter>
          <div className="grid grid-cols-auto-1fr gap-2">
            <div className="col-span-full">
              <h3>Skills Wanted:</h3>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {props.skills.map((skill, index) => (
                <div
                  key={index}
                  className="bg-gray-300 p-2 rounded-xl text-sm text-center transition hover:bg-[#fcb6b6]"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </CardFooter>
        <CardFooter className="flex justify-center">
          <Button className="w-full my-1 bg-red-400 rounded-2xl text-white hover:bg-gray-00" onClick={() => handleClick("DEFAULT_ID", props.id)}>
            Join Event
          </Button>
        </CardFooter>
      </Card>
    );
  };
  
  export default CardComponent;
  