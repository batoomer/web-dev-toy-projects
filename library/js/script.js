// Class Representing a Book
class Book {
    constructor(title, author, pages, isRead){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
    }
};

// Class Representing the Library
class Library {

    // Array to store the books
    #books = []
    get books(){
        return this.#books;
    }

    // Adds a book to the library
    addBook(newBook){
        this.books.push(newBook);
    }

    // Removes a book from the library
    deleteBook(index){
        this.books.splice(index, 1);
    }

    // Toggles the read status of a book
    toggleIsRead(index){
        this.books[index].isRead = !this.books[index].isRead;
    }
}

// Class Encapsulating the logic for the Modal containing the form
class BookDialogManager{
    constructor(libraryUI){
        this.libraryUI = libraryUI
        this.dialogElement = document.getElementById('add-book-dialog');
        this.formElement = document.getElementById('add-book-form');


        document.querySelector('.add-button').addEventListener('click', ()=>this.handleOpenDialog());
        this.formElement.elements['close-book-dialog'].addEventListener('click', ()=>this.handleCloseDialog());
        this.formElement.addEventListener('submit', (e)=>this.handleSubmitForm(e));
    }

    handleOpenDialog(){
        this.dialogElement.showModal();
    }

    handleCloseDialog(){
        this.dialogElement.close();
        this.formElement.reset();
    }

    handleSubmitForm(e){
        e.preventDefault();

        const bookTitle = this.formElement.elements['title'].value;
        const bookAuthor = this.formElement.elements['author'].value;
        const bookPages = this.formElement.elements['pages'].value;
        const bookRead = this.formElement.elements['read'].checked;

        const newBook = new Book(bookTitle, bookAuthor, bookPages, bookRead);

        this.libraryUI.addBook(newBook);

        this.handleCloseDialog();
    }
}

// Class encapsulating the UI logic
class LibraryUI {
    constructor(library){
        this.library = library;

        this.libraryElement = document.getElementById("library-entries")
        this.library.addBook(new Book('test 1', 'test 1', '622', true))
        this.library.addBook(new Book('test 2', 'test 2', '422', false))
        this.library.addBook(new Book('test 3', 'test 3', '222', false))

        this.displayBooks()
    }

    // Handles Removing a Book
    deleteBook(index){
        // Remove the book from the library and the UI
        this.library.deleteBook(index);
        document.querySelector(`tr[data-index="${index}"]`).remove();
        
        // Update the data-index attribute and index column value of the remaining rows
        this.libraryElement.querySelectorAll('tr').forEach((row, newIndex) => {
            row.setAttribute('data-index', newIndex);
            row.querySelector('.index-col').textContent = newIndex + 1;
        });
    }

    // Event Listener to remove a book
    handleDeleteButton(e){
        const index = e.currentTarget.closest('[data-index]').dataset.index
        this.deleteBook(index)
    }

    // Event Listener to toggle the read status of the book
    toggleReadStatus(e){
        const index = e.currentTarget.closest('[data-index]').dataset.index
        // Toggle the status
        this.library.toggleIsRead(index);
    }

    // Add Book 
    addBook(book){
        this.library.addBook(book);
        const index = this.library.books.length - 1;
        const tableRow = document.createElement("tr");
        tableRow.setAttribute('data-index', index)
        tableRow.innerHTML = `
            <td class="sticky-col sticky-left index-col">${index+1}</td>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.pages}</td>
            <td>
                <input type="checkbox" ${book.isRead ? 'checked' : ''}>
                <label style="display: none;" for="read1">Read</label>
            </td>
             <td class="sticky-col sticky-right">
                 <button class="remove-button">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0,0,256,256" width="50px" height="50px">
                        <g fill="#f5f5f5" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal">
                            <g transform="scale(5.12,5.12)">
                                <path d="M21,2c-1.64545,0 -3,1.35455 -3,3v2h-10c-0.36064,-0.0051 -0.69608,0.18438 -0.87789,0.49587c-0.18181,0.3115 -0.18181,0.69676 0,1.00825c0.18181,0.3115 0.51725,0.50097 0.87789,0.49587h1v36c0,1.654 1.346,3 3,3h26c1.654,0 3,-1.346 3,-3v-36h1c0.36064,0.0051 0.69608,-0.18438 0.87789,-0.49587c0.18181,-0.3115 0.18181,-0.69676 0,-1.00825c-0.18181,-0.3115 -0.51725,-0.50097 -0.87789,-0.49587h-10v-2c0,-1.64545 -1.35455,-3 -3,-3zM21,4h8c0.55455,0 1,0.44545 1,1v2h-10v-2c0,-0.55455 0.44545,-1 1,-1zM19,14c0.552,0 1,0.448 1,1v25c0,0.553 -0.448,1 -1,1c-0.552,0 -1,-0.447 -1,-1v-25c0,-0.552 0.448,-1 1,-1zM25,14c0.552,0 1,0.448 1,1v25c0,0.553 -0.448,1 -1,1c-0.552,0 -1,-0.447 -1,-1v-25c0,-0.552 0.448,-1 1,-1zM31,14c0.553,0 1,0.448 1,1v25c0,0.553 -0.447,1 -1,1c-0.553,0 -1,-0.447 -1,-1v-25c0,-0.552 0.447,-1 1,-1z"></path>
                            </g>
                        </g>
                    </svg>
                </button>
            </td>
        `;
        this.libraryElement.appendChild(tableRow);

        document.querySelector(`tr[data-index="${index}"] .remove-button`).addEventListener('click', (e) => this.handleDeleteButton(e));

        document.querySelector(`tr[data-index="${index}"] input[type="checkbox"]`).addEventListener('click', (e) => this.toggleReadStatus(e));    
    }

    // Displays the books in the table
    displayBooks(){
        this.library.books.forEach( (book, index) => {
            const tableRow = document.createElement("tr");
            tableRow.setAttribute('data-index', index)
            tableRow.innerHTML = `
                <td class="sticky-col sticky-left index-col">${index+1}</td>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.pages}</td>
                <td>
                    <input type="checkbox" ${book.isRead ? 'checked' : ''}>
                    <label style="display: none;" for="read1">Read</label>
                </td>
                <td class="sticky-col sticky-right">
                    <button class="remove-button">
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0,0,256,256" width="50px" height="50px">
                            <g fill="#f5f5f5" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal">
                                <g transform="scale(5.12,5.12)">
                                    <path d="M21,2c-1.64545,0 -3,1.35455 -3,3v2h-10c-0.36064,-0.0051 -0.69608,0.18438 -0.87789,0.49587c-0.18181,0.3115 -0.18181,0.69676 0,1.00825c0.18181,0.3115 0.51725,0.50097 0.87789,0.49587h1v36c0,1.654 1.346,3 3,3h26c1.654,0 3,-1.346 3,-3v-36h1c0.36064,0.0051 0.69608,-0.18438 0.87789,-0.49587c0.18181,-0.3115 0.18181,-0.69676 0,-1.00825c-0.18181,-0.3115 -0.51725,-0.50097 -0.87789,-0.49587h-10v-2c0,-1.64545 -1.35455,-3 -3,-3zM21,4h8c0.55455,0 1,0.44545 1,1v2h-10v-2c0,-0.55455 0.44545,-1 1,-1zM19,14c0.552,0 1,0.448 1,1v25c0,0.553 -0.448,1 -1,1c-0.552,0 -1,-0.447 -1,-1v-25c0,-0.552 0.448,-1 1,-1zM25,14c0.552,0 1,0.448 1,1v25c0,0.553 -0.448,1 -1,1c-0.552,0 -1,-0.447 -1,-1v-25c0,-0.552 0.448,-1 1,-1zM31,14c0.553,0 1,0.448 1,1v25c0,0.553 -0.447,1 -1,1c-0.553,0 -1,-0.447 -1,-1v-25c0,-0.552 0.447,-1 1,-1z"></path>
                                </g>
                            </g>
                        </svg>
                    </button>
                </td>
            `;
            this.libraryElement.appendChild(tableRow);
        });
    }


}
    

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    const library = new Library();
    const libManager = new LibraryUI(library);
    const dialogManager = new BookDialogManager(libManager)
});

