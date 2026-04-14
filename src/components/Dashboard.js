import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Grid,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../services/firebase';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';

const Dashboard = () => {
  const [shops, setShops] = useState([]);
  const [deliveries, setDeliveries] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const navigate = useNavigate();

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch shops
  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'shops'), (snapshot) => {
      setShops(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsub();
  }, []);

  // Fetch deliveries
  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'deliveries'), (snapshot) => {
      setDeliveries(
        snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    });

    return () => unsub();
  }, []);

  // Total cases
  const totalCases = deliveries.reduce((sum, d) => sum + d.cases, 0);

  // Cases per shop
  const casesPerShop = shops.map((shop) => {
    const total = deliveries
      .filter((d) => d.shopId === shop.id)
      .reduce((sum, d) => sum + d.cases, 0);

    return { name: shop.name, total };
  });

  // Filter deliveries by selected date
  const filteredDeliveries = deliveries.filter((delivery) => {
    const deliveryDate =
      delivery.deliveredAt && delivery.deliveredAt.toDate
        ? delivery.deliveredAt.toDate().toISOString().split('T')[0]
        : '';
    return deliveryDate === selectedDate;
  });

  // Get shop name by id
  const getShopName = (shopId) => {
    const shop = shops.find((s) => s.id === shopId);
    return shop ? shop.name : 'Unknown Shop';
  };

  // Generate PDF
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text(`Delivery Report for ${selectedDate}`, 10, 10);
    let y = 20;
    filteredDeliveries.forEach((delivery, index) => {
      const date =
        delivery.deliveredAt && delivery.deliveredAt.toDate
          ? delivery.deliveredAt.toDate().toLocaleString()
          : 'N/A';
      doc.text(
        `${index + 1}. Shop: ${getShopName(delivery.shopId)}, Cases: ${delivery.cases}, Date: ${date}`,
        10,
        y
      );
      y += 10;
    });
    doc.save(`delivery-report-${selectedDate}.pdf`);
  };

  return (
    <div style={{ padding: 20 }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 20,
        }}
      >
        <h2> Dashboard </h2>{' '}
        <div>
          <p style={{ margin: 0, fontSize: '18px' }}>
            {' '}
            {currentTime.toLocaleDateString()}{' '}
          </p>{' '}
          <p style={{ margin: 0, fontSize: '16px' }}>
            {' '}
            {currentTime.toLocaleTimeString()}{' '}
          </p>{' '}
        </div>{' '}
      </div>
      <div style={{ marginBottom: 20 }}>
        <Button
          variant="outlined"
          onClick={() => navigate('/home')}
          style={{ marginRight: 10 }}
        >
          Back to Home{' '}
        </Button>{' '}
        <Button
          variant="outlined"
          onClick={() => navigate('/shop')}
          style={{ marginRight: 10 }}
        >
          Add Shop{' '}
        </Button>{' '}
        <Button variant="outlined" onClick={() => navigate('/delivery')}>
          Add Delivery{' '}
        </Button>{' '}
      </div>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <h3> Total Shops </h3> <p> {shops.length} </p>{' '}
            </CardContent>{' '}
          </Card>{' '}
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <h3> Total Deliveries </h3> <p> {deliveries.length} </p>{' '}
            </CardContent>{' '}
          </Card>{' '}
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <h3> Total Cases Delivered </h3> <p> {totalCases} </p>{' '}
            </CardContent>{' '}
          </Card>{' '}
        </Grid>{' '}
      </Grid>
      <h3 style={{ marginTop: 20 }}> Cases Per Shop </h3>{' '}
      {casesPerShop.map((shop, index) => (
        <Card key={index} sx={{ mt: 1 }}>
          <CardContent>
            {' '}
            {shop.name}: {shop.total}
            cases{' '}
          </CardContent>{' '}
        </Card>
      ))}
      <h3 style={{ marginTop: 20 }}> Delivery History </h3>{' '}
      <TextField
        label="Select Date"
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        sx={{ mb: 2 }}
        InputLabelProps={{
          shrink: true,
        }}
      />{' '}
      <Button variant="contained" onClick={downloadPDF} sx={{ mb: 2 }}>
        Download PDF Report{' '}
      </Button>{' '}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell> Shop </TableCell> <TableCell> Cases </TableCell>{' '}
              <TableCell> Date & Time </TableCell>{' '}
            </TableRow>{' '}
          </TableHead>{' '}
          <TableBody>
            {' '}
            {filteredDeliveries.map((delivery) => (
              <TableRow key={delivery.id}>
                <TableCell> {getShopName(delivery.shopId)} </TableCell>{' '}
                <TableCell> {delivery.cases} </TableCell>{' '}
                <TableCell>
                  {' '}
                  {delivery.deliveredAt && delivery.deliveredAt.toDate
                    ? delivery.deliveredAt.toDate().toLocaleString()
                    : 'N/A'}{' '}
                </TableCell>{' '}
              </TableRow>
            ))}{' '}
          </TableBody>{' '}
        </Table>{' '}
      </TableContainer>{' '}
    </div>
  );
};

export default Dashboard;
