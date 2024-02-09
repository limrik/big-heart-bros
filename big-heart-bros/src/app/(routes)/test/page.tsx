"use client"

import React, { useRef } from "react";
import OpenAIComponent from "../../../components/openaiComponent";
import { useReactToPrint } from "react-to-print";

function Page() {
  const contentToPrint = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => contentToPrint.current,
    documentTitle: "Print This Document",
    onBeforePrint: () => console.log("before printing..."),
    onAfterPrint: () => console.log("after printing..."),
    removeAfterPrint: true,
  });

  return (
    <div>
      <div ref={contentToPrint}><OpenAIComponent /></div>
      <button 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handlePrint}
      >
        Save as PDF
      </button>
    </div>
  );
}

export default Page;
