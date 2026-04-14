import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1> 404 </h1> <h3> Page Not Found </h3>
      <Button
        variant="contained"
        sx={{ mt: 2 }}
        onClick={() => navigate('/home')}
      >
        Go Back Home{' '}
      </Button>{' '}
    </div>
  );
};

export default NotFound;
