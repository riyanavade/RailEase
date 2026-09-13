import React from 'react';

const TrainTimeline = ({ route }) => {
  return (
    <div className="relative pl-6 md:pl-8 py-4">
      {/* Vertical Line */}
      <div className="absolute left-[11px] md:left-[15px] top-8 bottom-8 w-[2px] bg-cream-200 dark:bg-cream-700"></div>

      <div className="space-y-6">
        {route.map((stop, index) => {
          const isFirst = index === 0;
          const isLast = index === route.length - 1;
          
          return (
            <div key={stop.code} className="relative">
              {/* Timeline Dot */}
              <div className={`absolute -left-6 md:-left-8 w-4 h-4 rounded-full border-2 border-white dark:border-dark-bg z-10 
                ${isFirst || isLast ? 'bg-primary-500 scale-125' : 'bg-cream-400 dark:bg-cream-500'}`}
              ></div>
              
              <div className={`glass-card p-4 transition-all hover:border-primary-300 dark:hover:border-primary-700
                ${isFirst || isLast ? 'border-l-4 border-l-primary-500' : ''}`}
              >
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                  
                  {/* Station Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-bold text-lg text-warm-900 dark:text-white">{stop.station}</h4>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-cream-100 dark:bg-cream-800 text-warm-600 dark:text-warm-400">
                        {stop.code}
                      </span>
                    </div>
                    <div className="text-sm text-warm-500 dark:text-warm-400 font-medium">
                      Day {stop.day}
                    </div>
                  </div>

                  {/* Timing Info */}
                  <div className="flex items-center gap-6 text-center md:text-right">
                    <div>
                      <div className="text-sm text-warm-500 mb-0.5">Arrival</div>
                      <div className={`font-bold ${isFirst ? 'text-warm-400' : 'text-warm-900 dark:text-white'}`}>
                        {stop.arr}
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-center px-2">
                      <div className="h-0.5 w-8 bg-cream-200 dark:bg-cream-700 mb-1"></div>
                      <span className="text-xs text-warm-400 bg-cream-50 dark:bg-cream-800/50 px-1.5 rounded">{stop.halt}</span>
                    </div>

                    <div>
                      <div className="text-sm text-warm-500 mb-0.5">Departure</div>
                      <div className={`font-bold ${isLast ? 'text-warm-400' : 'text-warm-900 dark:text-white'}`}>
                        {stop.dep}
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TrainTimeline;
