import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  onSnapshot,
  Timestamp,
  query,
  where,
} from 'firebase/firestore';
import { db } from './firebase';

const deliveryCollection = collection(db, 'deliveries');

// ➕ Add Delivery
export const addDelivery = async (deliveryData) => {
  try {
    const docRef = await addDoc(deliveryCollection, {
      ...deliveryData,
      cases: Number(deliveryData.cases),
      deliveredAt: Timestamp.now(),
      createdAt: Timestamp.now(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding delivery:', error);
    throw error;
  }
};

// 📥 Get All Deliveries
export const getDeliveries = async () => {
  try {
    const snapshot = await getDocs(deliveryCollection);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error('Error fetching deliveries:', error);
    throw error;
  }
};

// 🔄 Real-time Deliveries Listener
export const subscribeDeliveries = (callback) => {
  return onSnapshot(deliveryCollection, (snapshot) => {
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(data);
  });
};

// 📊 Get Deliveries by Shop
export const getDeliveriesByShop = async (shopId) => {
  try {
    const q = query(deliveryCollection, where('shopId', '==', shopId));
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error('Error fetching deliveries by shop:', error);
    throw error;
  }
};

// ❌ Delete Delivery
export const deleteDelivery = async (id) => {
  try {
    const docRef = doc(db, 'deliveries', id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting delivery:', error);
    throw error;
  }
};
