const Tag = require("../mongoDB/TagsSchema");
const responseMgt = require("../helper/responseMgt");

exports.createTag = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    console.log(req.body);
    //check if empty
    if (!name) {
      responseMgt.faild("name is empty", res);
    }

    const tag = await Tag.create({
      name,
      description,
    });
    tag.save();
    console.log(`created Tag:${name}`);
    responseMgt.succes(name, res);
  } catch (err) {
    console.error(err);
  }
};
exports.deleteTag = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      responseMgt.faild("No ID provided", res);
    }
    const deletedTag = await Tag.findByIdAndRemove(id);
    if (deletedTag) {
      responseMgt.succes(deletedTag, res);
    } else {
      responseMgt.faild(deletedTag, res);
    }
  } catch (err) {
    throw new Error(err, res);
  }
};
exports.modifyTag = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    console.log(id);
    if (!id) {
      responseMgt.faild("No ID provided", res);
    }
    const modifiedTag = await Tag.findByIdAndUpdate(id, {
      name,
      description,
    });
    if (modifiedTag) {
      responseMgt.succes(modifiedTag, res);
    } else {
      responseMgt.faild("Update failed:" + modifiedTag, res);
    }
  } catch (err) {
    throw new Error(err, res);
  }
};
