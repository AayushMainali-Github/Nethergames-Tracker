module.exports = async (guild) => {
  data = await require("../fetchapi").fetchG(guild);
  if (data.error) return data;
  gName = data.name;
  check = await require("./checkDb")(data.name);

  if (check.error == true)
    return {
      error: true,
      data: { message: "Guild is already being tracked." },
      name: check.name,
    };
  if (check == true) return { t: true, name: gName };
  else return false;
};
