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

router.route("/group").post(createGroup); 
router.route("/group/:id").delete(deleteGroup); 
router.route("/group/:id").put(modifyGroup); 
router.route("/addUserToGroup").post(addUserToGroup); 
router.route("/deleteUserFromGroup").delete(deleteUserFromGroup); 
router.route("/addTagToGroup").post(addTagToGroup); 
router.route("/deleteTagFromGroup").delete(deleteTagFromGroup); 
router.route("/getGroup/:id").get(getGroup); 
router.route("/getGroups").get(getGroups); 

module.exports = router;
