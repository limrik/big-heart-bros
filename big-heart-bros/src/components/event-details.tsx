import { Separator } from "./ui/separator";
import { FaClock, FaLocationPin, FaCalendar } from "react-icons/fa6";
import qrcode from "../app/assets/qrcode.png";
import Image from "next/image";

function formatDateTime(startDate: Date, startTime: Date): string {
  // Array of month names
  const monthNames: string[] = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Array of day names
  const dayNames: string[] = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Get day, month, year, and day of the week for startDate
  const dayOfWeek: string = dayNames[startDate.getDay()];
  const day: string = startDate.getDate().toString();
  const month: string = monthNames[startDate.getMonth()].substr(0, 3);
  const year: string = startDate.getFullYear().toString().substr(2, 2);

  // Get time from startTime
  const hours: string = startTime.getHours().toString().padStart(2, "0");
  const minutes: string = startTime.getMinutes().toString().padStart(2, "0");

  // Concatenate the formatted date-time string
  const formattedDateTime: string = `${dayOfWeek}\n${day} ${month} ${year} ${hours}:${minutes}`;

  return formattedDateTime;
}

export default function EventDetails({
  eventName,
  startDate,
  startTime,
  endDate,
  endTime,
  location,
  deadline,
  status,
}) {
  const deadlineDate = new Date(deadline);
  deadlineDate.setHours(23, 59, 0, 0);

  let statusColor = "";
  let statusIcon = "";

  switch (status) {
    case "Pending":
      statusColor = "bg-yellow-500";
      statusIcon = "⏳";
      break;
    case "Approved":
      statusColor = "bg-green-500";
      statusIcon = "✅";
      break;
    case "Completed":
      statusColor = "bg-blue-500";
      statusIcon = "🎉";
      break;
    default:
      statusColor = "bg-gray-500";
      statusIcon = "❓";
  }

  return (
    <div className="p-8 bg-white relative w-3/4 shadow-xl shadow-gray-4 00 text-black">
      <div className="grid grid-cols-3">
        <div className="gap-3 flex flex-col w-full col-span-2">
          <p className="text-3xl font-semibold mb-2 text-[#8B0000]">
            {eventName}
          </p>
          {/* <div className="col-span-2"> */}
          <div className="w-full flex flex-row">
            <div className="flex flex-rows">
              <div className="items-start justify-start w-full">
                <div className="text-left flex flex-row gap-2">
                  <FaCalendar color="pink" />
                  <p className="text-sm text-gray-600">Date & Time</p>
                </div>{" "}
                <div className="flex flex-row gap-6 py-2">
                  <div>
                    <pre className="font-sans">
                      {startDate
                        ? formatDateTime(
                            new Date(startDate),
                            new Date(startTime),
                          )
                        : ""}{" "}
                    </pre>
                  </div>
                  <div>
                    <p className="text-base text-gray-600 items-center flex h-full">
                      {" "}
                      to{" "}
                    </p>
                  </div>
                  <div>
                    <pre className="font-sans">
                      {startDate
                        ? formatDateTime(new Date(endDate), new Date(endTime))
                        : ""}{" "}
                    </pre>
                  </div>
                </div>
              </div>{" "}
              <Separator orientation="vertical" className="mx-10 h-full" />
              <div className="w-full flex flex-col gap-2">
                <div className="text-left flex flex-row gap-2">
                  <FaClock color="pink" />
                  <p className="text-sm text-gray-600">Signup Closes On:</p>
                </div>
                <pre className="font-sans">
                  {" "}
                  {deadline
                    ? formatDateTime(deadlineDate, deadlineDate)
                    : ""}{" "}
                </pre>
              </div>
            </div>
          </div>{" "}
          <Separator className="my-4" />
          <div className="gap-2 flex flex-col">
            <div className="text-left flex flex-row gap-2">
              <FaLocationPin color="pink" />
              <p className="text-sm text-gray-600">Address</p>
            </div>{" "}
            <div>
              <p>{location}</p>
            </div>
          </div>{" "}
        </div>{" "}
        <div className="flex flex-row items-center justify-center">
          <Separator orientation="vertical" className="mx-8 h-full" />
          <div className="w-full text-center justify-center items-center">
            <div
              className={`rounded-xl py-2 my-4 px-4 text-white text-lg font-semibold ${statusColor} shadow-lg text-center`}
            >
              <span className="mr-2">{statusIcon}</span>
              {status}
            </div>
            <p className="text-gray-600 my-1 text-sm">
              Join our Whatsapp group here!
            </p>
            <div className="mx-auto" style={{ maxWidth: "200px" }}>
              <Image src={qrcode} alt="qr-code" width={200} />
            </div>
          </div>
        </div>
      </div>{" "}
    </div>
  );
}
