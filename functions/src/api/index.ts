import * as cors from 'cors';
import * as express from 'express';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import BookModel from '../../../models/BookModel';
// Initialize Firebase Admin
admin.initializeApp();

// Create Express App
const app = express();

// Use cors middleware
app.use(cors({ origin: true }));

app.get('/book', async (req, res) => {
  const id = req.query.id;
  if (id) {
    console.log(`Fetching ${id}`);
    try {
      const bookRef = await admin
        .firestore()
        .collection('books')
        .doc(id)
        .get();
      res.json(bookRef.data());
    } catch (e) {
      console.log(e);
      return;
    }
  } else {
    res.status(403).send('Missing id');
    return;
  }
});
app.get('/books', async (req, res) => {
  try {
    const booksSnapshot = await admin
      .firestore()
      .collection('books')
      .get();
    const books: BookModel[] = [];
    booksSnapshot.forEach(doc => {
      books.push(doc.data());
    });
    res.json(books);
  } catch (e) {
    console.log(e);
    return;
  }
});
app.get('/chapter', async (req, res) => {
  const id = req.query.id;
  const chapterId = req.query.chapterId;
  if (id) {
    console.log(`Fetching ${id}`);
    try {
      const bookRef = await admin
        .firestore()
        .collection(`books/${id}/chapters`)
        .doc(chapterId)
        .get();
      res.json(bookRef.data());
    } catch (e) {
      console.log(e);
      return;
    }
  } else {
    res.status(403).send('Missing id');
    return;
  }
});
app.get('/page', async (req, res) => {
  const id = req.query.id;
  const chapterId = req.query.chapterId;
  const pageId = req.query.pageId;
  if (id) {
    console.log(`Fetching ${id}`);
    try {
      const bookRef = await admin
        .firestore()
        .collection(`books/${id}/chapters/${chapterId}/pages`)
        .doc(pageId)
        .get();
      res.json(bookRef.data());
    } catch (e) {
      console.log(e);
      return;
    }
  } else {
    res.status(403).send('Missing id');
    return;
  }
});

export const listener = functions.https.onRequest(app);
