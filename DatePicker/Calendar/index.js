import React, { useState, useEffect } from "react";
import "./Calendar.css";
import {
  getDaysOfMonth,
  months,
  weekdays,
  classList,
  checkIfDateObject,
} from "../helpers";

/**
 * @component
 * @param {object} props
 */
const Calendar = (props) => {
  const {
    date,
    theme = {},
    minDay,
    maxDay,
    handleOnChange,
    changeInputValue,
  } = props;

  const { backgroundColor = "cornflowerblue", hoverColor = "#c5daff" } = theme;

  const [daysOfMonth, setDaysOfMonth] = useState();
  const [day, setDay] = useState();
  const [month, setMonth] = useState();
  const [year, setYear] = useState();
  const [selectedDay, setSelectedDay] = useState();

  const [minDayPresent, setMinDayPresent] = useState(false);
  const [maxDayPresent, setMaxDayPresent] = useState(false);

  const [showPrevious, setShowPrevious] = useState(true);
  const [showNext, setShowNext] = useState(true);

  useEffect(() => {
    const minDayPresent = checkIfDateObject(minDay);
    const maxDayPresent = checkIfDateObject(maxDay);
    setMinDayPresent(!!minDayPresent);
    setMaxDayPresent(!!maxDayPresent);
    minDayPresent &&
      setShowPrevious(
        new Date(`${month + 1} 1 ${year}`).getTime() > minDay.getTime()
      );
    maxDayPresent &&
      setShowNext(
        new Date(`${month + 1} ${daysOfMonth} ${year}`).getTime() <
          maxDay.getTime()
      );
  }, [month, year, daysOfMonth, minDay, maxDay]);

  useEffect(() => {
    let currentDate = new Date();
    if (checkIfDateObject(date)) {
      currentDate = date;
    }
    setDaysOfMonth(
      getDaysOfMonth(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
    setDay(
      new Date(currentDate.getFullYear(), currentDate.getMonth()).getDay()
    );
    setMonth(currentDate.getMonth());
    setYear(currentDate.getFullYear());
    setSelectedDay(currentDate.getDate());
  }, [date]);

  /**
   * Called when a day tile is clicked on the Calendar.
   * @param {*} date - The selected tile number.
   */
  const handleOnClick = (date) => {
    changeInputValue && changeInputValue(new Date(year, month, date));
    typeof handleOnChange === "function" &&
      handleOnChange(new Date(year, month, date));
    setSelectedDay(date);
  };

  /**
   * Called on next or previous, to set the state of date.
   * @param {*} month - The next or previous month.
   * @param {*} year - The next or previous year.
   */
  const setDateState = (month, year) => {
    let date;
    if (month !== new Date(year, month, selectedDay).getMonth()) {
      date = new Date(year, month, getDaysOfMonth(year, month + 1));
    } else {
      date = new Date(year, month, selectedDay);
    }
    setDaysOfMonth(getDaysOfMonth(year, month + 1));
    setDay(new Date(year, month).getDay());
    setSelectedDay(date.getDate());
    setMonth(month);
    setYear(year);
    typeof handleOnChange === "function" && handleOnChange(date);
    changeInputValue && changeInputValue(date, true);
  };

  /**
   * Called when the next button (>) is clicked.
   */
  const next = () => {
    const nextMonth = (month + 1) % 12;
    const nextYear = nextMonth === 0 ? year + 1 : year;
    setDateState(nextMonth, nextYear);
    if (
      maxDayPresent &&
      new Date(nextYear, nextMonth, selectedDay).getTime() >= maxDay.getTime()
    ) {
      setSelectedDay(maxDay.getDate());
    }
  };

  /**
   * Called when the previous button (<) is clicked.
   */
  const previous = () => {
    const previousMonth = (month + 11) % 12;
    const previousYear = previousMonth === 11 ? year - 1 : year;
    setDateState(previousMonth, previousYear);
    if (
      minDayPresent &&
      new Date(previousYear, previousMonth, selectedDay).getTime() <
        minDay.getTime()
    ) {
      setSelectedDay(minDay.getDate());
    }
  };

  /**
   * This renders the Calendar.
   */
  const createCalendar = () => {
    let rows = [],
      date = 1;
    for (let i = 0; i < 6; i++) {
      let columns = [];
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < day) {
          columns.push(<td key={j}></td>);
        } else if (date > daysOfMonth) {
          break;
        } else {
          let currentDate = date;
          const currentDay = new Date(`${month + 1} ${date} ${year}`);
          columns.push(
            <td
              key={j}
              style={
                date === selectedDay
                  ? { backgroundColor }
                  : { backgroundColor: "white" }
              }
              className={classList(
                "day-wrapper",
                date === selectedDay && "active",
                minDayPresent &&
                  currentDay.getTime() < minDay.getTime() &&
                  "disabled",
                maxDayPresent &&
                  currentDay.getTime() > maxDay.getTime() &&
                  "disabled"
              )}
              onClick={() => {
                handleOnClick(currentDate);
              }}
              onMouseEnter={(e) => {
                e.target.style.background =
                  currentDate === selectedDay ? backgroundColor : hoverColor;
              }}
              onMouseLeave={(e) => {
                e.target.style.background =
                  currentDate === selectedDay ? backgroundColor : "white";
              }}
            >
              {date++}
            </td>
          );
        }
      }
      rows.push(<tr key={i}>{columns}</tr>);
    }
    return rows;
  };

  return (
    <div className="calendar-wrapper">
      <table className="date-wrapper">
        <thead>
          <tr
            style={{
              background: backgroundColor,
            }}
            className="month-wrapper"
          >
            {showPrevious ? (
              <td className="button" onClick={previous}>
                &lt;
              </td>
            ) : (
              <td></td>
            )}
            <td colSpan={5}>
              {months[month]} {year}
            </td>
            {showNext ? (
              <td className="button" onClick={next}>
                &gt;
              </td>
            ) : (
              <td></td>
            )}
          </tr>
          <tr
            style={{
              background: backgroundColor,
            }}
            className="weekday-wrapper"
          >
            {weekdays.map((weekday) => (
              <td key={weekday}>{weekday.substring(0, 1)}</td>
            ))}
          </tr>
        </thead>
        <tbody>{createCalendar()}</tbody>
      </table>
    </div>
  );
};

export default Calendar;
