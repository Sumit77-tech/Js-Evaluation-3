class Book {
    #isbn;
    constructor(title, author, isbn, availableCopies) {
        this.title = title;
        this.author = author;
        this._validateISBN(isbn);
        this.#isbn = isbn;
        this.availableCopies = availableCopies;
    }
    _validateISBN(isbn) {
        let isbnPattern = /^(97(8|9))?\d{9}(\d|X)$/;
        if (!isbnPattern.test(isbn)) {
            throw new Error("Invalid ISBN format.");
        }
    }
    get availableCopies() {
        return this._availableCopies;
    }
    set availableCopies(copies) {
        if (copies < 0) {
            throw new Error("Available copies cannot be negative");
        }
        this._availableCopies = copies;
    }
    static generateISBN() {
        let randomNumber = Math.floor(Math.random() * 1000000000);
        return "978-" + randomNumber.toString().padStart(9, '0');
    }
    get isbn() {
        return this.#isbn;
    }
}

class Library {
    constructor() {
        this.books = [];
    }
    addBook(book) {
        this.books.push(book);
    }
    removeBook(isbn) {
        let index = this.books.findIndex(book => book.isbn === isbn);
        if (index !== -1) {
            this.books.splice(index, 1);
        } else {
            throw new Error("Book not found");
        }
    }
    searchBooks(query) {
        return this.books.filter(book =>
            book.title.toLowerCase().includes(query.toLowerCase()) ||
            book.author.toLowerCase().includes(query.toLowerCase()));
    }
    displayBooks() {
        if (this.books.length === 0) {
            console.log("No books available");
        } else {
            this.books.forEach(book => {
                console.log(`Title: ${book.title}, Author: ${book.author}, ISBN: ${book.isbn}, Available Copies: ${book.availableCopies}`);
            });
        }
    }
}
let myLibrary = new Library();
let isbn1 = Book.generateISBN();
let book1 = new Book("JavaScript: Will you be my Maker", "Douglas Crockford", isbn1, 5);
let book2 = new Book("Clean Code", "Robert C. Martin", Book.generateISBN(), 3);

myLibrary.addBook(book1);
myLibrary.addBook(book2);
myLibrary.displayBooks();

let searchResults = myLibrary.searchBooks("Clean");
console.log("Search results:", searchResults);

try {
    myLibrary.removeBook(book1.isbn);
    myLibrary.displayBooks();
} catch (error) {
    console.error(error.message);
}
