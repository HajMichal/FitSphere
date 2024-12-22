import { ContentHeader, ShortDescription } from "./styled/Text";
import { Barbell } from "@phosphor-icons/react";
import { LongTile, LongTileContent, LongTileDetail } from "./styled/Tiles";
import { type Exercises } from "../../../types/database";

export function ExerciseTile({ exercise }: { exercise: Exercises }) {
  return (
    <LongTile key={exercise.id}>
      <LongTileContent>
        <div className="rounded-full bg-brand p-2">
          <Barbell className="text-white" size={26} />
        </div>
        <div className="ml-3">
          <ContentHeader>{exercise.name}</ContentHeader>
          <ShortDescription>{exercise.reps.join(", ")}</ShortDescription>
        </div>
      </LongTileContent>
      <LongTileDetail>{exercise.kilograms} kg</LongTileDetail>
    </LongTile>
  );
}
