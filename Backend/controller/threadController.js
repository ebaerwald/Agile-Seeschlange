const Thread = require("../mongoDB/ThreadSchema");
const Answer = require("../mongoDB/AnswerSchema");
const Group = require("../mongoDB/groupSchema");
const Tag = require("../mongoDB/TagsSchema");
const User = require("../mongoDB/UserSchema");
const responseMgt = require("../helper/responseMgt");

exports.createThread = async (req, res, next) => {
  try {
    const { title, text, tags, views, groupId, files, score, image, userId } =
      req.body;
    console.log(req.body);
    //check if empty
    if (!title || !text) {
      responseMgt.faild("ERRORCODE: Title or Text is empty ", res);
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
        userId,
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
        userId,
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
    const { userId } = req.body;
    console.log(req.body);
    let tmpThread = await Thread.findById(id);
    tmpThread = tmpThread.toJSON();
    const originalUserId = tmpThread.userId;
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
    const currThread = await Thread.findById(id);
    responseMsg.likes = currThread.likes.length;
    responseMsg.dislikes = currThread.dislikes.length;
    const currUser = await User.findById(userId);
    responseMsg.isSuperlike = currUser.favoriteThreads.includes(currThread._id);
    responseMsg.userId = originalUserId;

    if (responseMsg) {
      responseMgt.success(responseMsg, res);
    } else {
      responseMgt.faild(responseMsg, res);
    }
  } catch (err) {
    console.log("small error at GetTHreadsWithAnswer");
    responseMgt.faild(err, res);
  }
};
exports.getThreads = async (req, res, next) => {
  try {
    const threads = await Thread.find({})
      .limit(5)
      .select("title _id text")
      .populate("userId")
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
exports.likeThread = async (req, res, next) => {
  const { id } = req.params;
  const { userId } = req.body;
  try {
    await Thread.findByIdAndUpdate(id, { $pull: { dislikes: userId } });
    await Thread.findByIdAndUpdate(id, { $pull: { likes: userId } });

    const thread = await Thread.findByIdAndUpdate(
      id,
      { $push: { likes: userId } },
      { new: true }
    );

    if (thread) {
      responseMgt.success(
        { dislikes: thread.dislikes.length, likes: thread.likes.length },
        res
      );
    } else {
      responseMgt.faild("Something went wrong", res);
    }
  } catch (err) {
    responseMgt.faild(err, res);
  }
};
exports.dislikeThread = async (req, res, next) => {
  const { id } = req.params;
  const { userId } = req.body;
  try {
    await Thread.findByIdAndUpdate(id, { $pull: { likes: userId } });
    await Thread.findByIdAndUpdate(id, { $pull: { dislikes: userId } });

    const thread = await Thread.findByIdAndUpdate(
      id,
      { $push: { dislikes: userId } },
      { new: true }
    );

    if (thread) {
      responseMgt.success(
        { dislikes: thread.dislikes.length, likes: thread.likes.length },
        res
      );
    } else {
      responseMgt.faild("Something went wrong", res);
    }
  } catch (err) {
    responseMgt.faild(err, res);
    w;
  }
};
