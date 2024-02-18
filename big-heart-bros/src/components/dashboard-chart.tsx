import { EventStatus, EventType, Skills, UsersInEvents } from "@prisma/client";
import { Bar } from "react-chartjs-2";

interface Event {
  id: string;
  name: string;
  description: string;
  capacity: number;
  location: string;
  type: EventType;
  registrationDeadline: Date;
  startDate: Date;
  endDate: Date;
  startTime: Date;
  endTime: Date;
  skills: Skills[];
  createdAt: Date;
  posterId: string;
  status: EventStatus;
  users: UsersInEvents[];
}

const currentDate = new Date();
const sixMonthsAgo = new Date(currentDate);
sixMonthsAgo.setMonth(currentDate.getMonth() - 6);

interface MonthData {
  label: string;
  hours: number;
}

function getMonthData(events: Event[]) {
  const monthDataMap: { [key: string]: number } = {};

  // Iterate over events to calculate total duration for each month
  events.forEach((event) => {
    const startDateTime = new Date(event.startDate).getTime();
    const endDateTime = new Date(event.endDate).getTime();
    const startMonthYear = `${
      new Date(event.startDate).getMonth() + 1
    }/${new Date(event.startDate).getFullYear()}`;
    const endMonthYear = `${new Date(event.endDate).getMonth() + 1}/${new Date(
      event.endDate
    ).getFullYear()}`;

    // Check if start and end months are the same
    if (startMonthYear === endMonthYear) {
      const duration = (endDateTime - startDateTime) / (1000 * 3600); // Convert milliseconds to hours
      monthDataMap[startMonthYear] =
        (monthDataMap[startMonthYear] || 0) + duration;
    } else {
      // Calculate duration for start month
      const startMonthDays = new Date(
        new Date(event.startDate).getFullYear(),
        new Date(event.startDate).getMonth() + 1,
        0
      ).getDate();
      const startMonthEnd = new Date(
        new Date(event.startDate).getFullYear(),
        new Date(event.startDate).getMonth(),
        startMonthDays,
        23,
        59,
        59,
        999
      ).getTime();
      const startMonthDuration =
        (startMonthEnd - startDateTime) / (1000 * 3600); // Convert milliseconds to hours
      monthDataMap[startMonthYear] =
        (monthDataMap[startMonthYear] || 0) + startMonthDuration;

      // Calculate duration for end month
      const endMonthDuration = (endDateTime - startMonthEnd) / (1000 * 3600); // Convert milliseconds to hours
      monthDataMap[endMonthYear] =
        (monthDataMap[endMonthYear] || 0) + endMonthDuration;
    }
  });

  // Convert the map into an array of MonthData objects
  const monthData: MonthData[] = Object.keys(monthDataMap).map((monthYear) => ({
    label: monthYear,
    hours: monthDataMap[monthYear],
  }));

  const data = {
    labels: monthData.map((month) => month.label),
    datasets: [
      {
        label: "Number of Hours Volunteered",
        data: monthData.map((month) => month.hours),
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  return data;
}

export default function DashboardChart({ events }) {
  return (
    <div>
      <div className="h-[280px]">
        <Bar
          data={getMonthData(events)}
          width={800}
          height={80}
          options={{
            maintainAspectRatio: false,
          }}
        />
      </div>
    </div>
  );
}
