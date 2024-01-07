// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: 'AIzaSyBDNqpo0k7w__u3EENHh6bjscMa4gcnR_g',
  authDomain: 'https://angular-blog-3d716.firebaseapp.com',
  projectId: 'angular-blog-3d716',
  storageBucket: 'angular-blog-3d716.appspot.com',
  messagingSenderId: '976304476279',
  appId: '1:976304476279:web:d05c76deb2c78cd1beb672',
  apiUrl: 'https://angular-blog-3d716-default-rtdb.europe-west1.firebasedatabase.app/',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
