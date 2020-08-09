export async function sendOtp(phoneNumber) {
  const url = new URL("http://localhost:5000/subscribe");
  const params = {
    phoneNumber
  };
  url.search = new URLSearchParams(params).toString();
  const response = await fetch(url);

  const json = await response.json();

  if (json.error) throw json.error;
  return json.otpId;
}

export async function verifyOtp(id, otp) {
  const response = await fetch("http://localhost:5000/validate", {
    method: "POST",
    body: JSON.stringify({
      id,
      otp
    }),
    headers: {
      "Content-Type": "application/json"
      // 'Content-Type': 'application/x-www-form-urlencoded',
    }
  });
  const json = await response.json();
  if (json.error) throw json.error;
  return json.valid;
}
