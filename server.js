// Your code goes here
const express = require("express");
const bodyParser = require("body-parser");
const Library = require("./library");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const collection = new Library("mongodb://127.0.0.1:27017", "library", "books");

//route to get all the books
app.get("/books", async (req, res) => {
  try {
    const books = await collection.allBooks();
    res.json(books);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});
//Creating thr route to add a new book
app.port("/books", async (req, res) => {
  try {
    const newBook = req.body;
    await collection.addBook(newBook);
    res.redirect("/");
  } catch (error) {
    res.status(500).send(error.toString());
  }
});
//creating a route to update a book
app.post("/books/update", async (req, res) => {
  try {
    const { id, newInfo } = req.body;
    await collection.changeBook(id, newInfo);
    res.redirect("/");
  } catch (error) {
    res.status(500).send(error.toString());
  }
});
//Creating the route to delete a book
app.post("/books/delete", async (req, res) => {
  try {
    const { title } = req.body;
    const books = await collection.findManyBooks({ title });
    if (books.length > 0) {
      await collection.removeBook(books[0]._id);
    }
    res.redirect("/");
  } catch (error) {
    res.status(500).send(error.toString());
  }
  app.listen(port, () => {
    console.log(`The server is running on http://localhost:${port}`);
  });
});

//modiying the delete post
app.post("/books/delete", async (req, res) => {
  try {
    const { title } = req.body;
    await collection.removeBookTitle(title);
    res.redirect("/");
  } catch (error) {
    res.status(500).send(error.toString());
  }
});
