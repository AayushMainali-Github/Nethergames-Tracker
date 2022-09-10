module.exports = async (d1) => {
  d11 = [
    [
      d1.leader.name,
      d1.leader.wins,
      d1.leader.kills,
      d1.leader.deaths,
      d1.leader.losses,
      d1.leader.credits,
      d1.leader.xp,
      d1.leader.winsData.BW +
        d1.leader.winsData.SW +
        d1.leader.winsData.TB +
        d1.leader.winsData.CQ +
        d1.leader.winsData.SG,
      d1.leader.winsData.BW,
      d1.leader.winsData.SW,
      d1.leader.winsData.TB,
      d1.leader.winsData.CQ,
      d1.leader.winsData.SG,
      d1.leader.winsData.Duels,
    ],
  ];
  d1.officers.forEach((e) => {
    d11.push([
      e.name,
      e.wins,
      e.kills,
      e.deaths,
      e.losses,
      e.credits,
      e.xp,
      e.winsData.BW +
        e.winsData.SW +
        e.winsData.TB +
        e.winsData.CQ +
        e.winsData.SG,
      e.winsData.BW,
      e.winsData.SW,
      e.winsData.TB,
      e.winsData.CQ,
      e.winsData.SG,
      e.winsData.Duels,
    ]);
  });
  d1.members.forEach((e) => {
    d11.push([
      e.name,
      e.wins,
      e.kills,
      e.deaths,
      e.losses,
      e.credits,
      e.xp,
      e.winsData.BW +
        e.winsData.SW +
        e.winsData.TB +
        e.winsData.CQ +
        e.winsData.SG,
      e.winsData.BW,
      e.winsData.SW,
      e.winsData.TB,
      e.winsData.CQ,
      e.winsData.SG,
      e.winsData.Duels,
    ]);
  });
  function Comparator(a, b) {
    if (a[0].toUpperCase() < b[0].toUpperCase()) return -1;
    if (a[0].toUpperCase() > b[0].toUpperCase()) return 1;
    return 0;
  }
  d11.sort(Comparator);

  dobj = {};
  for (i = 0; i < d11.length; i++) {
    dobj[d11[i][0]] = {
      wins: d11[i][1],
      kills: d11[i][2],
      deaths: d11[i][3],
      losses: d11[i][4],
      credits: d11[i][5],
      xp: d11[i][6],
      gxp: d11[i][7] * 10,
      bw: d11[i][8],
      sw: d11[i][9],
      tb: d11[i][10],
      cq: d11[i][11],
      sg: d11[i][12],
      duels: d11[i][13],
    };
  }

  return dobj;
};
