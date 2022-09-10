module.exports = async (g) => {
  data = await require("../db").getOneStats(g);
  if (data == null)
    return {
      error: true,
      message: `Guild named ${g} is not being tracked. Click the "Track" button to track the guild.`,
    };
  return data.data;
};
