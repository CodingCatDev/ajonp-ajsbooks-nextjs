import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import React, { Component } from 'react';
import { collectionData } from 'rxfire/firestore';
import { Subject } from 'rxjs';
import fetch from 'isomorphic-unfetch';
import { takeUntil } from 'rxjs/operators';

import BookCard from '../components/BookCard';
import loadFirebase from '../lib/firebase';
import BookModel from '../models/BookModel';

export default class books extends Component<
  {
    books: BookModel[];
  },
  any
> {
  state: {
    books: BookModel[];
    stopSubs: Subject<boolean>;
    firebase?: any;
  } = {
    books: [],
    stopSubs: new Subject<boolean>()
  };
  static async getInitialProps() {
    const res = await fetch(`${process.env.API_ENDPOINT}books`);
    const books = await res.json();
    return { books: books };
  }
  async componentDidMount() {
    /* Coming from SSR Initial Props */
    await this.setState(() => {
      return {
        books: this.props.books
      };
    });
    /* After client loads */
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
        {this.state.books.map((book: BookModel) => {
          return <BookCard book={book} key={book.id} />;
        })}
      </Grid>
    );
  }
}
