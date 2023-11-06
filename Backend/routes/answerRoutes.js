const express = require("express");
const router = express.Router();
const {
  createAnswer,
  deleteAnswer,
  modifyAnswer,
} = require("../controller/answerController");

router.route("/answer").post(createAnswer); 
router.route("/answer/:id").delete(deleteAnswer); 
router.route("/answer/:id").put(modifyAnswer); 

module.exports = router;
