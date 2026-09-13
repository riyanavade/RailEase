import React from 'react';
import { Check } from 'lucide-react';

const ClassCard = ({ className, classCode, price, availability, isSelected, onSelect }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'AVAILABLE': return 'text-primary-600 bg-cream-50 dark:bg-cream-900/30';
      case 'RAC': return 'text-amber-600 bg-primary-100 dark:bg-primary-100/30';
      case 'WL': return 'text-warm-600 bg-cream-50 dark:bg-cream-900/30';
      default: return 'text-warm-500 bg-cream-50 dark:bg-cream-800';
    }
  };

  const isNotAvailable = availability.status === 'NOT AVAILABLE';

  return (
    <div 
      onClick={() => !isNotAvailable && onSelect(classCode)}
      className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 
        ${isNotAvailable ? 'opacity-50 cursor-not-allowed border-cream-300 dark:border-cream-300 bg-cream-50 dark:bg-cream-800/50' : 
          isSelected 
            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 shadow-md shadow-primary-500/10' 
            : 'border-cream-300 dark:border-cream-300 bg-white dark:bg-dark-card hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-md'
        }`}
    >
      {isSelected && (
        <div className="absolute -top-3 -right-3 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center text-white shadow-sm z-10">
          <Check size={14} strokeWidth={3} />
        </div>
      )}

      <div className="flex justify-between items-start mb-3">
        <div>
          <div className="font-bold text-lg text-warm-900 dark:text-white">{classCode}</div>
          <div className="text-xs font-medium text-warm-500">{className}</div>
        </div>
        <div className="font-bold text-lg text-warm-900 dark:text-white">
          ₹{price}
        </div>
      </div>

      <div className={`text-sm font-bold px-3 py-1.5 rounded-lg text-center ${getStatusColor(availability.status)}`}>
        {availability.status} {availability.status !== 'NOT AVAILABLE' && `(${availability.seats})`}
      </div>
    </div>
  );
};

export default ClassCard;
