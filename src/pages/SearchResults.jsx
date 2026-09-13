import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, SlidersHorizontal, Train as TrainIcon, X } from 'lucide-react';
import TrainCard from '../components/TrainCard';
import TrainFilters from '../components/TrainFilters';
import { searchTrains } from '../data/trains';
import { searchStations } from '../data/stations';

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  
  const todayStr = new Date().toISOString().split('T')[0];
  const fromCode = searchParams.get('from') || 'NDLS';
  const toCode = searchParams.get('to') || 'MMCT';
  const date = searchParams.get('date') || todayStr;
  const passengers = parseInt(searchParams.get('passengers') || '1');
  const selectedClass = searchParams.get('class') || 'All Classes';

  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fromName, setFromName] = useState(fromCode);
  const [toName, setToName] = useState(toCode);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Filters state
  const [filters, setFilters] = useState({
    classes: selectedClass !== 'All Classes' ? [selectedClass] : [],
    types: [],
    departureTimes: []
  });

  // Sorting state
  const [sortBy, setSortBy] = useState('departure'); // 'departure', 'arrival', 'duration', 'price'

  useEffect(() => {
    // Fetch full station names
    const fromStation = searchStations(fromCode)[0];
    const toStation = searchStations(toCode)[0];
    if (fromStation) setFromName(fromStation.name);
    if (toStation) setToName(toStation.name);

    // Simulate API delay
    setLoading(true);
    setTimeout(() => {
      const results = searchTrains(fromCode, toCode, date);
      setTrains(results);
      setLoading(false);
    }, 1000);
  }, [fromCode, toCode, date]);

  // Filtering Logic
  const filteredTrains = useMemo(() => {
    return trains.filter(train => {
      // Class filter
      if (filters.classes.length > 0) {
        const hasClass = filters.classes.some(c => Object.keys(train.availability).includes(c));
        if (!hasClass) return false;
      }
      
      // Type filter
      if (filters.types.length > 0 && !filters.types.includes(train.type)) {
        return false;
      }

      // Departure time filter
      if (filters.departureTimes.length > 0) {
        const hour = parseInt(train.departureTime.split(':')[0]);
        let timeCategory = '';
        if (hour >= 6 && hour < 12) timeCategory = 'morning';
        else if (hour >= 12 && hour < 18) timeCategory = 'afternoon';
        else if (hour >= 18 && hour < 24) timeCategory = 'evening';
        else timeCategory = 'night';

        if (!filters.departureTimes.includes(timeCategory)) return false;
      }

      return true;
    });
  }, [trains, filters]);

  // Sorting Logic
  const sortedAndFilteredTrains = useMemo(() => {
    return [...filteredTrains].sort((a, b) => {
      switch (sortBy) {
        case 'departure':
          return a.departureTime.localeCompare(b.departureTime);
        case 'arrival':
          return a.arrivalTime.localeCompare(b.arrivalTime);
        case 'duration':
          // Convert duration like "15h 30m" to minutes for sorting
          const getMins = (dur) => {
            const hMatch = dur.match(/(\d+)h/);
            const mMatch = dur.match(/(\d+)m/);
            return (hMatch ? parseInt(hMatch[1]) * 60 : 0) + (mMatch ? parseInt(mMatch[1]) : 0);
          };
          return getMins(a.duration) - getMins(b.duration);
        case 'price':
          return a.baseFare - b.baseFare;
        default:
          return 0;
      }
    });
  }, [filteredTrains, sortBy]);

  // Format date nicely
  const formattedDate = date ? new Date(date).toLocaleDateString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric', year: 'numeric'
  }) : '';

  if (!fromCode || !toCode || !date) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4 text-center">
        <TrainIcon size={64} className="text-warm-300 mb-4" />
        <h2 className="text-2xl font-bold text-warm-700 dark:text-warm-200 mb-2">Invalid Search Parameters</h2>
        <p className="text-warm-500 mb-6">Please go back and try searching again.</p>
        <button onClick={() => navigate('/')} className="btn-primary">Back to Home</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-bg pb-12">
      {/* Search Summary Header */}
      <div className="bg-primary-600 text-white pt-6 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-4">
            <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <ArrowLeft size={24} />
            </button>
            <div>
              <div className="flex items-center gap-2 text-xl md:text-2xl font-bold">
                {fromName} <ArrowRight size={20} className="text-primary-200" /> {toName}
              </div>
              <div className="text-primary-100 text-sm md:text-base mt-1">
                {formattedDate} • {passengers} {passengers === 1 ? 'Passenger' : 'Passengers'} {selectedClass !== 'All Classes' && ` • ${selectedClass}`}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block w-72 flex-shrink-0">
            <TrainFilters filters={filters} setFilters={setFilters} />
          </div>

          {/* Main Content Area */}
          <div className="flex-grow">
            
            {/* Sorting & Mobile Filter Toggle */}
            <div className="glass-card mb-6 p-4 flex flex-wrap items-center justify-between gap-4">
              <button 
                onClick={() => setShowMobileFilters(true)}
                className="lg:hidden flex items-center gap-2 btn-secondary py-2"
              >
                <SlidersHorizontal size={18} /> Filters
              </button>
              
              <div className="flex items-center gap-3 ml-auto">
                <label className="text-sm font-medium text-warm-700 dark:text-warm-300">Sort By:</label>
                <select 
                  className="input-field py-2 bg-white dark:bg-dark-card w-auto"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="departure">Departure Time</option>
                  <option value="arrival">Arrival Time</option>
                  <option value="duration">Travel Duration</option>
                  <option value="price">Lowest Fare</option>
                </select>
              </div>
            </div>

            {/* Results List */}
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="glass-card h-48 animate-pulse flex flex-col">
                    <div className="h-16 border-b border-cream-300 dark:border-cream-300 p-4 flex justify-between">
                      <div className="w-1/3 h-6 bg-cream-200 dark:bg-cream-700 rounded"></div>
                      <div className="w-1/4 h-6 bg-cream-200 dark:bg-cream-700 rounded"></div>
                    </div>
                    <div className="p-4 flex-grow flex gap-4">
                      <div className="w-24 h-24 bg-cream-200 dark:bg-cream-700 rounded"></div>
                      <div className="w-24 h-24 bg-cream-200 dark:bg-cream-700 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : sortedAndFilteredTrains.length > 0 ? (
              <div className="space-y-4">
                <div className="text-sm font-medium text-warm-500 mb-2">
                  Showing {sortedAndFilteredTrains.length} {sortedAndFilteredTrains.length === 1 ? 'train' : 'trains'}
                </div>
                {sortedAndFilteredTrains.map(train => (
                  <TrainCard 
                    key={train.id} 
                    train={train} 
                    journeyDate={date} 
                    passengers={passengers} 
                  />
                ))}
              </div>
            ) : (
              <div className="glass-card text-center py-16">
                <div className="w-20 h-20 bg-cream-100 dark:bg-cream-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrainIcon size={32} className="text-warm-400" />
                </div>
                <h3 className="text-xl font-bold text-warm-900 dark:text-white mb-2">No Trains Found</h3>
                <p className="text-warm-500 dark:text-warm-400 max-w-md mx-auto mb-6">
                  We couldn't find any trains matching your search criteria. Try adjusting your filters or changing the journey date.
                </p>
                <button 
                  onClick={() => setFilters({ classes: [], types: [], departureTimes: [] })}
                  className="btn-secondary mx-auto"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Modal */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 flex flex-col bg-white dark:bg-dark-bg lg:hidden">
          <div className="flex items-center justify-between p-4 border-b border-cream-300 dark:border-cream-300">
            <h2 className="text-lg font-bold text-warm-900 dark:text-white flex items-center gap-2">
              <SlidersHorizontal size={20} /> Filters
            </h2>
            <button onClick={() => setShowMobileFilters(false)} className="p-2 text-warm-500 hover:bg-cream-100 dark:hover:bg-cream-800 rounded-full">
              <X size={24} />
            </button>
          </div>
          <div className="flex-grow overflow-y-auto p-4">
            <TrainFilters filters={filters} setFilters={setFilters} />
          </div>
          <div className="p-4 border-t border-cream-300 dark:border-cream-300 flex gap-4 bg-cream-50 dark:bg-cream-900">
            <button 
              onClick={() => setFilters({ classes: [], types: [], departureTimes: [] })}
              className="btn-secondary flex-1"
            >
              Reset
            </button>
            <button 
              onClick={() => setShowMobileFilters(false)}
              className="btn-primary flex-1"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
