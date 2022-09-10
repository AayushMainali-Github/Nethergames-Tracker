module.exports = async (list) => {
  x = list.length / 100;
  if (x.toFixed(0) != x) x = Math.floor(x + 1);
  fd5 = [];
  for (i = 0; i < x; i++) {
    d = await require("../fetchapi").fetchGB(
      list.slice(i * 100, i * 100 + 100)
    );
    if (d.error) {
      console.log(d);
      console.log("An error occured while fetching data from api.");
      return d;
    }
    for (j = 0; j < d.length; j++) {
      fd5.push(d[j]);
    }
  }
  return fd5;
};
