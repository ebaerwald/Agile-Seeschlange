const express = require("express");
const router = express.Router();
const {
  createTag,
  deleteTag,
  modifyTag,
  getTag,
} = require("../controller/tagController");

router.route("/tag").post(createTag); //Ready and Tested
router.route("/tag/:id").delete(deleteTag); //Ready and Tested
router.route("/tag/:id").put(modifyTag); //Ready and Tested
router.route("/tag/:id").get(getTag); //Ready and Tested

module.exports = router;
