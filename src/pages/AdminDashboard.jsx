import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Train, MapPin, Route, Calendar, 
  Users, CreditCard, LogOut, Plus, Edit2, Trash2, Search, CheckCircle2, XCircle, X
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { getData, saveData, deleteData } from '../utils/storage';
import { trains as initialTrains } from '../data/trains';
import { stations as initialStations } from '../data/stations';
import { users as initialUsers } from '../data/users';

// Mock Initial Bookings Data
const initialBookings = [
  { pnr: 'PNR849201', user: 'Riya Sharma', train: 'Mumbai Rajdhani (12951)', date: '2026-09-15', class: '3A', fare: 2400, status: 'CONFIRMED' },
  { pnr: 'PNR730192', user: 'John Doe', train: 'New Delhi Shatabdi (12004)', date: '2026-09-16', class: 'CC', fare: 920, status: 'CONFIRMED' },
  { pnr: 'PNR510293', user: 'Amit Kumar', train: 'Vande Bharat Express (12229)', date: '2026-09-18', class: '2A', fare: 1750, status: 'CANCELLED' },
  { pnr: 'PNR904812', user: 'Sneha Patel', train: 'Karnataka Express (12627)', date: '2026-09-20', class: 'SL', fare: 1120, status: 'CONFIRMED' },
];

// Mock Chart Data
const revenueData = [
  { name: 'Mon', revenue: 4000 },
  { name: 'Tue', revenue: 3000 },
  { name: 'Wed', revenue: 2000 },
  { name: 'Thu', revenue: 2780 },
  { name: 'Fri', revenue: 1890 },
  { name: 'Sat', revenue: 6000 },
  { name: 'Sun', revenue: 8490 },
];

const bookingsChartData = [
  { name: 'Mon', bookings: 24 },
  { name: 'Tue', bookings: 13 },
  { name: 'Wed', bookings: 98 },
  { name: 'Thu', bookings: 39 },
  { name: 'Fri', bookings: 48 },
  { name: 'Sat', bookings: 112 },
  { name: 'Sun', bookings: 145 },
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [admin, setAdmin] = useState(null);

  // Management State
  const [trainList, setTrainList] = useState([]);
  const [stationList, setStationList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [bookingList, setBookingList] = useState([]);

  // Search Filters
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [showTrainModal, setShowTrainModal] = useState(false);
  const [editingTrain, setEditingTrain] = useState(null);
  const [trainForm, setTrainForm] = useState({
    id: '', name: '', type: 'Superfast', origin: '', destination: '', departureTime: '08:00', arrivalTime: '16:00', baseFare: 500
  });

  const [showStationModal, setShowStationModal] = useState(false);
  const [editingStation, setEditingStation] = useState(null);
  const [stationForm, setStationForm] = useState({ code: '', name: '', city: '', state: '' });

  useEffect(() => {
    const user = getData('user');
    if (!user || user.role !== 'admin') {
      navigate('/login');
    } else {
      setAdmin(user);
    }

    // Load management data from localStorage or fallback
    const storedTrains = getData('admin_trains') || initialTrains;
    const storedStations = getData('admin_stations') || initialStations;
    const storedUsers = getData('admin_users') || initialUsers;
    const storedBookings = getData('admin_bookings') || initialBookings;

    setTrainList(storedTrains);
    setStationList(storedStations);
    setUserList(storedUsers);
    setBookingList(storedBookings);
  }, [navigate]);

  if (!admin) return null;

  const handleLogout = () => {
    deleteData('user');
    navigate('/login');
  };

  // Train Actions
  const handleSaveTrain = (e) => {
    e.preventDefault();
    let updated;
    if (editingTrain) {
      updated = trainList.map(t => t.id === editingTrain.id ? { ...t, ...trainForm } : t);
    } else {
      const newTrain = {
        ...trainForm,
        classes: ['1A', '2A', '3A', 'SL'],
        availability: {
          '1A': { status: 'AVAILABLE', seats: 12 },
          '2A': { status: 'AVAILABLE', seats: 24 },
          '3A': { status: 'AVAILABLE', seats: 36 },
          'SL': { status: 'AVAILABLE', seats: 60 }
        }
      };
      updated = [newTrain, ...trainList];
    }
    setTrainList(updated);
    saveData('admin_trains', updated);
    setShowTrainModal(false);
    setEditingTrain(null);
  };

  const handleDeleteTrain = (id) => {
    if (window.confirm('Are you sure you want to delete this train?')) {
      const updated = trainList.filter(t => t.id !== id);
      setTrainList(updated);
      saveData('admin_trains', updated);
    }
  };

  // Station Actions
  const handleSaveStation = (e) => {
    e.preventDefault();
    let updated;
    if (editingStation) {
      updated = stationList.map(s => s.code === editingStation.code ? { ...s, ...stationForm } : s);
    } else {
      updated = [stationForm, ...stationList];
    }
    setStationList(updated);
    saveData('admin_stations', updated);
    setShowStationModal(false);
    setEditingStation(null);
  };

  const handleDeleteStation = (code) => {
    if (window.confirm('Are you sure you want to delete this station?')) {
      const updated = stationList.filter(s => s.code !== code);
      setStationList(updated);
      saveData('admin_stations', updated);
    }
  };

  // Booking Actions
  const handleToggleBookingStatus = (pnr) => {
    const updated = bookingList.map(b => {
      if (b.pnr === pnr) {
        return { ...b, status: b.status === 'CONFIRMED' ? 'CANCELLED' : 'CONFIRMED' };
      }
      return b;
    });
    setBookingList(updated);
    saveData('admin_bookings', updated);
  };

  const navItems = [
    { id: 'dashboard', name: 'Overview', icon: LayoutDashboard },
    { id: 'trains', name: 'Trains', icon: Train },
    { id: 'stations', name: 'Stations', icon: MapPin },
    { id: 'bookings', name: 'Bookings', icon: CreditCard },
    { id: 'users', name: 'Users', icon: Users },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="animate-fade-in-up">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h2>
            
            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[
                { title: 'Total Revenue (7d)', value: '₹34,160', icon: CreditCard, color: 'bg-primary-500' },
                { title: 'Total Bookings', value: bookingList.length.toString(), icon: Calendar, color: 'bg-blue-500' },
                { title: 'Active Trains', value: trainList.length.toString(), icon: Train, color: 'bg-emerald-500' },
                { title: 'Registered Users', value: userList.length.toString(), icon: Users, color: 'bg-indigo-500' },
              ].map((stat, i) => (
                <div key={i} className="glass-card flex items-center p-6 border border-gray-200 bg-white shadow-sm">
                  <div className={`${stat.color} w-14 h-14 rounded-full flex items-center justify-center text-gray-900 mr-4 shadow-md`}>
                    <stat.icon size={24} />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-600 mb-1">{stat.title}</div>
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div className="glass-card border border-gray-200 bg-white p-6">
                <h3 className="font-bold text-lg text-gray-900 mb-6">Revenue Trend</h3>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={revenueData}>
                      <defs>
                        <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#FFB86C" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#FFB86C" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#4B5563'}} />
                      <YAxis axisLine={false} tickLine={false} tick={{fill: '#4B5563'}} />
                      <Tooltip contentStyle={{backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '8px', color: '#111827'}} />
                      <Area type="monotone" dataKey="revenue" stroke="#E09B4E" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="glass-card border border-gray-200 bg-white p-6">
                <h3 className="font-bold text-lg text-gray-900 mb-6">Daily Bookings</h3>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={bookingsChartData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#4B5563'}} />
                      <YAxis axisLine={false} tickLine={false} tick={{fill: '#4B5563'}} />
                      <Tooltip cursor={{fill: '#F3F4F6'}} contentStyle={{backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '8px', color: '#111827'}} />
                      <Bar dataKey="bookings" fill="#FFB86C" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'trains':
        const filteredTrainsList = trainList.filter(t => 
          t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
          t.id.includes(searchQuery) ||
          t.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.destination.toLowerCase().includes(searchQuery.toLowerCase())
        );

        return (
          <div className="animate-fade-in-up">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Manage Trains</h2>
              <button 
                onClick={() => {
                  setEditingTrain(null);
                  setTrainForm({ id: `${Math.floor(10000 + Math.random() * 90000)}`, name: '', type: 'Superfast', origin: 'NDLS', destination: 'MMCT', departureTime: '08:00', arrivalTime: '16:00', baseFare: 650 });
                  setShowTrainModal(true);
                }}
                className="btn-primary flex items-center gap-2 text-sm"
              >
                <Plus size={18} /> Add New Train
              </button>
            </div>
            
            <div className="glass-card p-0 overflow-hidden border border-gray-200 bg-white shadow-sm">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                <div className="relative w-72">
                  <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  <input 
                    type="text" 
                    placeholder="Search by train ID, name, route..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="input-field pl-9 py-2 text-sm" 
                  />
                </div>
                <div className="text-sm font-semibold text-gray-600">Showing {filteredTrainsList.length} Trains</div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-gray-100 border-b border-gray-200 text-sm text-gray-700">
                      <th className="p-4 font-bold">ID / Name</th>
                      <th className="p-4 font-bold">Type</th>
                      <th className="p-4 font-bold">Route</th>
                      <th className="p-4 font-bold">Timing</th>
                      <th className="p-4 font-bold">Base Fare</th>
                      <th className="p-4 font-bold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-gray-200">
                    {filteredTrainsList.map((train, i) => (
                      <tr key={i} className="hover:bg-gray-50">
                        <td className="p-4">
                          <div className="font-bold text-gray-900">{train.name}</div>
                          <div className="text-xs font-semibold text-primary-700">#{train.id}</div>
                        </td>
                        <td className="p-4">
                          <span className="px-2.5 py-1 bg-primary-100 text-primary-800 rounded-md text-xs font-bold">{train.type}</span>
                        </td>
                        <td className="p-4 text-gray-800 font-medium">{train.origin} &rarr; {train.destination}</td>
                        <td className="p-4 text-gray-800">{train.departureTime} - {train.arrivalTime}</td>
                        <td className="p-4 font-bold text-gray-900">₹{train.baseFare}</td>
                        <td className="p-4 text-right space-x-2">
                          <button 
                            onClick={() => {
                              setEditingTrain(train);
                              setTrainForm({ ...train });
                              setShowTrainModal(true);
                            }}
                            className="p-2 text-gray-700 hover:text-primary-700 bg-gray-100 hover:bg-primary-50 rounded-lg border border-gray-300 transition-colors" 
                            title="Edit Train"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button 
                            onClick={() => handleDeleteTrain(train.id)}
                            className="p-2 text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100 rounded-lg border border-red-200 transition-colors" 
                            title="Delete Train"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'stations':
        return (
          <div className="animate-fade-in-up">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Manage Stations</h2>
              <button 
                onClick={() => {
                  setEditingStation(null);
                  setStationForm({ code: '', name: '', city: '', state: '' });
                  setShowStationModal(true);
                }}
                className="btn-primary flex items-center gap-2 text-sm"
              >
                <Plus size={18} /> Add Station
              </button>
            </div>
            
            <div className="glass-card p-6 border border-gray-200 bg-white">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {stationList.map((station, i) => (
                  <div key={i} className="border border-gray-300 rounded-xl p-4 hover:border-primary-500 transition-colors bg-white shadow-sm group">
                    <div className="flex justify-between items-start mb-2">
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-800 rounded text-xs font-bold">{station.code}</span>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => {
                            setEditingStation(station);
                            setStationForm({ ...station });
                            setShowStationModal(true);
                          }}
                          className="text-gray-600 hover:text-primary-700"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button 
                          onClick={() => handleDeleteStation(station.code)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                    <div className="font-bold text-gray-900">{station.name}</div>
                    <div className="text-xs text-gray-600 mt-1">{station.city}, {station.state}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'bookings':
        return (
          <div className="animate-fade-in-up">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Manage Bookings</h2>
            <div className="glass-card p-0 overflow-hidden border border-gray-200 bg-white">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-gray-100 border-b border-gray-200 text-sm text-gray-700">
                      <th className="p-4 font-bold">PNR</th>
                      <th className="p-4 font-bold">Passenger</th>
                      <th className="p-4 font-bold">Train</th>
                      <th className="p-4 font-bold">Date</th>
                      <th className="p-4 font-bold">Class</th>
                      <th className="p-4 font-bold">Amount</th>
                      <th className="p-4 font-bold">Status</th>
                      <th className="p-4 font-bold text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-gray-200">
                    {bookingList.map((b, i) => (
                      <tr key={i} className="hover:bg-gray-50">
                        <td className="p-4 font-bold text-primary-700">{b.pnr}</td>
                        <td className="p-4 font-semibold text-gray-900">{b.user}</td>
                        <td className="p-4 text-gray-800">{b.train}</td>
                        <td className="p-4 text-gray-800">{b.date}</td>
                        <td className="p-4 font-bold text-gray-900">{b.class}</td>
                        <td className="p-4 font-bold text-gray-900">₹{b.fare}</td>
                        <td className="p-4">
                          <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${b.status === 'CONFIRMED' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {b.status}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <button 
                            onClick={() => handleToggleBookingStatus(b.pnr)}
                            className="btn-secondary text-xs py-1 px-3"
                          >
                            Toggle Status
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'users':
        return (
          <div className="animate-fade-in-up">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Registered Users</h2>
            <div className="glass-card p-0 overflow-hidden border border-gray-200 bg-white">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-gray-100 border-b border-gray-200 text-sm text-gray-700">
                      <th className="p-4 font-bold">User</th>
                      <th className="p-4 font-bold">Email</th>
                      <th className="p-4 font-bold">Role</th>
                      <th className="p-4 font-bold">Phone</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-gray-200">
                    {userList.map((u, i) => (
                      <tr key={i} className="hover:bg-gray-50">
                        <td className="p-4 flex items-center gap-3">
                          <img src={u.avatar} alt="Avatar" className="w-8 h-8 rounded-full border border-gray-200" />
                          <span className="font-bold text-gray-900">{u.name}</span>
                        </td>
                        <td className="p-4 text-gray-800">{u.email}</td>
                        <td className="p-4">
                          <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${u.role === 'admin' ? 'bg-primary-100 text-primary-800' : 'bg-gray-100 text-gray-800'}`}>
                            {u.role.toUpperCase()}
                          </span>
                        </td>
                        <td className="p-4 text-gray-800">{u.phone || '9876543210'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      
      {/* Admin Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-gray-200 shrink-0 flex flex-col h-auto md:h-screen sticky top-0">
        <div className="p-6 border-b border-gray-200 flex items-center gap-3">
          <div className="bg-primary-500 p-2 rounded-xl text-gray-900 shadow-md">
            <Train size={20} strokeWidth={2.5} />
          </div>
          <div>
            <span className="font-extrabold text-xl tracking-tight text-gray-900 block leading-none">RailEase</span>
            <span className="text-xs font-bold text-primary-700 uppercase tracking-widest">Admin Panel</span>
          </div>
        </div>
        
        <div className="flex-1 py-6 px-4 space-y-1 overflow-y-auto flex flex-row md:flex-col overflow-x-auto md:overflow-x-visible">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-sm whitespace-nowrap
                ${activeTab === item.id 
                  ? 'bg-primary-100 text-primary-800' 
                  : 'text-gray-700 hover:bg-gray-100'
                }`}
            >
              <item.icon size={18} className={activeTab === item.id ? 'text-primary-700' : 'text-gray-500'} />
              {item.name}
            </button>
          ))}
        </div>
        
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 px-4 py-2 mb-4">
            <img src={admin.avatar} alt="Admin" className="w-8 h-8 rounded-full border border-gray-200" />
            <div className="flex-1 overflow-hidden">
              <div className="text-sm font-bold text-gray-900 truncate">{admin.name}</div>
              <div className="text-xs text-gray-600 truncate">{admin.email}</div>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2 text-sm font-bold text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {/* Admin Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        {renderContent()}
      </main>

      {/* Add / Edit Train Modal */}
      {showTrainModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">{editingTrain ? 'Edit Train Details' : 'Add New Train'}</h3>
              <button onClick={() => setShowTrainModal(false)} className="p-1 text-gray-500 hover:bg-gray-100 rounded-full"><X size={20} /></button>
            </div>
            <form onSubmit={handleSaveTrain} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-800 mb-1">Train ID / Number</label>
                <input type="text" required value={trainForm.id} onChange={e => setTrainForm({...trainForm, id: e.target.value})} className="input-field py-2" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-800 mb-1">Train Name</label>
                <input type="text" required value={trainForm.name} onChange={e => setTrainForm({...trainForm, name: e.target.value})} className="input-field py-2" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">Origin Code</label>
                  <input type="text" required value={trainForm.origin} onChange={e => setTrainForm({...trainForm, origin: e.target.value.toUpperCase()})} className="input-field py-2" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">Destination Code</label>
                  <input type="text" required value={trainForm.destination} onChange={e => setTrainForm({...trainForm, destination: e.target.value.toUpperCase()})} className="input-field py-2" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">Departure Time</label>
                  <input type="time" required value={trainForm.departureTime} onChange={e => setTrainForm({...trainForm, departureTime: e.target.value})} className="input-field py-2" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">Arrival Time</label>
                  <input type="time" required value={trainForm.arrivalTime} onChange={e => setTrainForm({...trainForm, arrivalTime: e.target.value})} className="input-field py-2" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-800 mb-1">Base Fare (₹)</label>
                <input type="number" required min="100" value={trainForm.baseFare} onChange={e => setTrainForm({...trainForm, baseFare: Number(e.target.value)})} className="input-field py-2" />
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setShowTrainModal(false)} className="btn-secondary flex-1 py-2">Cancel</button>
                <button type="submit" className="btn-primary flex-1 py-2 font-bold">Save Train</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add / Edit Station Modal */}
      {showStationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">{editingStation ? 'Edit Station' : 'Add New Station'}</h3>
              <button onClick={() => setShowStationModal(false)} className="p-1 text-gray-500 hover:bg-gray-100 rounded-full"><X size={20} /></button>
            </div>
            <form onSubmit={handleSaveStation} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-800 mb-1">Station Code (e.g. NDLS)</label>
                <input type="text" required value={stationForm.code} onChange={e => setStationForm({...stationForm, code: e.target.value.toUpperCase()})} className="input-field py-2" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-800 mb-1">Station Name</label>
                <input type="text" required value={stationForm.name} onChange={e => setStationForm({...stationForm, name: e.target.value})} className="input-field py-2" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-800 mb-1">City / District</label>
                <input type="text" required value={stationForm.city} onChange={e => setStationForm({...stationForm, city: e.target.value})} className="input-field py-2" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-800 mb-1">State</label>
                <input type="text" required value={stationForm.state} onChange={e => setStationForm({...stationForm, state: e.target.value})} className="input-field py-2" />
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setShowStationModal(false)} className="btn-secondary flex-1 py-2">Cancel</button>
                <button type="submit" className="btn-primary flex-1 py-2 font-bold">Save Station</button>
              </div>
            </form>
          </div>
        </div>
      )}
      
    </div>
  );
};

export default AdminDashboard;
