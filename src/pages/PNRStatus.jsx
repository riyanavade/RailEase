import React, { useState } from 'react';
import { Search, Train, Ticket, AlertCircle } from 'lucide-react';
import { getData } from '../utils/storage';

const PNRStatus = () => {
  const [pnrNumber, setPnrNumber] = useState('');
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCheckStatus = (e) => {
    e.preventDefault();
    if (pnrNumber.length !== 10) {
      setError('Please enter a valid 10-digit PNR number');
      return;
    }

    setLoading(true);
    setError('');
    setStatus(null);

    // Simulate API call and check local storage bookings
    setTimeout(() => {
      setLoading(false);
      const bookings = getData('bookings') || [];
      const isArray = Array.isArray(bookings);
      // Depending on storage structure, find the booking
      // storage utility saves it as array if multiple or object. Let's force array search.
      const bookingsArray = isArray ? bookings : [bookings];
      
      const foundBooking = bookingsArray.find(b => b && b.pnr === pnrNumber);
      
      if (foundBooking) {
        setStatus(foundBooking);
      } else {
        // Mock a response if not found in local DB (for demo purposes)
        if (pnrNumber.startsWith('1')) {
          setStatus({
            pnr: pnrNumber,
            train: { id: '12951', name: 'Mumbai Rajdhani', origin: 'MMCT', destination: 'NDLS', departureTime: '17:00' },
            date: new Date().toISOString(),
            status: 'CONFIRMED',
            passengers: [
              { name: 'Demo Passenger 1', age: 30, gender: 'Male', berthPreference: 'Lower' }
            ],
            selectedClass: '3A',
            fareDetails: { totalFare: 1800 }
          });
        } else {
          setError('Invalid PNR or PNR not found in database. (Try a PNR starting with 1)');
        }
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-bg py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-warm-900 dark:text-white mb-2">Check PNR Status</h1>
          <p className="text-warm-600 dark:text-warm-400">Enter your 10-digit PNR number to get the current booking status</p>
        </div>

        <div className="glass-card mb-8">
          <form onSubmit={handleCheckStatus} className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow">
              <label htmlFor="pnr" className="sr-only">PNR Number</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Ticket size={20} className="text-warm-400" />
                </div>
                <input
                  type="text"
                  id="pnr"
                  maxLength="10"
                  pattern="\d{10}"
                  required
                  className="input-field pl-10 text-lg py-3"
                  placeholder="Enter 10-digit PNR number"
                  value={pnrNumber}
                  onChange={(e) => setPnrNumber(e.target.value.replace(/\D/g, ''))}
                />
              </div>
            </div>
            <button 
              type="submit" 
              disabled={loading || pnrNumber.length !== 10} 
              className="btn-primary py-3 px-8 text-lg shrink-0"
            >
              {loading ? 'Checking...' : (
                <>
                  <Search size={20} />
                  Get Status
                </>
              )}
            </button>
          </form>
          {error && (
            <div className="mt-4 p-3 bg-cream-50 text-warm-600 rounded-lg text-sm flex items-start gap-2">
              <AlertCircle size={18} className="shrink-0 mt-0.5" />
              {error}
            </div>
          )}
        </div>

        {status && (
          <div className="animate-fade-in-up space-y-6">
            <div className="glass-card p-0 overflow-hidden">
              <div className="bg-primary-600 text-white p-4 flex flex-col md:flex-row justify-between items-center">
                <div>
                  <div className="text-sm text-primary-100">PNR Number</div>
                  <div className="text-2xl font-bold tracking-widest">{status.pnr}</div>
                </div>
                <div className="text-center md:text-right mt-2 md:mt-0">
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-bold
                    ${status.status === 'CONFIRMED' ? 'bg-cream-500 text-white' : 
                      status.status === 'CANCELLED' ? 'bg-cream-500 text-white' : 'bg-primary-100 text-white'}`}
                  >
                    {status.status}
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex flex-col md:flex-row justify-between mb-6 pb-6 border-b border-cream-300 dark:border-cream-300">
                  <div>
                    <h3 className="text-xl font-bold text-warm-900 dark:text-white flex items-center gap-2">
                      <Train size={20} className="text-primary-500" />
                      {status.train.name} ({status.train.id})
                    </h3>
                    <p className="text-warm-600 dark:text-warm-400 mt-1">
                      {status.train.origin} to {status.train.destination}
                    </p>
                  </div>
                  <div className="text-left md:text-right mt-4 md:mt-0">
                    <div className="text-sm text-warm-500 dark:text-warm-400">Journey Date</div>
                    <div className="font-bold text-warm-900 dark:text-white">
                      {new Date(status.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                    <div className="text-sm font-medium text-warm-700 dark:text-warm-300 mt-1">
                      Class: {status.selectedClass}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-warm-700 dark:text-warm-300 mb-3 uppercase tracking-wider text-xs">Passenger Information</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-cream-50 dark:bg-cream-800 text-sm">
                          <th className="p-3 font-medium text-warm-500 dark:text-warm-400 rounded-l-lg">Passenger</th>
                          <th className="p-3 font-medium text-warm-500 dark:text-warm-400">Booking Status</th>
                          <th className="p-3 font-medium text-warm-500 dark:text-warm-400 rounded-r-lg">Current Status</th>
                        </tr>
                      </thead>
                      <tbody className="text-sm">
                        {status.passengers.map((p, i) => (
                          <tr key={i} className="border-b border-cream-300 dark:border-cream-300 last:border-0">
                            <td className="p-3">
                              <div className="font-medium text-warm-900 dark:text-white">{p.name}</div>
                              <div className="text-xs text-warm-500">{p.age} Yrs • {p.gender}</div>
                            </td>
                            <td className="p-3 text-warm-700 dark:text-warm-300">
                              CNF / {['A1', 'B2', 'S4', 'C1'][i % 4]} / {22 + i} {p.berthPreference !== 'No Preference' ? `(${p.berthPreference.substring(0,2).toUpperCase()})` : ''}
                            </td>
                            <td className="p-3 font-bold text-primary-600">CONFIRMED</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center text-sm text-warm-500 dark:text-warm-400">
              Information last updated: {new Date().toLocaleTimeString()}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default PNRStatus;
