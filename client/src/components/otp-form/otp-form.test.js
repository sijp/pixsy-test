import React from "react";
import OtpForm from "./otp-form";
import { render } from "@testing-library/react";

test("Should have an OTP field", () => {
  const { getByTestId } = render(<OtpForm />);
  expect(getByTestId("otp")).toBeInTheDocument();
});

test("Should have a submit button", () => {
  const { getByTestId } = render(<OtpForm />);
  expect(getByTestId("submit")).toBeInTheDocument();
});

test("On Submit the callback should be fired", () => {
  const spy = jest.fn();
  const { getByTestId } = render(<OtpForm onSubmit={spy} />);

  const submit = getByTestId("submit");

  submit.click();

  expect(spy.mock.calls.length).toBe(1);
});
