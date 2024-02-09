"use client";

import { useState } from "react";

const OpenAIComponent = () => {
  // State to store the prompt text and generated text
  const [prompt, setPrompt] = useState("");
  const [generatedText, setGeneratedText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Function to fetch generated text from the backend API
  const fetchGeneratedText = async () => {
    setIsLoading(true);
    setError("");
    console.log(prompt);

    try {
      const response = await fetch("/api/generateTestimonial", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }

      const res = await response.json();
      const messageContent = res.data.choices[0].message.content;
      console.log("OpenAI replied...", messageContent);
      setGeneratedText(messageContent);
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to generate text. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">AI Text Generator</h2>
      <div className="flex items-center mb-4">
        <label htmlFor="prompt" className="mr-2">
          Enter Prompt:
        </label>
        <input
          type="text"
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="border border-gray-300 rounded p-2 flex-grow"
          placeholder="Enter your prompt here..."
        />
        <button
          onClick={fetchGeneratedText}
          disabled={!prompt || isLoading}
          className="ml-4 bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isLoading ? "Generating..." : "Generate Text"}
        </button>
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {generatedText && (
        <div className="bg-gray-100 p-4 rounded">
          <h3 className="text-lg font-semibold mb-2">Generated Text:</h3>
          <p className="whitespace-pre-wrap">{generatedText}</p>
        </div>
      )}
    </div>
  );
};

export default OpenAIComponent;
