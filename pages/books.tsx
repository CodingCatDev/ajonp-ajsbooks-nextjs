import Grid from '@material-ui/core/Grid';
import React, { Component } from 'react';
import { collectionData } from 'rxfire/firestore';

import BookCard from '../components/BookCard';
import loadFirebase from '../lib/firebase';
import Book from '../models/Book';

export default class Books extends Component {
  state: { books: Book[] } = {
    books: []
  };
  async componentDidMount() {
    const firebase = await loadFirebase();
    const booksRef = firebase.firestore().collection('books');
    collectionData(booksRef, 'bookId').subscribe(books => {
      this.setState({ books });
    });
  }
  render() {
    return (
      <Grid container direction="row" justify="center">
        {this.state.books.map((book: Book) => {
          return <BookCard book={book} key={book.id} />;
        })}
      </Grid>
    );
  }
}
