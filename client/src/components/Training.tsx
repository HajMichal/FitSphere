import { PencilSimpleLine } from "@phosphor-icons/react";
import { Trainings } from "../../../backend/server/db/schema";
import { BiggerHeader } from "./styled/Text";
import { useNavigate } from "react-router";
import { ROUTES } from "@/pages/routes";

type Props = {
  currentTraining: Trainings | undefined;
};
export function Training({ currentTraining }: Props) {
  const navigate = useNavigate();
  if (!currentTraining) return;
  return (
    <div className="w-full flex justify-center my-5">
      <div className="flex justify-between w-4/5">
        <BiggerHeader>{currentTraining.name}</BiggerHeader>
        <PencilSimpleLine
          size={28}
          onClick={() => navigate(ROUTES.createTrainingDay)}
        />
      </div>
    </div>
  );
}
