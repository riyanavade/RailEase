import React from 'react';
import { Filter } from 'lucide-react';

const TrainFilters = ({ filters, setFilters }) => {
  const handleCheckboxChange = (category, value) => {
    setFilters(prev => {
      const updatedCategory = [...prev[category]];
      if (updatedCategory.includes(value)) {
        return { ...prev, [category]: updatedCategory.filter(item => item !== value) };
      } else {
        return { ...prev, [category]: [...updatedCategory, value] };
      }
    });
  };

  const filterSections = [
    {
      title: 'Journey Class',
      category: 'classes',
      options: ['1A', '2A', '3A', 'SL', 'CC', '2S']
    },
    {
      title: 'Train Type',
      category: 'types',
      options: ['Rajdhani', 'Shatabdi', 'Superfast', 'Express', 'Passenger']
    },
    {
      title: 'Departure Time',
      category: 'departureTimes',
      options: [
        { label: 'Morning (06:00 - 12:00)', value: 'morning' },
        { label: 'Afternoon (12:00 - 18:00)', value: 'afternoon' },
        { label: 'Evening (18:00 - 24:00)', value: 'evening' },
        { label: 'Night (00:00 - 06:00)', value: 'night' }
      ]
    }
  ];

  return (
    <div className="glass-card sticky top-24">
      <div className="flex items-center gap-2 mb-6 border-b border-cream-300 dark:border-cream-300 pb-4">
        <Filter size={20} className="text-primary-600 dark:text-primary-400" />
        <h2 className="text-lg font-bold text-warm-900 dark:text-white">Filters</h2>
      </div>

      <div className="space-y-6">
        {filterSections.map(section => (
          <div key={section.title}>
            <h3 className="font-semibold text-sm text-warm-900 dark:text-warm-100 mb-3 uppercase tracking-wider">
              {section.title}
            </h3>
            <div className="space-y-2.5">
              {section.options.map(option => {
                const value = typeof option === 'string' ? option : option.value;
                const label = typeof option === 'string' ? option : option.label;
                const isChecked = filters[section.category].includes(value);

                return (
                  <label key={value} className="flex items-center gap-3 cursor-pointer group">
                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors
                      ${isChecked 
                        ? 'bg-primary-600 border-primary-600 text-white' 
                        : 'border-cream-300 dark:border-cream-300 group-hover:border-primary-400 dark:bg-cream-800'
                      }`}
                    >
                      {isChecked && <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                    </div>
                    <input 
                      type="checkbox" 
                      className="hidden"
                      checked={isChecked}
                      onChange={() => handleCheckboxChange(section.category, value)}
                    />
                    <span className="text-sm text-warm-700 dark:text-warm-300 group-hover:text-warm-900 dark:group-hover:text-white transition-colors">
                      {label}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrainFilters;
