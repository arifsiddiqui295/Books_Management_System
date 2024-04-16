import React, { useState, useEffect } from 'react';
import axios from 'axios';
function App() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [isbn, setIsbn] = useState('');
  const [publisher, setPublisher] = useState('');
  const [newBooks, setNewBooks] = useState(false);
  const [updateBook, setUpdateBook] = useState()
  const [isUpdated, setIsUpdated] = useState(false);
  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await axios.get('http://localhost:3000/books');
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
      setNewBooks(false)
    }
    fetchBooks();
  }, [newBooks]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(title, author, description, isbn);
    const response = await axios.post('http://localhost:3000/addBook', {
      title,
      author,
      description,
      isbn,
      publisher
    });
    setTitle('')
    setAuthor('')
    setDescription('')
    setIsbn('')
    setPublisher('')
    setNewBooks(true)
    console.log(response);
  };
  const deleterHandler = async (book) => {
    const response = await axios.put('http://localhost:3000/deleteBook', { book })
    console.log(response);
    setNewBooks(true)
    // console.log(book)
  }
  const updateHandler = async (book) => {
    setUpdateBook(book)
    setIsUpdated(true)
    setTitle(book.title)
    setAuthor(book.author)
    setDescription(book.description)
    setIsbn(book.isbn)
    setPublisher(book.publisher)
    // console.log(book)
  }
  const updateSubmit = async (e) => {
    e.preventDefault()
    console.log('update bookd = ', updateBook._id)
    const id = updateBook._id
    console.log('bookd = ', id)
    const response = await axios.put('http://localhost:3000/updateBook', {
      title,
      author,
      description,
      isbn,
      publisher,
      id
    })
    setTitle('')
    setAuthor('')
    setDescription('')
    setIsbn('')
    setPublisher('')
    setNewBooks(true)
    setIsUpdated(!isUpdated)
    console.log(response);
    // console.log();
  }
  return (
    <>
      <div className="flex flex-col md:flex-row py-20">
        <form className="w-full md:w-1/2 px-6">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-first-name"
              >
                Title
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                required
                value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Title'
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-last-name"
              >
                Author Name
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-last-name"
                type="text"
                placeholder='Author Name'
                value={author} onChange={(e) => setAuthor(e.target.value)} required
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Description:
              </label>
              <textarea
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-password"
                type="password"
                value={description} onChange={(e) => setDescription(e.target.value)} required
                placeholder='Description'
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-first-name"
              >
                ISBN:
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                value={isbn} onChange={(e) => setIsbn(e.target.value)} required
                placeholder="ISBN"
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-last-name"
              >
                Publisher
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-last-name"
                type="text"
                placeholder='Publisher'
                value={publisher} onChange={(e) => setPublisher(e.target.value)} required
              />
            </div>
          </div>
          <div className='flex gap-5'>
            {
              isUpdated ? (
                <button
                  onClick={updateSubmit}
                  className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Update Book</button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Add Book</button>
              )
            }

          </div>
        </form>
        <div className="w-full md:w-1/2 px-6 mt-6 md:mt-0">
          <div className="container mx-auto">
            <h1 className="text-3xl font-semibold mb-4 mr-6">Total Books</h1>
            <div className="overflow-x-auto">
              <table className="table-auto">
                <thead>
                  <tr>
                    <th className="px-4 py-2">Title</th>
                    <th className="px-4 py-2">Author</th>
                    <th className="px-4 py-2">Description</th>
                    <th className="px-4 py-2">ISBN</th>
                    <th className="px-4 py-2">Publisher</th>
                    <th className="px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {books.map(book => (
                    <tr key={book._id}>
                      <td className="border px-4 py-2">{book.title}</td>
                      <td className="border px-4 py-2">{book.author}</td>
                      <td className="border px-4 py-2">{book.description}</td>
                      <td className="border px-4 py-2">{book.isbn}</td>
                      <td className="border px-4 py-2">{book.publisher}</td>
                      <td className="border px-4 py-2">
                        <div className='flex gap-4'>
                          <button
                            onClick={() => updateHandler(book)}
                            type="submit" className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600 ml-2">Update </button>
                          <button
                            onClick={() => deleterHandler(book)}
                            className="mr-3 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600">Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
