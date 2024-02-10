import React, { useState } from "react";

interface EventFeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  userName: string;
  eventId?: string;
  organisationId?: string;
}

const EventFeedbackModal: React.FC<EventFeedbackModalProps> = ({
  isOpen,
  onClose,
  userId,
  userName,
  eventId,
  organisationId,
}) => {
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async () => {
    // Handle form submission here
    try {
      const response = await fetch(
        `/api/feedback/${organisationId}/${userId}/${eventId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: feedback }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit feedback");
      }

      console.log("Feedback submitted successfully");
    } catch (error) {
      console.error("Error submitting feedback:", error.message);
    }

    // Reset the input field value if needed
    setFeedback("");
    // Close the modal
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-sm w-full">
      <div className="bg-white rounded-lg shadow-lg p-6 w-1/2">
        <h2 className="text-lg font-semibold mb-4">Feedback for {userName} </h2>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Enter your feedback here..."
          className="w-full h-32 border-gray-300 rounded-md resize-none mt-4 px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
        />
        <div className="mt-4 flex justify-end gap-2">
          {" "}
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 focus:outline-none"
          >
            Close
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-700 focus:outline-none"
          >
            Submit Feedback
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventFeedbackModal;
