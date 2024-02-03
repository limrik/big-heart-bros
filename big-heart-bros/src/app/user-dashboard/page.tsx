import React from 'react';
import Navbar from '../../components/navbar';
import Card from '../../components/card';

const nav = () => { 
    return null;
}

const listOfEvents = [
    {
        title: "Event 1",
        desc: "This is the description of event 1",
        time: "2022-12-12",
        skills_wanted: ["skill1", "skill2", "skill3"],
        onClick: "/home",
        button_desc: "Join Event",
    },
    {
        title: "Event 2",
        desc: "This is the description of event 2",
        time: "2022-12-12",
        skills_wanted: ["skill1", "skill2", "skill3"],
        onClick: "/home",
        button_desc: "Join Event",
    },
    {
        title: "Event 3",
        desc: "This is the description of event 3",
        time: "2022-12-12",
        skills_wanted: ["skill1", "skill2", "skill3"],
        onClick: "/home",
        button_desc: "Join Event",
    },
    {
        title: "Event 4",
        desc: "This is the description of event 4",
        time: "2022-12-12",
        skills_wanted: ["skill1", "skill2", "skill3"],
        onClick: "/home",
        button_desc: "Join Event",
    },
    {
        title: "Event 5",
        desc: "This is the description of event 5",
        time: "2022-12-12",
        skills_wanted: ["skill1", "skill2", "skill3"],
        onClick: "/home",
        button_desc: "Join Event",
    },
    {
        title: "Event 6",
        desc: "This is the description of event 6",
        time: "2022-12-12",
        skills_wanted: ["skill1", "skill2", "skill3"],
        onClick: "/home",
        button_desc: "Join Event",
    },
];

const About: React.FC = () => {
    return (
        <div>
            <Navbar></Navbar>
            {listOfEvents.map((event, index) => (
                <Card 
                    key={index} 
                    title={event.title} 
                    desc={event.desc} 
                    time={event.time} 
                    skills_wanted={event.skills_wanted} 
                    link={event.onClick} 
                    button_desc={event.button_desc}
                />
            ))}
            <h1>User Dashboard</h1>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod
                mauris eu nisl ultrices, vitae tincidunt nunc tincidunt. Nulla facilisi.
                Nullam auctor, nunc id aliquam tincidunt, nunc elit aliquet nunc, nec
                luctus nunc nunc id nunc. Sed in semper nunc. Sed auctor, nunc id
                aliquam tincidunt, nunc elit aliquet nunc, nec luctus nunc nunc id nunc.
                Sed in semper nunc.
            </p>
            <p>
                Sed auctor, nunc id aliquam tincidunt, nunc elit aliquet nunc, nec
                luctus nunc nunc id nunc. Sed in semper nunc. Sed auctor, nunc id
                aliquam tincidunt, nunc elit aliquet nunc, nec luctus nunc nunc id nunc.
                Sed in semper nunc.
            </p>
        </div>
    );
};

export default About;
