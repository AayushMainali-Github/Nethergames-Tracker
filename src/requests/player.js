module.exports = async (req, res) => {
    await require("../utilities/functions/updRequest")("/player:name");
    p = req.url.slice(8);
    data = await require('../utilities/fetchapi').fetchP(p)
    if (data.error) {
        if (data.data.code == 10012) return await res.render('playerName', { error: "UN", data: {} })
        else return await res.render('playerName', { error: "SE", data: {} })
    }
    if (data.guild == null) return await res.render('playerName', { error: "NG", data: {} })
    dbData = await require('../utilities/db').getOneStats(data.guild)
    if (dbData == null) return await res.render('playerName', { error: "NG", data: {} })
    if (!dbData.data[data.name]) return await res.render('playerName', { error: "NG", data: {} })
    plD = dbData.data[data.name]
    tm = Object.keys(plD)
    tp = Object.keys(plD.daily)
    finalData = {
        daily: {},
        weekly: {},
        monthly: {},
        others: {
            avatar: data.avatar,
            name: data.name
        }
    }
    data1 = await require('../utilities/functions/fetchToDb2')(data)
    for (i = 0; i < tm.length; i++) {
        for (j = 0; j < tp.length; j++) {
            finalData[tm[i]][tp[j]] = data1[tp[j]] - plD[tm[i]][tp[j]]
        }
    }
    return await res.render('playerName', { error: "AG", data: finalData })
};
