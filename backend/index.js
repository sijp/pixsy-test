const express = require("express");
const CORS = require("cors");
const AWS = require("aws-sdk");
const bodyParser = require("body-parser");
require("dotenv").config();

const otp = require("./src/otp/otp");

const app = express();

AWS.config.update({ region: "us-east-1" });
app.use(express.json());
app.use(CORS());

app.post("/validate", async (req, res) => {
  console.log(req.body);

  const { id, otp: password } = req.body;

  const valid = await otp.validate(id, password);
  res.send({ valid });
});

app.get("/subscribe", async (req, res) => {
  const { phoneNumber } = req.query;
  const { id: otpId } = await otp.publish(phoneNumber);

  res.send({ otpId });
});

const port = 5000;

app.listen(port, () => {
  console.log(`Listening to ${port}`);
});
