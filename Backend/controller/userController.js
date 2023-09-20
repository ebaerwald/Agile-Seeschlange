const User = require("../mongoDB/UserSchema");
const cookieToken = require("../helper/cookieToken");

//user signup
exports.signup = async (req, res, next) => {
  try {
    const { email, name, passwordHash: passwordHash, lastName } = req.body;
    //check if empty
    if (!email || !passwordHash) {
      throw new Error("Please fill all the fields");
    }

    const user = await User.create({
      name,
      email,
      passwordHash: passwordHash,
      lastName,
    });
    user.save();
    console.log(`created User:${user}`);

    //send the user the token
    cookieToken(user.email, user.name, user._id, res);
  } catch (err) {
    res.status(500).send(err);
  }
};

//User login
exports.login = async (req, res, next) => {
  try {
    //get User information
    const { email, passwordHash: passwordHash } = req.body;

    if (!email || !passwordHash) {
      res.status(401).send("Please provide email and password");
      console.log("Unauthoriced login");
    } else {
      //find user by email

      const user = await User.findOne({ email, passwordHash: passwordHash });
      console.log(`user: ${user.email} loggged in`);

      //wrong credentials
      if (!user) {
        throw new Error("No user found with this email");
      }
      cookieToken(user.email, user.name, user._id, res);
    }
  } catch (err) {
    throw new Error(err, res);
  }
};
