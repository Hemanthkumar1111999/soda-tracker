import React, { useState } from 'react';
import { TextField, Button, Card, CardContent } from '@mui/material';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../services/firebase';
import { useNavigate } from 'react-router-dom';

const ShopForm = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [contact, setContact] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!name) return alert('Shop name is required');

    try {
      await addDoc(collection(db, 'shops'), {
        name,
        location,
        contact,
        createdAt: Timestamp.now(),
      });

      setName('');
      setLocation('');
      setContact('');
      alert('Shop added successfully!');
    } catch (err) {
      console.error(err);
      alert('Error adding shop');
    }
  };

  return (
    <Card sx={{ maxWidth: 400, m: '20px auto', p: 2 }}>
      <CardContent>
        <div style={{ marginBottom: 20 }}>
          <Button variant="outlined" onClick={() => navigate('/dashboard')}>
            Back to Dashboard
          </Button>
        </div>
        <h3>Add Shop</h3>

        <TextField
          label="Shop Name"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <TextField
          label="Location"
          fullWidth
          margin="normal"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <TextField
          label="Contact"
          fullWidth
          margin="normal"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />

        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleSubmit}
        >
          Add Shop
        </Button>
      </CardContent>
    </Card>
  );
};

export default ShopForm;
