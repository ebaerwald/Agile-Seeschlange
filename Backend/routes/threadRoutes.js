const express = require("express");
const router = express.Router();
const {
  createThread,
  deleteThread,
  modifyThread,
  getThreadWithAnswers,
  getThreads,
  likeThread,
  dislikeThread,
} = require("../controller/threadController");

router.route("/thread").post(createThread); //Ready and Tested
router.route("/thread/:id").delete(deleteThread); //Ready and Tested
router.route("/thread/:id").put(modifyThread); // Ready and Tested
router.route("/thread/like/:id").post(likeThread); // Ready and Tested
router.route("/thread/dislike/:id").post(dislikeThread); // Ready and Tested
router.route("/thread/:id").post(getThreadWithAnswers); //Ready and Tested
router.route("/threads").get(getThreads); //Ready and Tested

module.exports = router;
