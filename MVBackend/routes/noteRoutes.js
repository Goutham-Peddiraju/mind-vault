const express = require("express");
const { getNotes, createNote, deleteNote } = require("../controllers/noteController");
const protect = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", protect, getNotes);
router.post("/", protect, createNote);
router.delete("/:id", protect, deleteNote);

module.exports = router;
