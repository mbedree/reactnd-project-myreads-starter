import React from 'react'
import BookShelf from './components/BookShelf'
import SearchBar from './components/SearchBar'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll()
    .then((books) => {
      this.setState(() => ({
        books
      }))
    })
  }

  updateBooks() {
    BooksAPI.getAll()
    .then((books) => {
      this.setState(() => ({
        books
      }))
    })
  }

  render() {
    return (
          <div>
            <Route exact path="/" render={() => (
              <BookShelf
                books={this.state.books}
                updateBooks={this.updateBooks}
              />
              )}
            />
            <Route path='/search' render={() => (
              <SearchBar books={this.state.books}/>
            )}
         />
      </div>
    )
  }
}

export default BooksApp
