import Session from "../models/Session.js";
import Question from "../models/Question.js";

export const createSession = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, description, questions } =
      req.body;
    const userId = req.user._id;
    if (!questions || !Array.isArray(questions)) {
      return res
        .status(400)
        .json({ success: false, message: "questions array is required." });
    }
    const session = await Session.create({
      user: userId,
      role,
      experience,
      topicsToFocus,
      description,
      questions: [],
    });
    const questionDocs = await Promise.all(
      questions.map(async (q) => {
        const question = await Question.create({
          session: session._id,
          question: q.question,
          answer: q.answer,
        });
        return question._id;
      }),
    );
    session.questions = questionDocs;
    await session.save();
    const populated = await Session.findById(session._id).populate("questions");
    res.status(201).json({ success: true, session: populated });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error." });
  }
};

export const getMySessions = async (req, res) => {
  try {
    const sessions = await Session.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .populate("questions")
      .exec();
    res.status(200).json(sessions);
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error." });
  }
};

export const getSessionById = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id)
      .populate({
        path: "questions",
        options: { sort: { isPinned: -1, createdAt: 1 } },
      })
      .exec();
    if (!session) {
      return res
        .status(404)
        .json({ success: false, message: "Session not found." });
    }
    res.status(200).json({ success: true, session });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error." });
  }
};

export const deleteSession = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);
    if (!session) {
      return res.status(400).json({ message: "Session not found." });
    }

    // check if loggedIn user own this session or not
    if (session.user.toString() !== req.user.id) {
      return res
        .status(404)
        .json({ message: "Not authorized to delete this session." });
    }
    // First, delete all questions link to this session.
    await Question.deleteMany({ session: session._id });
    // Then delete the session
    await session.deleteOne();
    res.status(200).json({ message: "Session deleted successfully." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error." });
  }
};
