// This JS file shows the three pillars of JS at work:
// 1. Types / Coercion, 2. scope / Closures, 3. this / Prototypes
// Martin Lovell
// 09/07/2019

class Bookshelf {
	constructor() {
		this.favouriteBooks = [];
	}
    // need .this on the front of everywhere favouriteBooks is written
    // will access variable favouriteBooks through the .this/prototype system
    // not through lexical scope. Need to make class methods .this-aware.
    addFavouriteBook(bookName) {  // class method - note no function keyword needed
        if (!bookName.includes("Great")) {
            this.favouriteBooks.push(bookName);
        }
    }
    
    printFavouriteBooks() {  // another class method
        console.log(`favourite Books: ${ String(this.favouriteBooks.length) }`);
        for (let bookName of this.favouriteBooks) {
            console.log(bookName);
        }
    }
}

// 'theBookshelf' is a specific instance of the Bookshelf class
function loadBooks(theBookshelf) {
	fakeAjax( BOOK_API, function onBooks(bookNames) {  // inline function expression
        for (let bookName of bookNames) {
            theBookshelf.addFavouriteBook(bookName);  // implicit binding
        }
        theBookshelf.printFavouriteBooks();  // implicit binding
    });
}

var BOOK_API = "https://some.url/api";

var myBooks = new Bookshelf();  // instantiating an instance of a class
loadBooks(myBooks);

// ***********************

// NOTE: don't modify this function at all
function fakeAjax(url,cb) {
	setTimeout(function fakeLoadingDelay(){
		cb([
			"A Song of Ice and Fire",
			"The Great Gatsby",
			"Crime & Punishment",
			"Great Expectations",
			"You Don't Know JS"
		]);
	},500);
}