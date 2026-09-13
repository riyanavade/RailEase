import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CalendarCheck, ShieldCheck, FileDown, SearchX, XCircle } from 'lucide-react';
import { getData, updateData } from '../utils/storage';

const MyBookings = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('upcoming');
  const [bookings, setBookings] = useState([]);
  const [user, setUser] = useState(null);

  // Cancellation Modal State
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [bookingToCancel, setBookingToCancel] = useState(null);

  useEffect(() => {
    const currentUser = getData('user');
    if (!currentUser) {
      navigate('/login');
      return;
    }
    setUser(currentUser);

    const storedBookings = getData('bookings');
    if (storedBookings) {
      const bookingsArray = Array.isArray(storedBookings) ? storedBookings : [storedBookings];
      setBookings(bookingsArray.reverse()); // Newest first
    }
  }, [navigate]);

  const filteredBookings = bookings.filter(b => {
    if (!b) return false;
    const isPast = new Date(b.date) < new Date();
    const isCancelled = b.status === 'CANCELLED';
    
    if (activeTab === 'cancelled') return isCancelled;
    if (activeTab === 'completed') return isPast && !isCancelled;
    return !isPast && !isCancelled;
  });

  const handleCancelClick = (booking) => {
    setBookingToCancel(booking);
    setIsCancelModalOpen(true);
  };

  const confirmCancellation = () => {
    const updatedBookings = bookings.map(b => {
      if (b.pnr === bookingToCancel.pnr) {
        return { ...b, status: 'CANCELLED' };
      }
      return b;
    });
    
    // In a real app we'd save this to DB. Here we overwrite the whole array in local storage.
    // However, our updateData appends. Let's rewrite the whole bookings array directly:
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
    
    setBookings(updatedBookings);
    setIsCancelModalOpen(false);
    setBookingToCancel(null);
  };

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-bg py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <h1 className="text-3xl font-bold text-warm-900 dark:text-white mb-8">My Bookings</h1>

        {/* Tabs */}
        <div className="flex border-b border-cream-300 dark:border-cream-300 mb-8 overflow-x-auto">
          {['upcoming', 'completed', 'cancelled'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 px-6 font-medium text-sm whitespace-nowrap capitalize transition-colors
                ${activeTab === tab 
                  ? 'border-b-2 border-primary-600 text-primary-600 dark:border-primary-400 dark:text-primary-400' 
                  : 'text-warm-500 hover:text-warm-700 dark:text-warm-400 dark:hover:text-warm-200'}`}
            >
              {tab} Bookings
            </button>
          ))}
        </div>

        {/* Bookings List */}
        {filteredBookings.length === 0 ? (
          <div className="glass-card text-center py-20">
            <div className="w-20 h-20 bg-cream-100 dark:bg-cream-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <SearchX size={32} className="text-warm-400" />
            </div>
            <h3 className="text-xl font-bold text-warm-900 dark:text-white mb-2">No {activeTab} bookings</h3>
            <p className="text-warm-500 dark:text-warm-400 max-w-md mx-auto mb-6">
              You don't have any {activeTab} trips in your history right now.
            </p>
            {activeTab === 'upcoming' && (
              <Link to="/search" className="btn-primary mx-auto inline-flex">
                Plan a Journey
              </Link>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {filteredBookings.map((booking, idx) => (
              <div key={idx} className="glass-card p-0 overflow-hidden relative">
                {/* Status indicator strip */}
                <div className={`absolute top-0 left-0 w-1.5 h-full z-10
                  ${booking.status === 'CONFIRMED' ? 'bg-cream-500' : 
                    booking.status === 'CANCELLED' ? 'bg-cream-500' : 'bg-primary-500'}`}
                ></div>
                
                <div className="p-6 pl-8">
                  <div className="flex flex-col lg:flex-row justify-between gap-6">
                    
                    {/* Journey Details */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-bold bg-cream-100 dark:bg-cream-800 px-2 py-0.5 rounded text-warm-600 dark:text-warm-300">
                          PNR: {booking.pnr}
                        </span>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded
                          ${booking.status === 'CONFIRMED' ? 'bg-cream-100 text-primary-600 dark:bg-cream-900/30 dark:text-primary-600' : 
                            booking.status === 'CANCELLED' ? 'bg-cream-100 text-warm-700 dark:bg-cream-900/30 dark:text-warm-400' : 
                            'bg-primary-100 text-primary-700'}`}
                        >
                          {booking.status}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-warm-900 dark:text-white mb-1">
                        {booking.train.name} ({booking.train.id})
                      </h3>
                      <div className="text-warm-600 dark:text-warm-400 text-sm flex items-center gap-2 mb-4">
                        {booking.train.origin} <ArrowRight size={14} /> {booking.train.destination}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-warm-500 dark:text-warm-400 text-xs uppercase tracking-wider mb-1">Journey Date</div>
                          <div className="font-semibold text-warm-900 dark:text-white">
                            {new Date(booking.date).toLocaleDateString('en-GB')}
                          </div>
                        </div>
                        <div>
                          <div className="text-warm-500 dark:text-warm-400 text-xs uppercase tracking-wider mb-1">Passengers</div>
                          <div className="font-semibold text-warm-900 dark:text-white">
                            {booking.passengers.length} ({booking.selectedClass})
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col justify-end gap-3 lg:w-48 border-t lg:border-t-0 lg:border-l border-cream-300 dark:border-cream-300 pt-4 lg:pt-0 lg:pl-6 mt-4 lg:mt-0">
                      <div className="mb-2">
                        <div className="text-warm-500 dark:text-warm-400 text-xs uppercase tracking-wider mb-1">Total Fare</div>
                        <div className="font-bold text-xl text-primary-600 dark:text-primary-400">
                          ₹{booking.fareDetails.totalFare + 30}
                        </div>
                      </div>
                      
                      {booking.status !== 'CANCELLED' && (
                        <>
                          <button className="btn-primary w-full py-2 text-sm flex justify-center gap-2">
                            <FileDown size={16} /> Ticket
                          </button>
                          {activeTab === 'upcoming' && (
                            <button 
                              onClick={() => handleCancelClick(booking)}
                              className="w-full py-2 text-sm font-medium text-warm-600 dark:text-warm-400 border border-cream-300 dark:border-cream-300/50 hover:bg-cream-50 dark:hover:bg-cream-900/20 rounded-lg transition-colors"
                            >
                              Cancel Ticket
                            </button>
                          )}
                        </>
                      )}
                    </div>

                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Cancellation Modal */}
      {isCancelModalOpen && bookingToCancel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-cream-900/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-dark-card rounded-2xl shadow-2xl max-w-lg w-full p-6 animate-fade-in-up border border-cream-300 dark:border-cream-300">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3 text-warm-600 dark:text-warm-500">
                <XCircle size={28} />
                <h2 className="text-xl font-bold">Cancel Ticket?</h2>
              </div>
              <button onClick={() => setIsCancelModalOpen(false)} className="text-warm-400 hover:text-warm-600">
                ✕
              </button>
            </div>
            
            <p className="text-warm-600 dark:text-warm-400 mb-4">
              Are you sure you want to cancel the ticket for <strong>{bookingToCancel.train.name}</strong> on <strong>{new Date(bookingToCancel.date).toLocaleDateString()}</strong>?
            </p>
            
            <div className="bg-cream-50 dark:bg-cream-800/50 p-4 rounded-lg mb-6 border border-cream-300 dark:border-cream-300">
              <h4 className="font-semibold text-sm mb-2 text-warm-900 dark:text-white">Cancellation Policy</h4>
              <ul className="text-sm text-warm-600 dark:text-warm-400 space-y-1 list-disc pl-4">
                <li>Cancellation fee of ₹120 per passenger will be deducted.</li>
                <li>Refund will be credited to the original payment source within 3-5 working days.</li>
              </ul>
              <div className="mt-4 pt-3 border-t border-cream-300 dark:border-cream-300 flex justify-between font-bold">
                <span className="text-warm-900 dark:text-white">Estimated Refund:</span>
                <span className="text-primary-600 dark:text-primary-600">
                  ₹{(bookingToCancel.fareDetails.totalFare + 30) - (120 * bookingToCancel.passengers.length)}
                </span>
              </div>
            </div>
            
            <div className="flex gap-4">
              <button onClick={() => setIsCancelModalOpen(false)} className="flex-1 btn-secondary">
                No, Keep Ticket
              </button>
              <button onClick={confirmCancellation} className="flex-1 bg-cream-600 hover:bg-cream-700 text-white font-medium py-2 px-4 rounded-lg shadow-sm transition-colors">
                Yes, Cancel Ticket
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

// ArrowRight Helper (reused inside component)
const ArrowRight = ({ size, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M5 12h14"></path>
    <path d="m12 5 7 7-7 7"></path>
  </svg>
);

export default MyBookings;
