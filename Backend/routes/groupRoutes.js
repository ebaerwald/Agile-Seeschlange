const express = require("express");
const router = express.Router();
const {
  createGroup,
  deleteGroup,
  modifyGroup,
  addUserToGroup,
  deleteUserFromGroup,
  addTagToGroup,
  deleteTagFromGroup,
  getGroup,
  getGroups,
} = require("../controller/groupController");

router.route("/group").post(createGroup); //Ready and Tested
router.route("/group/:id").delete(deleteGroup); //Ready and Tested
router.route("/group/:id").put(modifyGroup); //Ready and Tested
router.route("/addUserToGroup").post(addUserToGroup); //Ready and Tested
router.route("/deleteUserFromGroup").delete(deleteUserFromGroup); //Ready and Tested
router.route("/addTagToGroup").post(addTagToGroup); //Ready and Tested
router.route("/deleteTagFromGroup").delete(deleteTagFromGroup); //Ready and Tested
router.route("/getGroup/:id").get(getGroup); //Ready and Tested
router.route("/getGroups").get(getGroups); //Ready and Tested

module.exports = router;
