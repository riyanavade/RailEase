import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Train as TrainIcon, Map, Info } from 'lucide-react';
import { trains } from '../data/trains';
import TrainTimeline from '../components/TrainTimeline';

const TrainDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  
  const date = searchParams.get('date');
  const passengers = searchParams.get('passengers') || '1';

  const [train, setTrain] = useState(null);

  useEffect(() => {
    // Fetch train details
    const foundTrain = trains.find(t => t.id === id);
    setTrain(foundTrain);
  }, [id]);

  if (!train) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-200 border-t-primary-600"></div>
      </div>
    );
  }

  const formattedDate = date ? new Date(date).toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
  }) : 'Date not selected';

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-bg pb-12">
      {/* Header */}
      <div className="bg-primary-600 text-white pt-6 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-primary-100 hover:text-white transition-colors mb-6">
            <ArrowLeft size={18} /> Back to Search Results
          </button>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold">{train.name}</h1>
                <span className="px-3 py-1 bg-white/20 rounded-lg text-sm font-bold tracking-wider">
                  {train.id}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-primary-100 text-sm">
                <span className="flex items-center gap-1.5"><TrainIcon size={16} /> {train.type}</span>
                <span className="flex items-center gap-1.5"><Clock size={16} /> {train.duration}</span>
                <span className="flex items-center gap-1.5"><Map size={16} /> {train.origin} to {train.destination}</span>
              </div>
            </div>
            
            <div className="text-left md:text-right bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/10">
              <div className="text-sm text-primary-200 mb-1">Journey Date</div>
              <div className="font-semibold text-lg">{formattedDate}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
        <div className="glass-card mb-8">
          <div className="flex items-center gap-2 mb-6 border-b border-cream-200 dark:border-warm-800 pb-4">
            <Info size={20} className="text-primary-600 dark:text-primary-400" />
            <h2 className="text-xl font-bold text-warm-900 dark:text-white">Train Route & Schedule</h2>
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 p-4 rounded-lg text-sm flex gap-3 items-start mb-6 border border-blue-100 dark:border-blue-800">
            <Info size={18} className="shrink-0 mt-0.5" />
            <p>Timings are subject to change. Please verify with official railway inquiry before starting your journey. The train runs on: <strong>{train.daysOfRun.join(', ')}</strong>.</p>
          </div>

          <TrainTimeline route={train.route} />
        </div>

        {/* Action Bar */}
        <div className="sticky bottom-4 z-20 glass-card p-4 flex flex-col sm:flex-row items-center justify-between gap-4 border border-primary-200 shadow-xl shadow-primary-500/10">
          <div>
            <div className="text-sm text-warm-500 font-medium">Ready to book?</div>
            <div className="font-bold text-warm-900 dark:text-white">Select a class on the next step</div>
          </div>
          <Link 
            to={`/passenger-details?train=${train.id}&date=${date}&passengers=${passengers}`}
            className="w-full sm:w-auto btn-primary py-3 px-8 text-lg"
          >
            Continue to Booking
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TrainDetails;
