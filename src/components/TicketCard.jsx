import React from 'react';
import { Train, Clock, Map, User, Hash } from 'lucide-react';

const TicketCard = ({ booking, id }) => {
  if (!booking) return null;
  const { train, pnr, bookingId, passengers, date, selectedClass, fareDetails } = booking;

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${pnr}-${bookingId}`;

  return (
    <div className="bg-white dark:bg-cream-800 rounded-2xl shadow-xl border border-cream-300 dark:border-cream-300 overflow-hidden print:shadow-none print:border-cream-300 max-w-4xl mx-auto" id={id}>
      {/* Railway Branding Header */}
      <div className="bg-cream-900 text-white p-4 flex flex-col md:flex-row justify-between items-center border-b-4 border-primary-500 print:bg-white print:text-black print:border-black">
        <div className="flex items-center gap-3 mb-2 md:mb-0">
          <div className="bg-white p-1.5 rounded text-warm-900 print:bg-transparent print:p-0">
            <Train size={28} />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-wider">INDIAN RAILWAYS</h2>
            <p className="text-xs text-warm-300 print:text-warm-600">Electronic Reservation Slip (ERS)</p>
          </div>
        </div>
        <div className="text-center md:text-right">
          <div className="text-xs text-warm-300 mb-1 print:text-warm-600">PNR No.</div>
          <div className="text-2xl font-bold font-mono tracking-widest text-primary-400 print:text-black">{pnr}</div>
        </div>
      </div>

      <div className="p-6 md:p-8">
        {/* Train & Journey Info */}
        <div className="flex flex-col md:flex-row gap-6 mb-8 pb-8 border-b border-dashed border-cream-300 dark:border-cream-300">
          <div className="flex-1 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-2xl font-bold text-warm-900 dark:text-white print:text-black flex items-center gap-2">
                  {train.name} <span className="text-lg bg-cream-100 dark:bg-cream-700 print:bg-cream-200 px-2 py-0.5 rounded text-warm-600 dark:text-warm-300">{train.id}</span>
                </div>
                <div className="text-sm font-medium text-warm-600 dark:text-warm-400 print:text-warm-700 mt-1">
                  Class: <span className="font-bold">{selectedClass}</span> | Quota: <span className="font-bold">General (GN)</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-warm-500 dark:text-warm-400 print:text-warm-600">Date of Journey</div>
                <div className="font-bold text-lg text-warm-900 dark:text-white print:text-black">
                  {new Date(date).toLocaleDateString('en-GB')}
                </div>
              </div>
            </div>

            <div className="bg-cream-50 dark:bg-cream-900/50 print:bg-cream-50 p-4 rounded-xl flex items-center justify-between border border-cream-300 dark:border-cream-300 print:border-cream-300">
              <div className="text-center md:text-left">
                <div className="text-xs text-warm-500 uppercase tracking-wider mb-1">Departure</div>
                <div className="text-xl font-bold text-warm-900 dark:text-white print:text-black mb-1">{train.departureTime}</div>
                <div className="font-medium text-warm-700 dark:text-warm-300 print:text-warm-800">{train.origin}</div>
              </div>
              
              <div className="flex-1 px-4 flex flex-col items-center opacity-70">
                <div className="text-xs font-semibold text-warm-500 mb-1">{train.duration}</div>
                <div className="w-full flex items-center">
                  <div className="w-2 h-2 rounded-full bg-primary-500 print:bg-black"></div>
                  <div className="h-0.5 flex-1 bg-cream-300 print:bg-black"></div>
                  <div className="w-2 h-2 rounded-full border-2 border-primary-500 print:border-black bg-white"></div>
                </div>
              </div>

              <div className="text-center md:text-right">
                <div className="text-xs text-warm-500 uppercase tracking-wider mb-1">Arrival</div>
                <div className="text-xl font-bold text-warm-900 dark:text-white print:text-black mb-1">{train.arrivalTime}</div>
                <div className="font-medium text-warm-700 dark:text-warm-300 print:text-warm-800">{train.destination}</div>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-32 flex flex-col items-center justify-center shrink-0">
            <img src={qrUrl} alt="Ticket QR" className="w-24 h-24 mb-2 rounded bg-white p-1 border border-cream-300" />
            <div className="text-[10px] text-center text-warm-500 font-mono break-all">{bookingId}</div>
          </div>
        </div>

        {/* Passenger Info */}
        <div className="mb-8">
          <h3 className="text-sm font-bold uppercase tracking-wider text-warm-500 dark:text-warm-400 print:text-warm-600 mb-4 flex items-center gap-2">
            <User size={16} /> Passenger Details
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-cream-100 dark:bg-cream-800 print:bg-cream-200 text-sm">
                  <th className="p-3 font-semibold text-warm-700 dark:text-warm-300 print:text-black rounded-l-lg">Name</th>
                  <th className="p-3 font-semibold text-warm-700 dark:text-warm-300 print:text-black">Age</th>
                  <th className="p-3 font-semibold text-warm-700 dark:text-warm-300 print:text-black">Gender</th>
                  <th className="p-3 font-semibold text-warm-700 dark:text-warm-300 print:text-black">Booking Status/Coach</th>
                  <th className="p-3 font-semibold text-warm-700 dark:text-warm-300 print:text-black rounded-r-lg">Current Status</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {passengers.map((p, i) => (
                  <tr key={i} className="border-b border-cream-300 dark:border-cream-300 print:border-cream-300">
                    <td className="p-3 font-medium text-warm-900 dark:text-white print:text-black">{p.name}</td>
                    <td className="p-3 text-warm-700 dark:text-warm-300 print:text-warm-800">{p.age}</td>
                    <td className="p-3 text-warm-700 dark:text-warm-300 print:text-warm-800">{p.gender}</td>
                    <td className="p-3 text-warm-700 dark:text-warm-300 print:text-warm-800">
                      <span className="font-bold">CNF</span> / {['A1', 'B2', 'S4', 'C1'][i % 4]} / {22 + i} {p.berthPreference !== 'No Preference' ? `(${p.berthPreference.substring(0,2).toUpperCase()})` : ''}
                    </td>
                    <td className="p-3 font-bold text-primary-600 print:text-black">CONFIRMED</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Payment & Important Info */}
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 bg-cream-50 dark:bg-cream-900/50 print:bg-cream-50 p-4 rounded-xl border border-cream-300 dark:border-cream-300 print:border-cream-300">
            <h3 className="text-sm font-bold uppercase tracking-wider text-warm-500 mb-3 flex items-center gap-2">
              <Hash size={16} /> Payment Details
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-warm-600 dark:text-warm-400">
                <span>Ticket Fare</span>
                <span className="font-medium text-warm-900 dark:text-white print:text-black">₹{fareDetails.baseFare + fareDetails.reservationCharge}</span>
              </div>
              <div className="flex justify-between text-warm-600 dark:text-warm-400">
                <span>Convenience Fee (Incl. GST)</span>
                <span className="font-medium text-warm-900 dark:text-white print:text-black">₹{30 + fareDetails.taxes}</span>
              </div>
              <div className="flex justify-between font-bold text-warm-900 dark:text-white print:text-black pt-2 border-t border-cream-300 dark:border-cream-300">
                <span>Total Fare</span>
                <span>₹{fareDetails.totalFare + 30}</span>
              </div>
            </div>
          </div>
          
          <div className="flex-1 text-xs text-warm-500 dark:text-warm-400 print:text-warm-600 space-y-2">
            <p className="font-bold text-warm-700 dark:text-warm-300 print:text-black mb-2">Important Instructions:</p>
            <ul className="list-disc pl-4 space-y-1">
              <li>This E-Ticket is valid with an original valid Photo ID.</li>
              <li>Please reach the station at least 30 minutes before departure.</li>
              <li>For any queries, please call 139 or visit railease.com.</li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TicketCard;
