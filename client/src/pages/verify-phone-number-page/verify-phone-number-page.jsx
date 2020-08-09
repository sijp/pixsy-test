import React, { useState } from "react";

import classes from "./verify-phone-number-page.module.css";
import OtpForm from "../../components/otp-form/otp-form";
import PhoneForm from "../../components/phone-form/phone-form";
import SuccessMessage from "../../components/success-message/success-message";
import { sendOtp, verifyOtp } from "../../services/verify-phone/verify-phone";

function VerifyPhoneNumberPage() {
  const [otpId, setOtpId] = useState(null);
  const [success, setSuccess] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState(undefined);

  const onPhoneSubmit = async (submittedPhoneNumber) => {
    try {
      const otpId = await sendOtp(submittedPhoneNumber);
      setPhoneNumber(submittedPhoneNumber);
      setOtpId(otpId);
    } catch (error) {}
  };

  const onOtpSubmit = async (otp) => {
    try {
      const valid = await verifyOtp(otpId, otp);
      if (!valid)
        setMessage("Your access code was incorrect. Please try again.");
      else setMessage(undefined);
      setSuccess(valid);
    } catch (error) {}
  };

  return (
    <div className={classes.container}>
      <div data-testid="message" className={classes.message}>
        {message}
      </div>
      <div data-testid="page-input">
        {success ? (
          <SuccessMessage />
        ) : otpId ? (
          <OtpForm
            otpId={otpId}
            onSubmit={onOtpSubmit}
            phoneNumber={phoneNumber}
          />
        ) : (
          <PhoneForm onSubmit={onPhoneSubmit} />
        )}
      </div>
    </div>
  );
}

export default VerifyPhoneNumberPage;
