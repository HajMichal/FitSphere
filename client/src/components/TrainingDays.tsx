import React, { memo } from "react";
import { ContentHeader, Header } from "./styled/Text";
import styled from "styled-components";
import { Barbell } from "@phosphor-icons/react";
import { UserWithRelations } from "../../../backend/server/db/schema";

type Props = {
  user?: UserWithRelations;
  trainingIndex: number;
  choosedTrainingDay?: string;
  setTrainingDay: React.Dispatch<React.SetStateAction<string | undefined>>;
};
export const TrainingDays = memo(function ({
  user,
  trainingIndex,
  choosedTrainingDay,
  setTrainingDay,
}: Props) {
  return (
    <div className="w-full">
      <Header>Dni treningowe</Header>
      <div className="overflow-x-auto scroll-smooth px-0.5 pb-3 whitespace-nowrap gap-7 hide-scrollbar">
        {user?.trainings[trainingIndex]?.trainingDay.map((trainingDay) => {
          return (
            <TrainingTile
              key={trainingDay.id}
              $isActive={trainingDay.id === choosedTrainingDay}
              onClick={() => setTrainingDay(trainingDay.id)}
            >
              <Barbell />
              <ContentHeader>{trainingDay.name}</ContentHeader>
            </TrainingTile>
          );
        })}
      </div>
    </div>
  );
});

const TrainingTile = styled.div<{ $isActive?: boolean }>`
  display: inline-block;
  width: 33%;
  max-width: 150px;
  height: 5rem;
  border-radius: 15px;
  box-shadow: 0px 4px 6px 0px #d7d7d7;
  margin-right: 13px;
  margin-left: 13px;
  padding: 10px;
  ${(props) => props.$isActive && "border: solid #02cf8a 2px; padding: 8px;"}

  &:focus {
    border: solid #02cf8a 2px;
    padding: 8px;
  }
`;
