import React from "react";
import classes from "./otp-form.module.css";
import { useState } from "react";

function OtpForm({ onSubmit, phoneNumber }) {
  const [otp, setOtp] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    onSubmit(otp);
  };
  const onOtpInput = (e) => {
    const digit = parseInt(e.key);
    if (isNaN(digit) && e.key.length === 1) e.preventDefault();
  };
  return (
    <>
      <h2 data-testid="page-title">Enter your code</h2>
      <p data-testid="page-subtitle">
        We sent a security code to {phoneNumber}. Enter it below to verify your
        phone number.
      </p>
      <form onSubmit={submitHandler} className="pure-form">
        <div className={classes.field}>
          <label>
            Security Code:
            <input
              type="text"
              data-testid="otp"
              onKeyDown={onOtpInput}
              onChange={(e) => setOtp(e.target.value)}
              value={otp}
            />
          </label>
        </div>
        <div className={classes.field}>
          <input type="submit" data-testid="submit" value="Continue" />
        </div>
      </form>
    </>
  );
}

export default OtpForm;
