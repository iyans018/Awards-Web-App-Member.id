const mongoose = require("mongoose");
const { DB_URI } = require("../config");

module.exports = async() => {
  try {
    console.log(DB_URI);
    await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Db Connected');
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};