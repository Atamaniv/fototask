import firebaseConfig from './firebaseConfig';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/';

const firebaseApp = initializeApp(firebaseConfig);

export const db = getFirestore(firebaseApp);

export default firebaseApp;