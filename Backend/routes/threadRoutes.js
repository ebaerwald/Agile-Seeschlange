const express = require("express");
const router = express.Router();
const {
  createThread,
  deleteThread,
  modifyThread,
  getThreadWithAnswers,
  getThreads,
} = require("../controller/threadController");

router.route("/thread").post(createThread);
router.route("/thread/:id").delete(deleteThread);
router.route("/thread/:id").put(modifyThread);
router.route("/thread/:id").get(getThreadWithAnswers);
router.route("/threads/:id").get(getThreads);

module.exports = router;
