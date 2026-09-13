import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Train, User, Menu, X, HelpCircle, Ticket, CalendarClock, LogOut } from 'lucide-react';
import { getData, deleteData } from '../utils/storage';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    document.documentElement.classList.remove('dark');
    localStorage.theme = 'light';
    setUser(getData('user'));
  }, [location]);

  const handleLogout = () => {
    deleteData('user');
    setUser(null);
  };

  const navLinks = [
    { name: 'Home', path: '/', icon: Train },
    { name: 'Search Trains', path: '/search', icon: CalendarClock },
    { name: 'PNR Status', path: '/pnr-status', icon: Ticket },
    { name: 'Help', path: '/help', icon: HelpCircle },
  ];

  if (user) {
    navLinks.splice(3, 0, { name: 'My Bookings', path: '/bookings', icon: CalendarClock });
  }

  const isActive = (path) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="glass-nav border-b border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-primary-500 p-2 rounded-xl text-gray-900 shadow-md group-hover:scale-105 transition-transform">
                <Train size={24} strokeWidth={2.5} />
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-gray-900">
                Rail<span className="text-primary-600">Ease</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5
                  ${isActive(link.path)
                    ? 'bg-primary-100 text-primary-800'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`}
              >
                <link.icon size={16} className={isActive(link.path) ? 'text-primary-700' : 'text-gray-500'} />
                {link.name}
              </Link>
            ))}

            <div className="h-6 w-px bg-gray-300 mx-2"></div>

            {user ? (
              <div className="flex items-center gap-3 ml-2">
                <Link to={user.role === 'admin' ? '/admin' : '/profile'} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <img src={user.avatar} alt="Avatar" className="w-8 h-8 rounded-full shadow-sm border border-gray-200" />
                  <span className="text-sm font-bold text-gray-900">{user.name.split(' ')[0]}</span>
                </Link>
                <button onClick={handleLogout} className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors" title="Log out">
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3 ml-2">
                <Link to="/login" className="text-sm font-semibold text-gray-800 hover:text-primary-600 transition-colors px-2 py-1">
                  Log in
                </Link>
                <Link to="/register" className="btn-primary text-sm py-2 px-4 shadow-sm">
                  Sign up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-gray-800 hover:bg-gray-100 transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden glass border-t border-gray-200 absolute w-full bg-white shadow-xl">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-3 rounded-lg text-base font-semibold flex items-center gap-3
                  ${isActive(link.path)
                    ? 'bg-primary-100 text-primary-800'
                    : 'text-gray-800 hover:bg-gray-100'
                  }`}
              >
                <link.icon size={20} />
                {link.name}
              </Link>
            ))}
            
            <div className="border-t border-gray-200 my-4 pt-4">
              {user ? (
                <>
                  <Link 
                    to={user.role === 'admin' ? '/admin' : '/profile'}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-100 transition-colors text-gray-900 font-bold"
                  >
                    <img src={user.avatar} alt="Avatar" className="w-10 h-10 rounded-full" />
                    Profile ({user.name})
                  </Link>
                  <button 
                    onClick={() => { handleLogout(); setIsOpen(false); }}
                    className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-gray-700 hover:bg-gray-100 font-bold mt-2"
                  >
                    <LogOut size={20} />
                    Logout
                  </button>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-4 px-3">
                  <Link to="/login" onClick={() => setIsOpen(false)} className="btn-secondary text-center py-2.5 font-bold">
                    Log in
                  </Link>
                  <Link to="/register" onClick={() => setIsOpen(false)} className="btn-primary text-center py-2.5 font-bold">
                    Sign up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
