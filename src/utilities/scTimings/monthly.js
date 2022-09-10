module.exports = async () => {
  console.log('Monthly Schedule Started.')
  list = [];
  dbData = await require("../db").allDoc();
  dbData1 = {};
  for (i = 0; i < dbData.length; i++) {
    list.push(dbData[i].name);
    dbData1[dbData[i].name] = dbData[i].data;
  }
  if (list.length < 1)
    return console.log("An error occured while fetching data from database");
  uc = 0;
  fbData = await require("../functions/guildBatch")(list);
  if(fbData.error) {
    return setTimeout(async ()=>{
      await require('./monthly')()
    },600000)
  }
  for (k = 0; k < fbData.length; k++) {
    fd1 = await require("../functions/fetchToDb")(fbData[k]);
    db12 = dbData1[fbData[k].name];
    db123 = {};
    l1 = Object.keys(dbData1[fbData[k].name]);
    l2 = Object.keys(fd1);
    for (i = 0; i < l1.length; i++) {
      if (l2.includes(l1[i])) {
        db123[l1[i]] = {
          daily: db12[l1[i]].daily,
          weekly: db12[l1[i]].weekly,
          monthly: fd1[l1[i]],
        };
      }
    }
    await require("../db").updatePl(db123, fbData[k].name);
  }
  console.log(`Monthly schedule completed. Affected ${fbData.length} guilds.`);
};
