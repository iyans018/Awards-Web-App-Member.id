const jwt = require("jsonwebtoken");
const { SECRET_KEY, EXPIRED_TOKEN } = require("../config");

const responseAPI = (res, status, data, message) => {
  if (status === 200 || status === 201) {
    return res.status(status).json({ success: true, data, message });
  }

  return res.status(status).json({ success: false, data, message });
}

const formatData = (status, data, message) => {
  return { status, data, message }
}

const signJWT = (payload) => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "365d" });
}

const verifyJWT = (token) => {
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    return { payload: decoded, message: 'berhasil terverifikasi' };
  } catch (error) {
    return { payload: null, message: error.message };
  }
}

module.exports = { responseAPI, formatData, signJWT, verifyJWT }