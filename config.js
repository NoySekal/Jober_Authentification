//firebase config key
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyALUcfSERzZWiLak4S3vzPJ62GqcFGOrP0",
    authDomain: "jober-reg.firebaseapp.com",
    projectId: "jober-reg",
    storageBucket: "jober-reg.appspot.com",
    messagingSenderId: "771810438018",
    appId: "1:771810438018:web:59cbb18669201894633d9b",
    measurementId: "G-KM37KV33K9"
  };

if (!firebase.apps.length) {
firebase.initializeApp(firebaseConfig);
};

export { firebase };