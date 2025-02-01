const mongoose = require("mongoose");
const LibraryUser = require("../Models/libraryUser");

// GET all library users
const getLibraryUsers = async (req, res) => {
  try {
    const libraryUsers = await LibraryUser.find({}).sort({ createdAt: -1 });
    res.status(200).json(libraryUsers);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// GET a single library user
const getLibraryUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }
};

// POST a new library user
const createLibraryUser = async (req, res) => {
  const start = Date.now(); // Start time
  const { wereQueriesAnswered, subjectInterest, othersubjectInterest, mainReasonforUsing, otherReasonforUsing } = req.body;

  try {
    const libraryUser = await LibraryUser.create({
      wereQueriesAnswered,
      subjectInterest,
      othersubjectInterest,
      mainReasonforUsing,
      otherReasonforUsing,
    });
    const duration = Date.now() - start; // Calculate duration
    console.log(`Request took ${duration}ms`);
    res.status(201).json(libraryUser);
  } catch (error) {
    console.error('Error creating library user:', error);
    res.status(400).json({ error: error.message });
  }
};

// DELETE a library user
const deleteLibraryUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }
};

// UPDATE a library user
const updateLibraryUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }
};

module.exports = {
  getLibraryUsers,
  getLibraryUser,
  createLibraryUser,
  deleteLibraryUser,
  updateLibraryUser,
};

