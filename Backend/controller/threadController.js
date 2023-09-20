const Thread = require("../mongoDB/ThreadSchema");
const Answer = require("../mongoDB/AnswerSchema");
const responseMgt = require("../helper/responseMgt");

exports.createThread = async (req, res, next) => {
  try {
    const { title, text, tags, views, groupId, files, score } = req.body;
    console.log(req.body);
    //check if empty
    if (!title || !text) {
      responseMgt.faild(
        "ERRORCODE: Miau. YOU Fucked up. Title or Text is empty.....Miau ",
        res
      );
    }

    const thread = await Thread.create({
      title,
      text,
      tags,
      views,
      groupId,
      files,
      score,
    });
    thread.save();
    console.log(`created Thread:${title}`);
    responseMgt.succes(title, res);
  } catch (err) {
    console.error(err);
  }
};

exports.deleteThread = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      responseMgt.faild("No ID provided", res);
    }
    const deletedAnswers = await Answer.deleteMany({ parentThread: id });
    const deletedThread = await Thread.findByIdAndRemove(id);
    if (deletedThread) {
      responseMgt.succes(deletedThread, res);
    } else {
      responseMgt.faild(deletedThread, res);
    }
  } catch (err) {
    throw new Error(err, res);
  }
};
exports.modifyThread = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, text, tags, views, groupId, files, score } = req.body;
    console.log(id);
    if (!id) {
      responseMgt.faild("No ID provided", res);
    }
    const modifiedThread = await Thread.findByIdAndUpdate(id, {
      title,
      text,
      tags,
      views,
      groupId,
      files,
      score,
    });
    if (modifiedThread) {
      responseMgt.succes(modifiedThread, res);
    } else {
      responseMgt.faild("Update failed:" + modifiedThread, res);
    }
  } catch (err) {
    throw new Error(err, res);
  }
};
