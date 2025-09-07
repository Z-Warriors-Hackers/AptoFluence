import React, { useState } from 'react';
import { X, Mail, Lock, User, MapPin, Tag, Users, Wallet } from 'lucide-react';

interface InfluencerRegistrationFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: any) => void;
}

export default function InfluencerRegistrationForm({ isOpen, onClose, onSuccess }: InfluencerRegistrationFormProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    socialHandles: {
      youtube: { handle: '', followers: '' },
      twitter: { handle: '', followers: '' },
      instagram: { handle: '', followers: '' },
      tiktok: { handle: '', followers: '' },
      twitch: { handle: '', followers: '' }
    },
    location: '',
    niche: '',
    walletAddress: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const niches = [
    'Fashion & Beauty', 'Technology', 'Gaming', 'Health & Fitness', 'Food & Cooking',
    'Travel', 'Lifestyle', 'Education', 'Finance', 'Entertainment', 'Sports', 'Other'
  ];

  const platforms = [
    { key: 'youtube', label: 'YouTube', icon: '📺', color: 'text-red-500' },
    { key: 'instagram', label: 'Instagram', icon: '📷', color: 'text-pink-500' },
    { key: 'twitter', label: 'Twitter', icon: '🐦', color: 'text-blue-500' },
    { key: 'tiktok', label: 'TikTok', icon: '🎵', color: 'text-purple-500' },
    { key: 'twitch', label: 'Twitch', icon: '🎮', color: 'text-purple-600' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    // Validation
    const newErrors: {[key: string]: string} = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!formData.location) newErrors.location = 'Location is required';
    if (!formData.niche) newErrors.niche = 'Niche is required';
    
    // At least one social handle required
    const hasSocialHandle = Object.values(formData.socialHandles).some(platform => platform.handle.trim());
    if (!hasSocialHandle) {
      newErrors.socialHandles = 'At least one social media handle is required';
    }

    // Check if email already exists
    const existingUsers = JSON.parse(localStorage.getItem('aptofluence_users') || '[]');
    if (existingUsers.some((user: any) => user.email === formData.email)) {
      newErrors.email = 'Email already registered';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    // Simulate registration
    setTimeout(() => {
      const newUser = {
        id: Date.now().toString(),
        type: 'influencer',
        email: formData.email,
        password: formData.password,
        socialHandles: formData.socialHandles,
        location: formData.location,
        niche: formData.niche,
        walletAddress: formData.walletAddress || `0x${Math.random().toString(16).substr(2, 40)}`,
        credibilityScore: Math.floor(Math.random() * 50) + 50, // Random score 50-100
        createdAt: new Date().toISOString()
      };

      const users = [...existingUsers, newUser];
      localStorage.setItem('aptofluence_users', JSON.stringify(users));
      localStorage.setItem('aptofluence_current_user', JSON.stringify(newUser));
      
      onSuccess(newUser);
      onClose();
      setFormData({
        email: '', password: '', confirmPassword: '', 
        socialHandles: {
          youtube: { handle: '', followers: '' },
          twitter: { handle: '', followers: '' },
          instagram: { handle: '', followers: '' },
          tiktok: { handle: '', followers: '' },
          twitch: { handle: '', followers: '' }
        },
        location: '', niche: '', walletAddress: ''
      });
      setIsLoading(false);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('_')) {
      const [prefix, platform, field] = name.split('_');
      if (prefix === 'social') {
        setFormData(prev => ({
          ...prev,
          socialHandles: {
            ...prev.socialHandles,
            [platform]: {
              ...prev.socialHandles[platform as keyof typeof prev.socialHandles],
              [field]: value
            }
          }
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    if (errors[name] || errors.socialHandles) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
        socialHandles: ''
      }));
    }
  };

  const connectWallet = () => {
    const mockWallet = `0x${Math.random().toString(16).substr(2, 40)}`;
    setFormData(prev => ({ ...prev, walletAddress: mockWallet }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-gray-800 rounded-2xl w-full max-w-2xl shadow-2xl border border-gray-700 my-8">
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
            Register as Influencer
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors duration-300"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                    errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-teal-500'
                  }`}
                  placeholder="your@email.com"
                />
              </div>
              {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Location *
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                    errors.location ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-teal-500'
                  }`}
                  placeholder="City, Country"
                />
              </div>
              {errors.location && <p className="text-red-400 text-sm mt-1">{errors.location}</p>}
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-300">
              Social Media Handles * (at least one required)
            </label>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="social_youtube_handle"
                  value={formData.socialHandles.youtube.handle}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300"
                  placeholder="YouTube channel"
                />
              </div>
              <div className="relative">
                <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="social_twitter_handle"
                  value={formData.socialHandles.twitter.handle}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300"
                  placeholder="Twitter handle"
                />
              </div>
              <div className="relative">
                <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="social_instagram_handle"
                  value={formData.socialHandles.instagram.handle}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300"
                  placeholder="Instagram handle"
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-300">
                Follower Counts
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    YouTube Followers
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      name="social_youtube_followers"
                      value={formData.socialHandles.youtube.followers}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300"
                      placeholder="e.g., 10000"
                      min="0"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Twitter Followers
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      name="social_twitter_followers"
                      value={formData.socialHandles.twitter.followers}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300"
                      placeholder="e.g., 10000"
                      min="0"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Instagram Followers
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      name="social_instagram_followers"
                      value={formData.socialHandles.instagram.followers}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300"
                      placeholder="e.g., 10000"
                      min="0"
                    />
                  </div>
                </div>
              </div>
            </div>
            {errors.socialHandles && <p className="text-red-400 text-sm">{errors.socialHandles}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Niche *
              </label>
              <div className="relative">
                <Tag className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <select
                  name="niche"
                  value={formData.niche}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 bg-gray-700 border rounded-lg text-white focus:outline-none focus:ring-2 transition-all duration-300 ${
                    errors.niche ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-teal-500'
                  }`}
                >
                  <option value="">Select niche</option>
                  {niches.map(niche => (
                    <option key={niche} value={niche}>{niche}</option>
                  ))}
                </select>
              </div>
              {errors.niche && <p className="text-red-400 text-sm mt-1">{errors.niche}</p>}
            </div>

            <div></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                    errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-teal-500'
                  }`}
                  placeholder="Min 8 characters"
                />
              </div>
              {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Confirm Password *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                    errors.confirmPassword ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-teal-500'
                  }`}
                  placeholder="Confirm password"
                />
              </div>
              {errors.confirmPassword && <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Wallet Address
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Wallet className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="walletAddress"
                  value={formData.walletAddress}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300"
                  placeholder="Connect wallet or enter address"
                  readOnly
                />
              </div>
              <button
                type="button"
                onClick={connectWallet}
                className="px-4 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-teal-500/25 transition-all duration-300"
              >
                Connect
              </button>
            </div>
            <p className="text-gray-400 text-xs mt-1">We'll create a wallet for you if you don't have one</p>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-teal-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              'Create Influencer Account'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}