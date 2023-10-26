const express = require("express");
const router = express.Router();
const {
  signup,
  delet,
  getUserIniformation,
  updateUser,
  addfavoritequestion,
} = require("../controller/userController");

router.route("/user/signup").post(signup); //Ready and Teste
router.route("/user").delete(delet); //Ready and Teste
router.route("/user/:id").put(updateUser);
router.route("/user/:id").get(getUserIniformation);
router.route("/user/addfavoritequestion").put(addfavoritequestion);

module.exports = router;
