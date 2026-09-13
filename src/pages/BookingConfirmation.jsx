import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CheckCircle2, Download, Printer, Share2, ArrowRight } from 'lucide-react';
import TicketCard from '../components/TicketCard';

const BookingConfirmation = () => {
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    const data = sessionStorage.getItem('completedBooking');
    if (data) {
      setBooking(JSON.parse(data));
    } else {
      navigate('/');
    }
  }, [navigate]);

  if (!booking) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-bg py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Success Banner (Hidden on Print) */}
        <div className="glass-card mb-8 text-center animate-fade-in-up print:hidden bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-none shadow-emerald-500/20">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-md">
            <CheckCircle2 size={32} />
          </div>
          <h1 className="text-3xl font-bold mb-2">Booking Confirmed!</h1>
          <p className="text-primary-600 max-w-lg mx-auto">
            Your tickets have been successfully booked. An email and SMS with the ticket details have been sent to your registered contact details.
          </p>
        </div>

        {/* Action Buttons (Hidden on Print) */}
        <div className="flex flex-wrap justify-center gap-4 mb-8 print:hidden">
          <button 
            onClick={handlePrint}
            className="btn-secondary bg-white dark:bg-dark-card border-cream-300 dark:border-cream-300 hover:border-primary-500 hover:text-primary-600"
          >
            <Printer size={18} /> Print Ticket
          </button>
          <button className="btn-secondary bg-white dark:bg-dark-card border-cream-300 dark:border-cream-300 hover:border-primary-500 hover:text-primary-600">
            <Download size={18} /> Download PDF
          </button>
          <button className="btn-secondary bg-white dark:bg-dark-card border-cream-300 dark:border-cream-300 hover:border-primary-500 hover:text-primary-600">
            <Share2 size={18} /> Share
          </button>
        </div>

        {/* E-Ticket Display */}
        <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <TicketCard booking={booking} id="ticket-print-area" />
        </div>

        {/* Next Steps (Hidden on Print) */}
        <div className="mt-8 text-center print:hidden space-x-4">
          <Link to="/" className="btn-secondary inline-flex px-6 py-2.5">
            Book Another Ticket
          </Link>
          <Link to="/bookings" className="btn-primary inline-flex px-6 py-2.5 shadow-primary-500/25">
            Go to My Bookings <ArrowRight size={18} />
          </Link>
        </div>

      </div>
    </div>
  );
};

export default BookingConfirmation;
