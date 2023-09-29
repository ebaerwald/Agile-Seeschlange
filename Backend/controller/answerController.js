const Answer = require("../mongoDB/AnswerSchema");
const Thread = require("../mongoDB/ThreadSchema");
const User = require("../mongoDB/UserSchema");
const Tag = require("../mongoDB/TagsSchema");
const responseMgt = require("../helper/responseMgt");

exports.createAnswer = async (req, res, next) => {
  try {
    let answer;
    let tagIds = [];
    const {
      answerOwner,
      parentAnswer,
      title,
      text,
      parentThread,
      tags,
      score,
      IsMostHelpfull,
      files,
    } = req.body;
    console.log(req.body);
    //check if empty
    if (!title || !answerOwner || !parentThread) {
      responseMgt.faild("title,answerOwner ord parentThread are empty", res);
    }

    try {
      await Promise.all(
        tags.map(async (tag) => {
          const newTag = await Tag.create(tag.TagName);
          tagIds.push(newTag._id);
        })
      );
    } catch (err) {}

    const thread = await Thread.findById(parentThread);
    const user = await User.findById(answerOwner);
    if (!parentAnswer) {
      answer = await Answer.create({
        answerOwner: user._id,
        title,
        text,
        parentThread: thread._id,
        tags: tagIds,
        score,
        IsMostHelpfull,
        files,
      });
    } else {
      const parentAnser = await Answer.findById(parentAnswer);
      answer = await Answer.create({
        answerOwner: user._id,
        parentAnswer: parentAnser._id,
        title,
        text,
        parentThread: thread._id,
        tags,
        score,
        IsMostHelpfull,
        files,
      });
    }

    answer.save();
    console.log(`created Answer:${title}`);
    responseMgt.success(answer._id, res);
  } catch (err) {
    console.error(err);
  }
};
exports.deleteAnswer = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      responseMgt.faild("No ID provided", res);
    }

    const deleteChildAnswer = async (id) => {
      const answer = await Answer.findById(id);
      while (answer.hasChildElements) {
        await deleteChildAnswer(answer._id);
      }
      answer.deleteOne();
    };
    async function getNextChild(id) {
      const nextChild = await Answer.findOne({ parentAnswer: id });
      return nextChild._id;
    }

    deleteChildAnswer(id);
    responseMgt.success(id, res);
  } catch (err) {
    throw new Error(err, res);
  }
};
exports.modifyAnswer = async (req, res, next) => {
  try {
    const answerId = req.params.id;
    let tagIds = [];
    const { title, text, tags, score, IsMostHelpfull, files } = req.body;

    for (const tag of tags) {
      const newTag = await Tag.create({ TagName: tag });
      tagIds.push(newTag._id);
    }

    const updatedAnswer = await Answer.findOneAndUpdate(
      { _id: answerId },
      {
        title,
        text,
        score,
        IsMostHelpfull,
        files,
        $push: { tags: tagIds },
      },
      { new: true }
    );

    console.log(`Aktualisierte Antwort: ${updatedAnswer._id}`);
    responseMgt.success(title, res);
  } catch (err) {
    responseMgt.faild(errorMessage, res);
  }
};
