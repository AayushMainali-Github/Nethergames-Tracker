module.exports = async (req, res) => {
  data = await require("../utilities/db").getOneLbs("guild");
  await res.render("leaderboards", { data: data });
  await require("../utilities/functions/updRequest")("/leaderboards");
};
