import { initializeApp } from 'firebase/app'

const firebaseConfig = {
    apiKey: "AIzaSyCkuiL8J65SLWcdrD3_W8l4ncg6Jxgtqpo",
    authDomain: "thriftee-7e793.firebaseapp.com",
    projectId: "thriftee-7e793",
    storageBucket: "thriftee-7e793.appspot.com",
    messagingSenderId: "802642503249",
    appId: "1:802642503249:web:8d1b6ca90586fd0537ba70"
};

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;