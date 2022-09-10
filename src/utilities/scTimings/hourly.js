module.exports = async () => {
  console.log('Hourly Schedule Started.')
  tm = ["daily", "weekly", "monthly"];
  gm = ["gxp", "wins", "kills", "deaths", "losses", "credits", "xp"];
  list = await require("../functions/hourlyFetch")();
  if (list.error) return;
  list2 = [];
  dbData = await require("../db").allDoc();
  dbData1 = {};
  for (i = 0; i < dbData.length; i++) {
    list2.push(dbData[i].name);
    dbData1[dbData[i].name] = dbData[i].data;
  }
  if (list.length < 1)
    return console.log("An error occured while fetching data from api");
  uc = 0;
  fbData = list;
  console.log(fbData.length);
  if (fbData.error) return;
  lbs = {
    guild: {
      daily: {
        gxp: [],
        wins: [],
        kills: [],
        deaths: [],
        losses: [],
        credits: [],
        xp: [],
      },
      weekly: {
        gxp: [],
        wins: [],
        kills: [],
        deaths: [],
        losses: [],
        credits: [],
        xp: [],
      },
      monthly: {
        gxp: [],
        wins: [],
        kills: [],
        deaths: [],
        losses: [],
        credits: [],
        xp: [],
      },
    },
    player: {
      daily: {
        gxp: [],
        wins: [],
        kills: [],
        deaths: [],
        losses: [],
        credits: [],
        xp: [],
      },
      weekly: {
        gxp: [],
        wins: [],
        kills: [],
        deaths: [],
        losses: [],
        credits: [],
        xp: [],
      },
      monthly: {
        gxp: [],
        wins: [],
        kills: [],
        deaths: [],
        losses: [],
        credits: [],
        xp: [],
      },
    },
  };
  for (k = 0; k < fbData.length; k++) {
    if (list2.includes(fbData[k].name)) {
      dts = {
        daily: {
          gxp: 0,
          wins: 0,
          kills: 0,
          deaths: 0,
          losses: 0,
          credits: 0,
          xp: 0,
        },
        weekly: {
          gxp: 0,
          wins: 0,
          kills: 0,
          deaths: 0,
          losses: 0,
          credits: 0,
          xp: 0,
        },
        monthly: {
          gxp: 0,
          wins: 0,
          kills: 0,
          deaths: 0,
          losses: 0,
          credits: 0,
          xp: 0,
        },
      };
      ch = "";
      fd1 = await require("../functions/fetchToDb")(fbData[k]);
      db12 = dbData1[fbData[k].name];
      l1 = Object.keys(dbData1[fbData[k].name]);
      l2 = Object.keys(fd1);
      for (j = 0; j < l1.length; j++) {
        if (!l2.includes(l1[j])) {
          ch = true;
          delete db12[l1[j]];
          console.log(
            `Removed ${l1[j]} (${fbData[k].name}) from the database.`
          );
        } else {
          for (xx = 0; xx < tm.length; xx++) {
            for (xy = 0; xy < gm.length; xy++) {
              dts[tm[xx]][gm[xy]] =
                dts[tm[xx]][gm[xy]] +
                (fd1[l1[j]][gm[xy]] -
                  dbData1[fbData[k].name][l1[j]][tm[xx]][gm[xy]]);
              lbs.player[tm[xx]][gm[xy]].push([
                l1[j],
                fd1[l1[j]][gm[xy]] -
                dbData1[fbData[k].name][l1[j]][tm[xx]][gm[xy]],
              ]);
            }
          }
        }
      }

      for (j = 0; j < l2.length; j++) {
        if (!l1.includes(l2[j])) {
          ch = true;
          db12[l2[j]] = {
            daily: fd1[l2[j]],
            weekly: fd1[l2[j]],
            monthly: fd1[l2[j]],
          };
          console.log(`Added ${l2[j]} (${fbData[k].name}) to the database.`);
        }
      }
      if (ch == true) {
        await require("../db").updatePl(db12, fbData[k].name);
        uc++;
      }
      for (xx = 0; xx < tm.length; xx++) {
        for (xy = 0; xy < gm.length; xy++) {
          lbs.guild[tm[xx]][gm[xy]].push([fbData[k].name, dts[tm[xx]][gm[xy]]]);
        }
      }
    } else {
      fd1 = await require("../functions/fetchToDb")(fbData[k]);
      l1 = Object.keys(fd1);
      db12 = {};
      for (j = 0; j < l1.length; j++) {
        db12[l1[j]] = {
          daily: fd1[l1[j]],
          weekly: fd1[l1[j]],
          monthly: fd1[l1[j]],
        };
      }
      x = await require("../db").getOneStats(fbData[k].name);
      if (x == null) {
        await require("../db").addPl(db12, fbData[k].name);
      }
    }
  }
  function Comparator(a, b) {
    if (a[1] < b[1]) return 1;
    if (a[1] > b[1]) return -1;
    return 0;
  }
  for (xx = 0; xx < tm.length; xx++) {
    for (xy = 0; xy < gm.length; xy++) {
      lbs.guild[tm[xx]][gm[xy]].sort(Comparator);
      lbs.guild[tm[xx]][gm[xy]] = lbs.guild[tm[xx]][gm[xy]].slice(0, 50);
      lbs.player[tm[xx]][gm[xy]].sort(Comparator);
      lbs.player[tm[xx]][gm[xy]] = lbs.player[tm[xx]][gm[xy]].slice(0, 50);
    }
  }
  await require("../functions/lbs")(lbs);
  console.log(`Hourly schedule completed. Affected ${uc} guilds.`);
};
