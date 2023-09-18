const jwt = require("jsonwebtoken");

const getJwtToken = (userId) => {
  return jwt.sign({ userId: userId }, process.env.JWT_SECRET, {
    expiresIn: "4h",
  });
};

module.exports = getJwtToken;
