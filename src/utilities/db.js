const mongoose = require("mongoose");

exports.connectDB = async (link) => {
  await mongoose.connect(link);
  console.log(`Connected to Database!`);
};

const playerSchema = new mongoose.Schema({
  data: {},
  name: String,
});
const player = mongoose.model("player", playerSchema);

exports.addPl = async (data, Name) => {
  const newP = new player({
    data: data,
    name: Name,
  });
  await newP.save();
  console.log(`Added ${Name} to the Database.`);
};

exports.getOneStats = async (Name) => {
  const doc = await player.findOne({ name: Name });
  console.log(`Fetched ${Name} from the Database.`);
  if (doc == null) return null;
  else return doc;
};

exports.updatePl = async (data, Name) => {
  // console.log(Name);
  res = await player.updateOne(
    { name: Name },
    {
      data: data,
      name: Name,
    }
  );
  console.log(`Updated ${Name} in the Database.`);
};

exports.plList = async () => {
  const doc = await player.find();
  if (doc == null) return null;
  l1 = [];
  for (i = 0; i < doc.length; i++) {
    l1.push(doc[i].name);
  }
  console.log(`Fetched guilds list from the Database.`);
  return l1;
};

exports.allDoc = async () => {
  const doc = await player.find();
  if (doc == null) return null;
  console.log(`Fetched all guilds from the Database.`);
  return doc;
};

//req
const reqSc = new mongoose.Schema({
  endpoint: String,
  requests: Number,
});

const req = mongoose.model("request", reqSc);

exports.addE = async (Name) => {
  const newP = new req({
    endpoint: Name,
    requests: 1,
  });
  await newP.save();
};

exports.getOneReq = async (Name) => {
  const doc = await req.findOne({ endpoint: Name });
  if (doc == null) return null;
  else return doc;
};

exports.updateReq = async (Name, n) => {
  res = await req.updateOne(
    { endpoint: Name },
    {
      endpoint: Name,
      requests: n,
    }
  );
};

//lbs
const lbsSc = new mongoose.Schema({
  data: {},
  id: String,
});

const lbs = mongoose.model("leaderboard", lbsSc);

exports.addL = async (id, data) => {
  const newP = new lbs({
    data: data,
    id: id,
  });
  await newP.save();
  console.log("Leaderboards added");
};

exports.getOneLbs = async (Name) => {
  const doc = await lbs.findOne({ id: Name });
  console.log("Leaderboards fetched.");
  if (doc == null) return null;
  else return doc;
};

exports.updateLbs = async (Name, n) => {
  res = await lbs.updateOne(
    { id: Name },
    {
      data: n,
      id: Name,
    }
  );
  console.log("Leaderboards updated");
};
