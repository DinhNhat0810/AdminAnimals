// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyAAspPrSaCdawOo3KSo-o2jpq1gh10oR7g',
    authDomain: 'animals-fa8d5.firebaseapp.com',
    projectId: 'animals-fa8d5',
    storageBucket: 'animals-fa8d5.appspot.com',
    messagingSenderId: '636553434350',
    appId: '1:636553434350:web:57eb9229e0af8fe7704fff',
    measurementId: 'G-4EE9RZ5SPV',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
