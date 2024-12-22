import { CaretDown, CaretLeft, CaretRight } from "@phosphor-icons/react";
import { memo, useEffect, useState } from "react";
import * as Select from "@radix-ui/react-select";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";

import { ContentHeader } from "../styled/Text";
import { formatMonth, getWeekDates } from "../../utils/date";
import { CenterContent } from "../styled/Containers";
import { CalendarWeek } from "./CalendarWeek";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Mocked query output
export async function fetchTrainingDays() {
  return [new Date("2024-12-12"), new Date("2024-11-15")];
}

export const Calendar = memo(function () {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [choosedMonth, setMonth] = useState(formatMonth(currentDate));
  const [weekDates, setWeekDates] = useState<Date[]>([]);
  const [trainingDays, setTrainingDays] = useState<Date[]>([]);
  const [slideDirection, setSlideDirection] = useState<"left" | "right">(
    "right"
  );

  useEffect(() => {
    const dates = getWeekDates(currentDate);
    setWeekDates(dates);

    // Fetch training days for the current week
    fetchTrainingDays().then(setTrainingDays);
  }, [currentDate]);

  useEffect(() => {
    setMonth(formatMonth(currentDate));
  }, [formatMonth(currentDate)]);

  const navigateWeek = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate);
    if (direction === "prev") {
      newDate.setDate(newDate.getDate() - 7);
      setSlideDirection("left");
    } else {
      newDate.setDate(newDate.getDate() + 7);
      setSlideDirection("right");
    }
    setCurrentDate(newDate);
  };

  const navigateMonth = (value: string) => {
    setMonth(value);
    const newDate = new Date(currentDate);
    newDate.setMonth(MONTHS.indexOf(value));
    setCurrentDate(newDate);
  };

  return (
    <CenterContent>
      <CalendarContainer>
        <div className="flex items-center justify-between mb-6">
          <ContentHeader>Scheduled training days</ContentHeader>

          <Select.Root value={choosedMonth} onValueChange={navigateMonth}>
            <Select.Trigger>
              <ChooseMonth>
                <Select.Value>{choosedMonth}</Select.Value>
                <CaretDown size={22} color="#212121" />
              </ChooseMonth>
            </Select.Trigger>
            <Select.Portal>
              <Select.Content position="popper" className="h-full bg-white">
                <Select.Viewport className="p-3">
                  {MONTHS.filter((month) => choosedMonth !== month).map(
                    (month) => {
                      return (
                        <Select.Item
                          key={month}
                          value={month}
                          className="my-1 p-1 rounded-lg"
                        >
                          {month}
                        </Select.Item>
                      );
                    }
                  )}
                </Select.Viewport>
              </Select.Content>
            </Select.Portal>
          </Select.Root>
        </div>

        <div className="relative">
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={currentDate.toISOString()}
              initial={{
                x: slideDirection === "right" ? 200 : -200,
                opacity: 0,
              }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: slideDirection === "right" ? -200 : 200, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="grid grid-cols-7"
            >
              <CalendarWeek weekDates={weekDates} trainingDays={trainingDays} />
            </motion.div>
          </AnimatePresence>

          <button
            className="absolute -left-1 top-1/2 -translate-y-1/2 -translate-x-2"
            onClick={() => navigateWeek("prev")}
          >
            <CaretLeft className="h-4 w-4 text-grey" />
          </button>

          <button
            className="absolute -right-1 top-1/2 -translate-y-1/2 translate-x-2"
            onClick={() => navigateWeek("next")}
          >
            <CaretRight className="h-4 w-4 text-grey" />
          </button>
        </div>
      </CalendarContainer>
    </CenterContent>
  );
});

export const CalendarContainer = styled.div`
  width: 90%;
  background-color: white;
  box-shadow: 0px 4px 4px 0px #d7d7d7;
  border-radius: 15px;
  padding: 10px;
`;

const ChooseMonth = styled.div`
  padding: 1px 7px 1px 10px;
  display: flex;
  justify-content: space-between;
  border: 2px solid #212121;
  border-radius: 15px;
  font-size: 12px;
  align-items: center;
  width: 120px;
  font-weight: 600;
`;
