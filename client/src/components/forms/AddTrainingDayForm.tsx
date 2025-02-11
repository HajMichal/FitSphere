import { trpc } from "@/api/trpc";
import { Input, SubmitButton } from "../UIElements";
import { SubmitHandler, useForm } from "react-hook-form";
import { BookOpenText, Tag } from "@phosphor-icons/react";
import { useLocation, Location } from "react-router";
import { RalewayHeader } from "../styled/Text";

interface TrainingDayForm {
  trainings: {
    name: string;
    description?: string;
  }[];
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

  // const { register, handleSubmit } = useForm<TrainingDayForm>();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<TrainingDayForm>({
    defaultValues: {
      trainings: trainingDetails.declaredWeekDays.map(() => ({
        name: "",
        description: "",
      })),
    },
  });

  const { mutate } = trpc.trainingDay.create.useMutation({
    onSuccess: () => {
      // Navigate to create exercise step
    },
  });

  const onSubmit: SubmitHandler<TrainingDayForm> = ({ trainings }) => {
    mutate({
      trainings,
      trainingId: trainingDetails.id,
    });
  };

  return (
    <div>
      {trainingDetails.declaredWeekDays.map((weekDay, index) => {
        return (
          <div key={weekDay} className="pt-5 rounded-lg">
            <div className="flex items-center gap-1 pl-2">
              <p>Trening {mapNumbers[index]}:</p>
              <RalewayHeader className="text-4xl font-raleway">
                {mapWeekDay[weekDay]}
              </RalewayHeader>
            </div>
            <Input
              label="Nazwa"
              placeholder="Name your training..."
              Icon={Tag}
              {...register(`trainings.${index}.name`, {
                required: "To pole jest wymagane",
                minLength: {
                  value: 3,
                  message: "Nazwa musi mieć co najmniej 3 znaki",
                },
              })}
              error={errors.trainings?.[index]?.name?.message}
            />
            <Input
              label="Opis"
              placeholder="Name your training..."
              optional
              Icon={BookOpenText}
              {...register(`trainings.${index}.description`)}
            />
          </div>
        );
      })}
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
const mapNumbers = [
  "pierwszy",
  "drugi",
  "trzeci",
  "czwarty",
  "piąty",
  "szósty",
  "siódmy",
];
