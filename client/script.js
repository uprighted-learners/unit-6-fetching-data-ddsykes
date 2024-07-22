document.addEventListener("DOMContentLoaded", function () {
  const booksList = document.getElementById("books-list");
  const addBookForm = document.getElementById("add-book-form");
  const updateBookForm = document.getElementById("update-book-form");
  const deleteBookForm = document.getElementById("delete-book-form");

  //Getting all the Books
  async function fetchBooks() {
    const response = await fetch("/books");
    const books = await response.json();
    booksList.innerHTML = "";
    books.forEach((book) => {
      const li = document.createElement("li");
      li.textContent = `Title: ${book.title}, Author: ${book.author}, Copies: ${book.copies}`;
      booksList.appendChild(li);
    });
  }
  //Handling the add book form submisson
  addBookForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(addBookForm);
    const book = {};
    formData.forEach((value, key) => {
      book[key] = key === "copies" ? parseInt(value) : value;
    });
    await fetch("/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book),
    });
    fetchBooks();
    addBookForm.reset();
  });

  //setting up the handle update book form submission
  deleteBookForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new formData(deleteBookForm);
    const title = formData.get("title");
    await fetch("/books/delete", {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });
    fetchBooks();
    deleteBookForm.reset();
  });
  //Initialing the fetch of all the books
  fetchBooks();
});
