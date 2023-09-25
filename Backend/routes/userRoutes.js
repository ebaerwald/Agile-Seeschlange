const express = require("express");
const router = express.Router();
const { signup, login, delet } = require("../controller/userController");

router.route("/signup").post(signup); //Ready and Teste
router.route("/login").post(login);
router.route("/delete").delete(delet);

module.exports = router;
