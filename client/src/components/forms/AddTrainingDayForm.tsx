import { trpc } from "@/api/trpc";
import { Input, SubmitButton } from "../UIElements";
import { SubmitHandler, useForm } from "react-hook-form";
import { BookOpenText, Tag } from "@phosphor-icons/react";
import { useLocation, Location } from "react-router";
import * as Select from "@radix-ui/react-select";
import { useState } from "react";

interface TrainingDayForm {
  name: string;
  description?: string;
}

interface TrainingDetails {
  trainingDetails: {
    id: string;
    declaredWeekDays: number[];
  };
}
export const AddTrainingDayForm = () => {
  const location: Location<TrainingDetails> = useLocation();
  const { trainingDetails } = location.state || {};

  const [choosedWeekDay, setWeekDay] = useState(
    trainingDetails?.declaredWeekDays[0].toString()
  );

  const { mutate } = trpc.trainingDay.create.useMutation();
  const { register, handleSubmit } = useForm<TrainingDayForm>();

  const onSubmit: SubmitHandler<TrainingDayForm> = (data) => {
    mutate({
      ...data,
      trainingId: trainingDetails.id,
      trainingNumber: Number(choosedWeekDay),
    });
  };

  return (
    <div>
      <Input
        label="Nazwa"
        placeholder="Name your training..."
        Icon={Tag}
        {...register("name", { required: "To pole jest wymagane" })}
      />
      <Input
        label="Opis"
        placeholder="Name your training..."
        optional
        Icon={BookOpenText}
        {...register("description")}
      />
      <Select.Root value={choosedWeekDay} onValueChange={setWeekDay}>
        <Select.Trigger>{choosedWeekDay}</Select.Trigger>
        <Select.Portal>
          <Select.Content position="popper" className="h-full bg-white">
            <Select.Viewport className="p-3">
              {trainingDetails.declaredWeekDays.map((weekDay) => {
                return (
                  <Select.Item
                    key={weekDay}
                    value={weekDay.toString()}
                    className="my-1 p-1 rounded-lg"
                  >
                    {mapWeekDay[weekDay]}
                  </Select.Item>
                );
              })}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
      <SubmitButton text="DODAJ" onClick={handleSubmit(onSubmit)} />
    </div>
  );
};

const mapWeekDay = [
  "Poniedziałek",
  "Wtorek",
  "Środa",
  "Czwartek",
  "Piątek",
  "Sobota",
  "Niedziela",
];
