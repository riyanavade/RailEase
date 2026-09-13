# RailEase - Indian Railway Reservation System

An authentic, responsive frontend web application for reserving train tickets, checking live PNR status, and managing booking history built using **HTML5, CSS3, and Vanilla JavaScript**.

---

## 🌟 Key Features

1. **Train Search & Seat Availability**:
   - Select departure & destination stations.
   - Choose travel class (1A, 2A, 3A, SL, CC).
   - Real-time seat availability & dynamic fare calculation.

2. **Passenger Details & Booking**:
   - Add/remove multiple passenger details (Name, Age, Gender, Berth Preference).
   - Instant calculation of base fare, GST/Taxes, and convenience fees.

3. **Payment Portal & Ticket Generation**:
   - Supports UPI QR code, Card, and Net Banking options.
   - Generates a unique 10-digit Passenger Name Record (PNR).

4. **Live PNR Enquiry**:
   - Search any 10-digit PNR to retrieve status, passenger list, and journey details.

5. **My Bookings Dashboard**:
   - View all active and past tickets saved in browser `localStorage`.
   - Cancel tickets with instant status update.

---

## 📁 File & Directory Structure

```text
railway_reservation/
├── index.html               # Home page & Train Search
├── search.html              # Search Results & Train List
├── passenger-details.html   # Passenger Form
├── payment.html             # Payment Portal
├── confirmation.html        # Booked Ticket View & Print
├── pnr-status.html          # PNR Status Enquiry
├── my-bookings.html         # Bookings History
├── login.html               # User Login Form
├── register.html            # Registration Form
├── css/
│   └── style.css            # Custom Vanilla CSS Stylesheet
└── js/
    ├── data.js              # Mock Stations & Trains Data
    ├── storage.js           # LocalStorage & SessionStorage Helpers
    └── main.js              # Core DOM Interactions & Controllers
```

---

## 🚀 How to Run the Project

1. Download or clone this repository.
2. Open `index.html` directly in any web browser (Google Chrome, Microsoft Edge, Mozilla Firefox).
3. No Node.js or `npm install` required!
