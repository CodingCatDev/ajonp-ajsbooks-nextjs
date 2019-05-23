import * as functions from 'firebase-functions';

const onRequest = functions.https.onRequest;

// These relative paths will exist after compiling everything
const index = require('./_next/serverless/pages/index');
const books = require('./_next/serverless/pages/books');
const book = require('./_next/serverless/pages/book');

// These named exports will map to Firebase Function names
exports.index = onRequest((req, res) => index.render(req, res));
exports.books = onRequest((req, res) => books.render(req, res));
exports.book = onRequest((req, res) => book.render(req, res));
