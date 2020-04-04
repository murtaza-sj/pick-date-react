import React from "react";
import DatePicker from "./DatePicker";
import { render, fireEvent } from "@testing-library/react";

describe("DatePicker", () => {
  it("should render", () => {
    const { getByLabelText } = render(
      <DatePicker date={new Date()} handleOnChange={jest.fn()} />
    );
    expect(getByLabelText("date-picker")).toBeInTheDocument();
  });

  it("should render Calendar and on selection of a date it should render on input", () => {
    const { getByLabelText, getAllByText, getByText } = render(
      <DatePicker date={new Date()} handleOnChange={jest.fn()} />
    );
    const input = getByLabelText("date-picker");
    fireEvent.click(input);
    fireEvent.mouseDown(getByText("M"));
    expect(getAllByText("S").length).toEqual(2);
    fireEvent.click(getByText("1"));
    expect(input.value).toContain("1");
  });

  it("should close Calendar on outside click", () => {
    const div = document.createElement("div");
    div.textContent = "test";
    div.addEventListener("click", jest.fn());
    document.body.appendChild(div);
    const { getByLabelText, getByText, container } = render(
      <DatePicker date={new Date()} handleOnChange={jest.fn()} />
    );
    const input = getByLabelText("date-picker");
    fireEvent.click(input);
    fireEvent.mouseDown(getByText("test"));
    expect(container.querySelector(".calendar-wrapper")).toBeNull();
  });

  it("should fire input event with minDay and maxDay same as current date", () => {
    const { getByLabelText, getAllByText } = render(
      <DatePicker
        date={new Date()}
        handleOnChange={jest.fn()}
        minDay={new Date()}
        maxDay={new Date()}
      />
    );
    const input = getByLabelText("date-picker");
    fireEvent.click(input);
    expect(getAllByText("S").length).toEqual(2);
  });

  it("should fire input event with valid value", () => {
    const { getByLabelText } = render(
      <DatePicker date={new Date()} handleOnChange={jest.fn()} config={{}} />
    );
    const input = getByLabelText("date-picker");
    fireEvent.change(input, {
      target: {
        value: "03/04/2020",
      },
    });
    expect(input.value).toEqual("03/04/2020");
  });

  it("should fire input event with an invalid value", () => {
    const { getByLabelText } = render(
      <DatePicker
        date={new Date()}
        handleOnChange={jest.fn()}
        minDay={new Date()}
        maxDay={new Date()}
      />
    );
    const input = getByLabelText("date-picker");
    fireEvent.change(input, {
      target: {
        value: "03/04/2020",
      },
    });
    expect(input.value).toEqual("03/04/2020");
  });

  it("should format based on the format passed", () => {
    const { getByLabelText } = render(
      <DatePicker
        date={new Date()}
        handleOnChange={jest.fn()}
        format="dd/mm/yyyy"
      />
    );
    const input = getByLabelText("date-picker");
    fireEvent.change(input, {
      target: {
        value: "03/04/2020",
      },
    });
    expect(input.value).toEqual("03/04/2020");
  });
});
