import React, { useState } from "react";
import classes from "./phone-form.module.css";
import countryCodes from "./country-codes";

function PhoneForm({ onSubmit, value = "" }) {
  const [phoneNumber, setPhoneNumber] = useState(value);
  const [country, setCountry] = useState("49");

  const submitHandler = (e) => {
    e.preventDefault();
    onSubmit(`+${country}${phoneNumber}`);
  };

  const onPhoneInput = (e) => {
    const digit = parseInt(e.key);
    if (isNaN(digit) && e.key.length === 1) e.preventDefault();
  };

  const onPhoneChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  return (
    <>
      <h2 data-testid="page-title">Verify your number</h2>
      <p data-testid="page-subtitle">
        Enter your number and we will contact you to verify it is yours
      </p>
      <form onSubmit={submitHandler} className="pure-form">
        <fieldset>
          <div className={classes.field}>
            <label>
              Country:
              <select
                data-testid="country"
                onChange={(e) => setCountry(e.target.value)}
              >
                {countryCodes.map((countryCode) => (
                  <option
                    key={countryCode[1]}
                    value={countryCode[2]}
                    selected={countryCode[2] === country}
                  >
                    {countryCode[0]} (+{countryCode[2]})
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className={classes.field}>
            <label>
              Phone Number:
              <input
                type="text"
                data-testid="phone-number"
                autoComplete="tel"
                onKeyDown={onPhoneInput}
                onChange={onPhoneChange}
                value={phoneNumber}
              />
            </label>
          </div>
          <div className={classes.field}>
            <input
              type="submit"
              data-testid="submit"
              value="Continue"
              disabled={phoneNumber.length === 0}
            />
          </div>
        </fieldset>
      </form>
    </>
  );
}

export default PhoneForm;
