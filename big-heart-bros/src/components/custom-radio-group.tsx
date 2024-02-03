import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import React, { CSSProperties } from "react"

interface Props {
  displayNames: string[]
  options: string[]
  selectedOption: string
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>
  styling?: CSSProperties
}

function CustomRadioGroup({
  displayNames,
  options,
  selectedOption,
  setSelectedOption,
  styling,
}: Props) {
  return (
    <RadioGroup
      defaultValue={selectedOption}
      onValueChange={(s: string) => setSelectedOption(s)}
      className="flex flex-col space-y-1 align-center"
      style={{ ...styling }}
    >
      {options.map((option, index) => (
        <div className="flex items-center space-x-2" key={option}>
          <RadioGroupItem value={option} id={option} />
          <Label
            htmlFor={option}
            className={`${
              selectedOption === option ? "text-black" : "text-slate-500"
            }`}
          >
            {displayNames[index]}
          </Label>
        </div>
      ))}
    </RadioGroup>
  )
}

export default CustomRadioGroup