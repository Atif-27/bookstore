const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Book = require("../models/bookModel");
// ! Show all Books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find({});
    res.status(201).json({ length: books.length, books });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
//! Add new Book
router.post("/", async (req, res) => {
  try {
    const { title, author, publishYear } = req.body;
    if (!title || !author || !publishYear)
      res.status(400).send({
        message: "Send all required fields: title, author, publishYear",
      });
    const newBook = { title, author, publishYear };
    console.log(newBook);

    const book = await Book.create(newBook);
    res.status(201).send(book);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
});
// ! Show selected Book by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    res.status(201).send(book);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
// ! Update book by id
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, publishYear } = req.body;
    if (!title || !author || !publishYear)
      res.status(400).send({
        message: "Send all required fields: title, author, publishYear ",
      });
    const newBook = { title, author, publishYear };
    const updatedBook = await Book.findByIdAndUpdate(id, newBook);
    if (!updatedBook) {
      return res.status(404).send({ message: "Book not found" });
    }
    res.status(200).send({ message: "Book Updated sucessfully" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
// ! Delete book by id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {
      return res.status(404).send({ message: "Book not found" });
    }
    res.status(200).send({ message: "Book Deleted" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;
