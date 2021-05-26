import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDHx2uIbo25SFfjTvrXXu2IaLmiM4Qgwkg",
    authDomain: "todo-app-c7e97.firebaseapp.com",
    projectId: "todo-app-c7e97",
    storageBucket: "todo-app-c7e97.appspot.com",
    messagingSenderId: "942172283803",
    appId: "1:942172283803:web:79f8b765fb708180dd373e",
    measurementId: "G-CR3Y3MEJ84"
})

const db = firebaseApp.firestore();

export default db;