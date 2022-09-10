module.exports = async (req, res) => {
  await res.render("home", { error: "Please Enter A Guild Name.", input: "" });
   await require("../utilities/functions/updRequest")("/track");
};
