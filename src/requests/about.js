module.exports = async (req, res) => {
  await res.render("about", {});
  await require("../utilities/functions/updRequest")("/about");
};
