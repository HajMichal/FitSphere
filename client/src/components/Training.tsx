import { PencilSimpleLine } from "@phosphor-icons/react";
import { Trainings } from "../../../backend/server/db/schema";
import { BiggerHeader } from "./styled/Text";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

type Props = {
  currentTraining?: Trainings;
  availableTrainings?: Trainings[];
  setTrainingIndex: React.Dispatch<React.SetStateAction<number>>;
};
export function Training({
  currentTraining,
  availableTrainings,
  setTrainingIndex,
}: Props) {
  const [open, setOpen] = useState(false);
  if (!currentTraining) return;

  const chooseTraining = (index: number) => {
    setTrainingIndex(index);
    setOpen(false);
    localStorage.setItem("trainingIndex", JSON.stringify(index));
  };
  return (
    <div className="w-full flex justify-center my-5">
      <div className="flex justify-between w-4/5">
        <BiggerHeader>{currentTraining.name}</BiggerHeader>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger>
            <PencilSimpleLine size={28} />
          </DialogTrigger>
          <DialogContent aria-describedby={undefined}>
            <DialogTitle>Wybierz aktualny trening</DialogTitle>
            {availableTrainings?.map((training, index) => {
              return (
                <button
                  key={index}
                  type="submit"
                  onClick={() => chooseTraining(index)}
                >
                  {training.name}
                </button>
              );
            })}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
