module.exports = async (req, res) => {
  await require("../utilities/functions/updRequest")("/track:name");
  g = req.url.slice(7);
  x = await require("../utilities/functions/trackGuild")(g);
  if (x.error == true) {
    if (x.data.code) {
      if (x.data.code == 10006) {
        return await res.render("home", {
          error: `Guild named ${g} doesn't exist.`,
          input: "",
        });
      } else {
        return await res.render("home", {
          error: x.data.message,
          input: "",
        });
      }
    } else if (x.data.message) {
      return await res.render("home", {
        error: `Guild named ${x.name} is already being tracked. Click the "Get Stats" button to check stats of the guild`,
        input: x.name,
      });
    }
  } else if (x.t == true) {
    return res.render("home", {
      error: `Guild named ${x.name} is successfully being tracked. Click the "Get Stats" button to check stats of the guild`,
      input: x.name,
    });
  }
   
};
