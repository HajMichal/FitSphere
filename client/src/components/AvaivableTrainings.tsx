import React, { memo } from "react";
import { ContentHeader, Header } from "./styled/Text";
import styled from "styled-components";
import { Barbell } from "@phosphor-icons/react";
import { UserWithRelations } from "../../../types/database";

type Props = {
  user: UserWithRelations | undefined;
  setTrainingDay: React.Dispatch<React.SetStateAction<string | undefined>>;
};
export const AvaivableTrainings = memo(function ({
  user,
  setTrainingDay,
}: Props) {
  return (
    <div className="w-full">
      <Header>Next trainings</Header>
      <div className="overflow-x-auto scroll-smooth px-0.5 pb-3 whitespace-nowrap gap-7 hide-scrollbar">
        {user?.trainings[0]?.trainingDay.map((trainingDay) => {
          return (
            <TrainingTile
              key={trainingDay.id}
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

const TrainingTile = styled.div`
  display: inline-block;
  width: 33%;
  max-width: 150px;
  height: 5rem;
  border-radius: 15px;
  box-shadow: 0px 4px 6px 0px #d7d7d7;
  margin-right: 13px;
  margin-left: 13px;
  padding: 10px;
  &:hover {
    border: solid #02cf8a 2px;
    padding: 8px;
  }
  &:focus {
    border: solid #02cf8a 2px;
    padding: 8px;
  }
`;
