"use client"

import React  from "react";
import { useState } from "react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";

function Page() {
  const [feedback, setFeedback] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Access the input field value from the state
    console.log("Feedback:", feedback);

    // Reset the input field value if needed
    setFeedback("");
  };

  const handleChange = (event) => {
    // Update the feedback state with the input field value
    setFeedback(event.target.value);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-sm items-center space-x-2"
    >
      <Input
        type="feedback"
        placeholder="Feedback"
        value={feedback}
        onChange={handleChange}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
}

export default Page