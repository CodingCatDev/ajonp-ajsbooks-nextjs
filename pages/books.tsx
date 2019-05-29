import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import React, { Component } from 'react';
import { collectionData } from 'rxfire/firestore';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import BookCard from '../components/BookCard';
import loadFirebase from '../lib/firebase';
import Book from '../models/BookModel';

export default class books extends Component {
  state: { books: Book[]; stopSubs: Subject<boolean> } = {
    books: [],
    stopSubs: new Subject<boolean>()
  };
  async componentDidMount() {
    const firebase = await loadFirebase();
    const booksRef = firebase.firestore().collection('books');
    collectionData(booksRef, 'bookId')
      .pipe(takeUntil(this.state.stopSubs))
      .subscribe(books => {
        this.setState({ books });
      });
  }
  componentWillUnmount() {
    /* Stop observing */
    this.state.stopSubs.next(true);
  }
  render() {
    let loading = <CircularProgress />;
    if (this.state.books.length > 0) {
      loading = <span />;
    }
    return (
      <Grid container direction="row" justify="center">
        {loading}
        {this.state.books.map((book: Book) => {
          return <BookCard book={book} key={book.id} />;
        })}
      </Grid>
    );
  }
}
