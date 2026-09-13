/* ==========================================================================
   RailEase - Static Data & Train Search Logic
   ========================================================================== */

const STATIONS = [
  { code: 'MMCT', name: 'Mumbai Central', city: 'Mumbai', state: 'Maharashtra' },
  { code: 'NDLS', name: 'New Delhi', city: 'New Delhi', state: 'Delhi' },
  { code: 'LKO', name: 'Lucknow Charbagh', city: 'Lucknow', state: 'Uttar Pradesh' },
  { code: 'CNB', name: 'Kanpur Central', city: 'Kanpur', state: 'Uttar Pradesh' },
  { code: 'HWH', name: 'Howrah Junction', city: 'Kolkata', state: 'West Bengal' },
  { code: 'MAS', name: 'Chennai Central', city: 'Chennai', state: 'Tamil Nadu' },
  { code: 'SBC', name: 'KSR Bengaluru', city: 'Bengaluru', state: 'Karnataka' },
  { code: 'BSB', name: 'Varanasi Junction', city: 'Varanasi', state: 'Uttar Pradesh' },
  { code: 'ST', name: 'Surat', city: 'Surat', state: 'Gujarat' },
  { code: 'BRC', name: 'Vadodara Junction', city: 'Vadodara', state: 'Gujarat' },
  { code: 'KOTA', name: 'Kota Junction', city: 'Kota', state: 'Rajasthan' },
  { code: 'BPL', name: 'Bhopal Junction', city: 'Bhopal', state: 'Madhya Pradesh' }
];

const TRAINS = [
  {
    id: '12951',
    name: 'Mumbai Rajdhani Express',
    type: 'Rajdhani',
    badgeClass: 'badge-rajdhani',
    origin: 'MMCT',
    originName: 'Mumbai Central',
    destination: 'NDLS',
    destinationName: 'New Delhi',
    departureTime: '17:00',
    arrivalTime: '08:32',
    duration: '15h 32m',
    baseFare: 1450,
    classes: ['1A', '2A', '3A', 'SL'],
    availability: {
      '1A': { status: 'AVAILABLE', seats: 12, price: 3450 },
      '2A': { status: 'AVAILABLE', seats: 24, price: 2250 },
      '3A': { status: 'AVAILABLE', seats: 42, price: 1650 },
      'SL': { status: 'AVAILABLE', seats: 85, price: 680 }
    },
    days: ['Daily'],
    route: [
      { station: 'Mumbai Central (MMCT)', arr: 'Source', dep: '17:00' },
      { station: 'Surat (ST)', arr: '19:43', dep: '19:48' },
      { station: 'Vadodara (BRC)', arr: '21:06', dep: '21:16' },
      { station: 'Kota (KOTA)', arr: '03:15', dep: '03:25' },
      { station: 'New Delhi (NDLS)', arr: '08:32', dep: 'Destination' }
    ]
  },
  {
    id: '12004',
    name: 'Lucknow Shatabdi Express',
    type: 'Shatabdi',
    badgeClass: 'badge-vande',
    origin: 'LKO',
    originName: 'Lucknow Charbagh',
    destination: 'NDLS',
    destinationName: 'New Delhi',
    departureTime: '15:35',
    arrivalTime: '22:15',
    duration: '6h 40m',
    baseFare: 920,
    classes: ['1A', '2A', '3A', 'CC'],
    availability: {
      '1A': { status: 'AVAILABLE', seats: 8, price: 1950 },
      '2A': { status: 'AVAILABLE', seats: 18, price: 1420 },
      '3A': { status: 'AVAILABLE', seats: 35, price: 1100 },
      'CC': { status: 'AVAILABLE', seats: 52, price: 890 }
    },
    days: ['Daily'],
    route: [
      { station: 'Lucknow NR (LKO)', arr: 'Source', dep: '15:35' },
      { station: 'Kanpur Central (CNB)', arr: '16:50', dep: '16:55' },
      { station: 'New Delhi (NDLS)', arr: '22:15', dep: 'Destination' }
    ]
  },
  {
    id: '22436',
    name: 'Vande Bharat Express',
    type: 'Vande Bharat',
    badgeClass: 'badge-vande',
    origin: 'NDLS',
    originName: 'New Delhi',
    destination: 'BSB',
    destinationName: 'Varanasi Junction',
    departureTime: '06:00',
    arrivalTime: '14:00',
    duration: '8h 00m',
    baseFare: 1750,
    classes: ['1A', '2A', '3A', 'CC'],
    availability: {
      '1A': { status: 'AVAILABLE', seats: 10, price: 3200 },
      '2A': { status: 'AVAILABLE', seats: 20, price: 2100 },
      '3A': { status: 'AVAILABLE', seats: 40, price: 1750 },
      'CC': { status: 'AVAILABLE', seats: 65, price: 1400 }
    },
    days: ['Except Thu'],
    route: [
      { station: 'New Delhi (NDLS)', arr: 'Source', dep: '06:00' },
      { station: 'Kanpur Central (CNB)', arr: '10:08', dep: '10:13' },
      { station: 'Varanasi (BSB)', arr: '14:00', dep: 'Destination' }
    ]
  },
  {
    id: '12841',
    name: 'Coromandel Express',
    type: 'Superfast',
    badgeClass: 'badge-express',
    origin: 'HWH',
    originName: 'Howrah Junction',
    destination: 'MAS',
    destinationName: 'Chennai Central',
    departureTime: '15:20',
    arrivalTime: '17:00',
    duration: '25h 40m',
    baseFare: 880,
    classes: ['2A', '3A', 'SL'],
    availability: {
      '2A': { status: 'AVAILABLE', seats: 22, price: 2400 },
      '3A': { status: 'AVAILABLE', seats: 38, price: 1680 },
      'SL': { status: 'AVAILABLE', seats: 120, price: 620 }
    },
    days: ['Daily'],
    route: [
      { station: 'Howrah Junction (HWH)', arr: 'Source', dep: '15:20' },
      { station: 'Chennai Central (MAS)', arr: '17:00', dep: 'Destination' }
    ]
  },
  {
    id: '12627',
    name: 'Karnataka Superfast Express',
    type: 'Superfast',
    badgeClass: 'badge-express',
    origin: 'SBC',
    originName: 'KSR Bengaluru',
    destination: 'NDLS',
    destinationName: 'New Delhi',
    departureTime: '19:20',
    arrivalTime: '09:00',
    duration: '37h 40m',
    baseFare: 1120,
    classes: ['1A', '2A', '3A', 'SL'],
    availability: {
      '1A': { status: 'AVAILABLE', seats: 6, price: 4100 },
      '2A': { status: 'AVAILABLE', seats: 16, price: 2600 },
      '3A': { status: 'AVAILABLE', seats: 55, price: 1850 },
      'SL': { status: 'AVAILABLE', seats: 140, price: 740 }
    },
    days: ['Daily'],
    route: [
      { station: 'KSR Bengaluru (SBC)', arr: 'Source', dep: '19:20' },
      { station: 'Bhopal Junction (BPL)', arr: '23:30', dep: '23:35' },
      { station: 'New Delhi (NDLS)', arr: '09:00', dep: 'Destination' }
    ]
  }
];

// Helper function to search trains
function searchTrainsData(fromCode, toCode) {
  if (!fromCode && !toCode) return TRAINS;
  
  const fromUpper = (fromCode || '').toUpperCase().trim();
  const toUpper = (toCode || '').toUpperCase().trim();
  
  return TRAINS.map((train, idx) => {
    const fromStationObj = STATIONS.find(s => s.code === fromUpper) || { name: fromUpper || train.originName, code: fromUpper || train.origin };
    const toStationObj = STATIONS.find(s => s.code === toUpper) || { name: toUpper || train.destinationName, code: toUpper || train.destination };
    
    return {
      ...train,
      origin: fromUpper || train.origin,
      originName: fromStationObj.name,
      destination: toUpper || train.destination,
      destinationName: toStationObj.name
    };
  });
}
