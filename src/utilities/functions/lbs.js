module.exports = async (data) => {
  x = await require("../db").getOneLbs("guild");
  if (x == null) {
    await require("../db").addL("guild", data);
  } else {
    await require("../db").updateLbs("guild", data);
  }
};
