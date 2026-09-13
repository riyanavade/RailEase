import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import TrainDetails from './pages/TrainDetails';
import PassengerDetails from './pages/PassengerDetails';
import Payment from './pages/Payment';
import BookingConfirmation from './pages/BookingConfirmation';
import Login from './pages/Login';
import Register from './pages/Register';
import PNRStatus from './pages/PNRStatus';
import MyBookings from './pages/MyBookings';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/train/:id" element={<TrainDetails />} />
            <Route path="/passenger-details" element={<PassengerDetails />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/booking-confirmation" element={<BookingConfirmation />} />
            <Route path="/pnr-status" element={<PNRStatus />} />
            <Route path="/bookings" element={<MyBookings />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* Add more routes as we build */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
