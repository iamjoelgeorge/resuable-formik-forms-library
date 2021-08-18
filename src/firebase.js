import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyDYbKLJiN1f46adHP5I0qv-WFUfOA3GJi8',
  authDomain: 'test-605d5.firebaseapp.com',
  projectId: 'test-605d5',
  storageBucket: 'test-605d5.appspot.com',
  messagingSenderId: '733091843263',
  appId: '1:733091843263:web:534b23f73e929b8dac8a0a',
};

const app = firebase.initializeApp({
  apiKey: 'AIzaSyDYbKLJiN1f46adHP5I0qv-WFUfOA3GJi8',
  authDomain: 'test-605d5.firebaseapp.com',
  projectId: 'test-605d5',
  storageBucket: 'test-605d5.appspot.com',
  messagingSenderId: '733091843263',
  appId: '1:733091843263:web:534b23f73e929b8dac8a0a',
});

const db = app.firestore();

export { db };
export default app;
