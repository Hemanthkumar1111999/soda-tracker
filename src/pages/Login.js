import React, { useState } from 'react';
import { TextField, Button, Card, CardContent } from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { loginUser } from '../services/authService';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password)
      return alert('Please enter both email and password.');

    try {
      await loginUser(email, password);
      navigate('/home');
    } catch (err) {
      alert(err.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <Card sx={{ maxWidth: 400, m: '100px auto', p: 2 }}>
      <CardContent>
        <h2> Login </h2>
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
        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleLogin}
        >
          Login{' '}
        </Button>{' '}
        <Button
          component={RouterLink}
          to="/signup"
          variant="text"
          fullWidth
          sx={{ mt: 1 }}
        >
          Create an account{' '}
        </Button>{' '}
      </CardContent>{' '}
    </Card>
  );
};

export default Login;
