import React, { useEffect, useState } from 'react';
import { TextField, Button, Card, CardContent, MenuItem } from '@mui/material';
import { collection, addDoc, onSnapshot, Timestamp } from 'firebase/firestore';
import { db } from '../services/firebase';
import { useNavigate } from 'react-router-dom';

const DeliveryForm = () => {
  const [shops, setShops] = useState([]);
  const [shopId, setShopId] = useState('');
  const [cases, setCases] = useState('');
  const navigate = useNavigate();

  // Fetch shops
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'shops'), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setShops(data);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async () => {
    if (!shopId || !cases) return alert('Fill all fields');

    try {
      await addDoc(collection(db, 'deliveries'), {
        shopId,
        cases: Number(cases),
        deliveredAt: Timestamp.now(),
        createdAt: Timestamp.now(),
      });

      setShopId('');
      setCases('');
      alert('Delivery added successfully!');
    } catch (err) {
      console.error(err);
      alert('Error adding delivery');
    }
  };

  return (
    <Card sx={{ maxWidth: 400, m: '20px auto', p: 2 }}>
      <CardContent>
        <div style={{ marginBottom: 20 }}>
          <Button variant="outlined" onClick={() => navigate('/dashboard')}>
            Back to Dashboard{' '}
          </Button>{' '}
        </div>{' '}
        <h3> Add Delivery </h3>
        <TextField
          select
          label="Select Shop"
          fullWidth
          margin="normal"
          value={shopId}
          onChange={(e) => setShopId(e.target.value)}
        >
          {shops.map((shop) => (
            <MenuItem key={shop.id} value={shop.id}>
              {' '}
              {shop.name}{' '}
            </MenuItem>
          ))}{' '}
        </TextField>
        <TextField
          label="Number of Cases"
          type="number"
          fullWidth
          margin="normal"
          value={cases}
          onChange={(e) => setCases(e.target.value)}
        />
        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleSubmit}
        >
          Add Delivery{' '}
        </Button>{' '}
      </CardContent>{' '}
    </Card>
  );
};

export default DeliveryForm;
