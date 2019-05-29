import Grid from '@material-ui/core/Grid';
import fetch from 'isomorphic-unfetch';
import { RouterProps, withRouter } from 'next/router';
import { Component } from 'react';
import { docData } from 'rxfire/firestore';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import BookDetail from '../components/BookDetail';
import BookPage from '../components/BookPage';
import ChapterDetail from '../components/ChapterDetail';
import loadFirebase from '../lib/firebase';
import BookModel from '../models/BookModel';
import ChapterModel from '../models/ChapterModel';
import PageModel from '../models/PageModel';

class book extends Component<
  {
    book: BookModel;
    chapter: ChapterModel;
    page: PageModel;
    router: RouterProps;
  },
  any
> {
  state: {
    book: BookModel;
    chapter: ChapterModel;
    page: PageModel;
    stopSubs: Subject<boolean>;
    firebase?: any;
  } = {
    book: {},
    chapter: {},
    page: {},
    stopSubs: new Subject<boolean>()
  };

  static async getInitialProps({ req, query }: any) {
    const id = query.id ? query.id : null;
    const chapterId = query.chapterId ? query.chapterId : null;
    const pageId = query.pageId ? query.pageId : null;

    const retObj = {
      book: {
        id: id
      },
      chapter: {
        id: chapterId
      },
      page: {
        id: pageId
      }
    };
    if (req) {
      console.log('Server only call.');
      if (id) {
        const res = await fetch(
          // Local example http://localhost:5001/ajonp-ajs-books/us-central1/api/
          `https://us-central1-ajonp-ajs-books.cloudfunctions.net/api/book?id=${id}`
        );
        const json = await res.json();
        retObj.book = json;
      }
      if (chapterId) {
        const res = await fetch(
          `https://us-central1-ajonp-ajs-books.cloudfunctions.net/api/chapter?id=${id}&chapterId=${chapterId}`
        );
        const json = await res.json();
        retObj.chapter = json;
      }
      if (pageId) {
        const res = await fetch(
          `https://us-central1-ajonp-ajs-books.cloudfunctions.net/api/page?id=${id}&chapterId=${chapterId}&pageId=${pageId}`
        );
        const json = await res.json();
        retObj.page = json;
      }
    }
    return retObj;
  }
  async componentDidMount() {
    /* Coming from SSR Initial Props */
    await this.setState({
      book: this.props.book,
      chapter: this.props.chapter,
      page: this.props.page,
      firebase: await loadFirebase()
    });

    /* After client loads */
    this.updateFirebaseRefs();
  }
  componentWillUnmount() {
    /* Stop observing */
    this.stopSubs();
  }
  stopSubs() {
    this.state.stopSubs.next(true);
  }
  async componentDidUpdate(prevProps: { router: RouterProps }) {
    if (prevProps.router.query !== this.props.router.query) {
      const q = this.props.router.query;
      if (q) {
        await this.setState({
          book: { id: q.id },
          chapter: { id: q.chapterId },
          page: { id: q.pageId }
        });
        this.updateFirebaseRefs();
      }
    }
  }
  updateFirebaseRefs() {
    const booksRef = this.state.firebase
      .firestore()
      .collection('books')
      .doc(this.state.book.id);
    // Book Detail
    docData(booksRef, 'id')
      .pipe(takeUntil(this.state.stopSubs))
      .subscribe(book => {
        this.setState({ book });
      });
    // Chapter Detail
    if (this.state.chapter.id) {
      const chapterRef = this.state.firebase
        .firestore()
        .collection(`books/${this.state.book.id}/chapters`)
        .doc(this.state.chapter.id);
      docData(chapterRef, 'id')
        .pipe(takeUntil(this.state.stopSubs))
        .subscribe(chapter => {
          this.setState({ chapter });
        });

      if (this.state.page.id) {
        const pageRef = this.state.firebase
          .firestore()
          .collection(
            `books/${this.state.book.id}/chapters/${
              this.state.chapter.id
            }/pages`
          )
          .doc(this.state.page.id);
        docData(pageRef, 'id')
          .pipe(takeUntil(this.state.stopSubs))
          .subscribe(page => {
            this.setState({ page });
          });
      }
    }
  }
  render() {
    let chapter;
    if (this.state.chapter.id) {
      chapter = (
        <ChapterDetail book={this.state.book} chapter={this.state.chapter} />
      );
    }
    let page;
    if (this.state.page.text) {
      page = (
        <Grid container direction="row" justify="center">
          <BookPage page={this.state.page} />
        </Grid>
      );
    }
    return (
      <Grid container direction="row" justify="center">
        <BookDetail book={this.state.book} />
        {chapter}
        {page}
      </Grid>
    );
  }
}

const BookWithRouter = withRouter(book);

export default BookWithRouter;
