module.exports = async (guild) => {
  dbData = await require("../db").getOneStats(guild);

  if (dbData == null) {
    fData = await require("../fetchapi").fetchG(guild);
    if (fData.error) {
      console.log(
        `An error occured while fetching data from the NetherGames Api. (${fData.data.message})`
      );
      return fData;
    }
    fData = await require("./fetchToDb")(fData);
    fList = Object.keys(fData);
    data = {};
    for (i = 0; i < fList.length; i++) {
      data[fList[i]] = {
        daily: fData[fList[i]],
        weekly: fData[fList[i]],
        monthly: fData[fList[i]],
      };
    }
    await require("../db").addPl(data, guild);
    return true;
  } else {
    return {
      error: true,
      name: dbData.name,
    };
  }
};
