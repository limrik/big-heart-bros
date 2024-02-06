import { Separator } from "./ui/separator";
import { FcRating, FcGraduationCap } from "react-icons/fc";

export default function Achievements() {
  return (
    <div className="p-2 px-4 flex items-center bg-white relative w-80">
      <div className="items-center text-center w-full">
        <p className="text-lg font-semibold mb-2">Achievement Badges</p>
        <Separator className="my-2" />
        <div className="flex-row flex items-center">
          <FcRating size={40} />
          <p className="text-sm items-center text-wrap ml-2">I Volunteered!</p>
        </div>
        <div className="flex-row flex items-center">
          <FcGraduationCap size={40} />
          <p className="text-sm items-center text-wrap ml-2">
            Educational Advocate
          </p>
        </div>
      </div>
    </div>
  );
}
