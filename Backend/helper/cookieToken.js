const getJwtToken = require("./getJwtToken");

const cookieToken = (email, username, userId, res) => {
  const token = getJwtToken(email);
  const options = {
    expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  //has to be undefined otherwise the password will be visible
  res.status(200).json({
    success: true,
    token: token,
    user: userId,
  });
};

module.exports = cookieToken;
