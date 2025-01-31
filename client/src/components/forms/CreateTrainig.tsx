import React, { useState } from "react";
import { BookOpenText, CalendarDots, Tag } from "@phosphor-icons/react";
import { ContentHeader, ShortDescription, SmallText } from "../styled/Text";
import { CalendarContainer } from "../calendar/Calendar";
import { CenterContent } from "../styled/Containers";
import { SubmitButton, Input } from "../UIElements";
import { SubmitHandler, useForm } from "react-hook-form";
import { trpc } from "@/api/trpc";

export interface CreateTrainingInputs {
  name: string;
  description?: string;
  // declaredWeekDays: number[];
  period: number;
}

const week = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
export function CreateTrainigForm() {
  // How to store training days in state?
  // https://chat.deepseek.com/a/chat/s/73d343d6-b0ab-4ab0-92f3-e79515d1cc43
  // First idea:
  // const [trainingDays, setTrainingDay] = useState([
  //   false,
  //   false,
  //   false,
  //   false,
  //   false,
  //   false,
  //   false,
  // ]);
  const [trainingDays, setTrainingDay] = useState<number[]>([]);

  const { mutate } = trpc.training.create.useMutation();
  const { register, handleSubmit } = useForm<CreateTrainingInputs>();
  console.log(trainingDays);

  const onSubmit: SubmitHandler<CreateTrainingInputs> = (data) => {
    mutate({ ...data, declaredWeekDays: trainingDays });
  };

  return (
    <div>
      <Input
        label="Training name"
        placeholder="Name your training..."
        Icon={Tag}
        {...register("name", { required: "Name is required" })}
      />
      <Input
        label="Description"
        placeholder="E.g. set your goal, training type "
        optional
        Icon={BookOpenText}
        {...register("description")}
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
        {...register("period", {
          required: "Period is required",
          valueAsNumber: true,
        })}
      />
      <SubmitButton text="SUBMIT" onClick={handleSubmit(onSubmit)} />
    </div>
  );
}

interface WeekDay {
  day: string;
  dayIndex: number;
  trainingDays: number[];
  setTrainingDay: React.Dispatch<React.SetStateAction<number[]>>;
}
const WeekDay = ({ day, dayIndex, trainingDays, setTrainingDay }: WeekDay) => {
  const [isChoosed, setIsChoosed] = useState(false);

  return (
    <div
      key={day}
      className="flex flex-col items-center"
      onClick={() => {
        setIsChoosed(!isChoosed);
        setTrainingDay([...trainingDays, dayIndex].sort());
      }}
    >
      <ShortDescription>{day}</ShortDescription>
      <SmallText
        className={`p-2 mt-2 rounded-lg ${
          isChoosed ? "bg-brand text-white" : ""
        }`}
      >
        {dayIndex + 1}
      </SmallText>
    </div>
  );
};
