const Group = require("../mongoDB/groupSchema");
const Tag = require("../mongoDB/TagsSchema");
const responseMgt = require("../helper/responseMgt");

exports.createGroup = async (req, res, next) => {
  try {
    const { name, description, tags, userIds, groupOwner } = req.body;
    console.log(req.body);
    let tagIDs = [];
    //check if empty
    if (!name || !groupOwner) {
      responseMgt.faild("name or groupOwner are empty", res);
    }

    await Promise.all(
      tags.map(async (tag) => {
        const newTag = await Tag.create(tag.TagName);
        tagIDs.push(newTag._id);
      })
    );

    const group = await Group.create({
      name,
      description,
      tags: tagIDs,
      userIds,
      groupOwner,
    });
    group.save();
    console.log(`created Group:${name}`);
    responseMgt.success(name, res);
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
    const deletedGroup = await Group.findByIdAndDelete(id);
    await Promise.all(
      deletedGroup.tags.map(async (tag) => {
        await Tag.findByIdAndDelete(tag._id);
      })
    );
    if (deletedGroup) {
      responseMgt.success(deletedGroup, res);
      console.log("Deleted group: " + deletedGroup._id);
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
    const modifiedGroup = await Group.findByIdAndUpdate(
      id,
      {
        name,
        description,
        groupOwner,
      },
      { new: true }
    );
    if (modifiedGroup) {
      responseMgt.success(modifiedGroup, res);
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
      { new: true } //=>sorgt für die Rückgabe des upgedateten Datensatzes
    );
    if (modifiedGroup) {
      responseMgt.success(modifiedGroup, res);
    } else {
      responseMgt.faild("Update failed:" + err, res);
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
      { new: true }
    );
    if (modifiedGroup) {
      responseMgt.success(modifiedGroup, res);
    } else {
      responseMgt.faild("Update failed:" + modifiedGroup, res);
    }
  } catch (err) {
    throw new Error(err, res);
  }
};
exports.addTagToGroup = async (req, res, next) => {
  try {
    const { tagName, groupId } = req.body;
    console.log(tagName + ":" + groupId);
    if (!tagName || !groupId) {
      responseMgt.faild("No tagId or groupId provided", res);
      return;
    }

    const newTag = await Tag.create({ tagName });

    const modifiedGroup = await Group.findByIdAndUpdate(
      groupId,
      { $push: { tags: newTag._id } },
      { new: true }
    );
    if (modifiedGroup) {
      responseMgt.success(modifiedGroup, res);
    } else {
      responseMgt.faild(modifiedGroup, res);
    }
  } catch (err) {
    throw new Error(err);
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
      { new: true }
    );

    if (modifiedGroup) {
      responseMgt.success(modifiedGroup, res);
    } else {
      responseMgt.faild(modifiedGroup, res);
    }
  } catch (err) {
    throw new Error(err, res);
  }
};
exports.getGroup = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id);
    const group = await Group.findById(id)
      .populate("userIds", "tags")
      .select("-updatedAt");

    if (!group) {
      responseMgt.faild("Group not found", res);
      return;
    }

    responseMgt.success(group, res);
  } catch (err) {
    throw new Error(err, res);
  }
};
exports.getGroups = async (req, res, next) => {
  try {
    const groupsOverview = await Group.find({}, "_id name description");

    responseMgt.success(groupsOverview, res);
  } catch (err) {
    responseMgt.faild("Fatal error:" + err, res);
  }
};
