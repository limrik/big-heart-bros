import { Separator } from "./ui/separator";

export default function EventDetails({
  eventName,
  startDate,
  endDate,
  location,
}) {
  return (
    <div className="p-2 px-4 flex items-center bg-white relative justify-center w-3/4 shadow-xl shadow-black text-black">
      <div className="items-center">
        {" "}
        <p className="text-xl font-semibold mb-2">{eventName}</p>
        <div className="w-60 flex flex-row items-center justify-center">
          <div>
            <p className="text-sm text-gray-600">Start Date</p>
            <p className="text-lg">
              {" "}
              {startDate ? new Date(startDate).toLocaleDateString("en-GB") : ""}
            </p>
          </div>
          <Separator orientation="vertical" className="mx-2" />
          <div>
            <p className="text-sm text-gray-600">End Date</p>
            <p className="text-lg">
              {endDate ? new Date(endDate).toLocaleDateString("en-GB") : ""}
            </p>
          </div>
        </div>{" "}
        <Separator className="my-2" />
        <div className="text-left">
          <p className="text-sm text-gray-600">Address</p>
          <p className="text-sm">{location}</p>
        </div>
      </div>
    </div>
  );
}
