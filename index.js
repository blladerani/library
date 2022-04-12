let myLibrary = [];

function Book(name, author, page, read) {
  this.name = name;
  this.author = author;
  this.page = page;
  this.read = read;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
  createBookCard(myLibrary.length - 1);
}

const books = document.querySelector("#books");

function createBookCard(index) {
  const book = myLibrary[index];
  const bookCard = document.createElement("div");
  bookCard.classList.add("book");
  bookCard.setAttribute("data-index", index);

  const bookName = document.createElement("div");
  bookName.classList.add("book__name");

  const bookAuthor = document.createElement("div");
  bookAuthor.classList.add("book__author");

  const bookPage = document.createElement("div");
  bookPage.classList.add("book__page");

  const bookButtonGroup = document.createElement("div");
  bookButtonGroup.classList.add("book__button-group");

  const bookRead = document.createElement("div");
  bookRead.classList.add("book__read");
  bookRead.classList.add(
    myLibrary[index].read ? "book__read--true" : "book__read--false"
  );

  const bookRemove = document.createElement("div");
  bookRemove.classList.add("book__remove");

  const readImage = document.createElement("img");
  readImage.setAttribute("src", "assets/book-open.svg");

  const removeImage = document.createElement("img");
  removeImage.setAttribute("src", "assets/delete.svg");

  bookRead.addEventListener("click", (e) => {
    myLibrary[index].read = !myLibrary[index].read;
    const element = document.querySelector(
      `.book[data-index="${index}"] .book__read`
    );
    element.classList.toggle("book__read--true");
    element.classList.toggle("book__read--false");
  });
  bookRemove.addEventListener("click", (e) => {
    myLibrary.splice(index, 1);
    books.removeChild(document.querySelector(`.book[data-index="${index}"]`));
  });

  bookRemove.appendChild(removeImage);
  bookRead.appendChild(readImage);

  bookButtonGroup.appendChild(bookRead);
  bookButtonGroup.appendChild(bookRemove);
  bookName.appendChild(document.createTextNode(book.name));
  bookCard.appendChild(bookName);
  bookAuthor.appendChild(document.createTextNode(book.author));
  bookCard.appendChild(bookAuthor);
  bookPage.appendChild(document.createTextNode(`${book.page} Pages`));
  bookCard.appendChild(bookPage);
  bookCard.appendChild(bookButtonGroup);

  books.appendChild(bookCard);
}

const addButton = document.querySelector(".add-button");
const modal = document.querySelector("#book-form");
const modalBackground = document.querySelector(".modal-background");
addButton.addEventListener("click", () => {
  modal.style.display = "flex";
  modalBackground.style.display = "block";
});

modal.addEventListener("submit", (e) => {
  e.preventDefault();
  const bookName = document.querySelector("#book-name");
  const author = document.querySelector("#author");
  const page = document.querySelector("#page-count");
  const read = document.querySelector("#read");

  myLibrary.forEach((e) => {
    if (e.name == bookName.value)
      document.querySelector(".error-message").textContent = "bruh";
    return;
  });

  const book = new Book(bookName.value, author.value, page.value, read.checked);
  addBookToLibrary(book);
  bookName.value = "";
  author.value = "";
  page.value = null;
  read.checked = false;
  modal.style.display = "none";
  modalBackground.style.display = "none";
});
