import React from "react";
import PhoneForm from "./phone-form";
import { render, wait, fireEvent } from "@testing-library/react";

test("Should have Country field", () => {
  const { getByTestId } = render(<PhoneForm />);
  expect(getByTestId("country")).toBeInTheDocument();
});

test("Should have Phone Number field", () => {
  const { getByTestId } = render(<PhoneForm />);
  expect(getByTestId("phone-number")).toBeInTheDocument();
});

test("Should have Submit field", () => {
  const { getByTestId } = render(<PhoneForm />);
  expect(getByTestId("submit")).toBeInTheDocument();
});

test("On Submit the callback should be fired", async () => {
  const spy = jest.fn();
  const { getByTestId } = render(<PhoneForm onSubmit={spy} />);
  fireEvent.change(getByTestId("phone-number"), {
    target: {
      value: "1234"
    }
  });
  await wait(() => {
    const submit = getByTestId("submit");

    submit.click();

    expect(spy.mock.calls.length).toBe(1);
  });
});
