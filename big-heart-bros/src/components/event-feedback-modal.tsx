import React, { useState } from "react";

interface EventFeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  userName: string;
}

const EventFeedbackModal: React.FC<EventFeedbackModalProps> = ({
  isOpen,
  onClose,
  userId,
  userName,
}) => {
  const [feedback, setFeedback] = useState("");

  const handleSubmit = () => {
    // Handle form submission here
    console.log("Submitting feedback:", feedback);

    // Close the modal
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-filter backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          Close
        </button>
        <h2 className="text-lg font-semibold mb-4">Event Feedback</h2>
        <p>
          <strong>User ID:</strong> {userId}
        </p>
        <p>
          <strong>User Name:</strong> {userName}
        </p>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Enter your feedback here..."
          className="w-full h-32 border-gray-300 rounded-md resize-none mt-4 px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
        />
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Submit Feedback
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventFeedbackModal;
