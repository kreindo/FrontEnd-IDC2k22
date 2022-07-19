const books = [];const RENDER_EVENT = 'render-bookshelf';

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
  bookTitle.innerText = `Judul: ${bookData.title}`;

  const bookAuthor = document.createElement('p');
  bookAuthor.innerText = `Penulis: ${bookData.author}`;

  const bookYear = document.createElement('p');
  bookYear.innerText = `Tahun: ${bookData.year}`;

  /* book is in done sect, make button yellow to retrun it to not done shelf/sect */

  // function bookChecker(bookid) {
  //   const targetBook = findBook(bookid);
  //   if (bookid == targetBook) return;
  //   targetBook.classList.add('yellow');
  //   window.dispatchEvent(new Event(RENDER_EVENT));
  // }

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
  }

  function unReadBook(bookid) {
    const targetBook = findBook(bookid);
    if (bookid == targetBook) return;
    targetBook.isRead = false;
    document.dispatchEvent(new Event(RENDER_EVENT));
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
