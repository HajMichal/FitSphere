import { trpc } from "@/api/trpc";
import { Input, SubmitButton } from "../UIElements";
import { SubmitHandler, useForm } from "react-hook-form";
import { BookOpenText, Tag } from "@phosphor-icons/react";
import { useLocation, Location } from "react-router";

interface TrainingDayForm {
  name: string;
  description?: string;
}
interface Props {
  trainingNumber: number;
}
export const AddTrainingDayForm = ({ trainingNumber }: Props) => {
  const location: Location<{ id: string }> = useLocation();
  const { mutate } = trpc.trainingDay.create.useMutation();
  const { register, handleSubmit } = useForm<TrainingDayForm>();

  const { id } = location.state || {};
  console.log(id);
  const onSubmit: SubmitHandler<TrainingDayForm> = (data) => {
    mutate({ ...data, trainingId: id, trainingNumber });
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
      <SubmitButton text="DODAJ" onClick={handleSubmit(onSubmit)} />
    </div>
  );
};
