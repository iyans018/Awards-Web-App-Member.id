const dotEnv = require("dotenv");

dotEnv.config();
  
module.exports = {
    PORT: process.env.PORT,
    DB_URI: process.env.DB_URI,
    SECRET_KEY: process.env.SECRET_KEY,
    EXPIRED_TOKEN: process.env.EXPIRED_TOKEN
}