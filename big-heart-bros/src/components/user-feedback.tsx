import React from "react";
import { EventType, Skills, EventStatus, UsersInEvents } from "@prisma/client";

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

interface Organisation {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
}

interface Feedback {
  id: string;
  userId: string;
  organisationId: string;
  eventId: string;
  message: string;
  createdAt: Date;
  organisation: Organisation;
  event: Event;
}

interface UserFeedbackProps {
  feedback: Feedback[];
}

const UserFeedback: React.FC<UserFeedbackProps> = ({ feedback }) => {
  return (
    <div>
      {feedback.map((item) => (
        <div key={item.id} className="border rounded-lg p-4 mb-4">
          <p>User: {item.event.name}</p>
          <p>Organisation: {item.organisation.name}</p>
          <p>Message: {item.message}</p>
          <p>Date: {new Date(item.createdAt).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
};

export default UserFeedback;
