module.exports = async () => {
  rD1 = [];
  iData = await require("../fetchapi").fetchGG("");
  if (iData.error) {
    console.log(iData);
    console.log("An error occured while fetching data from api.");
    return iData;
  }
  eyy = true;
  while (eyy != false) {    if (iData.pageInfo.hasNextPage == false) eyy = false;
    endC = iData.pageInfo.endCursor;
                        for (i = 0; i < iData.nodes.length; i++) {
      rD1.push(iData.nodes[i]);
    }
    iData = await require("../fetchapi").fetchGG(`&after=${endC}`);
    if (iData.error) {
      console.log(iData);
      console.log("An error occured while fetching data from api.");
      return iData;
    }
  }
  return rD1;
};
