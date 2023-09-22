const Thread = require("../mongoDB/ThreadSchema");
const Answer = require("../mongoDB/AnswerSchema");
const Group = require("../mongoDB/groupSchema");
const responseMgt = require("../helper/responseMgt");

exports.createThread = async (req, res, next) => {
  try {
    const { title, text, tags, views, groupId, files, score } = req.body;
    console.log(req.body);
    //check if empty
    if (!title || !text) {
      responseMgt.faild("ERRORCODE: Title or Text is empty...Miau ", res);
    }
    const group = await Group.findById(groupId);
    const thread = await Thread.create({
      title,
      text,
      tags,
      views,
      groupId: group._id,
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
exports.getThreadWithAnswers = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      responseMgt.faild("No ID provided", res);
    }

    const thread = await Thread.findById(id).populate("tags").exec();

    if (!thread) {
      responseMgt.faild(`Thread with ID ${id} not found`, res);
      return;
    }

    //Get all answers of this thread
    const answers = await Answer.find({ parentThread: id })
      .populate("answerOwner")
      .populate("tags")
      .exec();

    //recursive funktion to create Answer of Answe hierarchy
    const buildAnswerHierarchy = (answers, parentAnswer) => {
      const result = [];
      for (const answer of answers) {
        if (answer.parentAnswer === parentAnswer) {
          const subAnswers = buildAnswerHierarchy(answers, answer._id);
          if (subAnswers.length > 0) {
            answer.answers = subAnswers;
          }
          result.push(answer);
        }
      }
      return result;
    };

    const answerHierarchy = buildAnswerHierarchy(answers, null);
    responseMgt.succes(answerHierarchy, res);
  } catch (err) {
    responseMgt.faild(err, res);
  }
};
exports.getThreads = async (res, next) => {
  try {
    const threads = await Thread.find({})
      .limit(50)
      .select("title _id text")
      .exec();

    if (threads) {
      responseMgt.succes(threads, res);
    } else {
      responseMgt.faild("something went wrong", res);
    }
  } catch (err) {
    responseMgt.faild(err, res);
  }
};
