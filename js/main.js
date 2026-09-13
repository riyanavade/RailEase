/* ==========================================================================
   RailEase - Core Application Logic & DOM Controller
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Highlight active nav link based on current page URL
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // Page Specific Controllers
  if (document.getElementById('search-form')) {
    initHomePage();
  } else if (document.getElementById('search-results-page')) {
    initSearchResultsPage();
  } else if (document.getElementById('passenger-form-page')) {
    initPassengerDetailsPage();
  } else if (document.getElementById('payment-page')) {
    initPaymentPage();
  } else if (document.getElementById('confirmation-page')) {
    initConfirmationPage();
  } else if (document.getElementById('pnr-status-page')) {
    initPNRStatusPage();
  } else if (document.getElementById('my-bookings-page')) {
    initMyBookingsPage();
  }
});

/* --------------------------------------------------------------------------
   1. Home Page Initialization
   -------------------------------------------------------------------------- */
function initHomePage() {
  const fromSelect = document.getElementById('from-station');
  const toSelect = document.getElementById('to-station');
  const dateInput = document.getElementById('journey-date');

  // Set default date to tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  if (dateInput) {
    dateInput.value = tomorrow.toISOString().split('T')[0];
    dateInput.min = new Date().toISOString().split('T')[0];
  }

  // Populate stations dropdowns
  if (fromSelect && toSelect) {
    STATIONS.forEach(st => {
      const opt1 = new Option(`${st.name} (${st.code})`, st.code);
      const opt2 = new Option(`${st.name} (${st.code})`, st.code);
      fromSelect.add(opt1);
      toSelect.add(opt2);
    });

    fromSelect.value = 'MMCT';
    toSelect.value = 'NDLS';
  }

  // Swap stations button
  const swapBtn = document.getElementById('swap-btn');
  if (swapBtn) {
    swapBtn.addEventListener('click', () => {
      const temp = fromSelect.value;
      fromSelect.value = toSelect.value;
      toSelect.value = temp;
    });
  }

  // Handle search form submission
  const searchForm = document.getElementById('search-form');
  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchData = {
      from: fromSelect.value,
      to: toSelect.value,
      date: dateInput.value,
      travelClass: document.getElementById('travel-class')?.value || 'ALL'
    };

    setSessionData(STORAGE_KEYS.CURRENT_SEARCH, searchData);
    window.location.href = 'search.html';
  });
}

/* --------------------------------------------------------------------------
   2. Search Results Page
   -------------------------------------------------------------------------- */
function initSearchResultsPage() {
  const searchParams = getSessionData(STORAGE_KEYS.CURRENT_SEARCH) || { from: 'MMCT', to: 'NDLS', date: '' };
  const container = document.getElementById('train-list-container');
  const routeHeading = document.getElementById('route-heading');

  const fromStation = STATIONS.find(s => s.code === searchParams.from) || { name: searchParams.from, code: searchParams.from };
  const toStation = STATIONS.find(s => s.code === searchParams.to) || { name: searchParams.to, code: searchParams.to };

  if (routeHeading) {
    routeHeading.textContent = `${fromStation.name} (${fromStation.code}) → ${toStation.name} (${toStation.code})`;
  }

  const trainsList = searchTrainsData(searchParams.from, searchParams.to);
  renderTrainCards(trainsList, container, searchParams);
}

function renderTrainCards(trainsList, container, searchParams) {
  if (!container) return;
  container.innerHTML = '';

  if (trainsList.length === 0) {
    container.innerHTML = '<div class="card"><p class="text-muted">No trains found for this route.</p></div>';
    return;
  }

  trainsList.forEach(train => {
    const trainCard = document.createElement('div');
    trainCard.className = 'train-card';

    let classButtonsHTML = '';
    Object.keys(train.availability).forEach(cls => {
      const avail = train.availability[cls];
      classButtonsHTML += `
        <div class="class-card-btn" onclick="selectClassAndBook('${train.id}', '${cls}', ${avail.price})">
          <div class="class-code">${cls}</div>
          <div class="class-status">${avail.status} - ${avail.seats} Seats</div>
          <div class="class-price">₹${avail.price}</div>
        </div>
      `;
    });

    trainCard.innerHTML = `
      <div class="train-header">
        <div>
          <span class="train-name">${train.name}</span>
          <span class="train-number">#${train.id}</span>
        </div>
        <span class="badge-tag ${train.badgeClass}">${train.type}</span>
      </div>
      <div class="schedule-row">
        <div class="station-box">
          <div class="station-time">${train.departureTime}</div>
          <div class="station-code">${train.origin}</div>
          <div class="station-name-sub">${train.originName}</div>
        </div>
        <div class="duration-box">
          <div>${train.duration}</div>
          <div class="duration-line"></div>
          <div>${train.days.join(', ')}</div>
        </div>
        <div class="station-box">
          <div class="station-time">${train.arrivalTime}</div>
          <div class="station-code">${train.destination}</div>
          <div class="station-name-sub">${train.destinationName}</div>
        </div>
      </div>
      <h4 style="margin-bottom:0.6rem; font-size:0.95rem;">Select Class & Fare:</h4>
      <div class="class-grid">${classButtonsHTML}</div>
    `;

    container.appendChild(trainCard);
  });
}

function selectClassAndBook(trainId, travelClass, fare) {
  const searchParams = getSessionData(STORAGE_KEYS.CURRENT_SEARCH) || { from: 'MMCT', to: 'NDLS', date: new Date().toISOString().split('T')[0] };
  const train = TRAINS.find(t => t.id === trainId);

  const bookingDraft = {
    trainId: train.id,
    trainName: train.name,
    origin: train.origin,
    originName: train.originName,
    destination: train.destination,
    destinationName: train.destinationName,
    departureTime: train.departureTime,
    arrivalTime: train.arrivalTime,
    journeyDate: searchParams.date || new Date().toISOString().split('T')[0],
    travelClass: travelClass,
    pricePerPassenger: fare,
    passengers: []
  };

  setSessionData(STORAGE_KEYS.CURRENT_BOOKING, bookingDraft);
  window.location.href = 'passenger-details.html';
}

/* --------------------------------------------------------------------------
   3. Passenger Details Page
   -------------------------------------------------------------------------- */
let passengerCount = 1;

function initPassengerDetailsPage() {
  const currentBooking = getSessionData(STORAGE_KEYS.CURRENT_BOOKING);
  if (!currentBooking) {
    window.location.href = 'index.html';
    return;
  }

  // Display booking summary
  document.getElementById('summary-train').textContent = `${currentBooking.trainName} (#${currentBooking.trainId})`;
  document.getElementById('summary-route').textContent = `${currentBooking.origin} → ${currentBooking.destination}`;
  document.getElementById('summary-date').textContent = currentBooking.journeyDate;
  document.getElementById('summary-class').textContent = currentBooking.travelClass;
  document.getElementById('summary-fare').textContent = `₹${currentBooking.pricePerPassenger}`;

  const addBtn = document.getElementById('add-passenger-btn');
  if (addBtn) {
    addBtn.addEventListener('click', addPassengerRow);
  }

  const form = document.getElementById('passenger-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const passengerRows = document.querySelectorAll('.passenger-row');
      const passengersList = [];

      passengerRows.forEach((row, idx) => {
        const name = row.querySelector('.p-name').value;
        const age = row.querySelector('.p-age').value;
        const gender = row.querySelector('.p-gender').value;
        const berth = row.querySelector('.p-berth').value;

        if (name && age) {
          passengersList.push({
            name,
            age,
            gender,
            berth,
            seatNo: `${currentBooking.travelClass}-${Math.floor(10 + Math.random() * 60)}`
          });
        }
      });

      if (passengersList.length === 0) {
        alert('Please enter details for at least one passenger.');
        return;
      }

      const totalBaseFare = passengersList.length * currentBooking.pricePerPassenger;
      const taxes = Math.round(totalBaseFare * 0.05);
      const totalAmount = totalBaseFare + taxes + 30; // ₹30 convenience fee

      currentBooking.passengers = passengersList;
      currentBooking.fareDetails = {
        baseFare: totalBaseFare,
        taxes: taxes,
        convenienceFee: 30,
        totalAmount: totalAmount
      };

      setSessionData(STORAGE_KEYS.CURRENT_BOOKING, currentBooking);
      window.location.href = 'payment.html';
    });
  }
}

function addPassengerRow() {
  passengerCount++;
  const container = document.getElementById('passenger-rows-container');
  if (!container) return;

  const row = document.createElement('div');
  row.className = 'card passenger-row';
  row.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
      <h4 style="color:var(--primary-color);">Passenger #${passengerCount}</h4>
      <button type="button" class="btn btn-danger" style="padding:0.3rem 0.6rem; font-size:0.85rem;" onclick="this.closest('.passenger-row').remove(); updateFareCalculation();">Remove</button>
    </div>
    <div class="form-row">
      <div class="form-col" style="flex:2;">
        <label>Full Name</label>
        <input type="text" class="form-control p-name" placeholder="Enter Full Name" required />
      </div>
      <div class="form-col">
        <label>Age</label>
        <input type="number" class="form-control p-age" placeholder="Age" min="1" max="120" required />
      </div>
      <div class="form-col">
        <label>Gender</label>
        <select class="form-control p-gender">
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
      </div>
      <div class="form-col">
        <label>Berth Preference</label>
        <select class="form-control p-berth">
          <option>No Preference</option>
          <option>Lower</option>
          <option>Middle</option>
          <option>Upper</option>
          <option>Side Lower</option>
          <option>Side Upper</option>
        </select>
      </div>
    </div>
  `;
  container.appendChild(row);
}

/* --------------------------------------------------------------------------
   4. Payment Page
   -------------------------------------------------------------------------- */
function initPaymentPage() {
  const currentBooking = getSessionData(STORAGE_KEYS.CURRENT_BOOKING);
  if (!currentBooking || !currentBooking.fareDetails) {
    window.location.href = 'index.html';
    return;
  }

  document.getElementById('pay-total-display').textContent = `₹${currentBooking.fareDetails.totalAmount}`;
  document.getElementById('pay-btn-amount').textContent = `Pay ₹${currentBooking.fareDetails.totalAmount}`;

  const payForm = document.getElementById('payment-form');
  if (payForm) {
    payForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const payBtn = document.getElementById('pay-submit-btn');
      payBtn.disabled = true;
      payBtn.textContent = 'Processing Payment... Please wait';

      setTimeout(() => {
        // Generate Mock 10-digit PNR
        const mockPNR = Math.floor(1000000000 + Math.random() * 9000000000).toString();
        const completedBooking = {
          ...currentBooking,
          pnr: mockPNR,
          bookingDate: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
          status: 'CONFIRMED'
        };

        saveBooking(completedBooking);
        setSessionData(STORAGE_KEYS.COMPLETED_BOOKING, completedBooking);
        removeSessionData(STORAGE_KEYS.CURRENT_BOOKING);

        window.location.href = 'confirmation.html';
      }, 1800);
    });
  }
}

/* --------------------------------------------------------------------------
   5. Confirmation Page
   -------------------------------------------------------------------------- */
function initConfirmationPage() {
  const completedBooking = getSessionData(STORAGE_KEYS.COMPLETED_BOOKING);
  if (!completedBooking) {
    window.location.href = 'index.html';
    return;
  }

  document.getElementById('ticket-pnr').textContent = completedBooking.pnr;
  document.getElementById('ticket-train').textContent = `${completedBooking.trainName} (#${completedBooking.trainId})`;
  document.getElementById('ticket-route').textContent = `${completedBooking.originName} (${completedBooking.origin}) → ${completedBooking.destinationName} (${completedBooking.destination})`;
  document.getElementById('ticket-date').textContent = completedBooking.journeyDate;
  document.getElementById('ticket-class').textContent = completedBooking.travelClass;

  const tbody = document.getElementById('passengers-tbody');
  if (tbody && completedBooking.passengers) {
    tbody.innerHTML = '';
    completedBooking.passengers.forEach((p, idx) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${idx + 1}</td>
        <td><strong>${p.name}</strong></td>
        <td>${p.age} / ${p.gender}</td>
        <td><span class="status-badge-success">CONFIRMED</span></td>
        <td>${p.seatNo} (${p.berth})</td>
      `;
      tbody.appendChild(tr);
    });
  }
}

/* --------------------------------------------------------------------------
   6. PNR Status Page
   -------------------------------------------------------------------------- */
function initPNRStatusPage() {
  const pnrForm = document.getElementById('pnr-search-form');
  const resultCard = document.getElementById('pnr-result-card');

  if (pnrForm) {
    pnrForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const pnrInput = document.getElementById('pnr-input').value.trim();

      const allBookings = getBookings();
      const found = allBookings.find(b => b.pnr === pnrInput);

      if (found) {
        renderPNRDetail(found, resultCard);
      } else {
        resultCard.style.display = 'block';
        resultCard.innerHTML = `
          <div class="card" style="border-left: 4px solid var(--danger-color);">
            <h3 style="color:var(--danger-color);">PNR Not Found</h3>
            <p>No booking found for PNR: <strong>${pnrInput}</strong>. Please check your 10-digit PNR number.</p>
          </div>
        `;
      }
    });
  }
}

function renderPNRDetail(booking, container) {
  container.style.display = 'block';
  let passengersHTML = '';
  booking.passengers.forEach((p, idx) => {
    passengersHTML += `
      <tr>
        <td>${idx + 1}</td>
        <td><strong>${p.name}</strong></td>
        <td>${p.age} / ${p.gender}</td>
        <td><span class="status-badge-success">${booking.status}</span></td>
        <td>${p.seatNo}</td>
      </tr>
    `;
  });

  container.innerHTML = `
    <div class="card" style="border-top:4px solid var(--primary-color);">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
        <h3>PNR: <span style="color:var(--primary-color);">${booking.pnr}</span></h3>
        <span class="status-badge-success">${booking.status}</span>
      </div>
      <p><strong>Train:</strong> ${booking.trainName} (#${booking.trainId})</p>
      <p><strong>Route:</strong> ${booking.originName} → ${booking.destinationName}</p>
      <p><strong>Journey Date:</strong> ${booking.journeyDate} | <strong>Class:</strong> ${booking.travelClass}</p>
      <h4 style="margin-top:1.5rem; margin-bottom:0.5rem;">Passenger Details</h4>
      <table class="table-custom">
        <thead>
          <tr><th>#</th><th>Name</th><th>Age/Gender</th><th>Status</th><th>Seat</th></tr>
        </thead>
        <tbody>${passengersHTML}</tbody>
      </table>
    </div>
  `;
}

/* --------------------------------------------------------------------------
   7. My Bookings Page
   -------------------------------------------------------------------------- */
function initMyBookingsPage() {
  const container = document.getElementById('my-bookings-container');
  if (!container) return;

  const bookings = getBookings();

  if (bookings.length === 0) {
    container.innerHTML = `
      <div class="card text-center" style="padding:3rem;">
        <h3>No Bookings Found</h3>
        <p class="text-muted">You haven't made any train reservations yet.</p>
        <a href="index.html" class="btn btn-primary" style="margin-top:1rem;">Book Tickets Now</a>
      </div>
    `;
    return;
  }

  container.innerHTML = '';
  bookings.forEach(b => {
    const card = document.createElement('div');
    card.className = 'card';
    
    const isCancelled = b.status === 'CANCELLED';

    card.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.8rem;">
        <div>
          <span style="font-size:1.2rem; font-weight:700; color:var(--primary-color);">${b.trainName}</span>
          <span style="color:var(--text-muted);"> (#${b.trainId})</span>
        </div>
        <span class="${isCancelled ? 'btn-danger' : 'status-badge-success'}" style="padding:0.3rem 0.8rem; border-radius:20px; font-weight:700; font-size:0.85rem;">
          ${b.status}
        </span>
      </div>
      <div class="form-row" style="margin-bottom:1rem; font-size:0.95rem;">
        <div><strong>PNR:</strong> ${b.pnr}</div>
        <div><strong>Route:</strong> ${b.origin} → ${b.destination}</div>
        <div><strong>Date:</strong> ${b.journeyDate}</div>
        <div><strong>Class:</strong> ${b.travelClass}</div>
        <div><strong>Passengers:</strong> ${b.passengers.length}</div>
      </div>
      <div style="display:flex; gap:0.5rem; justify-content:flex-end;">
        ${!isCancelled ? `
          <button class="btn btn-danger" style="padding:0.4rem 0.8rem; font-size:0.85rem;" onclick="handleCancel('${b.pnr}')">Cancel Ticket</button>
        ` : ''}
      </div>
    `;

    container.appendChild(card);
  });
}

function handleCancel(pnr) {
  if (confirm(`Are you sure you want to cancel booking for PNR ${pnr}?`)) {
    cancelBooking(pnr);
    initMyBookingsPage();
  }
}
