import React, { Component } from 'react';
import * as BooksAPI from '../BooksAPI';
import _ from 'lodash';

class SearchedBookList extends Component {

  onSelect(book, shelf) {
    BooksAPI.update(book, shelf).then((books) => {
      this.props.updateBooks()
    })
  }

  setShelf(){
    let shelf = "none";
    const books = this.props.books;
    const book = this.props.book;

    for(let i = 0; i < books.length; i++) {
      if(books[i].id === book.id) {
        return books[i].shelf
      }
    }
    return shelf;
  }

  render(){

    const thumbnail = typeof this.props.book.imageLinks === "undefined" ? "BookCover2.png" : this.props.book.imageLinks.thumbnail;
    const title = typeof this.props.book.title === "undefined" ? "Title Unknown" : this.props.book.title;
    const authors = typeof this.props.book.authors === "undefined" ? "Author/s Unknown" : this.props.book.authors;
    const debouncedOnSelect = _.debounce((book, shelf) => { this.onSelect(book, shelf) }, 300)

    return(
      <div>
        <li>
          <div className="book">
            <div className="book-top">
              <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${thumbnail})` }}></div>
              <div className="book-shelf-changer">
              <select
                value={this.setShelf()}
                onChange={(event) => debouncedOnSelect(this.props.book, event.target.value)}>
                  <option value="move" disabled>Move to...</option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
                </select>
              </div>
            </div>
            <div className="book-title">{title}</div>
            <div className="book-authors">{typeof authors === "array" ?
            authors.length === 1 ? authors
              : authors.map((author, i) => (
                <span key={i}>{author}<br/></span>
              ))
            :
              authors
            }</div>
          </div>
        </li>
      </div>
    )
  }
}

export default SearchedBookList;
