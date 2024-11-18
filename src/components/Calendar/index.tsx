import {
  CalendarContainer,
  CalendarHeader,
  CalendarTitle,
  CalendarActions,
  CalendarBody,
  CalendarDay,
} from "./styles";

import { CaretLeft, CaretRight } from "phosphor-react";
import { getWeekDays } from "@/utils/get-week-days";
import { useMemo, useState } from "react";
import dayjs from "dayjs";

export function Calendar() {
  const [currentDate, setCurentDate] = useState(() => {
    return dayjs().set("date", 1);
  });

  function handlePreviusMonth() {
    const handlePreviusMonth = currentDate.subtract(1, "month");
    setCurentDate(handlePreviusMonth);
  }

  function handleNextMounth() {
    const handlePreviusMonth = currentDate.add(1, "month");
    setCurentDate(handlePreviusMonth);
  }

  const shortWeekDays = getWeekDays({ short: true });

  const currentMonth = currentDate.format("MMMM");
  const currentYear = currentDate.format("YYYY");

  const calendarWeeks = useMemo(() => {
    const daysInMonthArray = Array.from({
      length: currentDate.daysInMonth(),
    }).map((_, index) => {
      return currentDate.set("date", index + 1);
    });

    const firstWeekDay = currentDate.get("day");
    const previuosMonthFillArray = Array.from({
      length: firstWeekDay,
    })
      .map((_, index) => {
        return currentDate.subtract(index + 1, "day");
      })
      .reverse();

    return [...previuosMonthFillArray, ...daysInMonthArray];
  }, [currentDate]);

  console.log(calendarWeeks);

  return (
    <CalendarContainer>
      <CalendarHeader>
        <CalendarTitle>
          {currentMonth} <span>{currentYear}</span>
        </CalendarTitle>
        <CalendarActions>
          <button onClick={handlePreviusMonth} title="Previus Mounth">
            <CaretLeft />
          </button>
          <button onClick={handleNextMounth} title="Next Mounth">
            <CaretRight />
          </button>
        </CalendarActions>
      </CalendarHeader>
      <CalendarBody>
        <thead>
          <tr>
            {shortWeekDays.map((weekDay) => (
              <th key={weekDay}>{weekDay}.</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <CalendarDay>1</CalendarDay>
            </td>
            <td>
              <CalendarDay>1</CalendarDay>
            </td>
            <td>
              <CalendarDay>1</CalendarDay>
            </td>
            <td>
              <CalendarDay>1</CalendarDay>
            </td>
            <td>
              <CalendarDay>1</CalendarDay>
            </td>
            <td>
              <CalendarDay disabled>2</CalendarDay>
            </td>
            <td>
              <CalendarDay>3</CalendarDay>
            </td>
          </tr>
        </tbody>
      </CalendarBody>
    </CalendarContainer>
  );
}
