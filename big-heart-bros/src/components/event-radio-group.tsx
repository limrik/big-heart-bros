"use client";

import CustomRadioGroup from "./custom-radio-group";
import { Label } from "./ui/label";
import React, { useEffect, useState } from "react";

export enum EventType {
  Volunteering = "Volunteering",
  Training = "Training",
  Workshop = "Workshop",
}

interface Props {
  type: EventType;
  setSelectedType: React.Dispatch<React.SetStateAction<EventType>>;
}
function EventRadioGroup({ type, setSelectedType }: Props) {
  const displayNames = ["Volunteering", "Training", "Workshop"];

  return (
    <div className="flex flex-col gap-[15px] mb-3">
      <Label>Offer Type</Label>
      <CustomRadioGroup
        styling={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          gap: "10px",
        }}
        displayNames={displayNames}
        options={Object.values(EventType)}
        selectedOption={type}
        setSelectedOption={(value) => setSelectedType(value as EventType)}
      />
    </div>
  );
}

export default EventRadioGroup;
