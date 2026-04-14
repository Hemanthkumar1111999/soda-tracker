import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Dashboard from './components/Dashboard';
import ShopForm from './components/ShopForm';
import DeliveryForm from './components/DeliveryForm';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />{' '}
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/dashboard" element={<Dashboard />} />{' '}
        <Route path="/shop" element={<ShopForm />} />{' '}
        <Route path="/delivery" element={<DeliveryForm />} />{' '}
      </Routes>{' '}
    </BrowserRouter>
  );
}

export default App;
