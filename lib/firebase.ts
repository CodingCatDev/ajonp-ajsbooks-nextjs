const firebaseConfig = {
  apiKey: "AIzaSyCXLldoMUB_AxaLpvG4pQ9Pzg9bEqpMgTA",
  authDomain: "ajonp-ajs-books.firebaseapp.com",
  databaseURL: "https://ajonp-ajs-books.firebaseio.com",
  projectId: "ajonp-ajs-books",
  storageBucket: "ajonp-ajs-books.appspot.com",
  messagingSenderId: "936263241017",
  appId: "1:936263241017:web:5faee456c1ed2da8",
};
export default async function loadFirebase() {
  const firebase = await import("firebase/app");
  await import("firebase/firestore");
  try {
    if (!firebase.default.apps.length) {
      const app = firebase.default.initializeApp(firebaseConfig);
      firebase.default.firestore(app);
    }
  } catch (err) {
    // we skip the "already exists" message which is
    // not an actual error when we're hot-reloading
    console.log(err);
    if (!/already exists/.test(err.message)) {
      console.error("Firebase initialization error", err.stack);
    }
  }
  return firebase;
}
