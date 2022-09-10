var cron = require("node-cron");

module.exports = async () => {
  //hourly
  await require("./scTimings/hourly")();
  await cron.schedule("50 * * * *", async () => {
    await require("./scTimings/hourly")();
  });
  //daily
  await cron.schedule("1 0 * * *", async () => {
    await require("./scTimings/daily")();
  });
  //weekly
  await cron.schedule("10 0 * * 0", async () => {
    await require("./scTimings/weekly")();
  });
  //monthly
  await cron.schedule("20 0 1 * *", async () => {
    await require("./scTimings/monthly")();
  });
};
