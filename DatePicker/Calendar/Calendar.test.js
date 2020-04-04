import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Calendar from ".";

describe("Calendar", () => {
  it("should render with the theme provided", () => {
    const { getByText } = render(
      <Calendar
        date={new Date()}
        handleOnChange={jest.fn()}
        theme={{
          backgroundColor: "red",
          hoverColor: "pink",
        }}
      />
    );
    const calendarElement = getByText("1");
    fireEvent.mouseEnter(calendarElement);
    expect(calendarElement).toHaveStyle(`background: pink`);
    fireEvent.mouseLeave(calendarElement);
    expect(calendarElement).toHaveStyle(`background: white`);
  });

  it("should render with the theme provided for current day", () => {
    const { getByText } = render(
      <Calendar
        date={new Date("02/02/2020")}
        handleOnChange={jest.fn()}
        theme={{
          backgroundColor: "red",
          hoverColor: "pink",
        }}
      />
    );
    const calendarElement = getByText("2");
    fireEvent.mouseEnter(calendarElement);
    expect(calendarElement).toHaveStyle(`background: red`);
    fireEvent.mouseLeave(calendarElement);
    expect(calendarElement).toHaveStyle(`background: red`);
  });

  it("should fire click event on next", () => {
    const { getByText } = render(
      <Calendar
        date={new Date("02/03/2020")}
        handleOnChange={jest.fn()}
        maxDay={new Date("03/02/2020")}
      />
    );
    const calendarElement = getByText(">");
    fireEvent.click(calendarElement);
    expect(calendarElement).toHaveTextContent("");
  });

  it("should fire click event on next and go to next year", () => {
    const { getByText } = render(
      <Calendar date={new Date("12/10/2020")} handleOnChange={jest.fn()} />
    );
    fireEvent.click(getByText(">"));
    expect(getByText("January 2021")).toBeInTheDocument();
  });

  it("should fire click event on previous", () => {
    const { getByText } = render(
      <Calendar
        date={new Date("03/20/2020")}
        handleOnChange={jest.fn()}
        minDay={new Date("02/21/2020")}
        changeInputValue={jest.fn()}
      />
    );
    const calendarElement = getByText("<");
    fireEvent.click(calendarElement);
    expect(calendarElement).toHaveTextContent("");
  });

  it("should fire click event on previous and go to previous year", () => {
    const { getByText } = render(
      <Calendar date={new Date("01/10/2020")} handleOnChange={jest.fn()} />
    );
    fireEvent.click(getByText("<"));
    expect(getByText("December 2019")).toBeInTheDocument();
  });

  it("should render 29th of February when date is greater on previous", () => {
    const { getByText } = render(
      <Calendar
        date={new Date("03/30/2020")}
        handleOnChange={jest.fn()}
        changeInputValue={jest.fn()}
      />
    );
    fireEvent.click(getByText("<"));
    expect(getByText("29")).toHaveClass("active");
  });

  it("should render current date if correct Date object is not passed", () => {
    const { getByText } = render(
      <Calendar date="test" handleOnChange={jest.fn()} />
    );
    const date = new Date().getDate().toString();
    expect(getByText(date)).toHaveClass("active");
  });
});
