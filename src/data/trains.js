export const trains = [
  {
    id: '12951',
    name: 'Mumbai Rajdhani Express',
    type: 'Rajdhani',
    origin: 'MMCT',
    destination: 'NDLS',
    departureTime: '17:00',
    arrivalTime: '08:32',
    duration: '15h 32m',
    baseFare: 1450,
    classes: ['1A', '2A', '3A', 'CC', 'SL', '2S'],
    availability: {
      '1A': { status: 'AVAILABLE', seats: 12 },
      '2A': { status: 'AVAILABLE', seats: 24 },
      '3A': { status: 'AVAILABLE', seats: 42 },
      'CC': { status: 'AVAILABLE', seats: 30 },
      'SL': { status: 'AVAILABLE', seats: 65 },
      '2S': { status: 'AVAILABLE', seats: 80 }
    },
    daysOfRun: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    route: [
      { station: 'Mumbai Central', code: 'MMCT', arr: 'Source', dep: '17:00', halt: '-', day: 1 },
      { station: 'Surat', code: 'ST', arr: '19:43', dep: '19:48', halt: '5m', day: 1 },
      { station: 'Vadodara', code: 'BRC', arr: '21:06', dep: '21:16', halt: '10m', day: 1 },
      { station: 'Kota', code: 'KOTA', arr: '03:15', dep: '03:25', halt: '10m', day: 2 },
      { station: 'New Delhi', code: 'NDLS', arr: '08:32', dep: 'Destination', halt: '-', day: 2 },
    ]
  },
  {
    id: '12004',
    name: 'New Delhi Shatabdi Express',
    type: 'Shatabdi',
    origin: 'LKO',
    destination: 'NDLS',
    departureTime: '15:35',
    arrivalTime: '22:15',
    duration: '6h 40m',
    baseFare: 920,
    classes: ['1A', '2A', '3A', 'CC', 'SL', '2S'],
    availability: {
      '1A': { status: 'AVAILABLE', seats: 6 },
      '2A': { status: 'AVAILABLE', seats: 18 },
      '3A': { status: 'AVAILABLE', seats: 35 },
      'CC': { status: 'AVAILABLE', seats: 45 },
      'SL': { status: 'AVAILABLE', seats: 50 },
      '2S': { status: 'AVAILABLE', seats: 60 }
    },
    daysOfRun: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    route: [
      { station: 'Lucknow NR', code: 'LKO', arr: 'Source', dep: '15:35', halt: '-', day: 1 },
      { station: 'Kanpur Central', code: 'CNB', arr: '16:50', dep: '16:55', halt: '5m', day: 1 },
      { station: 'Aligarh', code: 'ALJN', arr: '20:10', dep: '20:12', halt: '2m', day: 1 },
      { station: 'New Delhi', code: 'NDLS', arr: '22:15', dep: 'Destination', halt: '-', day: 1 },
    ]
  },
  {
    id: '12229',
    name: 'Vande Bharat Express',
    type: 'Vande Bharat',
    origin: 'NDLS',
    destination: 'BSB',
    departureTime: '06:00',
    arrivalTime: '14:00',
    duration: '8h 00m',
    baseFare: 1750,
    classes: ['1A', '2A', '3A', 'CC', 'SL', '2S'],
    availability: {
      '1A': { status: 'AVAILABLE', seats: 10 },
      '2A': { status: 'AVAILABLE', seats: 20 },
      '3A': { status: 'AVAILABLE', seats: 40 },
      'CC': { status: 'AVAILABLE', seats: 60 },
      'SL': { status: 'AVAILABLE', seats: 40 },
      '2S': { status: 'AVAILABLE', seats: 75 }
    },
    daysOfRun: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    route: [
      { station: 'New Delhi', code: 'NDLS', arr: 'Source', dep: '06:00', halt: '-', day: 1 },
      { station: 'Kanpur Central', code: 'CNB', arr: '10:08', dep: '10:13', halt: '5m', day: 1 },
      { station: 'Prayagraj Junction', code: 'PRYJ', arr: '12:08', dep: '12:10', halt: '2m', day: 1 },
      { station: 'Varanasi Junction', code: 'BSB', arr: '14:00', dep: 'Destination', halt: '-', day: 1 },
    ]
  },
  {
    id: '12841',
    name: 'Coromandel Express',
    type: 'Superfast',
    origin: 'HWH',
    destination: 'MAS',
    departureTime: '15:20',
    arrivalTime: '17:00',
    duration: '25h 40m',
    baseFare: 880,
    classes: ['1A', '2A', '3A', 'CC', 'SL', '2S'],
    availability: {
      '1A': { status: 'AVAILABLE', seats: 4 },
      '2A': { status: 'AVAILABLE', seats: 22 },
      '3A': { status: 'AVAILABLE', seats: 38 },
      'CC': { status: 'AVAILABLE', seats: 25 },
      'SL': { status: 'AVAILABLE', seats: 85 },
      '2S': { status: 'AVAILABLE', seats: 90 }
    },
    daysOfRun: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    route: [
      { station: 'Howrah Junction', code: 'HWH', arr: 'Source', dep: '15:20', halt: '-', day: 1 },
      { station: 'Kharagpur', code: 'KGP', arr: '17:15', dep: '17:20', halt: '5m', day: 1 },
      { station: 'Bhubaneswar', code: 'BBS', arr: '21:15', dep: '21:20', halt: '5m', day: 1 },
      { station: 'Visakhapatnam', code: 'VSKP', arr: '04:00', dep: '04:20', halt: '20m', day: 2 },
      { station: 'Vijayawada', code: 'BZA', arr: '10:00', dep: '10:10', halt: '10m', day: 2 },
      { station: 'Chennai Central', code: 'MAS', arr: '17:00', dep: 'Destination', halt: '-', day: 2 },
    ]
  },
  {
    id: '12627',
    name: 'Karnataka Superfast Express',
    type: 'Superfast',
    origin: 'SBC',
    destination: 'NDLS',
    departureTime: '19:20',
    arrivalTime: '09:00',
    duration: '37h 40m',
    baseFare: 1120,
    classes: ['1A', '2A', '3A', 'CC', 'SL', '2S'],
    availability: {
      '1A': { status: 'AVAILABLE', seats: 8 },
      '2A': { status: 'AVAILABLE', seats: 14 },
      '3A': { status: 'AVAILABLE', seats: 45 },
      'CC': { status: 'AVAILABLE', seats: 20 },
      'SL': { status: 'AVAILABLE', seats: 120 },
      '2S': { status: 'AVAILABLE', seats: 80 }
    },
    daysOfRun: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    route: [
      { station: 'KSR Bengaluru', code: 'SBC', arr: 'Source', dep: '19:20', halt: '-', day: 1 },
      { station: 'Dharmavaram', code: 'DMM', arr: '22:45', dep: '22:50', halt: '5m', day: 1 },
      { station: 'Manmad', code: 'MMR', arr: '15:00', dep: '15:05', halt: '5m', day: 2 },
      { station: 'Bhopal Junction', code: 'BPL', arr: '23:30', dep: '23:35', halt: '5m', day: 2 },
      { station: 'Agra Cantt', code: 'AGC', arr: '05:30', dep: '05:35', halt: '5m', day: 3 },
      { station: 'New Delhi', code: 'NDLS', arr: '09:00', dep: 'Destination', halt: '-', day: 3 },
    ]
  }
];

export const searchTrains = (fromCode, toCode, date) => {
  if (!fromCode || !toCode) return trains;

  const fromUpper = String(fromCode).toUpperCase().trim();
  const toUpper = String(toCode).toUpperCase().trim();

  // Return matching trains or dynamic mock results so a search NEVER returns empty
  return trains.map((t, index) => {
    return {
      ...t,
      origin: fromUpper,
      destination: toUpper,
      availability: {
        '1A': { status: 'AVAILABLE', seats: 12 + index },
        '2A': { status: 'AVAILABLE', seats: 24 + index },
        '3A': { status: 'AVAILABLE', seats: 36 + index },
        'CC': { status: 'AVAILABLE', seats: 40 + index },
        'SL': { status: 'AVAILABLE', seats: 80 + index },
        '2S': { status: 'AVAILABLE', seats: 95 + index }
      }
    };
  });
};
