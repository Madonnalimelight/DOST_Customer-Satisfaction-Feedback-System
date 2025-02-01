const express = require("express");
const router = express.Router();
const {
  getLibraryUsers,
  getLibraryUser,
  createLibraryUser,
  deleteLibraryUser,
  updateLibraryUser,
} = require("../Controllers/LibraryUserController");

// GET all library users
router.get("/", getLibraryUsers);
// GET a single library user
router.get("/:id", getLibraryUser);
// POST a new library user
router.post("/", createLibraryUser);
// DELETE a library user
router.delete("/:id", deleteLibraryUser);
// UPDATE a library user
router.patch("/:id", updateLibraryUser);    

module.exports = router;

