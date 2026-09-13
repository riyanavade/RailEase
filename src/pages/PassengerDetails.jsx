import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, UserPlus, Shield, ChevronRight } from 'lucide-react';
import { trains } from '../data/trains';
import { calculateFare } from '../utils/fareCalculator';
import ClassCard from '../components/ClassCard';
import PassengerForm from '../components/PassengerForm';
import FareSummary from '../components/FareSummary';
import { getData } from '../utils/storage';

const PassengerDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  
  const trainId = searchParams.get('train');
  const date = searchParams.get('date');
  const initialPassengersCount = parseInt(searchParams.get('passengers') || '1');

  const [train, setTrain] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  
  const [contactDetails, setContactDetails] = useState({
    mobile: '',
    email: ''
  });

  const emptyPassenger = {
    name: '', age: '', gender: '', berthPreference: 'No Preference', nationality: 'Indian'
  };

  const [passengers, setPassengers] = useState(
    Array(initialPassengersCount).fill({ ...emptyPassenger })
  );

  const [fareDetails, setFareDetails] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const user = getData('user');
    if (user) {
      setContactDetails({
        mobile: user.phone || '9876543210',
        email: user.email || ''
      });
      setPassengers(prev => {
        const newPassengers = [...prev];
        if (newPassengers[0].name === '') {
          newPassengers[0] = {
            ...newPassengers[0],
            name: user.name,
            gender: user.gender || 'Male',
            age: user.age || '28',
          };
        }
        return newPassengers;
      });
    }

    const foundTrain = trains.find(t => t.id === trainId) || trains[0];
    if (foundTrain) {
      setTrain(foundTrain);
      const availableClass = Object.keys(foundTrain.availability).find(
        c => foundTrain.availability[c].status !== 'NOT AVAILABLE'
      ) || '3A';
      if (availableClass) setSelectedClass(availableClass);
    }
  }, [trainId]);

  useEffect(() => {
    if (train && selectedClass) {
      const details = calculateFare(train.baseFare, train.type, selectedClass, passengers.length);
      setFareDetails(details);
    }
  }, [train, selectedClass, passengers.length]);

  const formattedDate = date ? new Date(date).toLocaleDateString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric', year: 'numeric'
  }) : 'Today';

  const handlePassengerChange = (index, updatedPassenger) => {
    const newPassengers = [...passengers];
    newPassengers[index] = updatedPassenger;
    setPassengers(newPassengers);
  };

  const handleAddPassenger = () => {
    if (passengers.length < 6) {
      setPassengers([...passengers, { ...emptyPassenger }]);
    }
  };

  const handleRemovePassenger = (index) => {
    if (passengers.length > 1) {
      const newPassengers = passengers.filter((_, i) => i !== index);
      setPassengers(newPassengers);
    }
  };

  const handleContactChange = (e) => {
    setContactDetails({
      ...contactDetails,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedClass) {
      alert("Please select a travel class");
      return;
    }
    
    // Validate passengers
    for (let i = 0; i < passengers.length; i++) {
      const p = passengers[i];
      if (!p.name || !p.age || !p.gender) {
        alert(`Please fill all mandatory details for Passenger ${i + 1}`);
        return;
      }
    }

    if (!contactDetails.mobile || !contactDetails.email) {
      alert("Please provide contact details");
      return;
    }

    // Save booking data temporarily
    const bookingData = {
      train,
      date,
      selectedClass,
      passengers,
      contactDetails,
      fareDetails
    };
    sessionStorage.setItem('currentBooking', JSON.stringify(bookingData));
    
    navigate('/payment');
  };

  if (!train) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-200 border-t-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-12">
      {/* Header */}
      <div className="bg-primary-500 text-gray-900 pt-6 pb-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-800 hover:text-gray-900 font-bold transition-colors mb-6">
            <ArrowLeft size={18} /> Back
          </button>
          
          <h1 className="text-3xl font-extrabold mb-2 text-gray-900">Passenger Details</h1>
          <div className="flex items-center gap-2 text-gray-800 font-medium">
            <span>{train.name} ({train.id})</span>
            <ChevronRight size={16} />
            <span>{train.origin} → {train.destination}</span>
            <span className="mx-2">•</span>
            <span>{formattedDate}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
        <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-8">
          
          {/* Main Content Area */}
          <div className="flex-grow space-y-6">
            
            {/* Class Selection */}
            <div className="glass-card bg-white border border-gray-200 shadow-md">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Select Class</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Object.keys(train.availability).map(cls => (
                  <ClassCard 
                    key={cls}
                    className={
                      cls === '1A' ? 'First AC' : 
                      cls === '2A' ? 'Second AC' : 
                      cls === '3A' ? 'Third AC' : 
                      cls === 'SL' ? 'Sleeper' : 
                      cls === 'CC' ? 'AC Chair Car' : 'Second Sitting'
                    }
                    classCode={cls}
                    price={train.baseFare * (cls === '1A' ? 4 : cls === '2A' ? 2.5 : cls === '3A' ? 2 : cls === 'CC' ? 1.5 : 1)}
                    availability={train.availability[cls]}
                    isSelected={selectedClass === cls}
                    onSelect={setSelectedClass}
                  />
                ))}
              </div>
            </div>

            {/* Passenger Details */}
            <div className="glass-card bg-white border border-gray-200 shadow-md">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Passenger Details</h2>
                {passengers.length < 6 && (
                  <button 
                    type="button" 
                    onClick={handleAddPassenger}
                    className="flex items-center gap-2 text-primary-700 font-bold hover:bg-primary-50 px-3 py-1.5 rounded-lg transition-colors border border-primary-300"
                  >
                    <UserPlus size={18} /> Add Passenger
                  </button>
                )}
              </div>
              
              {passengers.map((passenger, index) => (
                <PassengerForm 
                  key={index}
                  index={index}
                  passenger={passenger}
                  onChange={handlePassengerChange}
                  onRemove={handleRemovePassenger}
                  canRemove={passengers.length > 1}
                />
              ))}
              
              {passengers.length >= 6 && (
                <p className="text-sm text-amber-700 font-semibold mt-2">Maximum 6 passengers allowed per booking.</p>
              )}
            </div>

            {/* Contact Details */}
            <div className="glass-card bg-white border border-gray-200 shadow-md">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Contact Details</h2>
              <p className="text-sm text-gray-600 mb-4">Ticket confirmation & E-ticket will be sent to these contact details.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">Mobile Number</label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-gray-300 bg-gray-100 text-gray-800 font-bold text-sm">
                      +91
                    </span>
                    <input
                      type="tel"
                      name="mobile"
                      value={contactDetails.mobile}
                      onChange={handleContactChange}
                      className="input-field rounded-l-none py-2.5"
                      placeholder="10-digit mobile number"
                      required
                      pattern="[0-9]{10}"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">Email ID</label>
                  <input
                    type="email"
                    name="email"
                    value={contactDetails.email}
                    onChange={handleContactChange}
                    className="input-field py-2.5"
                    placeholder="E.g. user@example.com"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Travel Insurance */}
            <div className="glass-card bg-white border border-gray-200 shadow-md">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary-100 text-primary-800 rounded-xl">
                  <Shield size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Travel Insurance (Incl. of GST)</h3>
                  <p className="text-sm text-gray-600 mb-3">Do you want to take Travel Insurance (₹0.35/person)?</p>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="insurance" defaultChecked className="text-primary-600" />
                      <span className="text-sm font-semibold text-gray-800">Yes, and I accept the terms</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="insurance" className="text-primary-600" />
                      <span className="text-sm font-semibold text-gray-800">No, I don't want insurance</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
          </div>

          {/* Sidebar / Fare Summary */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="sticky top-24">
              <div className="glass-card bg-white border border-gray-200 shadow-md mb-4 p-5 border-l-4 border-l-primary-500">
                <h3 className="font-bold text-lg text-gray-900 mb-2">{train.name}</h3>
                <div className="text-sm text-gray-700 mb-4">
                  <div>{train.origin} → {train.destination}</div>
                  <div className="font-semibold text-gray-900 mt-1">{formattedDate}</div>
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <span className="px-2.5 py-1 bg-gray-100 text-gray-900 rounded-md">Class: {selectedClass || 'Not Selected'}</span>
                  <span className="px-2.5 py-1 bg-gray-100 text-gray-900 rounded-md">Qty: {passengers.length}</span>
                </div>
              </div>
              
              <FareSummary fareDetails={fareDetails} />
              
              <button 
                type="submit" 
                className="w-full btn-primary py-3.5 text-lg font-bold mt-6 shadow-md"
              >
                Continue to Payment
              </button>
            </div>
          </div>
          
        </form>
      </div>
    </div>
  );
};

export default PassengerDetails;
