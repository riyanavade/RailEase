import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRightLeft, Calendar, Users, Briefcase, Search } from 'lucide-react';
import StationInput from './StationInput';

const SearchBox = () => {
  const navigate = useNavigate();
  const todayStr = new Date().toISOString().split('T')[0];

  const [from, setFrom] = useState({ code: 'NDLS', name: 'New Delhi' });
  const [to, setTo] = useState({ code: 'MMCT', name: 'Mumbai Central' });
  const [date, setDate] = useState(todayStr);
  const [travelClass, setTravelClass] = useState('All Classes');
  const [passengers, setPassengers] = useState(1);
  const [error, setError] = useState('');

  const handleSwap = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  const handleSearch = (e) => {
    e.preventDefault();

    const fromCode = from ? (from.code || from) : 'NDLS';
    const toCode = to ? (to.code || to) : 'MMCT';
    const searchDate = date || todayStr;

    if (fromCode.toUpperCase() === toCode.toUpperCase()) {
      setError('From and To stations cannot be the same');
      return;
    }

    setError('');
    const searchParams = new URLSearchParams({
      from: typeof fromCode === 'string' ? fromCode : 'NDLS',
      to: typeof toCode === 'string' ? toCode : 'MMCT',
      date: searchDate,
      class: travelClass,
      passengers
    });
    navigate(`/search?${searchParams.toString()}`);
  };

  return (
    <div className="glass-card w-full max-w-4xl mx-auto -mt-16 relative z-10 border-t-4 border-t-primary-500 bg-white shadow-xl">
      <form onSubmit={handleSearch}>
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm font-semibold border border-red-200">
            {error}
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_auto_1fr] gap-4 items-end mb-6">
          <StationInput 
            id="from"
            label="From Station" 
            placeholder="E.g., New Delhi (NDLS)" 
            value={from}
            onChange={setFrom}
          />
          
          <div className="flex justify-center md:pb-2">
            <button 
              type="button"
              onClick={handleSwap}
              className="p-3 bg-primary-50 text-primary-700 border border-primary-300 rounded-full hover:bg-primary-100 transition-colors shadow-sm"
              title="Swap stations"
            >
              <ArrowRightLeft size={20} />
            </button>
          </div>
          
          <StationInput 
            id="to"
            label="To Station" 
            placeholder="E.g., Mumbai Central (MMCT)" 
            value={to}
            onChange={setTo}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label htmlFor="date" className="block text-sm font-bold text-gray-800 mb-1.5">
              Journey Date
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Calendar size={18} className="text-gray-500" />
              </div>
              <input
                type="date"
                id="date"
                min={todayStr}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>

          <div>
            <label htmlFor="class" className="block text-sm font-bold text-gray-800 mb-1.5">
              Travel Class
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Briefcase size={18} className="text-gray-500" />
              </div>
              <select
                id="class"
                value={travelClass}
                onChange={(e) => setTravelClass(e.target.value)}
                className="input-field pl-10 appearance-none bg-white text-gray-900"
              >
                <option value="All Classes">All Classes</option>
                <option value="1A">AC First Class (1A)</option>
                <option value="2A">AC 2 Tier (2A)</option>
                <option value="3A">AC 3 Tier (3A)</option>
                <option value="CC">AC Chair Car (CC)</option>
                <option value="SL">Sleeper (SL)</option>
                <option value="2S">Second Sitting (2S)</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="passengers" className="block text-sm font-bold text-gray-800 mb-1.5">
              Passengers
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Users size={18} className="text-gray-500" />
              </div>
              <select
                id="passengers"
                value={passengers}
                onChange={(e) => setPassengers(Number(e.target.value))}
                className="input-field pl-10 appearance-none bg-white text-gray-900"
              >
                {[1, 2, 3, 4, 5, 6].map(num => (
                  <option key={num} value={num}>{num} {num === 1 ? 'Passenger' : 'Passengers'}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <button 
          type="submit" 
          className="w-full btn-primary py-3.5 text-lg font-bold"
        >
          <Search size={22} />
          Search Trains
        </button>
      </form>
    </div>
  );
};

export default SearchBox;
