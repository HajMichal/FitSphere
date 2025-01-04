import { useCallback } from "react";
import { ShortDescription, SmallText } from "../styled/Text";
import { formatDate, formatWeekDay } from "../../utils/date";

interface Props {
  weekDates: Date[];
  trainingDays?: Date[];
}
export function CalendarWeek({ weekDates, trainingDays }: Props) {
  const isTrainingDay = useCallback(
    (date: Date) => {
      return trainingDays?.some(
        (trainingDate) => trainingDate.toDateString() === date.toDateString()
      );
    },
    [trainingDays]
  );

  return (
    <>
      {weekDates.map((date) => (
        <div key={date.toISOString()} className="flex flex-col items-center">
          <ShortDescription>{formatWeekDay(date)}</ShortDescription>
          <SmallText
            className={
              isTrainingDay(date)
                ? "border-b-[3px] border-brand pb-1"
                : "pb-[7px]"
            }
          >
            {formatDate(date)}
          </SmallText>
        </div>
      ))}
    </>
  );
}
