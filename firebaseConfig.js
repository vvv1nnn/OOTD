// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getDatabase } from 'firebase/database'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAUhiPqywcPECvyAGya1F3DFPP3J06tzzs',
  authDomain: 'ootd-f639b.firebaseapp.com',
  projectId: 'ootd-f639b',
  storageBucket: 'ootd-f639b.appspot.com',
  messagingSenderId: '626417173930',
  appId: '1:626417173930:web:e45af52b74c6fef70057d3',
  measurementId: 'G-6KNF898FK6',
  databaseURL:
    'https://ootd-f639b-default-rtdb.asia-southeast1.firebasedatabase.app/',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
const auth = getAuth(app)
const database = getDatabase(app)

export default database
