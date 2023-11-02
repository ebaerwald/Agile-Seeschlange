const Thread = require("../mongoDB/ThreadSchema");
const Answer = require("../mongoDB/AnswerSchema");
const Group = require("../mongoDB/groupSchema");
const Tag = require("../mongoDB/TagsSchema");
const responseMgt = require("../helper/responseMgt");

exports.createThread = async (req, res, next) => {
  try {
    const { title, text, tags, views, groupId, files, score, image } = req.body;
    console.log(req.body);
    //check if empty
    if (!title || !text) {
      responseMgt.faild("ERRORCODE: Title or Text is empty...Miau ", res);
    }
    const group = await Group.findById(groupId);
    let thread;
    if (!group) {
      thread = await Thread.create({
        title,
        text,
        tags,
        views,
        files,
        score,
        image,
      });
    } else {
      thread = await Thread.create({
        title,
        text,
        tags,
        views,
        groupId: group._id,
        files,
        score,
        image,
      });
    }

    thread.save();
    console.log(`created Thread:${title}`);
    responseMgt.success(title, res);
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
      responseMgt.success(deletedThread, res);
      console.log("Thread deleted successfully: " + deletedThread._id);
    } else {
      responseMgt.faild(deletedThread, res);
    }
  } catch (err) {
    throw new Error(err, res);
  }
};
exports.modifyThread = async (req, res, next) => {
  try {
    let tagIds = [];
    const { id } = req.params;
    const { title, text, tags, views, groupId, files, score } = req.body;
    if (!id) {
      responseMgt.faild("No ID provided", res);
    }

    await Promise.all(
      tags.map(async (tag) => {
        const newTag = await Tag.create(tag.TagName);
        tagIds.push(newTag._id);
      })
    );

    console.log(tagIds);
    const modifiedThread = await Thread.findByIdAndUpdate(
      id,
      {
        title,
        text,
        tags: tagIds,
        views,
        groupId,
        files,
        score,
      },
      { new: true }
    );
    if (modifiedThread) {
      responseMgt.success(modifiedThread, res);
      console.log("Thread modified: " + modifiedThread._id);
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
    async function getThreadWithAnswers(_id) {
      try {
        let thread = await Thread.findOne({ _id });

        if (!thread) {
          return null;
        }

        const threadWithAnswer = await buildAnswerHierarchy(thread._id);
        thread = thread.toJSON();
        thread.answers = threadWithAnswer.answers;
        return thread;
      } catch (error) {
        console.error("failed to get thread: ", error);
        throw error;
      }
    }

    async function getAnswersForThread(id) {
      const answers = await Answer.find({ parentAnswer: id }).lean();
      return answers;
    }

    async function buildAnswerHierarchy(id) {
      let answerObj = {};
      answerObj.answers = await getAnswersForThread(id);

      if (answerObj.answers.length === 0) {
        return answerObj;
      }

      for (const subAnswer of answerObj.answers) {
        subAnswer.answers = (await buildAnswerHierarchy(subAnswer._id)).answers;
      }
      return answerObj;
    }

    const responseMsg = await getThreadWithAnswers(id);
    if (responseMsg) {
      responseMgt.success(responseMsg, res);
    } else {
      responseMgt.faild(responseMsg, res);
    }
  } catch (err) {
    console.log("if this then you are FUCKED");
    responseMgt.faild(err, res);
  }
};
exports.getThreads = async (req, res, next) => {
  try {
    const threads = await Thread.find({})
      .limit(5)
      .select("title _id text")
      .exec();

    if (threads) {
      responseMgt.success(threads, res);
    } else {
      responseMgt.faild("something went wrong", res);
    }
  } catch (err) {
    responseMgt.faild(err, res);
  }
};
