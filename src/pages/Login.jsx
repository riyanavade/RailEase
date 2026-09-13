import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Train } from 'lucide-react';
import { authenticateUser } from '../data/users';
import { saveData } from '../utils/storage';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    setTimeout(() => {
      const user = authenticateUser(email, password);
      if (user) {
        saveData('user', user);
        // Force reload to update Navbar state
        window.location.href = user.role === 'admin' ? '/admin' : '/';
      } else {
        setError('Invalid email or password. Use john@example.com / password123');
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-bg flex items-center justify-center p-4">
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
          <h1 className="text-2xl font-bold text-warm-900 dark:text-white">Welcome Back</h1>
          <p className="text-warm-500 dark:text-warm-400 mt-2">Sign in to manage your bookings</p>
        </div>

        <div className="glass-card">
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="p-3 bg-cream-50 border border-cream-300 text-warm-600 rounded-lg text-sm">
                {error}
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-warm-700 dark:text-warm-300 mb-1">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={18} className="text-warm-400" />
                </div>
                <input
                  type="email"
                  required
                  className="input-field pl-10"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-sm font-medium text-warm-700 dark:text-warm-300">Password</label>
                <Link to="/forgot-password" className="text-sm font-medium text-primary-600 hover:text-primary-500">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-warm-400" />
                </div>
                <input
                  type="password"
                  required
                  className="input-field pl-10"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full btn-primary py-3">
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-warm-600 dark:text-warm-400">
            Don't have an account?{' '}
            <Link to="/register" className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400">
              Sign up
            </Link>
          </div>
          
          <div className="mt-6 p-4 bg-cream-100 dark:bg-cream-800 rounded-lg text-xs text-warm-500 font-mono text-center">
            Demo Credentials:<br/>
            User: john@example.com / password123<br/>
            Admin: admin@railease.com / password123
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
