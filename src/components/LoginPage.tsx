'use client';

import { useState } from 'react';
import { Eye, EyeOff, Building2, CheckCircle, AlertCircle } from 'lucide-react';
import { User } from '../types';
import { DEMO_USERS } from '../data/constants';
import { sanitizeInput, validateCredentials, loginRateLimiter } from '../lib/security';

interface LoginPageProps {
  onLogin: (user: User) => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Sanitize inputs
      const cleanUsername = sanitizeInput(username);
      const cleanPassword = sanitizeInput(password);

      // Validate input format
      const validation = validateCredentials(cleanUsername, cleanPassword);
      if (!validation.isValid) {
        setError(validation.errors.join('. '));
        setIsLoading(false);
        return;
      }

      // Check rate limiting
      const clientId = 'login_' + (typeof window !== 'undefined' ? window.location.hostname : 'server');
      if (loginRateLimiter.isRateLimited(clientId)) {
        setError('Too many login attempts. Please wait before trying again.');
        setIsLoading(false);
        return;
      }

      // Find user with matching credentials
      const user = DEMO_USERS.find(u => 
        u.username.trim() === cleanUsername && 
        u.password.trim() === cleanPassword && 
        u.isActive
      );

      if (user) {
        // Reset rate limiter on successful login
        loginRateLimiter.reset(clientId);
        setIsLoading(false);
        onLogin(user);
      } else {
        setError('Invalid credentials or inactive account');
        setIsLoading(false);
      }
    } catch (err) {
      setError('Login error: ' + (err instanceof Error ? err.message : 'Unknown error'));
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-center">
          <div className="flex justify-center mb-4">
            <Building2 className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">
            CMC Data Entry System
          </h1>
          <p className="text-blue-100 text-sm">
            Coastal Marine Center - Data Management Portal
          </p>
        </div>

        {/* Login Form */}
        <div className="p-8">
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-green-800">Ready to Login</span>
            </div>
            <p className="text-sm text-green-700">
              Use the demo credentials below or click on any credential button to auto-fill the form.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle className="h-4 w-4 text-red-500" />
                <span className="text-red-700 text-sm">{error}</span>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Enter your username"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors pr-12"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  Authenticating...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Security Notice */}
          <div className="mt-8 p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <h3 className="text-sm font-medium text-gray-800 mb-2 flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              Authorized Access Only
            </h3>
            <p className="text-sm text-gray-600">
              This system contains sensitive environmental monitoring data. 
              Access is restricted to authorized personnel only. Contact your 
              system administrator for access credentials.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
