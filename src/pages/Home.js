import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Grid, Card, CardContent } from '@mui/material';
import { signOut } from 'firebase/auth';
import { auth } from '../services/firebase';

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  return (
    <div style={{ padding: 20 }}>
      <h2> Soda Delivery Tracker </h2>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <h3> Dashboard </h3>{' '}
              <Button
                variant="contained"
                fullWidth
                onClick={() => navigate('/dashboard')}
              >
                Go to Dashboard{' '}
              </Button>{' '}
            </CardContent>{' '}
          </Card>{' '}
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <h3> Add Shop </h3>{' '}
              <Button
                variant="contained"
                fullWidth
                onClick={() => navigate('/shop')}
              >
                Add Shop{' '}
              </Button>{' '}
            </CardContent>{' '}
          </Card>{' '}
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <h3> Add Delivery </h3>{' '}
              <Button
                variant="contained"
                fullWidth
                onClick={() => navigate('/delivery')}
              >
                Add Delivery{' '}
              </Button>{' '}
            </CardContent>{' '}
          </Card>{' '}
        </Grid>{' '}
      </Grid>
      <Button
        variant="outlined"
        color="error"
        sx={{ mt: 4 }}
        onClick={handleLogout}
      >
        Logout{' '}
      </Button>{' '}
    </div>
  );
};

export default Home;
