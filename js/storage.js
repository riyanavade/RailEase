/* ==========================================================================
   RailEase - LocalStorage & SessionStorage Helpers
   ========================================================================== */

const STORAGE_KEYS = {
  BOOKINGS: 'railease_bookings',
  CURRENT_SEARCH: 'railease_current_search',
  CURRENT_BOOKING: 'railease_current_booking',
  COMPLETED_BOOKING: 'railease_completed_booking',
  USER: 'railease_user'
};

// Retrieve array of bookings from localStorage
function getBookings() {
  const data = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
}

// Save a new booking into localStorage
function saveBooking(newBooking) {
  const bookings = getBookings();
  bookings.unshift(newBooking);
  localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
}

// Cancel a booking by PNR
function cancelBooking(pnrNumber) {
  let bookings = getBookings();
  bookings = bookings.map(b => {
    if (b.pnr === pnrNumber) {
      return { ...b, status: 'CANCELLED' };
    }
    return b;
  });
  localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
}

// Save temporary session data
function setSessionData(key, data) {
  sessionStorage.setItem(key, JSON.stringify(data));
}

// Get temporary session data
function getSessionData(key) {
  const data = sessionStorage.getItem(key);
  if (!data) return null;
  try {
    return JSON.parse(data);
  } catch (e) {
    return null;
  }
}

// Clear temporary session data
function removeSessionData(key) {
  sessionStorage.removeItem(key);
}
