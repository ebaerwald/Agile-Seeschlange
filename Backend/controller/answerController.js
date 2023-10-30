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

    console.log(body);
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
        parentAnswer: thread._id,
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
exports.deleteAnswer = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    responseMgt.faild("No ID provided", res);
  } else {
    responseMgt.success(deleteAnswerAndChildren(id), res);
  }

  async function deleteAnswerAndChildren(answerId) {
    try {
      const deletedAnswer = await Answer.findByIdAndRemove(answerId);

      if (!deletedAnswer) {
        throw new Error(
          "Die Antwort wurde nicht gefunden oder konnte nicht gelöscht werden."
        );
      }

      const childAnswers = await Answer.find({ parentAnswer: answerId });

      for (const childAnswer of childAnswers) {
        await deleteAnswerAndChildren(childAnswer._id);
      }

      return deletedAnswer._id;
    } catch (error) {
      throw error;
    }
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
