import { initializeApp } from 'firebase/app'

// Optionally import the services that you want to use
import { getAuth } from 'firebase/auth'
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyCWyfbM3FBlOdY0ZRTIOpjnw5UZy5wqcyM',
  authDomain: 'project-id.firebaseapp.com',
  databaseURL: 'https://ootd-21e31.firebaseio.com',
  projectId: 'ootd-21e31',
  storageBucket: 'project-id.appspot.com',
  messagingSenderId: 'sender-id',
  appId: '1:919329954789:ios:f821cef965fe62c46fed0c',
  measurementId: 'G-measurement-id',
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
