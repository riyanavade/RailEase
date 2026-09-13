import React from 'react';
import { Trash2, User } from 'lucide-react';

const PassengerForm = ({ index, passenger, onChange, onRemove, canRemove }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange(index, { ...passenger, [name]: value });
  };

  return (
    <div className="bg-white dark:bg-dark-card rounded-xl p-5 border border-cream-300 dark:border-cream-300 mb-4 shadow-sm relative transition-colors">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-cream-300 dark:border-cream-300">
        <h4 className="font-semibold text-warm-800 dark:text-warm-200 flex items-center gap-2">
          <User size={18} className="text-primary-500" /> 
          Passenger {index + 1}
        </h4>
        {canRemove && (
          <button 
            type="button" 
            onClick={() => onRemove(index)}
            className="text-warm-400 hover:text-warm-500 transition-colors p-1 rounded-md hover:bg-cream-50 dark:hover:bg-cream-900/20"
            title="Remove Passenger"
          >
            <Trash2 size={18} />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <label className="block text-xs font-medium text-warm-500 mb-1">Full Name (as per ID)</label>
          <input
            type="text"
            name="name"
            value={passenger.name}
            onChange={handleChange}
            className="input-field py-2 text-sm"
            placeholder="E.g. Rahul Sharma"
            required
            maxLength={50}
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-warm-500 mb-1">Age</label>
          <input
            type="number"
            name="age"
            value={passenger.age}
            onChange={handleChange}
            className="input-field py-2 text-sm"
            placeholder="Years"
            required
            min={1}
            max={120}
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-warm-500 mb-1">Gender</label>
          <select
            name="gender"
            value={passenger.gender}
            onChange={handleChange}
            className="input-field py-2 text-sm appearance-none"
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Transgender">Transgender</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-warm-500 mb-1">Berth Preference</label>
          <select
            name="berthPreference"
            value={passenger.berthPreference}
            onChange={handleChange}
            className="input-field py-2 text-sm appearance-none"
          >
            <option value="No Preference">No Preference</option>
            <option value="Lower">Lower</option>
            <option value="Middle">Middle</option>
            <option value="Upper">Upper</option>
            <option value="Side Lower">Side Lower</option>
            <option value="Side Upper">Side Upper</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-warm-500 mb-1">Nationality</label>
          <select
            name="nationality"
            value={passenger.nationality}
            onChange={handleChange}
            className="input-field py-2 text-sm appearance-none"
          >
            <option value="Indian">Indian</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default PassengerForm;
