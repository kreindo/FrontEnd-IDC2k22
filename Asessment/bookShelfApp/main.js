const books = [];
const RENDER_EVENT = 'render-bookshelf';

window.addEventListener('DOMContentLoaded', function () {
  const submitdata = document.getElementById('inputBook');
  submitdata.addEventListener('submit', function (event) {
    event.preventDefault();
    addBook();
  });
  if (isStorageAvailable) {
    loadFrStorage();
  }
});

function addBook() {
  const bookTitle = document.getElementById('inputBookTitle').value;
  const bookAuthor = document.getElementById('inputBookAuthor').value;
  const bookYear = document.getElementById('inputBookYear').value;
  const generatedId = genId();
  const bookData = genBookObj(
    generatedId,
    bookTitle,
    bookAuthor,
    bookYear,
    cbCheck()
  );

  function cbCheck() {
    const cb = document.getElementById('inputBookIsComplete');
    if (cb.checked) {
      return true;
    }
    return false;
  }

  books.push(bookData);
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
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
  bookTitle.innerText = `Judul: ${bookData.title}`;

  const bookAuthor = document.createElement('p');
  bookAuthor.innerText = `Penulis: ${bookData.author}`;

  const bookYear = document.createElement('p');
  bookYear.innerText = `Tahun: ${bookData.year}`;

  const Button = document.createElement('button');
  if (!bookData.isRead) {
    Button.classList.add('green');
    Button.innerText = 'Selesai Dibaca';
    Button.addEventListener('click', function () {
      readBook(bookData.id);
    });
  } else {
    Button.classList.add('yellow');
    Button.innerText = 'Belum Dibaca';
    Button.addEventListener('click', function () {
      unReadBook(bookData.id);
    });
  }

  function readBook(bookid) {
    const targetBook = findBook(bookid);
    if (bookid == targetBook) return;
    targetBook.isRead = true;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
  }

  function unReadBook(bookid) {
    const targetBook = findBook(bookid);
    if (bookid == targetBook) return;
    targetBook.isRead = false;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
  }

  const deleteButton = document.createElement('button');
  deleteButton.classList.add('red');
  deleteButton.innerText = 'Hapus buku';
  deleteButton.addEventListener('click', function () {
    deleteBook(bookData.id);
  });

  function deleteBook(bookid) {
    const targetBook = findBook(bookid);
    if (bookid == targetBook) return;
    books.splice(targetBook, 1);
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
  }

  function findBook(bookId) {
    for (const book of books) {
      if (book.id == bookId) {
        return book;
      }
    }
    return null;
  }

  const buttonContainer = document.createElement('div');
  buttonContainer.classList.add('action');
  buttonContainer.append(Button, deleteButton);

  const bookContainer = document.createElement('article');
  bookContainer.classList.add('book_item');
  bookContainer.append(bookTitle, bookAuthor, bookYear, buttonContainer);
  bookContainer.setAttribute('id', `bookId-${bookData.id}`);

  return bookContainer;
}

const SAVED_EVENT = 'saved-todo';
const STORAGE_KEY = 'TODO_APPS';

function isStorageAvailable() {
  if (typeof Storage == undefined) {
    alert('Your browser does not support Storage API');
    return false;
  }
  return true;
}

function saveData() {
  if (isStorageAvailable()) {
    const parsedData = JSON.stringify(books);
    localStorage.setItem(STORAGE_KEY, parsedData);
    document.dispatchEvent(new Event(SAVED_EVENT));
  }
}

function loadFrStorage() {
  const serializedData = localStorage.getItem(STORAGE_KEY);
  let data = JSON.parse(serializedData);

  if (data !== null) {
    for (const book of data) {
      books.push(book);
    }
  }

  document.dispatchEvent(new Event(RENDER_EVENT));
}
