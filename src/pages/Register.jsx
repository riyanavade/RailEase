import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Train, User, Phone } from 'lucide-react';
import { saveData } from '../utils/storage';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    // Mock registration
    setTimeout(() => {
      const newUser = {
        id: `user_${Date.now()}`,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        role: 'user',
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name)}&background=3B82F6&color=fff`
      };
      
      saveData('user', newUser);
      window.location.href = '/';
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-bg flex items-center justify-center p-4 py-12">
      <div className="max-w-md w-full animate-fade-in-up">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <div className="bg-primary-600 p-2 rounded-xl text-white">
              <Train size={24} strokeWidth={2.5} />
            </div>
            <span className="font-bold text-2xl tracking-tight text-warm-900 dark:text-white">
              Rail<span className="text-primary-600 dark:text-primary-400">Ease</span>
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-warm-900 dark:text-white">Create an Account</h1>
          <p className="text-warm-500 dark:text-warm-400 mt-2">Join us to book tickets faster</p>
        </div>

        <div className="glass-card">
          <form onSubmit={handleRegister} className="space-y-4">
            {error && (
              <div className="p-3 bg-cream-100 border border-cream-200 text-warm-600 rounded-lg text-sm">
                {error}
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-warm-700 dark:text-warm-300 mb-1">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={18} className="text-warm-400" />
                </div>
                <input
                  type="text"
                  name="name"
                  required
                  className="input-field pl-10"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-warm-700 dark:text-warm-300 mb-1">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={18} className="text-warm-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  required
                  className="input-field pl-10"
                  placeholder="user@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-warm-700 dark:text-warm-300 mb-1">Mobile Number</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone size={18} className="text-warm-400" />
                </div>
                <input
                  type="tel"
                  name="phone"
                  required
                  pattern="[0-9]{10}"
                  className="input-field pl-10"
                  placeholder="10-digit number"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-warm-700 dark:text-warm-300 mb-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-warm-400" />
                </div>
                <input
                  type="password"
                  name="password"
                  required
                  className="input-field pl-10"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  minLength="6"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-warm-700 dark:text-warm-300 mb-1">Confirm Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-warm-400" />
                </div>
                <input
                  type="password"
                  name="confirmPassword"
                  required
                  className="input-field pl-10"
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full btn-primary py-3 mt-6">
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-warm-600 dark:text-warm-400">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
