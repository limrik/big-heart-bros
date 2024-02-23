import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";

import { cn } from "../lib/utils";

import { IconProps } from "@radix-ui/react-icons/dist/types";

import { Button } from "./ui/button";

type UserCardProps = {
  title: string;
  number?: number;
  icon: React.ForwardRefExoticComponent<
    IconProps & React.RefAttributes<SVGSVGElement>
  >;
  desc?: string;
  hasButton?: boolean;
};

const UserCard: React.FC<UserCardProps> = ({
  title,
  number,
  icon: IconComponent,
  desc,
  hasButton,
}) => {
  return (
    <Card className={cn("w-full bg-[#ffffff] rounded-3xl my-4")}>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>{title}</CardTitle>
          <div className="bg-[#f7d9d9] p-2 rounded-xl">
            <IconComponent className="w-6 h-6" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        <p className="text-3xl font-bold">{number}</p>
      </CardContent>
      <CardFooter>
        <p className="text-gray-500">{desc}</p>
        {hasButton && (
          <Button className="bg-[#fcb6b6] py-8 rounded-2xl w-full">
            Recommendation
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default UserCard;
