import React, { useState, useEffect, useRef } from 'react';
import { MapPin } from 'lucide-react';
import { searchStations, stations } from '../data/stations';

const StationInput = ({ label, value, onChange, placeholder, id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState(value ? (value.name || value.code || value) : '');
  const [results, setResults] = useState([]);
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (value) {
      if (typeof value === 'object') {
        setQuery(value.name || value.code);
      } else {
        setQuery(value);
      }
    } else {
      setQuery('');
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const val = e.target.value;
    setQuery(val);

    if (val.trim().length > 0) {
      const matches = searchStations(val);
      setResults(matches);
      setIsOpen(true);

      // Auto resolve best matching station
      const exactMatch = stations.find(
        s => s.code.toLowerCase() === val.trim().toLowerCase() || 
             s.name.toLowerCase() === val.trim().toLowerCase()
      );

      if (exactMatch) {
        onChange(exactMatch);
      } else if (matches.length > 0) {
        onChange(matches[0]);
      } else {
        // Fallback for custom user typed input
        onChange({ code: val.trim().toUpperCase().slice(0, 4), name: val.trim() });
      }
    } else {
      setResults([]);
      setIsOpen(false);
      onChange(null);
    }
  };

  const handleSelect = (station) => {
    setQuery(station.name);
    onChange(station);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <label htmlFor={id} className="block text-sm font-bold text-gray-800 mb-1.5">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
          <MapPin size={18} className="text-gray-500" />
        </div>
        <input
          type="text"
          id={id}
          className="input-field pl-10"
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
          onFocus={() => {
            const matches = searchStations(query || '');
            setResults(matches.length > 0 ? matches : stations.slice(0, 6));
            setIsOpen(true);
          }}
          autoComplete="off"
        />
      </div>
      
      {isOpen && (
        <ul className="absolute z-30 mt-1 w-full bg-white shadow-2xl max-h-60 rounded-xl overflow-auto border-2 border-gray-300 text-base sm:text-sm">
          {(results.length > 0 ? results : stations.slice(0, 6)).map((station) => (
            <li
              key={station.code}
              className="cursor-pointer select-none relative py-2.5 pl-4 pr-9 hover:bg-primary-50 text-gray-900 border-b border-gray-100 last:border-0"
              onClick={() => handleSelect(station)}
            >
              <div className="flex justify-between items-center">
                <span className="block truncate font-bold text-gray-900">{station.name}</span>
                <span className="text-xs font-semibold text-primary-700 bg-primary-100 px-2 py-0.5 rounded-md">{station.code}</span>
              </div>
              <span className="block text-xs text-gray-600 mt-0.5">{station.city}, {station.state}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StationInput;
