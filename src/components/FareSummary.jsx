import React from 'react';

const FareSummary = ({ fareDetails }) => {
  if (!fareDetails) return null;

  const { baseFare, reservationCharge, taxes, totalFare } = fareDetails;

  return (
    <div className="glass-card mt-6">
      <h3 className="font-bold text-lg text-warm-900 dark:text-white mb-4 border-b border-cream-300 dark:border-cream-300 pb-3">
        Fare Summary
      </h3>
      
      <div className="space-y-3 mb-4 text-sm">
        <div className="flex justify-between text-warm-600 dark:text-warm-400">
          <span>Base Fare</span>
          <span className="font-medium text-warm-900 dark:text-white">₹{baseFare}</span>
        </div>
        <div className="flex justify-between text-warm-600 dark:text-warm-400">
          <span>Reservation Charge</span>
          <span className="font-medium text-warm-900 dark:text-white">₹{reservationCharge}</span>
        </div>
        <div className="flex justify-between text-warm-600 dark:text-warm-400">
          <span>Taxes & GST (5%)</span>
          <span className="font-medium text-warm-900 dark:text-white">₹{taxes}</span>
        </div>
      </div>
      
      <div className="pt-3 border-t border-cream-300 dark:border-cream-300 flex justify-between items-center">
        <span className="font-bold text-warm-900 dark:text-white">Total Amount</span>
        <span className="text-xl font-bold text-primary-600 dark:text-primary-400">₹{totalFare}</span>
      </div>
      
      <div className="mt-4 bg-primary-100 text-amber-800 dark:bg-primary-100/20 dark:text-amber-300 p-3 rounded-lg text-xs flex items-start gap-2 border border-amber-100 dark:border-amber-800">
        <span className="shrink-0 font-bold mt-0.5">ⓘ</span>
        <p>This fare is provisional. Final fare including dynamic pricing (if applicable) will be calculated at payment.</p>
      </div>
    </div>
  );
};

export default FareSummary;
