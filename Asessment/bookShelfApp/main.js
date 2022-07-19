const books = [];
const RENDER_EVENT = 'render-bookshelf';

window.addEventListener('DOMContentLoaded', function () {
  const submitdata = document.getElementById('inputBook');
  submitdata.addEventListener('submit', function (event) {
    event.preventDefault();
    addBook();
  });
});

function addBook() {
  //what to add first.
  //i wanna add book here. how to do that?
  const bookTitle = document.getElementById('inputBookTitle').value;
  const bookAuthor = document.getElementById('inputBookAuthor').value;
  const bookYear = document.getElementById('inputBookYear').value;
  const generatedId = genId();
  const bookData = genBookObj(
    generatedId,
    bookTitle,
    bookAuthor,
    bookYear,
    false
  );
  books.push(bookData);
  console.log(bookData);
  document.dispatchEvent(new Event(RENDER_EVENT));
}

function genId() {
  return +new Date();
}

function genBookObj(id, title, author, year, isRead) {
  return {
    id,
    title,
    author,
    year,
    isRead,
  };
}

document.addEventListener(RENDER_EVENT, function () {
  const incompleteBookShelf = document.getElementById(
    'incompleteBookshelfList'
  );
  incompleteBookShelf.innerHTML = '';

  const completeBookshelf = document.getElementById('completeBookshelfList');
  completeBookshelf.innerHTML = '';
  for (const book of books) {
    const bookElement = makeBookElement(book);
    if (!book.isRead) {
      incompleteBookShelf.append(bookElement);
    } else {
      completeBookshelf.append(bookElement);
    }
  }
});

function makeBookElement(bookData) {
  const bookTitle = document.createElement('h3');
  bookTitle.innerText = bookData.title;

  const bookAuthor = document.createElement('p');
  bookAuthor.innerText = bookData.author;

  const bookYear = document.createElement('p');
  bookYear.innerText = bookData.year;

  const bookContainer = document.createElement('article');
  bookContainer.classList.add('book_item');
  bookContainer.append(bookTitle, bookAuthor, bookYear);

  const container = document.createElement('div');
  container.classList.add('book_item');
  container.append(bookContainer);
  container.setAttribute('id', `bookId-${bookData.id}`);
}
