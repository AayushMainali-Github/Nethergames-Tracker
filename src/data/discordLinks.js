links = {
  Clover: "https://discord.gg/bhRCDJm57W",
  "HUNTER SQUAD": "https://discord.gg/5N8mYRKzcK",
  Formula:"https://discord.gg/JX3U7tGbcf",
 Cosmic:"https://discord.gg/J3cdzeEM2p",
  Empire:"https://discord.gg/ndkMvnpJEE",
  Hackusated:"https://discord.gg/m6EFSEtFqd",
  HikClient: "https://discord.gg/vTEVjbpxaq",
  ZER0:"https://discord.gg/ux99ST8xKG",
  Riserz:"https://discord.gg/HdWem6EJDq",
  TeamMonty:"https://discord.gg/RtQ62jRKfA",
  "Krypto II": "https://discord.gg/EGSt7SYTCz"
};

module.exports = async (Name) => {
  if (links[Name]) {
    return links[Name];
  } else {
    return "null";
  }
};
