# MyReads Project ( React )
## Project Description

## manage Reads
* Search For Books
* Add ( Single or Bulk ) Book/s to your categories
* Categories are ( Currenly Reading - Want to Raed - Read)
* Remove Books from your Categories
* Rate your favorite books

Start Project Locally:

* install all project dependencies with `npm install`
* start the development server with `npm start`

## Project Content

#pages
* Main page
-- contains three shelves ( categories ) of books 
** Currently reading
** Want to Read
** Read

* Search Page
-- contains:
** Search Input
** Search Result View

## Components Structure
```
├── src
    └── components
        ├── bucket-component
        ├── home-component
        ├── ├── book-shelf-component
        ├── ├── ├── book-card-component
        ├── ├── ├── ├── book-rating-component
        ├── ├── header-nav-component
        ├── search-component
```

## Backend Server

* [`getAll`](#getall)
* [`update`](#update)
* [`search`](#search)

### `getAll`

Method Signature:

```js
getAll()
```

* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* This collection represents the books currently in the bookshelves in your app.

### `update`

Method Signature:

```js
update(book, shelf)
```

* book: `<Object>` containing at minimum an `id` attribute
* shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]  
* Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search`

Method Signature:

```js
search(query)
```

* query: `<String>`
* Returns a Promise which resolves to a JSON object containing a collection of a maximum of 20 book objects.
* These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.

