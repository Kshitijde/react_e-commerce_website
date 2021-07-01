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

export const createUserProfileDocument=async (userAuth,additionalData)=>
{
    if(!userAuth) {return;}
    const userRef=firestore.doc(`users/${userAuth.uid}`);
    const snapShot=await userRef.get();
    if(!snapShot.exists)
    {
        const {displayName,email}=userAuth;
        const createdAt=new Date();

        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
            ...additionalData});

        }catch(error){
            console.log("Error creating user",error.message);

        }
    }
    return userRef;
}

firebase.initializeApp(config);

export const addCollectionAndDocuments=async (collectionKey,objectsToAdd)=>{
    const collectionRef=firestore.collection(collectionKey);
    console.log(collectionRef);

    const batch=firestore.batch();
    objectsToAdd.forEach(obj=>{
        const newDocRef=collectionRef.doc();//new doc add to collection.
        batch.set(newDocRef,obj);
    })

    return await batch.commit();
}

export const convertCollectionsSnapshotToMap=(collections)=>{
    const transformedCollection=collections.docs.map(doc=>{
        const {title,items}=doc.data();
        
        return{
            routeName:encodeURI(title.toLowerCase()),
            id:doc.id,
            title,
            items
        }
    });

    return transformedCollection.reduce((accumulator,collection)=>{
        accumulator[collection.title.toLowerCase()]=collection;
        return accumulator
    },{})
};

export const auth=firebase.auth();
export const firestore=firebase.firestore();

const provider=new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt:'select_account'})//always trigger google popup when we use provider for auth and signin

export const signInWithGoogle=()=>auth.signInWithPopup(provider);//many options available we have selected only the google one

export default firebase;
