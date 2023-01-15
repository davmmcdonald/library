const libraryGrid = document.getElementById('libraryGrid');
const bookForm = document.getElementById('bookForm');
const submitButton = document.getElementById('submitButton');

let library = [];
class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

library[0] = new Book('The Hobbit', 'J. R. R. Tolkien', 300, true);
createCard(library.length - 1);

submitButton.addEventListener('click', addBook);

function addBook() {
    if (document.getElementById('title').value != '' && document.getElementById('author').value != '' && document.getElementById('pages').value >= 1) {
        event.preventDefault();
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const pages = document.getElementById('pages').value;
        const read = document.getElementById('read').checked;
        library.push(new Book(title, author, pages, read));
        createCard(library.length - 1);
        bookForm.reset();
        console.table(library);
    }
}

function createCard(id) {
    const card = document.createElement('div');
    const title = document.createElement('h2');
    const author = document.createElement('p');
    const pages = document.createElement('p');
    const read = document.createElement('p');
    const remove = document.createElement('i');
    const edit = document.createElement('i');
    const container = document.createElement('div');
    card.setAttribute('data-id', id);
    card.classList.add('card');
    title.innerText = library[id].title;
    author.innerText = `by ${library[id].author}`;
    pages.innerText = `${library[id].pages} pages`;
    if (library[id].read) {
        read.innerHTML = '<span style="text-decoration: underline;">has</span> been read';
    } else {
        read.innerHTML = '<span style="text-decoration: underline;">has not</span> been read';
    }
    remove.classList.add('las')
    remove.classList.add('la-trash-alt');
    edit.classList.add('las')
    edit.classList.add('la-cog');
    container.appendChild(remove);
    container.appendChild(edit);
    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(pages);
    card.appendChild(read);
    card.appendChild(container);
    libraryGrid.prepend(card);

    remove.addEventListener('click', deleteBook);
    edit.addEventListener('click', editBook);
    read.addEventListener('click', changeRead);
}

function deleteBook() {
    const id = this.parentElement.parentElement.getAttribute('data-id');
    library.splice(id, 1);
    this.parentElement.parentElement.remove();
}

function editBook() {
    const id = this.parentElement.parentElement.getAttribute('data-id');
    document.getElementById('title').value = library[id].title;
    document.getElementById('author').value = library[id].author;
    document.getElementById('pages').value = library[id].pages;
    document.getElementById('read').checked = library[id].read;
    library.splice(id, 1);
    this.parentElement.parentElement.remove();
}

function changeRead() {
    const id = this.parentElement.getAttribute('data-id');
    if (this.innerText === 'has been read') {
        this.innerHTML = '<span style="text-decoration: underline;">has not</span> been read';
        library[id].read = false;
    } else {
        this.innerHTML = '<span style="text-decoration: underline;">has</span> been read';
        library[id].read = true;
    }
}