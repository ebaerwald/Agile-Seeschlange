const express = require("express");
const router = express.Router();
const {
  createThread,
  deleteThread,
  modifyThread,
} = require("../controller/threadController");

router.route("/thread").post(createThread);
router.route("/thread/:id").delete(deleteThread);
router.route("/thread/:id").put(modifyThread);

module.exports = router;
