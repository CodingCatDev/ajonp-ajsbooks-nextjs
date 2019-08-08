import * as functions from 'firebase-functions';

import * as app from './api';

const onRequest = functions.https.onRequest;

// These relative paths will exist after compiling everything
// const index = require('./_next/serverless/pages/index'); //Removed as Next 9 only pushes static
// const books = require('./_next/serverless/pages/books'); //Removed as Next 9 only pushes static
const book = require('./_next/serverless/pages/book');

// These named exports will map to Firebase Function names
// exports.index = onRequest((req, res) => index.render(req, res)); //Removed as Next 9 only pushes static
// exports.books = onRequest((req, res) => books.render(req, res)); //Removed as Next 9 only pushes static
exports.book = onRequest((req, res) => book.render(req, res));

// API
exports.api = app.listener;
