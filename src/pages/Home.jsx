import React from 'react';
import { Link } from 'react-router-dom';
import { Ticket, Search, CalendarCheck, ShieldCheck, Clock, Map, CreditCard, CheckCircle2, Train } from 'lucide-react';
import SearchBox from '../components/SearchBox';

const Home = () => {
  const quickActions = [
    { name: 'Search Trains', icon: Search, path: '/search', color: 'bg-primary-500' },
    { name: 'PNR Status', icon: Ticket, path: '/pnr-status', color: 'bg-primary-500' },
    { name: 'My Bookings', icon: CalendarCheck, path: '/bookings', color: 'bg-primary-500' },
    { name: 'Cancel Ticket', icon: ShieldCheck, path: '/cancellation', color: 'bg-primary-500' },
  ];

  const features = [
    { title: 'Easy Booking', desc: 'Book your train tickets in just a few clicks with our intuitive interface.', icon: Clock },
    { title: 'Live Availability', desc: 'Get real-time seat availability and instant confirmation.', icon: CheckCircle2 },
    { title: 'Secure Payment', desc: 'Multiple payment options with bank-grade security protocols.', icon: CreditCard },
    { title: 'Digital Tickets', desc: 'No need to print. Carry your E-Ticket on your mobile phone.', icon: Ticket },
  ];

  const popularRoutes = [
    { from: 'New Delhi', to: 'Mumbai', duration: '15h 30m', trains: 12, image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?q=80&w=600&auto=format&fit=crop' },
    { from: 'Bengaluru', to: 'Chennai', duration: '5h 45m', trains: 8, image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f7415e?q=80&w=600&auto=format&fit=crop' },
    { from: 'Kolkata', to: 'Delhi', duration: '17h 15m', trains: 6, image: 'https://images.unsplash.com/photo-1558431382-27e303142255?q=80&w=600&auto=format&fit=crop' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Clean White Hero Section */}
      <section className="relative pt-20 pb-32 bg-white overflow-hidden border-b border-cream-300">
        {/* Background Decorative Blur Highlights */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary-100/50 blur-3xl"></div>
          <div className="absolute top-20 -left-20 w-72 h-72 rounded-full bg-primary-100/40 blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-warm-900 tracking-tight mb-6 animate-fade-in-up">
            Travel Smarter. <span className="text-primary-600">Book Your Journey.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-warm-600 mb-10 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Search trains, compare schedules, and reserve your journey with ease across India's premium railway network.
          </p>
        </div>
      </section>

      {/* Search Section */}
      <section className="px-4 sm:px-6 lg:px-8 relative z-20">
        <SearchBox />
      </section>

      {/* Quick Actions */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {quickActions.map((action, index) => (
              <Link 
                key={action.name} 
                to={action.path}
                className="glass-card flex flex-col items-center justify-center text-center p-6 border border-cream-300 bg-white group hover:border-primary-500"
              >
                <div className={`w-14 h-14 rounded-full ${action.color} text-warm-900 flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                  <action.icon size={24} />
                </div>
                <h3 className="font-semibold text-warm-900">{action.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Routes */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-warm-900 mb-2">Popular Routes</h2>
              <p className="text-warm-600">Discover our most frequently traveled destinations.</p>
            </div>
            <Link to="/search" className="hidden md:flex text-primary-600 font-medium hover:underline items-center gap-1">
              View All Routes <Map size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {popularRoutes.map((route, index) => (
              <div key={index} className="group rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-300 border border-cream-300">
                <div className="relative h-48 overflow-hidden">
                  <img src={route.image} alt={`${route.from} to ${route.to}`} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-lg text-warm-900">{route.from} <span className="text-primary-600 mx-1">→</span> {route.to}</h3>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-warm-600 mb-6">
                    <span className="flex items-center gap-1"><Clock size={14} /> {route.duration}</span>
                    <span className="flex items-center gap-1"><Train size={14} /> {route.trains} Trains</span>
                  </div>
                  <Link to={`/search?from=${route.from}&to=${route.to}`} className="btn-secondary w-full">
                    Search Availability
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-primary-50 text-warm-900 overflow-hidden relative border-t border-cream-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-warm-900 mb-4">Why Choose RailEase?</h2>
            <p className="text-warm-700 text-lg">We provide a seamless and premium experience from searching to boarding your train.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 border border-cream-300 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-primary-500 text-warm-900 flex items-center justify-center mb-4 shadow-sm">
                  <feature.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-warm-900 mb-2">{feature.title}</h3>
                <p className="text-warm-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
