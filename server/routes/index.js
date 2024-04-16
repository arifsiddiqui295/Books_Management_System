const express = require('express');
const router = express.Router();
const { helloWorld, addBook,getBooks,deleteBook,updateBook } = require('../controllers/bookControllers');

router.get('/', helloWorld);
router.post('/addBook', addBook);
router.get('/books', getBooks);
router.put('/deleteBook', deleteBook);
router.put('/updateBook', updateBook);

module.exports = router;
