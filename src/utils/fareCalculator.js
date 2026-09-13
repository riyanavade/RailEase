// fareCalculator.js - Dynamic pricing logic

export const CLASS_MULTIPLIERS = {
  '1A': 4.0,   // First AC
  '2A': 2.5,   // Second AC
  '3A': 2.0,   // Third AC
  'CC': 1.5,   // AC Chair Car
  'SL': 1.0,   // Sleeper
  '2S': 0.6    // Second Sitting
};

export const TRAIN_TYPE_MULTIPLIERS = {
  'Rajdhani': 1.5,
  'Shatabdi': 1.4,
  'Superfast': 1.2,
  'Express': 1.0,
  'Passenger': 0.8
};

/**
 * Calculate total fare based on various parameters
 * @param {number} baseFare - Base fare of the route
 * @param {string} trainType - Type of the train
 * @param {string} travelClass - Selected travel class
 * @param {number} passengerCount - Total number of passengers
 * @returns {object} Fare breakdown
 */
export const calculateFare = (baseFare, trainType, travelClass, passengerCount) => {
  const trainMultiplier = TRAIN_TYPE_MULTIPLIERS[trainType] || 1.0;
  const classMultiplier = CLASS_MULTIPLIERS[travelClass] || 1.0;
  
  const perTicketBase = Math.round(baseFare * trainMultiplier * classMultiplier);
  const totalBase = perTicketBase * passengerCount;
  
  const reservationCharge = travelClass.includes('A') || travelClass === 'CC' ? 60 : 20;
  const totalReservation = reservationCharge * passengerCount;
  
  const taxes = Math.round((totalBase + totalReservation) * 0.05); // 5% GST on AC classes typically, simplified here
  
  return {
    baseFare: totalBase,
    reservationCharge: totalReservation,
    taxes,
    totalFare: totalBase + totalReservation + taxes
  };
};
