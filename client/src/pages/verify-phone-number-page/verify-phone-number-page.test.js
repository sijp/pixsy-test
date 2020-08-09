import React from "react";
import VerifyPhoneNumberPage from "./verify-phone-number-page";
import {
  render,
  cleanup,
  waitFor,
  waitForElement,
  fireEvent
} from "@testing-library/react";
import nock from "nock";
import { act } from "react-dom/test-utils";

afterEach(() => {
  cleanup();
  nock.cleanAll();
});

test("Page Should have a title, subtitle and a form", () => {
  const { getByTestId } = render(<VerifyPhoneNumberPage />);
  expect(getByTestId("page-title")).toBeInTheDocument();
  expect(getByTestId("page-subtitle")).toBeInTheDocument();
  expect(getByTestId("page-input")).toBeInTheDocument();
});

test("Sending Phone for verification will switch to Otp Form", async () => {
  nock("http://localhost:5000")
    .defaultReplyHeaders({ "access-control-allow-origin": "*" })
    .get("/subscribe")
    .query(true)
    .reply(200, () => {
      return { otpId: 1 };
    });
  const { getByTestId, queryByTestId } = render(<VerifyPhoneNumberPage />);
  const phoneField = getByTestId("phone-number");
  phoneField.value = "0524444444";
  const submit = getByTestId("submit");

  let otp = queryByTestId("otp");
  expect(otp).toBeNull();
  fireEvent.change(getByTestId("phone-number"), {
    target: {
      value: "1234"
    }
  });
  submit.click();
  await waitForElement(() => queryByTestId("otp"));

  otp = queryByTestId("otp");
  expect(otp).toBeInTheDocument();
});
