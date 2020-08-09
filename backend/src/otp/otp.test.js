const otp = require("./otp");

test("correct one time password should be valid", async () => {
  const { id, password } = await otp.publish("+972524444444");
  expect(await otp.validate(`${id}`, password)).toBe(true);
});

test("incorrect one time password should be invalid", async () => {
  const { id, password } = await otp.publish("+972524444444");
  expect(await otp.validate(id, `${password}111`)).toBe(false);
});

test("Old OTP should be invalid", async () => {
  const originalDateNow = Date.now;
  Date.now = () => originalDateNow() - 301 * 1000;
  const { id, password } = await otp.publish("+972524444444");
  Date.now = originalDateNow;
  expect(await otp.validate(id, password)).toBe(false);
});
