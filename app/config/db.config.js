module.exports = {
  HOST: "25.5.74.72",
  USER: "universidad",
  PASSWORD: "rootadmin",
  DB: "XEPDB1",
  dialect: "oracle",
  port: 1525,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
