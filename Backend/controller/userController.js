const User = require("../mongoDB/UserSchema");
const responseMgt = require("../helper/responseMgt");

//user signup
exports.signup = async (req, res, next) => {
  try {
    const { email, name, passwordHash, lastName } = req.body;
    //check if empty
    if (!email || !passwordHash) {
      throw new Error("Please fill all the fields");
    }

    const user = await User.create({
      name,
      email,
      passwordHash,
      lastName,
    });
    user.save();
    if (user) {
      responseMgt.success(user, res);
      console.log(`created User:${user._id}`);
    } else {
      responseMgt.faild(user, res);
    }
  } catch (err) {
    res.status(500).send(err);
  }
};
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
    }
  } catch (err) {
    throw new Error(err, res);
  }
};
exports.delet = async (req, res, next) => {
  try {
    const { email, passwordHash } = req.body;

    if (!email || !passwordHash) {
      res.status(401).send("Please provide email and password");
      console.log("Unauthoriced login");
    } else {
      const user = await User.findOneAndUpdate(
        { email, passwordHash },
        {
          isActive: false,
        },
        { new: true }
      );
      if (user) {
        responseMgt.success(user, res);
        console.log(`Deactivated User:${user._id}`);
      } else {
        responseMgt.faild(user, res);
      }
    }
  } catch (err) {
    throw new Error(err, res);
  }
};
