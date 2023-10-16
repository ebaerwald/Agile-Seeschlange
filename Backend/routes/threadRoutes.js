const express = require("express");
const router = express.Router();
const {
  createThread,
  deleteThread,
  modifyThread,
  getThreadWithAnswers,
  getThreads,
} = require("../controller/threadController");

router.route("/thread").post(createThread); //Ready and Tested
router.route("/thread/:id").delete(deleteThread); //Ready and Tested
router.route("/thread/:id").put(modifyThread); // Ready and Tested
router.route("/thread/:id").get(getThreadWithAnswers);
router.route("/threads").get(getThreads); //Ready and Tested

module.exports = router;
