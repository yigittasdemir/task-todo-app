import { initializeApp } from "firebase/app";
import {
  addDoc,
  collection,
  getFirestore,
  query,
  where,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  updatePassword,
} from "firebase/auth";
import toast from "react-hot-toast";

import store from "./store";
import { login as loginHandle, logout as logoutHandle } from "./store/auth";
import { openModal } from "./store/modal";
import { setTodos } from "./store/todos";

const firebaseConfig = {
  apiKey: "AIzaSyArfg2fZrubmSCnEKtviMp_9_R030ud9Wc",
  authDomain: "tasks-eb635.firebaseapp.com",
  projectId: "tasks-eb635",
  storageBucket: "tasks-eb635.appspot.com",
  messagingSenderId: "6292738824",
  appId: "1:6292738824:web:631a8948ef49dff77e12bd",
  measurementId: "G-YH4JTHCQYH",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);

export const register = async (email, password) => {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return user;
  } catch (error) {
    toast.error(error.message);
  }
};

export const login = async (email, password) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return user;
  } catch (error) {
    toast.error(error.message);
  }
};

onAuthStateChanged(auth, (user) => {
  if (user) {
    store.dispatch(
      loginHandle({
        displayName: user.displayName,
        email: user.email,
        photoUrl: user.photoURL,
        uid: user.uid,
      })
    );

    onSnapshot(
      query(collection(db, "todos"), where("uid", "==", auth.currentUser.uid)),
      (doc) => {
        store.dispatch(
          setTodos(
            doc.docs.reduce(
              (todos, todo) => [...todos, { ...todo.data(), id: todo.id }],
              []
            )
          )
        );
      }
    );
  } else {
    store.dispatch(logoutHandle);
  }
});

export const addTodo = async (data) => {
  try {
    const result = await addDoc(collection(db, "todos"), data);
    toast.success("Başarıyla eklendi");
    return result.id;
  } catch (error) {
    toast.error("Eklenemedi");
  }
};

export const deleteTodo = async (id) => {
  try {
    toast.success("Silindi");
    return await deleteDoc(doc(db, "todos", id));
  } catch (error) {
    toast.error("Silinemedi");
  }
};

export const update = async (data) => {
  try {
    await updateProfile(auth.currentUser, data);
    toast.success("Profil Güncellendi");
    return true;
  } catch (error) {
    toast.error(error.message);
  }
};

export const resetPassword = async (password) => {
  try {
    await updatePassword(auth.currentUser, password);
    toast.success("Şifreniz güncellendi");
    return true;
  } catch (error) {
    if (error.code === "auth/requires-recent-login") {
      store.dispatch(
        openModal({
          name: "re-auth-modal",
        })
      );
    }
    toast.error(error.message);
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    return true;
  } catch (error) {
    toast.error(error.message);
  }
};

export default app;
