module.exports = async (endpoint) => {
  end = await require("../db").getOneReq(endpoint);
  if (end == null) {
    await require("../db").addE(endpoint);
  } else {
    await require("../db").updateReq(endpoint, end.requests + 1);
  }
};
