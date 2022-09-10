module.exports = async (data) => {
    return {
        wins: data.wins,
        kills: data.kills,
        deaths: data.deaths,
        losses: data.losses,
        xp: data.xp,
        credits: data.credits,
        gxp: (data.winsData.BW + data.winsData.SW + data.winsData.TB + data.winsData.SG + data.winsData.CQ) * 10,
        bw: data.winsData.BW,
        sw: data.winsData.SW,
        tb: data.winsData.TB,
        cq: data.winsData.CQ,
        sg: data.winsData.SG,
        duels: data.winsData.Duels,
    }
}