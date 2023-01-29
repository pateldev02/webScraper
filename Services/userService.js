var db = require("../Models/index.js");

var User = require("../Models/registrationModel.js");

createNewAdmin = (admin) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.User.create(admin);
      resolve("Done");
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createNewAdmin,
};
