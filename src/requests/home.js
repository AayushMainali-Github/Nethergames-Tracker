module.exports = async (req, res) => {
  await res.render("home", { error: "", input: "" });
   await require("../utilities/functions/updRequest")("/home");
};
