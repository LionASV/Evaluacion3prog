import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { addDoc, collection, deleteDoc, doc, getDoc, getFirestore, onSnapshot, updateDoc, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyA2zH7820QSH5TO3vgCThgOxbxHjF66Vkg",
    authDomain: "proyectos-586f8.firebaseapp.com",
    projectId: "proyectos-586f8",
    storageBucket: "proyectos-586f8.appspot.com",
    messagingSenderId: "380779011454",
    appId: "1:380779011454:web:57fb42ce8656aec5ff272f"
  };

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export const save = (equipoF) => {
    addDoc(collection(db, 'equipoF'), equipoF)
}

export const getData = (data) => {
    onSnapshot(collection(db, 'equipoF'), data)
}

export const remove = (id) => {
    deleteDoc(doc(db, 'equipoF', id))
}

export const getDocumento = (id) => getDoc(doc(db, 'equipoF', id))
export const update = (id,equ) =>{
    updateDoc(doc(db,'equipoF',id),equ)
}

export const checkEmailExists = async (email) => {
    const q = query(collection(db, 'equipoF'), where('email', '==', email));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
}




