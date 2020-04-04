import React, { useState, useEffect, useRef } from "react";
import "./DatePicker.css";
import Calendar from "./Calendar";
import {
  ISOFormat,
  dateFormats,
  formatDate,
  checkIfDateObject,
} from "./helpers";

const DatePicker = (props) => {
  const {
    date,
    config,
    format,
    isInputDisabled,
    handleOnChange,
    maxDay,
    minDay,
    children,
  } = props;

  const [value, setValue] = useState(date);

  const [showCalendar, setShowCalendar] = useState(false);

  const [dateValue, setDateValue] = useState(date);

  const dateContainer = useRef(null);

  const handleOutsideClick = (e) => {
    if (dateContainer.current && !dateContainer.current.contains(e.target)) {
      setShowCalendar(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleOnClick = () => {
    setShowCalendar(true);
  };

  const setConfig = () => {
    let currentFormat, regex, separator;
    if (config) {
      currentFormat = config.format || "mm/dd/yyyy";
      regex = config.regex || dateFormats[currentFormat].regex;
      separator = config.separator || "/";
    } else {
      currentFormat = dateFormats[format] ? format : "mm/dd/yyyy";
      regex = dateFormats[currentFormat].regex;
      separator = dateFormats[currentFormat].separator;
    }
    return { currentFormat, regex, separator };
  };

  const handleOnInputChange = (e) => {
    setValue(e.target.value);
    const { currentFormat, regex, separator } = setConfig();
    const minDayPresent = checkIfDateObject(minDay);
    const maxDayPresent = checkIfDateObject(maxDay);
    const date = new Date(ISOFormat(e.target.value, currentFormat, separator));
    if (
      !regex.test(e.target.value) ||
      (maxDayPresent && date.getTime() > maxDay.getTime()) ||
      (minDayPresent && date.getTime() < minDay.getTime())
    ) {
      typeof handleOnChange === "function" && handleOnChange(false);
    } else {
      typeof handleOnChange === "function" && handleOnChange(date);
      setDateValue(date);
    }
  };

  const changeInputValue = (date, nextOrPrevious) => {
    setValue(date);
    setDateValue(date);
    !nextOrPrevious && setShowCalendar(false);
  };

  const onFormat = (date) => {
    const { currentFormat, regex, separator } = setConfig();
    const splitDate = date.toString().split(" ");
    const formattedDate = formatDate(splitDate, currentFormat, separator);
    if (regex.test(formattedDate)) {
      return formattedDate;
    }
    return date;
  };

  return (
    <div id="date-picker" ref={dateContainer}>
      <input
        type="text"
        aria-label="date-picker"
        className={showCalendar ? "border-bottom-0" : "border-bottom-1"}
        value={onFormat(value)}
        onChange={handleOnInputChange}
        onClick={handleOnClick}
        readOnly={isInputDisabled}
      />
      {children}
      {showCalendar && (
        <Calendar
          {...props}
          date={dateValue}
          changeInputValue={changeInputValue}
        />
      )}
    </div>
  );
};

export default DatePicker;
