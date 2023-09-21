const express = require("express");
const router = express.Router();
const {
  createTag,
  deleteTag,
  modifyTag,
} = require("../controller/tagController");

router.route("/tag").post(createTag);
router.route("/tag/:id").delete(deleteTag);
router.route("/tag/:id").put(modifyTag);

module.exports = router;
