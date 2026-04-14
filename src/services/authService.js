import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

// 🔑 Login
export const loginUser = async (email, password) => {
  try {
    const userCred = await signInWithEmailAndPassword(auth, email, password);
    return userCred.user;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

// 📝 Signup
export const signupUser = async (email, password, role = 'delivery') => {
  try {
    const userCred = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Save role in Firestore
    await setDoc(doc(db, 'users', userCred.user.uid), {
      email,
      role,
      createdAt: new Date(),
    });

    return userCred.user;
  } catch (error) {
    console.error('Signup error:', error);
    throw error;
  }
};

// 🚪 Logout
export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
};

// 👤 Get User Role
export const getUserRole = async (uid) => {
  try {
    const docRef = doc(db, 'users', uid);
    const snapshot = await getDoc(docRef);

    return snapshot.exists() ? snapshot.data().role : null;
  } catch (error) {
    console.error('Role fetch error:', error);
    throw error;
  }
};

// 🔄 Auth Listener
export const subscribeToAuthChanges = (callback) => {
  return onAuthStateChanged(auth, callback);
};
