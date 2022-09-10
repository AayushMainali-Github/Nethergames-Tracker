module.exports = async (req, res) => {
     await require("../utilities/functions/updRequest")("/guild:name");
  g = req.url.slice(7);
  data = await require("../utilities/fetchapi").fetchG(g);
  if (data.error) {
    if (data.data.code == 10006) {
      return await res.render("home", {
        error: `Guild named ${g} doesn't exist.`,
        input: "",
      });
    } else {
      return await res.render("home", {
        error: data.data.message,
        input: "",
      });
    }
  }
  g = data.name;
  fData0 = data;
  check = await require("../utilities/functions/checkDb2")(g);
  if (check.error)
    return res.render("home", {
      error: check.message,
      input: g,
    });

  fData1 = await require("../utilities/functions/fetchToDb")(fData0);
  finalData = await require("../data/stats")(fData1, check, fData0);

  await res.render("stats", finalData);

};
