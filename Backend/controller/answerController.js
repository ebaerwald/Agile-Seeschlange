const Answer = require("../mongoDB/AnswerSchema");
const responseMgt = require("../helper/responseMgt");

exports.createAnswer = async (req, res, next) => {
  try {
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

    const answer = await Answer.create({
      answerOwner,
      parentAnswer,
      title,
      text,
      parentThread,
      tags,
      score,
      IsMostHelpfull,
      files,
    });
    answer.save();
    console.log(`created Answer:${title}`);
    responseMgt.succes(title, res);
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
    const deletedAnswers = await Answer.deleteMany({ parentAnswer: id });
    const deletedAnswer = await Answer.findByIdAndRemove(id);
    if (deletedAnswer) {
      responseMgt.succes(deletedAnswer, res);
    } else {
      responseMgt.faild(deletedAnswer, res);
    }
  } catch (err) {
    throw new Error(err, res);
  }
};
exports.modifyAnswer = async (req, res, next) => {
  try {
    const { id } = req.params;
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
    console.log(id);
    if (!id) {
      responseMgt.faild("No ID provided", res);
    }
    const modifiedAnswer = await Answer.findByIdAndUpdate(id, {
      answerOwner,
      parentAnswer,
      title,
      text,
      parentThread,
      tags,
      score,
      IsMostHelpfull,
      files,
    });
    if (modifiedAnswer) {
      responseMgt.succes(modifiedAnswer, res);
    } else {
      responseMgt.faild("Update failed:" + modifiedAnswer, res);
    }
  } catch (err) {
    throw new Error(err, res);
  }
};
