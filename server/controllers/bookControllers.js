const book = require('../models/Book.js');

exports.helloWorld = (req, res, next) => {
  try {
    res.json('hello');
  } catch (error) {
    next(error);
  }
};

exports.addBook = (req, res, next) => {
  try {
    console.log(req.body);
    const newBook = new book({
      title: req.body.title,
      author: req.body.author,
      isbn: req.body.isbn,
      description: req.body.description,
      publisher: req.body.publisher
    });
    newBook.save();
    res.json(newBook);
  } catch (error) {
    next(error);
  }
};
exports.getBooks = async (req, res, next) => {
  try {
    const books = await book.find({});
    res.json(books);
  } catch (error) {
    next(error);
  }
};
exports.deleteBook = async (req, res, next) => {
  try {
    const bookId = req.body.book._id;
    const deletedBook = await book.findByIdAndDelete(bookId);
    if (deletedBook) {
      res.json({ message: 'Book deleted successfully' });
    } else {
      res.status(404).json({ error: 'Book not found' });
    }
  } catch (error) {
    next(error);
  }
};
exports.updateBook = async (req, res, next) => {
  try {
    const bookId = req.body.id;
    const { title,author, description, isbn,publisher}= req.body;
    // console.log('Book updated',title,author,description,isbn,publisher)
    console.log(bookId);  
    const foundBook = await book.findOne({ _id: bookId });
    foundBook.title = title;
    foundBook.author = author;
    foundBook.description = description;
    foundBook.isbn = isbn;
    foundBook.publisher = publisher;
    const updatedBook = await foundBook.save();
    console.log('found book ',updatedBook);
    res.json(foundBook);
  } catch (error) {
    next(error);
  }
};


