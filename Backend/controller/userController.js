const User = require("../mongoDB/UserSchema");
const Thread = require("../mongoDB/ThreadSchema");
const responseMgt = require("../helper/responseMgt");

//user signup
exports.signup = async (req, res, next) => {
  try {
    const { name, email, googleUserId, lastName } = req.body;
    //check if empty
    if (!email || !googleUserId) {
      throw new Error("Please fill all the fields");
    }
    const user = await User.create({
      name,
      email,
      googleUserId,
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
exports.delet = async (req, res, next) => {
  try {
    const { googleUserId } = req.body;

    if (!googleUserId) {
      res.status(401).send("Please provide email and password");
      console.log("Unauthoriced login");
    } else {
      const user = await User.findOneAndUpdate(
        { googleUserId },
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
exports.updateUser = async (req, res, next) => {
  try {
    const { userObject } = req.body;

    if (!userObject.googleUserId) {
      res.status(401).send("Please provide email and password");
      console.log("Unauthoriced login");
    } else {
      const user = await User.findOneAndUpdate(
        { googleUserId: userObject.googleUserId },
        { name: userObject.name, email: userObject.email },
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
exports.addfavoritequestion = async (req, res, next) => {
  try {
    const { userObject, threadId } = req.body;

    if (!userObject.googleUserId) {
      res.status(401).send("Please provide email and password");
      console.log("Unauthoriced login");
    } else {
      const user = await User.findOne({
        googleUserId: userObject.googleUserId,
      });
      const currentThread = await Thread.findById(threadId);
      user.favoriteThreads.push(currentThread._id);
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
exports.getUserIniformation = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(401).send("Please provide the Google User ID");
      console.log("Fiald to get User bc of missing Google User ID");
    } else {
      const user = await User.findOne(id);
      if (user) {
        responseMgt.success(user, res);
        console.log(`User Get:${user._id}`);
      } else {
        responseMgt.faild(user, res);
      }
    }
  } catch (err) {
    throw new Error(err, res);
  }
};
