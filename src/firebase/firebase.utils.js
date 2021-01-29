import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config={
    apiKey: "AIzaSyDhLg5_IQ4tkF67dmOXXXiKyx3GPEvfZLM",
    authDomain: "e-commerce-site-db.firebaseapp.com",
    projectId: "e-commerce-site-db",
    storageBucket: "e-commerce-site-db.appspot.com",
    messagingSenderId: "342581210798",
    appId: "1:342581210798:web:1ab0de4ee7b1091104873f",
    measurementId: "G-5PW2Q1LBVQ"
};

firebase.initializeApp(config);

export const auth=firebase.auth();
export const firestore=firebase.firestore();

const provider=new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt:'select_account'})//always trigger google popup when we use provider for auth and signin

export const signInWithGoogle=()=>auth.signInWithPopup(provider);//many options available we have selected only the google one

export default firebase;
