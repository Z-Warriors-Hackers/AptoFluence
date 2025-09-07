import React, { useState } from 'react';
import { 
  User, 
  MapPin, 
  Users, 
  Star,
  Youtube,
  Instagram,
  Twitter,
  Edit,
  Save,
  Award,
  TrendingUp,
  CheckCircle,
  Zap
} from 'lucide-react';

interface InfluencerProfileProps {
  user: any;
  onUserUpdate: (updatedUser: any) => void;
}

export default function InfluencerProfile({ user, onUserUpdate }: InfluencerProfileProps) {
  const [activeTab, setActiveTab] = useState('public');
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [profileData, setProfileData] = useState({
    email: user?.email || '',
    location: user?.location || '',
    niche: user?.niche || '',
    bio: user?.bio || 'Passionate content creator focused on engaging audiences with authentic and creative content.',
    minimumBudget: user?.minimumBudget || 5000,
    socialHandles: user?.socialHandles || {
      youtube: '',
      instagram: '',
      twitter: ''
    },
    rateCard: {
      instagram: user?.rateCard?.instagram || 100,
      youtube: user?.rateCard?.youtube || 200,
      twitter: user?.rateCard?.twitter || 25
    }
  });

  // Mock data for public profile
  const publicProfileData = {
    reputationScore: user?.credibilityScore || 85,
    completionRate: 98,
    averageRating: 4.9,
    totalCampaigns: 15,
    totalEarnings: 12500,
    badges: [
      { id: 1, name: 'Top 1% Tech Influencer', icon: '💎', color: 'from-blue-500 to-cyan-500' },
      { id: 2, name: 'Fast Deliveries', icon: '⚡', color: 'from-yellow-500 to-orange-500' },
      { id: 3, name: '50+ Campaigns Completed', icon: '✅', color: 'from-green-500 to-teal-500' },
      { id: 4, name: 'High Engagement Rate', icon: '🚀', color: 'from-purple-500 to-pink-500' }
    ],
    recentWork: [
      {
        id: 1,
        campaign: 'CyberBook Pro Review',
        seller: 'TechCorp',
        rating: 5,
        feedback: 'Excellent work! Very professional and engaging content.',
        date: '2024-01-25'
      },
      {
        id: 2,
        campaign: 'Winter Fashion Collection',
        seller: 'FashionForward',
        rating: 5,
        feedback: 'Creative styling and great audience engagement.',
        date: '2024-01-20'
      },
      {
        id: 3,
        campaign: 'Gaming Setup Showcase',
        seller: 'GameZone',
        rating: 4,
        feedback: 'Good content quality, delivered on time.',
        date: '2024-01-15'
      }
    ]
  };

  const handleSave = async () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const updatedUser = { ...user, ...profileData };
      onUserUpdate(updatedUser);
      localStorage.setItem('aptofluence_current_user', JSON.stringify(updatedUser));
      setIsLoading(false);
      setIsEditing(false);
      alert('Profile updated successfully!');
    }, 1000);
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'youtube':
        return <Youtube className="w-5 h-5 text-red-500" />;
      case 'instagram':
        return <Instagram className="w-5 h-5 text-pink-500" />;
      case 'twitter':
        return <Twitter className="w-5 h-5 text-blue-500" />;
      default:
        return <User className="w-5 h-5 text-gray-400" />;
    }
  };

  const getReputationColor = (score: number) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 80) return 'text-yellow-400';
    if (score >= 70) return 'text-orange-400';
    return 'text-red-400';
  };

  const getReputationGradient = (score: number) => {
    if (score >= 90) return 'from-green-500 to-green-400';
    if (score >= 80) return 'from-yellow-500 to-yellow-400';
    if (score >= 70) return 'from-orange-500 to-orange-400';
    return 'from-red-500 to-red-400';
  };

  const tabs = [
    { id: 'public', label: 'Public View' },
    { id: 'edit', label: 'Edit Profile' }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">My Profile</h1>
        <p className="text-gray-400">Manage your public profile and rate card</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-700">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-300 ${
                activeTab === tab.id
                  ? 'border-teal-500 text-teal-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Public View Tab */}
      {activeTab === 'public' && (
        <div className="space-y-6">
          {/* Profile Header */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-start gap-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-teal-400 to-cyan-400 flex items-center justify-center">
                <span className="text-white font-bold text-2xl">
                  {user?.email?.charAt(0).toUpperCase() || 'I'}
                </span>
              </div>
              
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-2">
                  @{user?.email?.split('@')[0] || 'influencer'}
                </h2>
                <p className="text-gray-300 mb-4">{profileData.bio}</p>
                
                <div className="flex items-center gap-6 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{profileData.location || 'Location not set'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{profileData.followerCount || 'Followers not set'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span className="text-yellow-400">{publicProfileData.averageRating} ★</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Reputation Section */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-6">Reputation & Performance</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <div className="text-center">
                <div className="relative w-20 h-20 mx-auto mb-3">
                  <div className="w-full h-full rounded-full bg-gray-700">
                    <div 
                      className={`w-full h-full rounded-full bg-gradient-to-r ${getReputationGradient(publicProfileData.reputationScore)} transition-all duration-300`}
                      style={{ 
                        background: `conic-gradient(from 0deg, ${publicProfileData.reputationScore >= 90 ? '#10b981' : publicProfileData.reputationScore >= 80 ? '#f59e0b' : '#ef4444'} ${publicProfileData.reputationScore * 3.6}deg, #374151 0deg)`,
                        borderRadius: '50%'
                      }}
                    />
                    <div className="absolute inset-2 bg-gray-800 rounded-full flex items-center justify-center">
                      <span className={`text-lg font-bold ${getReputationColor(publicProfileData.reputationScore)}`}>
                        {publicProfileData.reputationScore}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-400 text-sm">Reputation Score</p>
              </div>

              <div className="text-center">
                <p className="text-3xl font-bold text-white mb-1">{publicProfileData.completionRate}%</p>
                <p className="text-gray-400 text-sm">Completion Rate</p>
              </div>

              <div className="text-center">
                <p className="text-3xl font-bold text-white mb-1">{publicProfileData.totalCampaigns}</p>
                <p className="text-gray-400 text-sm">Campaigns Completed</p>
              </div>

              <div className="text-center">
                <p className="text-3xl font-bold text-white mb-1">₹{publicProfileData.totalEarnings.toLocaleString()}</p>
                <p className="text-gray-400 text-sm">Total Earned</p>
              </div>
            </div>

            {/* Badges */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Achievement Badges</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {publicProfileData.badges.map((badge) => (
                  <div key={badge.id} className={`p-4 rounded-lg bg-gradient-to-r ${badge.color} bg-opacity-20 border border-opacity-30`}>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{badge.icon}</span>
                      <span className="text-white font-medium">{badge.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Work & Reviews */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-6">Recent Work & Reviews</h3>
            <div className="space-y-4">
              {publicProfileData.recentWork.map((work) => (
                <div key={work.id} className="p-4 bg-gray-700 rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="text-white font-semibold">{work.campaign}</h4>
                      <p className="text-gray-400 text-sm">{work.seller}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < work.rating ? 'text-yellow-400 fill-current' : 'text-gray-600'}`} />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm mb-2">{work.feedback}</p>
                  <p className="text-gray-500 text-xs">{work.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Edit Profile Tab */}
      {activeTab === 'edit' && (
        <div className="space-y-6">
          {/* Basic Information */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Basic Information</h2>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors duration-300"
              >
                <Edit className="w-4 h-4" />
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  value={profileData.email}
                  disabled
                  className="w-full px-4 py-3 bg-gray-600 border border-gray-500 rounded-lg text-gray-400 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
                <input
                  type="text"
                  value={profileData.location}
                  onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 border rounded-lg text-white transition-all duration-300 ${
                    isEditing 
                      ? 'bg-gray-700 border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500' 
                      : 'bg-gray-600 border-gray-500 cursor-not-allowed'
                  }`}
                  placeholder="City, Country"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Niche</label>
                <input
                  type="text"
                  value={profileData.niche}
                  onChange={(e) => setProfileData(prev => ({ ...prev, niche: e.target.value }))}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 border rounded-lg text-white transition-all duration-300 ${
                    isEditing 
                      ? 'bg-gray-700 border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500' 
                      : 'bg-gray-600 border-gray-500 cursor-not-allowed'
                  }`}
                  placeholder="e.g., Technology, Gaming, Fashion"
                />
              </div>


              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Minimum Campaign Budget (₹)</label>
                <input
                  type="number"
                  value={profileData.minimumBudget}
                  onChange={(e) => setProfileData(prev => ({ ...prev, minimumBudget: parseInt(e.target.value) || 0 }))}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 border rounded-lg text-white transition-all duration-300 ${
                    isEditing 
                      ? 'bg-gray-700 border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500' 
                      : 'bg-gray-600 border-gray-500 cursor-not-allowed'
                  }`}
                  placeholder="5000"
                  min="100"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
                <textarea
                  value={profileData.bio}
                  onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                  disabled={!isEditing}
                  rows={4}
                  className={`w-full px-4 py-3 border rounded-lg text-white transition-all duration-300 ${
                    isEditing 
                      ? 'bg-gray-700 border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500' 
                      : 'bg-gray-600 border-gray-500 cursor-not-allowed'
                  }`}
                  placeholder="Tell sellers about yourself and your content style..."
                />
              </div>
            </div>

            {/* Social Media Handles - Editable */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-white mb-4">Social Media Handles & Followers</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Object.entries(profileData.socialHandles).map(([platform, data]) => (
                  <div key={platform} className="space-y-3">
                    <h4 className="text-white font-medium capitalize flex items-center gap-2">
                      {getPlatformIcon(platform)}
                      {platform}
                    </h4>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Handle/Username</label>
                      <input
                        type="text"
                        value={data.handle || ''}
                        onChange={(e) => setProfileData(prev => ({
                          ...prev,
                          socialHandles: {
                            ...prev.socialHandles,
                            [platform]: { ...prev.socialHandles[platform], handle: e.target.value }
                          }
                        }))}
                        disabled={!isEditing}
                        className={`w-full px-3 py-2 border rounded-lg text-white text-sm transition-all duration-300 ${
                          isEditing 
                            ? 'bg-gray-700 border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500' 
                            : 'bg-gray-600 border-gray-500 cursor-not-allowed'
                        }`}
                        placeholder={`@your${platform}handle`}
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Followers Count</label>
                      <input
                        type="number"
                        value={data.followers || ''}
                        onChange={(e) => setProfileData(prev => ({
                          ...prev,
                          socialHandles: {
                            ...prev.socialHandles,
                            [platform]: { ...prev.socialHandles[platform], followers: e.target.value }
                          }
                        }))}
                        disabled={!isEditing}
                        className={`w-full px-3 py-2 border rounded-lg text-white text-sm transition-all duration-300 ${
                          isEditing 
                            ? 'bg-gray-700 border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500' 
                            : 'bg-gray-600 border-gray-500 cursor-not-allowed'
                        }`}
                        placeholder="10000"
                        min="0"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {isEditing && (
              <div className="flex justify-end mt-6">
                <button
                  onClick={handleSave}
                  disabled={isLoading}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-teal-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Save className="w-5 h-5" />
                  )}
                  Save Changes
                </button>
              </div>
            )}
          </div>

          {/* Rate Card */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h2 className="text-xl font-semibold text-white mb-6">Rate Card (Per Advertisement)</h2>
            <div className="bg-gradient-to-r from-teal-500/20 to-cyan-500/20 rounded-lg p-4 border border-teal-500/30 mb-6">
              <p className="text-teal-300 text-sm">
                <strong>Note:</strong> Set your rates per advertisement. Sellers will see these rates when creating campaigns. 
                Your minimum budget above determines which campaigns you'll be matched with.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Instagram (Per Ad)</label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-400">₹</span>
                  <input
                    type="number"
                    value={profileData.rateCard.instagram}
                    onChange={(e) => setProfileData(prev => ({ 
                      ...prev, 
                      rateCard: { ...prev.rateCard, instagram: parseInt(e.target.value) || 0 }
                    }))}
                    disabled={!isEditing}
                    className={`w-full pl-8 pr-4 py-3 border rounded-lg text-white transition-all duration-300 ${
                      isEditing 
                        ? 'bg-gray-700 border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500' 
                        : 'bg-gray-600 border-gray-500 cursor-not-allowed'
                    }`}
                    min="10"
                    placeholder="100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">YouTube (Per Ad)</label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-400">₹</span>
                  <input
                    type="number"
                    value={profileData.rateCard.youtube}
                    onChange={(e) => setProfileData(prev => ({ 
                      ...prev, 
                      rateCard: { ...prev.rateCard, youtube: parseInt(e.target.value) || 0 }
                    }))}
                    disabled={!isEditing}
                    className={`w-full pl-8 pr-4 py-3 border rounded-lg text-white transition-all duration-300 ${
                      isEditing 
                        ? 'bg-gray-700 border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500' 
                        : 'bg-gray-600 border-gray-500 cursor-not-allowed'
                    }`}
                    min="10"
                    placeholder="200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Twitter (Per Ad)</label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-400">₹</span>
                  <input
                    type="number"
                    value={profileData.rateCard.twitter}
                    onChange={(e) => setProfileData(prev => ({ 
                      ...prev, 
                      rateCard: { ...prev.rateCard, twitter: parseInt(e.target.value) || 0 }
                    }))}
                    disabled={!isEditing}
                    className={`w-full pl-8 pr-4 py-3 border rounded-lg text-white transition-all duration-300 ${
                      isEditing 
                        ? 'bg-gray-700 border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500' 
                        : 'bg-gray-600 border-gray-500 cursor-not-allowed'
                    }`}
                    min="10"
                    placeholder="25"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}