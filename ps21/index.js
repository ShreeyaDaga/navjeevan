// index.js
const express = require('express')
const { MongoClient, ObjectId } = require('mongodb')

const app = express()
const MONGO_URL = 'mongodb://localhost:27017'
const DB_NAME = 'bookstore'
let db

app.use(express.json())
app.use(express.static(__dirname))

// Connect via MongoClient
MongoClient.connect(MONGO_URL, { useUnifiedTopology: true })
  .then(client => {
    db = client.db(DB_NAME)
    booksCollection = db.collection('books')
    console.log('✅ Connected to MongoDB')
  })
  .catch(err => console.error('❌ MongoDB error:', err))

// GET all books
app.get('/books', async (req, res) => {
  try {
    const books = await booksCollection.find({}).toArray()
    res.send(books)
  } catch (e) {
    res.status(500).send({ error: e.message })
  }
})

// POST new book
app.post('/books', async (req, res) => {
  try {
    const doc = req.body
    const result = await booksCollection.insertOne(doc)
    //doc._id = result.insertedId;
    res.status(201).send(doc)
  } catch (e) {
    res.status(400).send({ error: e.message })
  }
})

// PUT update book
// app.put('/books/:id', async (req, res) => {
//   try {
//     const { id } = req.params
//     const update = { $set: req.body }
//     // find and then update
//     const result = await booksCollection.findOneAndUpdate(
//       { _id: new ObjectId(id) },
//       update,
//       { returnDocument: 'after' }
//     )
//     if (!result.value) return res.status(404).json({ error: 'Not found' })
//     res.json(result.value)
//   } catch (e) {
//     res.status(400).json({ error: e.message })
//   }
// })


app.put('/books/:id', async (req, res) => {
    const { id } = req.params;                // grabs the “:id” part of the URL
    try {
        // vlaue: book - 
        // by doing this you pull out the updates document in the book
      const { value: book } = await booksCollection.findOneAndUpdate(
        // coverts the string URl id to Mongodb ObjectId and finds it
        { _id: new ObjectId(id) },            // filter by that ObjectId
        { $set: req.body },                   // set all fields sent in the body
        { returnDocument: 'after' }           // Tells mongodb to return the updated document, not the original
      );
  
      if (!book) 
        return res.status(404).send({ error: 'Not found' });
  
      res.send(book);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  });


// DELETE a book
app.delete('/books/:id', async (req, res) => {
  try {
    const { id } = req.params
    const result = await booksCollection.deleteOne({ _id: new ObjectId(id) });
    if (!result) return res.status(404).send({ error: 'Not found' })
    res.send({ message: 'Deleted' })
  } catch (e) {
    res.status(500).send({ error: e.message })
  }
})

app.listen(3000, () =>
    console.log(`🚀 Server running at http://localhost:3000/`)
  )