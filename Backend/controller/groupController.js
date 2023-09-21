const Group = require("../mongoDB/groupSchema");
const responseMgt = require("../helper/responseMgt");

exports.createGroup = async (req, res, next) => {
  try {
    const { name, description, tags, userIds, groupOwner } = req.body;
    console.log(req.body);
    //check if empty
    if (!name || !groupOwner) {
      responseMgt.faild("name or groupOwner are empty", res);
    }

    const group = await Group.create({
      name,
      description,
      tags,
      userIds,
      groupOwner,
    });
    group.save();
    console.log(`created Group:${name}`);
    responseMgt.succes(name, res);
  } catch (err) {
    console.error(err);
  }
};
exports.deleteGroup = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      responseMgt.faild("No ID provided", res);
    }
    const deletedGroup = await Group.findByIdAndRemove(id);
    if (deletedGroup) {
      responseMgt.succes(deletedGroup, res);
    } else {
      responseMgt.faild(deletedGroup, res);
    }
  } catch (err) {
    throw new Error(err, res);
  }
};
exports.modifyGroup = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, tags, userIds, groupOwner } = req.body;
    console.log(id);
    if (!id) {
      responseMgt.faild("No ID provided", res);
    }
    const modifiedGroup = await Group.findByIdAndUpdate(id, {
      name,
      description,
      tags,
      userIds,
      groupOwner,
    });
    if (modifiedGroup) {
      responseMgt.succes(modifiedGroup, res);
    } else {
      responseMgt.faild("Update failed:" + modifiedGroup, res);
    }
  } catch (err) {
    throw new Error(err, res);
  }
};
exports.addUserToGroup = async (req, res, next) => {
  try {
    const { userId, groupId } = req.body;
    console.log(userId + ":" + groupId);
    if (!userId || !groupId) {
      responseMgt.faild("No userId or groupId provided", res);
    }
    const modifiedGroup = await Group.findByIdAndUpdate(
      groupId,
      { $push: { userIds: userId } },
      { new: true },
      (err) => {
        if (err) {
          responseMgt.faild("Update failed:" + err, res);
        } else {
          responseMgt.faild("Update failed:" + err, res);
        }
      }
    );
    if (modifiedGroup) {
      responseMgt.succes(modifiedGroup, res);
    }
  } catch (err) {
    throw new Error(err, res);
  }
};
exports.deleteUserFromGroup = async (req, res, next) => {
  try {
    const { userId, groupId } = req.body;
    console.log(userId + ":" + groupId);
    if (!userId || !groupId) {
      responseMgt.faild("No userId or groupId provided", res);
    }
    const modifiedGroup = await Group.findByIdAndUpdate(
      groupId,
      { $pull: { userIds: userId } },
      { new: true },
      (err) => {
        if (err) {
          responseMgt.faild("Update failed:" + err, res);
        } else {
          responseMgt.faild("Update failed:" + err, res);
        }
      }
    );
    if (modifiedGroup) {
      responseMgt.succes(modifiedGroup, res);
    }
  } catch (err) {
    throw new Error(err, res);
  }
};
exports.addTagToGroup = async (req, res, next) => {
  try {
    const { tagId, groupId } = req.body;
    console.log(tagId + ":" + groupId);
    if (!tagId || !groupId) {
      responseMgt.faild("No tagId or groupId provided", res);
      return;
    }

    const modifiedGroup = await Group.findByIdAndUpdate(
      groupId,
      { $push: { tags: tagId } },
      { new: true },
      (err) => {
        if (err) {
          responseMgt.faild("Update failed:" + err, res);
        } else {
          responseMgt.succes(modifiedGroup, res);
        }
      }
    );
    if (modifiedGroup) {
      responseMgt.succes(modifiedGroup, res);
    }
  } catch (err) {
    throw new Error(err, res);
  }
};
exports.deleteTagFromGroup = async (req, res, next) => {
  try {
    const { tagId, groupId } = req.body;
    console.log(tagId + ":" + groupId);
    if (!tagId || !groupId) {
      responseMgt.faild("No tagId or groupId provided", res);
      return;
    }

    const modifiedGroup = await Group.findByIdAndUpdate(
      groupId,
      { $pull: { tags: tagId } },
      { new: true },
      (err) => {
        if (err) {
          responseMgt.faild("Update failed:" + err, res);
        } else {
          responseMgt.succes(modifiedGroup, res);
        }
      }
    );

    if (modifiedGroup) {
      responseMgt.succes(modifiedGroup, res);
    }
  } catch (err) {
    throw new Error(err, res);
  }
};
exports.getGroup = async (req, res, next) => {
  try {
    const { groupId } = req.params;

    const group = await Group.findById(groupId)
      .populate("userIds", "tags")
      .select("-updatedAt");

    if (!group) {
      responseMgt.faild("Group not found", res);
      return;
    }

    responseMgt.succes(group, res);
  } catch (err) {
    throw new Error(err, res);
  }
};
exports.getGroups = async (req, res, next) => {
  try {
    const groupsOverview = await Group.find({}, "_id name description");

    responseMgt.succes(groupsOverview, res);
  } catch (err) {
    responseMgt.faild("Fatal error:" + err, res);
  }
};
