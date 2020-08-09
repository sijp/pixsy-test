const AWS = require("aws-sdk");
const sqlite3 = require("sqlite3");

const EXPIRE_TIME = 300 * 1000;

const db = new sqlite3.Database(":memory:");
db.serialize(() => {
  db.run(
    "CREATE TABLE otps (id INTEGER PRIMARY KEY AUTOINCREMENT, password TEXT, createdAt INTEGER)"
  );
});

function randomNumber(from, to) {
  return `${Math.floor(Math.random() * (to - from) + from)}`;
}

async function sendSMS(phoneNumber, password) {
  // Don't send SMS messages if Unit tests are running
  if (process.env.NODE_ENV === "test") return;

  return new AWS.SNS({ apiVersion: "2010-03-31" })
    .publish({
      Message: `Your OTP is ${password}`,
      PhoneNumber: phoneNumber
    })
    .promise();
}

function insertOtp(password) {
  return new Promise((resolve, reject) =>
    db.run(
      "INSERT INTO otps(password,createdAt) VALUES(?,?)",
      [password, Date.now()],
      function (err) {
        if (err) reject(err);
        resolve(this.lastID);
      }
    )
  );
}

function getOtp(id, password) {
  console.log(id, password);
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM otps", [], (err, rows) => {
      console.log(rows);
    });

    db.get(
      "SELECT * FROM otps WHERE id=? AND password=?",
      [id, password],
      (err, row) => {
        if (err) reject(err);
        console.log(row);
        resolve(row);
      }
    );
  });
}

module.exports = {
  async publish(phoneNumber) {
    const password = randomNumber(100000, 999999);
    console.log(password);

    const [otpId] = await Promise.all([
      insertOtp(password),
      sendSMS(phoneNumber, password)
    ]);

    return {
      id: otpId,
      password
    };
  },
  async validate(id, otp) {
    const result = await getOtp(id, otp);

    if (!result) return false;
    return (
      result.password === otp && result.createdAt > Date.now() - EXPIRE_TIME
    );
  }
};
