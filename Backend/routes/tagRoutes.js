const express = require("express");
const router = express.Router();
const {
  createTag,
  deleteTag,
  modifyTag,
  getTag,
} = require("../controller/tagController");

router.route("/tag").post(createTag); 
router.route("/tag/:id").delete(deleteTag); 
router.route("/tag/:id").put(modifyTag); 
router.route("/tag/:id").get(getTag); 

module.exports = router;
