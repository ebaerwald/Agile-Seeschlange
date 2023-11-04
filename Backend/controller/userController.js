const User = require("../mongoDB/UserSchema");
const Thread = require("../mongoDB/ThreadSchema");
const responseMgt = require("../helper/responseMgt");

//user signup
exports.signup = async (req, res, next) => {
  try {
    console.log(req.body);
    const { name, email, googleUserId, lastName, access_token, password } =
      req.body;
    if (!(!email || !name || !password)) {
      //if Register with email, name and password
      const user = await User.create({
        name,
        email,
        password,
      });
      user.save();
      if (user) {
        console.log(user);
        responseMgt.success(user, res);
        console.log(`created User:${user._id}`);
      } else {
        console.log("Create failed");
        responseMgt.faild(user, res);
      }
    } else if (access_token) {
      console.log("else fall");

      //if Register with Github accestoken
      const response = await fetch("https://api.github.com/user", {
        method: "GET",
        headers: {
          Authorization: `token ${access_token}`,
          Accept: "application/json",
        },
      });

      const userData = await response.json();
      const newEmail = userData.email ? userData.email : "no@email.de";
      const userExists = await User.findOne({
        googleUserId: userData.id,
      });
      if (!userExists) {
        const githubUser = await User.create({
          name: userData.login,
          email: newEmail,
          googleUserId: userData.id,
        })
        githubUser.save();
        if (githubUser) {
          console.log(githubUser);
          responseMgt.success(githubUser, res);
          console.log(`created User:${githubUser._id}`);
        } else {
          console.log("Create failed");
          responseMgt.faild(githubUser, res);
        }
      }
      else
      {
        if (userExists) {
          console.log(userExists);
          responseMgt.success(userExists, res);
          console.log(`created User:${userExists._id}`);
        } else {
          console.log("Create failed");
          responseMgt.faild(userExists, res);
        }
      }
      
    } else {
      console.log("Letzter fall");
    }
  } catch (err) {
    console.log("Catch fall");
    console.log(err);

    res.status(500).send(err);
  }
};
exports.login = async (req, res, next) => {
  try {
    console.log(req.body);
    const { name, email, access_token, password } = req.body;
    if (!(!email || !password)) {
      //Login with email and password
      const user = await User.findOne({
        email,
        password,
      });
      if (user) {
        console.log(user);
        responseMgt.success(user, res);
        console.log(`Authorized Loggin: ${user._id}`);
      } else {
        console.log("Login failed");
        responseMgt.faild(user, res);
      }
    } else if (name && password) {
      //Login with name and password
      const user = await User.findOne({
        name: name,
        password: password,
      });
      if (user) {
        console.log(user);
        responseMgt.success(user, res);
        console.log(`Authorized Loggin: ${user._id}`);
      } else {
        console.log("Login failed");
        responseMgt.faild(user, res);
      }
    } else if (!!access_token) {
      s;
      //Login with Github accestoken
      fetch("https://api.github.com/user", {
        method: "GET",
        headers: {
          Authorization: `token ${access_token}`,
          Accept: "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error(`Request failed with status: ${response.status}`);
          }
        })
        .then((userData) => {
          console.log(userData);
          async () => {
            const res = await user.signUpUser(imp, {
              name: userData.login,
              email: userData.email,
              githubId: user.hashPassword(userData.id),
            });
            if (!res) {
              setErrorMessage("GitHub LogIn failed!");
              return;
            }
          };
        })
        .catch((error) => {
          console.error("Error:", error);
        });

      const user = await User.create({
        name,
        email,
        password,
      });
      user.save();
      if (user) {
        console.log(user);
        responseMgt.success(user, res);
        console.log(`created User:${user._id}`);
      } else {
        responseMgt.faild(user, res);
      }
    } else {
      console.log("Letzter fall");
    }
  } catch (err) {
    console.log("Catch fall");
    console.log(err);
    console.log(password);

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
    console.log(req.body);

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
    const { userId: id, threadId } = req.body;

    if (!id) {
      res.status(401).send("Please provide email and password");
      console.log("Unauthoriced login");
    } else {
      await User.findByIdAndUpdate(id, {
        $pull: { favoriteThreads: threadId },
      });
      const user = await User.findByIdAndUpdate(id, {
        $push: { favoriteThreads: threadId },
      });

      if (user) {
        responseMgt.success(user, res);
        console.log(`updated Favorite QUestion User:${user._id}`);
      } else {
        responseMgt.faild(user, res);
      }
    }
  } catch (err) {
    throw new Error(err, res);
  }
};
exports.deletefavoritequestion = async (req, res, next) => {
  try {
    const { userId: id, threadId } = req.body;

    if (!id) {
      res.status(401).send("Please provide email and password");
      console.log("Unauthoriced login");
    } else {
      await User.findByIdAndUpdate(id, {
        $pull: { favoriteThreads: threadId },
      });
      if (user) {
        responseMgt.success(user, res);
        console.log(`updated Favorite QUestion User:${user._id}`);
      } else {
        responseMgt.faild(user, res);
      }
    }
  } catch (err) {
    throw new Error(err, res);
  }
};
exports.getfavoritequestions = async (req, res, next) => {
  try {
    const id = req.params.id;

    if (!id) {
      res.status(401).send("Please provide email and password");
      console.log("Unauthoriced login");
    } else {
      const user = await User.findById({
        _id: id,
      }).populate("favoriteThreads");
      if (user) {
        responseMgt.success(user.favoriteThreads, res);
        console.log(`Get favorite questen from:${user._id}`);
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
      const user = await User.findById(id);
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
