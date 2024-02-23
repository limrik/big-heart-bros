import { useEffect, useState } from "react";
import "chart.js/auto";
import { Line } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";



function getEventsWithOrg2Poster(userEvents: any[]): any[] {
    const filteredEvents = userEvents.filter(item => item.event.posterId === "org_2");
    return filteredEvents;
  }

function gender(eventsData) {
    let dataFiltered = getEventsWithOrg2Poster(eventsData)
    const genderCounts = { male: 0, female: 0, other: 0 };
  
    dataFiltered.forEach(user => {
      if (user.user.gender === 'Male') genderCounts.male += 1;
      else if (user.user.gender === 'Female') genderCounts.female += 1;
      else genderCounts.other += 1;
    });
  
    const chartData = {
      labels: ['Male', 'Female'],
      datasets: [{
        label: 'Gender Ratio',
        data: [genderCounts.male, genderCounts.female],
        backgroundColor: [
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 206, 86, 0.2)'
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255,99,132,1)',
          'rgba(255, 206, 86, 1)'
        ],
        borderWidth: 1
      }]
    }
  
    return chartData
  }

function getVolunteersByEventTypeAndMonth(eventsData) {
  const filteredEvents = eventsData.filter(
    (event) => event.event.posterId === "org_2",
  );
  console.log(filteredEvents);

  const volunteersByTypeAndMonth = {};
  filteredEvents.forEach((event) => {
    const eventType = event.event.type;
    const date = new Date(event.event.startDate);
    const monthYear = `${date.getMonth() + 1}-${date.getFullYear()}`;
    if (!volunteersByTypeAndMonth[eventType]) {
      volunteersByTypeAndMonth[eventType] = {};
    }
    if (!volunteersByTypeAndMonth[eventType][monthYear]) {
      volunteersByTypeAndMonth[eventType][monthYear] = new Set();
    }
    volunteersByTypeAndMonth[eventType][monthYear].add(event.userId);
  });

  for (const eventType in volunteersByTypeAndMonth) {
    for (const monthYear in volunteersByTypeAndMonth[eventType]) {
      volunteersByTypeAndMonth[eventType][monthYear] =
        volunteersByTypeAndMonth[eventType][monthYear].size;
    }
  }

  return volunteersByTypeAndMonth;
}

function VolunteersByEventTypeAndMonthChart(eventsData, months) {
  const volunteersData = getVolunteersByEventTypeAndMonth(eventsData);

  // Generate labels for	 the chart (6 months)
  const labels: string[] = []; // Explicitly declare labels as an array of strings
  const currentDate = new Date();
  currentDate.setMonth(currentDate.getMonth() - months + 1); // Start from 6 months ago
  for (let i = 0; i < months; i++) {
    labels.push(`${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`);
    currentDate.setMonth(currentDate.getMonth() + 1);
  }

  // Prepare datasets
  const datasets = Object.keys(volunteersData).map((eventType) => {
    const data = labels.map(
      (monthYear) => volunteersData[eventType][monthYear] || 0,
    );
    return {
      label: eventType,
      data: data,
      fill: false,
      borderColor: colorPalette, // Define a function to get random colors
      tension: 0.1,
    };
  });

  return {
    labels,
    datasets,
  };
}

const colorPalette = [
  "#FF6384", // red
  "#36A2EB", // blue
  "#FFCE56", // yellow
  "#4BC0C0", // teal
  "#9966FF", // purple
  "#FF9F40", // orange
  "#4D5360", // dark grey
];

export default function OrgActivityChart() {
  const [usersInEvents, setUsersInEvents] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/allUsersInEvents");
        const data = await response.json();
        setUsersInEvents(data);
      } catch (error) {
        console.error("Error fetching users in events data:", error);
      }
    }

    fetchData();
  }, []);

    return (
        <div className="flex-row flex gap-8">
            <div className="bg-gray-100 my-4 w-[1000px] rounded">
                <h2 className="font-semibold mx-6 pt-4 text-gray-700">Volunteers by Event Type and Month</h2>
                <div className="h-[400px] items-center flex justify-center">
                    {usersInEvents.length > 0 ? (
                        <Line
                            data={VolunteersByEventTypeAndMonthChart(usersInEvents, 12)}
                            options={{
                                scales: {
                                    y: {
                                        suggestedMin: 0,
                                        suggestedMax: 6,
                                    },
                                },
                            }}
                        />
                    ) : <p>Loading data...</p>}
                </div>
            </div>
        </div>
    );
}
