module.exports = async (fData, dbData, oData) => {
  avData = {};
  avData[oData.leader.name] = oData.leader.avatar;
  for (i = 0; i < oData.officers.length; i++) {
    avData[oData.officers[i].name] = oData.officers[i].avatar;
  }
  for (i = 0; i < oData.members.length; i++) {
    avData[oData.members[i].name] = oData.members[i].avatar;
  }
  rData = {
    name: oData.name,
    tagColor: oData.tagColor,
    data: {},
  };
  fList = Object.keys(fData);
  dList = Object.keys(dbData);

  for (i = 0; i < fList.length; i++) {
    if (dList.includes(fList[i])) {
      rData.data[fList[i]] = {
        av: avData[fList[i]],
        daily: {
          wins: fData[fList[i]].wins - dbData[fList[i]].daily.wins,
          kills: fData[fList[i]].kills - dbData[fList[i]].daily.kills,
          deaths: fData[fList[i]].deaths - dbData[fList[i]].daily.deaths,
          losses: fData[fList[i]].losses - dbData[fList[i]].daily.losses,
          credits: fData[fList[i]].credits - dbData[fList[i]].daily.credits,
          xp: fData[fList[i]].xp - dbData[fList[i]].daily.xp,
          gxp: fData[fList[i]].gxp - dbData[fList[i]].daily.gxp,
        },
        weekly: {
          wins: fData[fList[i]].wins - dbData[fList[i]].weekly.wins,
          kills: fData[fList[i]].kills - dbData[fList[i]].weekly.kills,
          deaths: fData[fList[i]].deaths - dbData[fList[i]].weekly.deaths,
          losses: fData[fList[i]].losses - dbData[fList[i]].weekly.losses,
          credits: fData[fList[i]].credits - dbData[fList[i]].weekly.credits,
          xp: fData[fList[i]].xp - dbData[fList[i]].weekly.xp,
          gxp: fData[fList[i]].gxp - dbData[fList[i]].weekly.gxp,
        },
        monthly: {
          wins: fData[fList[i]].wins - dbData[fList[i]].monthly.wins,
          kills: fData[fList[i]].kills - dbData[fList[i]].monthly.kills,
          deaths: fData[fList[i]].deaths - dbData[fList[i]].monthly.deaths,
          losses: fData[fList[i]].losses - dbData[fList[i]].monthly.losses,
          credits: fData[fList[i]].credits - dbData[fList[i]].monthly.credits,
          xp: fData[fList[i]].xp - dbData[fList[i]].monthly.xp,
          gxp: fData[fList[i]].gxp - dbData[fList[i]].monthly.gxp,
        },
      };
    }
  }

  link = await require("./discordLinks")(oData.name);
  rData.link = link;
  return rData;
};