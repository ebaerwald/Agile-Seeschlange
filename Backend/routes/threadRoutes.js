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

router.route("/thread").post(createThread); 
router.route("/thread/:id").delete(deleteThread); 
router.route("/thread/:id").put(modifyThread);
router.route("/thread/like/:id").post(likeThread); 
router.route("/thread/dislike/:id").post(dislikeThread); 
router.route("/thread/:id").post(getThreadWithAnswers); 
router.route("/threads").get(getThreads);

module.exports = router;
