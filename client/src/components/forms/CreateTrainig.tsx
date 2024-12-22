import React, { useState } from "react";
import { BookOpenText, CalendarDots, Tag } from "@phosphor-icons/react";
import { ContentHeader, ShortDescription, SmallText } from "../styled/Text";
import { CalendarContainer } from "../calendar/Calendar";
import { CenterContent } from "../styled/Containers";
import { SubmitButton, Input } from "../UiElements";

const week = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
export function CreateTrainigForm() {
  const [trainingDays, setTrainingDay] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  return (
    <div>
      <Input
        label="Training name"
        placeholder="Name your training..."
        Icon={Tag}
      />
      <Input
        label="Description"
        placeholder="E.g. set your goal, training type "
        optional
        Icon={BookOpenText}
      />
      <CenterContent className="mt-4">
        <ContentHeader className="w-[85%]">Training frequency</ContentHeader>
        <CalendarContainer>
          <div className="flex items-center justify-between my-1">
            {week.map((day, index) => (
              <WeekDay
                key={index}
                day={day}
                dayIndex={index}
                trainingDays={trainingDays}
                setTrainingDay={setTrainingDay}
              />
            ))}
          </div>
        </CalendarContainer>
      </CenterContent>
      <Input
        label="Training period"
        placeholder="Number of months"
        Icon={CalendarDots}
      />
      <SubmitButton />
    </div>
  );
}

interface WeekDay {
  day: string;
  dayIndex: number;
  trainingDays: boolean[];
  setTrainingDay: React.Dispatch<React.SetStateAction<boolean[]>>;
}
const WeekDay = ({ day, dayIndex, trainingDays, setTrainingDay }: WeekDay) => {
  const [isChoosed, setIsChoosed] = useState(false);

  trainingDays[dayIndex] = isChoosed;
  setTrainingDay(trainingDays);

  return (
    <div
      key={day}
      className="flex flex-col items-center"
      onClick={() => setIsChoosed(!isChoosed)}
    >
      <ShortDescription>{day}</ShortDescription>
      <SmallText
        className={`p-2 mt-2 rounded-lg ${isChoosed ? "bg-brand text-white" : ""}`}
      >
        {dayIndex + 1}
      </SmallText>
    </div>
  );
};
