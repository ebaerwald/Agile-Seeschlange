const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  delet,
  getUserIniformation,
  updateUser,
  addfavoritequestion,
  getfavoritequestions,
  deletefavoritequestion,
} = require("../controller/userController");

router.route("/user/addfavoritequestion").put(addfavoritequestion);
router.route("/user/deletefavoritequestion").post(deletefavoritequestion);
router.route("/user/signup").post(signup); //Ready and Teste
router.route("/user/login").post(login); //Ready and Teste
router.route("/user").delete(delet); //Ready and Teste
router.route("/user/:id").put(updateUser);
router.route("/user/:id").get(getUserIniformation);
router.route("/user/favoritequestion/:id").get(getfavoritequestions);

module.exports = router;
