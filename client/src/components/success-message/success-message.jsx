import React from "react";

export default function ({ phoneNumber }) {
  return (
    <>
      <h2 data-testid="page-title">You're all set!</h2>
      <p data-testid="page-subtitle">
        We have verified {phoneNumber} as your phone number. Congratulations!
      </p>
    </>
  );
}
