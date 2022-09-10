const get = require("node-fetch2");
const axios = require("axios");
const key = process.env.key


exports.fetchP = async (player) => {
  try {
    response = await axios.get(`https://api.ngmc.co/v1/players/${player}`, {
      headers: { Authorization: key, "Content-Type": "application/json" },
    });
    return response.data;
  } catch (err) {
    if (err.response) {
      return {
        error: true,
        data: err.response.data,
      };
    } else {
      console.log({
        error: true,
      });
      return {
        error: true,
      };
    }
  }
};

exports.fetchG = async (guild) => {
  try {
    response = await axios.get(`https://api.ngmc.co/v1/guilds/${guild}`, {
      headers: { Authorization: key, "Content-Type": "application/json" },
      params: { expand: true, withStats: true,withOnline: false },
    });
    return response.data;
  } catch (err) {
    if (err.response) {
      return {
        error: true,
        data: err.response.data,
      };
    } else {
      console.log({
        error: true,
      });
      return {
        error: true,
      };
    }
  }
};

exports.fetchGB = async (list) => {
  try {
    data = await get("https://api.ngmc.co/v1/guilds/batch", {
      headers: {
        Authorization: key,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ names: list, expand: true, withStats: true,withOnline: false }),
      method: "POST",
    });
    data = await data.json();
    return data;
  } catch (err) {
    if (!err.response) {
      console.log("x")

      return {
        error: true,
        data: "Api Offline"
      }

    }else{
    console.log({
      error: true,
      data: err.response.data,
    });
    return {
      error: true,
      data: err.response.data,
    };
  }
  
  }
};

exports.fetchGG = async (x) => {
  try {
    response = await axios.get(
      `https://api.ngmc.co/v1/guilds?withStats=true&withOnline=false&expand=true&first=100${x}`,
      {
        headers: { Authorization: key, "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (err) {
    console.log({
      error: true,
      data: err.response.data,
      test: "yes"
    });
    return {
      error: true,
      data: err.response.data,
    };
  }
};
