import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Train, ArrowRight, User } from 'lucide-react';

const TrainCard = ({ train, journeyDate, passengers }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'AVAILABLE': return 'text-primary-600 bg-cream-50 dark:bg-cream-900/20';
      case 'RAC': return 'text-amber-600 bg-primary-100 dark:bg-primary-100/20';
      case 'WL': return 'text-warm-600 bg-cream-50 dark:bg-cream-900/20';
      default: return 'text-warm-600 bg-cream-50 dark:bg-cream-800';
    }
  };

  return (
    <div className="glass-card mb-4 p-0 overflow-hidden group">
      {/* Header */}
      <div className="bg-cream-50 dark:bg-cream-800/50 p-4 border-b border-cream-300 dark:border-cream-300 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h3 className="text-xl font-bold text-warm-900 dark:text-white">{train.name}</h3>
            <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300">
              {train.id}
            </span>
          </div>
          <div className="flex items-center gap-4 text-sm text-warm-600 dark:text-warm-400">
            <span className="flex items-center gap-1.5"><Train size={14} /> {train.type}</span>
            <span className="flex items-center gap-1.5"><Clock size={14} /> {train.duration}</span>
          </div>
        </div>

        <div className="flex items-center w-full md:w-auto justify-between md:justify-end md:gap-8">
          <div className="text-center md:text-right">
            <div className="text-2xl font-bold text-warm-900 dark:text-white">{train.departureTime}</div>
            <div className="text-sm font-medium text-warm-500">{train.origin}</div>
          </div>
          <div className="flex flex-col items-center px-4 w-24">
            <div className="h-px w-full bg-cream-300 dark:bg-cream-700 relative">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary-500"></div>
            </div>
            <span className="text-[10px] text-warm-400 uppercase mt-1">Duration</span>
          </div>
          <div className="text-center md:text-left">
            <div className="text-2xl font-bold text-warm-900 dark:text-white">{train.arrivalTime}</div>
            <div className="text-sm font-medium text-warm-500">{train.destination}</div>
          </div>
        </div>
      </div>

      {/* Classes and Availability */}
      <div className="p-4 md:p-6 grid grid-cols-1 lg:grid-cols-4 gap-6 items-center">
        <div className="lg:col-span-3">
          <div className="text-sm font-semibold text-warm-700 dark:text-warm-300 mb-3">Available Classes</div>
          <div className="flex flex-wrap gap-3">
            {Object.keys(train.availability).map(cls => (
              <div key={cls} className="border border-cream-300 dark:border-cream-300 rounded-xl p-3 min-w-[120px] bg-white dark:bg-dark-bg transition-colors hover:border-primary-300">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-warm-900 dark:text-white">{cls}</span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-cream-100 dark:bg-cream-800 text-warm-600 dark:text-warm-400">
                    ₹{train.baseFare * (cls === '1A' ? 4 : cls === '2A' ? 2.5 : cls === '3A' ? 2 : cls === 'CC' ? 1.5 : 1)}
                  </span>
                </div>
                <div className={`text-sm font-bold ${getStatusColor(train.availability[cls].status)} px-2 py-1 rounded-md text-center`}>
                  {train.availability[cls].status} {train.availability[cls].status !== 'NOT AVAILABLE' && `(${train.availability[cls].seats})`}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex flex-col gap-3 h-full justify-end">
          <Link 
            to={`/train/${train.id}?date=${journeyDate}&passengers=${passengers}`}
            className="w-full text-center px-4 py-2 border border-cream-300 dark:border-cream-300 rounded-lg text-warm-700 dark:text-warm-300 hover:bg-cream-50 dark:hover:bg-cream-800 font-medium transition-colors"
          >
            View Route Details
          </Link>
          <Link 
            to={`/passenger-details?train=${train.id}&date=${journeyDate}&passengers=${passengers}`}
            className="w-full btn-primary"
          >
            Book Now <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TrainCard;
