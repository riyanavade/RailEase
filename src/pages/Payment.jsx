import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, CreditCard, Building, Smartphone, Wallet, CheckCircle } from 'lucide-react';
import { updateData, getData } from '../utils/storage';

const Payment = () => {
  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const data = sessionStorage.getItem('currentBooking');
    if (data) {
      setBookingData(JSON.parse(data));
    } else {
      navigate('/');
    }
  }, [navigate]);

  const handlePayment = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing delay
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      
      // Generate Mock PNR and save booking
      const mockPnr = Math.floor(1000000000 + Math.random() * 9000000000).toString(); // 10 digit
      const completedBooking = {
        ...bookingData,
        pnr: mockPnr,
        bookingId: `BKG${Math.floor(10000 + Math.random() * 90000)}`,
        bookingDate: new Date().toISOString(),
        status: 'CONFIRMED'
      };
      
      // Save to local storage for "My Bookings"
      updateData('bookings', completedBooking);
      
      // Update session storage for confirmation page
      sessionStorage.setItem('completedBooking', JSON.stringify(completedBooking));
      sessionStorage.removeItem('currentBooking');
      
      // Redirect after success message
      setTimeout(() => {
        navigate('/booking-confirmation');
      }, 1500);
      
    }, 2000);
  };

  if (!bookingData) return null;

  const paymentMethods = [
    { id: 'upi', name: 'UPI', icon: Smartphone, desc: 'Google Pay, PhonePe, Paytm' },
    { id: 'card', name: 'Credit / Debit Card', icon: CreditCard, desc: 'Visa, MasterCard, RuPay' },
    { id: 'netbanking', name: 'Net Banking', icon: Building, desc: 'All Indian banks supported' },
    { id: 'wallet', name: 'Wallets', icon: Wallet, desc: 'Amazon Pay, MobiKwik, etc.' },
  ];

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-bg py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Progress Stepper */}
        <div className="flex items-center justify-center mb-12 max-w-2xl mx-auto">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold text-sm">✓</div>
            <span className="text-xs font-medium mt-2 text-primary-700 dark:text-primary-400">Search</span>
          </div>
          <div className="flex-grow h-1 bg-primary-600 mx-2 mt-[-20px]"></div>
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold text-sm">✓</div>
            <span className="text-xs font-medium mt-2 text-primary-700 dark:text-primary-400">Details</span>
          </div>
          <div className="flex-grow h-1 bg-primary-600 mx-2 mt-[-20px]"></div>
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold text-sm shadow-[0_0_0_4px_rgba(59,130,246,0.2)]">3</div>
            <span className="text-xs font-bold mt-2 text-primary-700 dark:text-primary-400">Payment</span>
          </div>
        </div>

        {isSuccess ? (
          <div className="glass-card py-16 text-center animate-fade-in-up">
            <div className="w-24 h-24 bg-cream-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={48} />
            </div>
            <h2 className="text-3xl font-bold text-warm-900 dark:text-white mb-2">Payment Successful!</h2>
            <p className="text-warm-500 text-lg">Generating your tickets...</p>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-8">
            {/* Payment Methods */}
            <div className="flex-grow space-y-6">
              <div className="glass-card p-0 overflow-hidden">
                <div className="bg-cream-100 dark:bg-cream-800/50 p-4 border-b border-cream-300 dark:border-cream-300 flex items-center gap-2">
                  <ShieldCheck className="text-primary-600" size={24} />
                  <h2 className="text-lg font-bold text-warm-900 dark:text-white">Secure Payment</h2>
                </div>
                
                <div className="flex flex-col sm:flex-row">
                  {/* Tabs */}
                  <div className="sm:w-1/3 border-b sm:border-b-0 sm:border-r border-cream-300 dark:border-cream-300 bg-cream-50/50 dark:bg-dark-bg/50 flex flex-row sm:flex-col overflow-x-auto">
                    {paymentMethods.map(method => (
                      <button
                        key={method.id}
                        onClick={() => setSelectedMethod(method.id)}
                        className={`flex items-center gap-3 p-4 text-left whitespace-nowrap transition-colors border-b sm:border-b-0 sm:border-l-4 sm:border-transparent
                          ${selectedMethod === method.id 
                            ? 'bg-white dark:bg-dark-card border-b-primary-500 sm:border-l-primary-500 text-primary-600 dark:text-primary-400 font-medium shadow-sm z-10 relative' 
                            : 'text-warm-600 dark:text-warm-400 hover:bg-cream-100 dark:hover:bg-cream-800/50'
                          }`}
                      >
                        <method.icon size={20} />
                        <span className="hidden sm:inline">{method.name}</span>
                      </button>
                    ))}
                  </div>
                  
                  {/* Content */}
                  <div className="sm:w-2/3 p-6 bg-white dark:bg-dark-card">
                    {selectedMethod === 'upi' && (
                      <div className="animate-fade-in-up space-y-4">
                        <h3 className="font-bold text-warm-900 dark:text-white mb-4">Pay using UPI</h3>
                        <div>
                          <label className="block text-sm font-medium text-warm-700 dark:text-warm-300 mb-1">UPI ID / VPA</label>
                          <input type="text" className="input-field" placeholder="E.g. user@upi" />
                        </div>
                        <div className="text-center text-sm text-warm-500 my-4">OR</div>
                        <div className="border border-cream-300 dark:border-cream-300 rounded-xl p-4 flex items-center justify-center flex-col gap-3">
                          <div className="w-32 h-32 bg-cream-100 dark:bg-cream-800 rounded-lg flex items-center justify-center p-2">
                            {/* Mock QR Code */}
                            <div className="w-full h-full bg-[url('https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg')] bg-cover bg-center opacity-80"></div>
                          </div>
                          <p className="text-xs font-medium text-warm-500">Scan QR Code with any UPI App</p>
                        </div>
                      </div>
                    )}

                    {selectedMethod === 'card' && (
                      <div className="animate-fade-in-up space-y-4">
                        <h3 className="font-bold text-warm-900 dark:text-white mb-4">Credit / Debit Card</h3>
                        <div>
                          <label className="block text-sm font-medium text-warm-700 dark:text-warm-300 mb-1">Card Number</label>
                          <input type="text" className="input-field font-mono" placeholder="XXXX XXXX XXXX XXXX" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-warm-700 dark:text-warm-300 mb-1">Expiry Date</label>
                            <input type="text" className="input-field" placeholder="MM/YY" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-warm-700 dark:text-warm-300 mb-1">CVV</label>
                            <input type="password" className="input-field" placeholder="XXX" maxLength="3" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-warm-700 dark:text-warm-300 mb-1">Name on Card</label>
                          <input type="text" className="input-field" placeholder="Cardholder Name" />
                        </div>
                      </div>
                    )}

                    {selectedMethod === 'netbanking' && (
                      <div className="animate-fade-in-up space-y-4">
                        <h3 className="font-bold text-warm-900 dark:text-white mb-4">Select Your Bank</h3>
                        <div className="grid grid-cols-3 gap-3 mb-4">
                          {['HDFC', 'SBI', 'ICICI', 'Axis', 'Kotak', 'PNB'].map(bank => (
                            <div key={bank} className="border border-cream-300 dark:border-cream-300 rounded-lg p-3 text-center cursor-pointer hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 text-sm font-medium text-warm-700 dark:text-warm-300 transition-colors">
                              {bank}
                            </div>
                          ))}
                        </div>
                        <select className="input-field">
                          <option>Select other bank...</option>
                        </select>
                      </div>
                    )}
                    
                    {selectedMethod === 'wallet' && (
                      <div className="animate-fade-in-up space-y-4">
                        <h3 className="font-bold text-warm-900 dark:text-white mb-4">Select Wallet</h3>
                        <div className="space-y-3">
                          {['Amazon Pay', 'MobiKwik', 'Freecharge', 'Airtel Money'].map(wallet => (
                            <label key={wallet} className="flex items-center gap-3 p-3 border border-cream-300 dark:border-cream-300 rounded-lg cursor-pointer hover:bg-cream-50 dark:hover:bg-cream-800/50">
                              <input type="radio" name="wallet_type" className="text-primary-600 focus:ring-primary-500" />
                              <span className="font-medium text-warm-700 dark:text-warm-300">{wallet}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Fare Summary Sidebar */}
            <div className="md:w-80 flex-shrink-0">
              <div className="glass-card sticky top-24">
                <h3 className="font-bold text-lg text-warm-900 dark:text-white mb-4 pb-3 border-b border-cream-300 dark:border-cream-300">
                  Fare Details
                </h3>
                
                <div className="space-y-3 mb-4 text-sm">
                  <div className="flex justify-between text-warm-600 dark:text-warm-400">
                    <span>Base Fare</span>
                    <span className="font-medium text-warm-900 dark:text-white">₹{bookingData.fareDetails.baseFare}</span>
                  </div>
                  <div className="flex justify-between text-warm-600 dark:text-warm-400">
                    <span>Reservation Charge</span>
                    <span className="font-medium text-warm-900 dark:text-white">₹{bookingData.fareDetails.reservationCharge}</span>
                  </div>
                  <div className="flex justify-between text-warm-600 dark:text-warm-400">
                    <span>Taxes & GST (5%)</span>
                    <span className="font-medium text-warm-900 dark:text-white">₹{bookingData.fareDetails.taxes}</span>
                  </div>
                  <div className="flex justify-between text-warm-600 dark:text-warm-400">
                    <span>Convenience Fee</span>
                    <span className="font-medium text-warm-900 dark:text-white">₹30</span>
                  </div>
                </div>
                
                <div className="pt-3 border-t border-cream-300 dark:border-cream-300 flex justify-between items-center mb-6">
                  <span className="font-bold text-warm-900 dark:text-white">Amount to Pay</span>
                  <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                    ₹{bookingData.fareDetails.totalFare + 30}
                  </span>
                </div>
                
                <button 
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="w-full btn-primary py-3.5 text-lg shadow-lg flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      Processing...
                    </>
                  ) : (
                    <>Pay ₹{bookingData.fareDetails.totalFare + 30}</>
                  )}
                </button>
                <p className="text-center text-xs text-warm-500 mt-3 flex items-center justify-center gap-1">
                  <ShieldCheck size={14} /> 100% Secure Transaction
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;
