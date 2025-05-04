// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  getAuth,
  OAuthProvider,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyB8Mc_VbJGc7wfJVdHThjXb0vpxZo1eNg0',
  authDomain: 'visualsonic-database.firebaseapp.com',
  projectId: 'visualsonic-database',
  storageBucket: 'visualsonic-database.appspot.com',
  messagingSenderId: '337324555576',
  appId: '1:337324555576:web:f58860093c9722e8ad55cd',
  measurementId: 'G-95Y4YSZDN8',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const loginAuth = getAuth();
export const googleProvider = new GoogleAuthProvider();
export const microsoftProvider = new OAuthProvider('microsoft.com');
export const facebookProvider = new FacebookAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
