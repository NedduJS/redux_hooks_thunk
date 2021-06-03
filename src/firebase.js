import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyC49RsY2YVSB7p2TeqNAcL3xqtPOc4Syy4',
  authDomain: 'rickandmortyreacthooks.firebaseapp.com',
  projectId: 'rickandmortyreacthooks',
  storageBucket: 'rickandmortyreacthooks.appspot.com',
  messagingSenderId: '292906635281',
  appId: '1:292906635281:web:4e1519bc9ea783d451a1b0',
  measurementId: 'G-P5ECS4NE4B',
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore().collection('favs');

const getFavs = (uid) => {
  return db
    .doc(uid)
    .get()
    .then((snap) => {
      return snap.data().array;
    });
};

const updateDB = (array, uid) => {
  return db.doc(uid).set({ array });
};

const loginWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase
    .auth()
    .signInWithPopup(provider)
    .then((snap) => snap.user);
};

const signOutGoogle = () => {
  firebase.auth().signOut();
};

export { loginWithGoogle, signOutGoogle, updateDB, getFavs };
