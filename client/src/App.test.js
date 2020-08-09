import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders Verify your number page", () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Verify your number/i);
  expect(linkElement).toBeInTheDocument();
});
