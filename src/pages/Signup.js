import React, { useState } from 'react';
import { TextField, Button, Card, CardContent, MenuItem } from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { signupUser } from '../services/authService';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('delivery');
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!email || !password)
      return alert('Please enter both email and password.');

    try {
      await signupUser(email, password, role);
      alert('User created successfully.');
      navigate('/home');
    } catch (err) {
      alert(err.message || 'Signup failed. Please try again.');
    }
  };

  return (
    <Card sx={{ maxWidth: 400, m: '100px auto', p: 2 }}>
      <CardContent>
        <h2> Signup </h2>
        <TextField
          label="Email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />{' '}
        <TextField
          label="Password"
          type="password"
          fullWidth
          sx={{ mt: 2 }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          select
          label="Role"
          fullWidth
          sx={{ mt: 2 }}
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <MenuItem value="admin"> Admin </MenuItem>{' '}
          <MenuItem value="delivery"> Delivery </MenuItem>{' '}
        </TextField>
        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleSignup}
        >
          Signup{' '}
        </Button>{' '}
        <Button
          component={RouterLink}
          to="/"
          variant="text"
          fullWidth
          sx={{ mt: 1 }}
        >
          Already have an account ? Sign in
        </Button>{' '}
      </CardContent>{' '}
    </Card>
  );
};

export default Signup;
