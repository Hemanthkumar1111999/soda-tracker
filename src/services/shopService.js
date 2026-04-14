import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';

const shopCollection = collection(db, 'shops');

// ➕ Add Shop
export const addShop = async (shopData) => {
  try {
    const docRef = await addDoc(shopCollection, {
      ...shopData,
      createdAt: Timestamp.now(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding shop:', error);
    throw error;
  }
};

// 📥 Get All Shops (one-time fetch)
export const getShops = async () => {
  try {
    const snapshot = await getDocs(shopCollection);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error('Error fetching shops:', error);
    throw error;
  }
};

// 🔄 Real-time Shops Listener
export const subscribeShops = (callback) => {
  return onSnapshot(shopCollection, (snapshot) => {
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(data);
  });
};

// ✏️ Update Shop
export const updateShop = async (id, updatedData) => {
  try {
    const docRef = doc(db, 'shops', id);
    await updateDoc(docRef, updatedData);
  } catch (error) {
    console.error('Error updating shop:', error);
    throw error;
  }
};

// ❌ Delete Shop
export const deleteShop = async (id) => {
  try {
    const docRef = doc(db, 'shops', id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting shop:', error);
    throw error;
  }
};
