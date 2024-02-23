import { useEffect, useState } from "react";
import "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import { PolarArea } from 'react-chartjs-2';


const colorPalette = [
	'#FF6384', // red
	'#36A2EB', // blue
	'#FFCE56', // yellow
	'#4BC0C0', // teal
	'#9966FF', // purple
	'#FF9F40', // orange
	'#4D5360', // dark grey
  ];

  const colorPalette1 = [
    '#FF6384', // Red
    '#36A2EB', // Blue
    '#FFCE56', // Yellow
    '#4BC0C0', // Teal
    '#9966FF', // Purple
    '#FF9F40', // Orange
    '#4D5360', // Dark Grey
    '#C9CB74', // Olive Green
    '#7E57C2', // Deep Purple
    '#42A5F5', // Light Blue
    '#D81B60', // Pink
    '#8D6E63', // Brown
  ];

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

function getEventsWithOrg2Poster(userEvents: any[]): any[] {
  const filteredEvents = userEvents.filter(item => item.event.posterId === "org_2");
  return filteredEvents;
}

function getTotalEvents(userEvents: any[]): number {
  const uniqueEvents = new Set(userEvents.map((item) => item.eventId));
  return uniqueEvents.size;
}

/*
function getUniqueIndividuals(userEvents: any[]): any[] {
  const uniqueIndividuals = new Set(userEvents.map((item) => item.userId));
  return uniqueIndividuals;
}
*/

function getTotalUniquePosterIds(userEvents: any[]): number {
  const uniquePosterIds = new Set(
    userEvents.map((item) => item.event.posterId)
  );
  return uniquePosterIds.size;
}

function interests(eventsData) {
  let dataFiltered = getEventsWithOrg2Poster(eventsData)


  const interestCounts = { CommunityService: 0, EnvironmentalProtection: 0, HealthcareSupport: 0, 
    EducationSupport: 0, YouthMentoring: 0, ElderlySupport : 0, ArtsAndCulture: 0, SportsAndRecreation: 0, TechnologyAssistance: 0 , FundraisingEvents: 0, FoodBankAssistance: 0, HomelessnessSupport: 0};

    dataFiltered.forEach(user => {
      user.user.interests.forEach(skill => {
        if(skill == "CommunityService") interestCounts.CommunityService +=1;
          else if (skill == "EnvironmentalProtection") interestCounts.EnvironmentalProtection += 1;
          else if (skill == "HealthcareSupport") interestCounts.HealthcareSupport += 1;
          else if (skill == "EducationSupport") interestCounts.EducationSupport += 1;
          else if (skill == "YouthMentoring") interestCounts.YouthMentoring += 1;
          else if (skill == "ElderlySupport") interestCounts.ElderlySupport += 1;
          else if (skill == "ArtsAndCulture") interestCounts.ArtsAndCulture += 1;
          else if (skill == "SportsAndRecreation") interestCounts.SportsAndRecreation += 1;
          else if (skill == "TechnologyAssistance") interestCounts.TechnologyAssistance += 1;
          else if (skill == "FundraisingEvents") interestCounts.FundraisingEvents += 1;
          else if (skill == "FoodBankAssistance") interestCounts.FoodBankAssistance += 1;
          else interestCounts.HomelessnessSupport += 1;
      })
    })

    const chartData = {
      labels: ['CommunityService', 'EnvironmentalProtection', "HealthcareSupport", "EducationSupport", "YouthMentoring", "ElderlySupport", "ArtsAndCulture", "SportsAndRecreation", "TechnologyAssistance", "FundraisingEvents", "FoodBankAssistance", "HomelessnessSupport"],
      datasets: [{
        data: [interestCounts.CommunityService, interestCounts.EnvironmentalProtection, interestCounts.HealthcareSupport, interestCounts.EducationSupport, interestCounts.YouthMentoring, interestCounts.ElderlySupport, interestCounts.ArtsAndCulture, interestCounts.SportsAndRecreation, interestCounts.TechnologyAssistance, interestCounts.FundraisingEvents, interestCounts.FoodBankAssistance, interestCounts.HomelessnessSupport],
        backgroundColor: colorPalette1,
        borderWidth: 1
      }]
    };

    return chartData
}


function skills(eventsData) {
  let dataFiltered = getEventsWithOrg2Poster(eventsData)

  const skillCounts = { OnGroundVolunteering: 0, Photography: 0, Videography: 0, 
    ArtsAndCraft: 0, PerformingSkills: 0, Sports : 0, Teaching: 0, Leadership: 0, DigitalMarketing: 0 };

    dataFiltered.forEach(user => {
      user.user.skills.forEach(skill => {
        if(skill == "OnGroundVolunteering") skillCounts.OnGroundVolunteering +=1;
          else if (skill == "Photography") skillCounts.Photography += 1;
          else if (skill == "Videography") skillCounts.Videography += 1;
          else if (skill == "ArtsAndCraft") skillCounts.ArtsAndCraft += 1;
          else if (skill == "PerformingSkills") skillCounts.PerformingSkills += 1;
          else if (skill == "Sports") skillCounts.Sports += 1;
          else if (skill == "Teaching") skillCounts.Teaching += 1;
          else if (skill == "Leadership") skillCounts.Leadership += 1;
          else skillCounts.DigitalMarketing += 1;
      })
    })

    const chartData = {
      labels: ['OnGroundVolunteering', 'Photography', "Videography", "ArtsAndCraft", "PerformingSkills", "Sports", "Teaching", "Leadership", "DigitalMarketing"],
      datasets: [{
        data: [skillCounts.OnGroundVolunteering, skillCounts.Photography, skillCounts.Videography, skillCounts.ArtsAndCraft, skillCounts.PerformingSkills, skillCounts.Sports, skillCounts.Teaching, skillCounts.Leadership, skillCounts.DigitalMarketing],
        borderWidth: 1
        ,backgroundColor: colorPalette1
      }]
    }

    return chartData
}


export default function stats() {
  interface DoughnutDataset {
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
    borderWidth: number;
  }
  
  interface DoughnutData {
    labels: string[];
    datasets: DoughnutDataset[];
  }

  const [usersInEvents, setUsersInEvents] = useState([]);
  const initialDoughnutData: DoughnutData = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
      },
    ],
  };
  
  const [doughnutData, setDoughnutData] = useState<DoughnutData>(initialDoughnutData);

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
<div>
  <div className="flex flex-row gap-8">

    <div className="bg-gray-100 my-3 w-[500px] rounded px-4 py-6 border border-gray-200">
    <h2 className="font-medium text-gray-700">Volunteer Interests</h2>
    <h1 className="text-3xl text-center font-semibold mt-1">
      <PolarArea
        data={interests(usersInEvents)}
        width={350}
        height={200}
      />
    </h1>
  </div>

    <div className="bg-gray-100 my-3   w-[500px] rounded px-4 py-6 border border-gray-200">
      <h2 className="font-medium text-gray-700">Volunteer Skills</h2>
      <h1 className="text-3xl text-center font-semibold mt-1">
        <PolarArea
          data={skills(usersInEvents)}
          width={350}
          height={200}
        />
      </h1>
    </div>

    <div className="bg-gray-100 my-3   w-[500px] rounded px-4 py-6 border border-gray-200">
      <h2 className="font-medium text-gray-700">Volunteer Skills</h2>
      <h1 className="text-3xl text-center font-semibold mt-1">
        <Doughnut
          data={gender(usersInEvents)}
          width={200}
          height={200}
        />
      </h1>
    </div>
  </div>

</div>

  );
}
