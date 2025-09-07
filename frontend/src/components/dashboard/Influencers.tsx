import React, { useState } from 'react';
import { 
  Search, 
  Filter,
  FileText,
  Star,
  MapPin,
  Users,
  TrendingUp,
  CheckCircle,
  Clock,
  AlertTriangle,
  DollarSign
} from 'lucide-react';

interface InfluencersProps {
  user: any;
}

export default function Influencers({ user }: InfluencersProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPlatform, setFilterPlatform] = useState('all');

  // Mock influencers data
  const influencers = [
    {
      id: 1,
      name: 'TechReviewer',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
      platforms: {
        YouTube: 125000,
        Instagram: 85000,
        Twitter: 45000
      },
      niche: 'Technology',
      location: 'Mumbai, India',
      credibilityScore: 92,
      status: 'active',
      currentCampaign: 'Q4 Laptop Launch',
      totalEarned: 2500,
      completedCampaigns: 8,
      lastActive: '2 hours ago',
      rates: {
        YouTube: 200,
        Instagram: 100,
        Twitter: 25
      },
      minimumBudget: 5000
    },
    {
      id: 2,
      name: 'FashionInfluencer',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      platforms: {
        Instagram: 250000,
        TikTok: 180000,
        YouTube: 95000
      },
      niche: 'Fashion & Beauty',
      location: 'Delhi, India',
      credibilityScore: 88,
      status: 'matched',
      currentCampaign: 'Winter Fashion Collection',
      totalEarned: 4200,
      completedCampaigns: 12,
      lastActive: '1 hour ago',
      rates: {
        YouTube: 300,
        Instagram: 150,
        Twitter: 50
      },
      minimumBudget: 8000
    },
    {
      id: 3,
      name: 'GamingPro',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
      platforms: {
        Twitch: 75000,
        YouTube: 120000,
        Twitter: 35000
      },
      niche: 'Gaming',
      location: 'Bangalore, India',
      credibilityScore: 85,
      status: 'completed',
      currentCampaign: 'Gaming Accessories',
      totalEarned: 1800,
      completedCampaigns: 6,
      lastActive: '30 minutes ago',
      rates: {
        YouTube: 250,
        Instagram: 120,
        Twitter: 30
      },
      minimumBudget: 6000
    },
    {
      id: 4,
      name: 'LifestyleBlogger',
      avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150',
      platforms: {
        Instagram: 180000,
        YouTube: 65000,
        Twitter: 28000
      },
      niche: 'Lifestyle',
      location: 'Pune, India',
      credibilityScore: 90,
      status: 'available',
      currentCampaign: null,
      totalEarned: 3600,
      completedCampaigns: 15,
      lastActive: '5 minutes ago',
      rates: {
        YouTube: 180,
        Instagram: 90,
        Twitter: 35
      },
      minimumBudget: 4000
    }
  ];

  const filteredInfluencers = influencers.filter(influencer => {
    const matchesSearch = influencer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         influencer.niche.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || influencer.status === filterStatus;
    const matchesPlatform = filterPlatform === 'all' || 
                           Object.keys(influencer.platforms).some(platform => 
                             platform.toLowerCase() === filterPlatform.toLowerCase()
                           );
    return matchesSearch && matchesStatus && matchesPlatform;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'matched':
        return <Clock className="w-4 h-4 text-yellow-400" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-blue-400" />;
      case 'available':
        return <Users className="w-4 h-4 text-gray-400" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-red-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'matched':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'completed':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'available':
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default:
        return 'bg-red-500/20 text-red-400 border-red-500/30';
    }
  };

  const getCredibilityColor = (score: number) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 80) return 'text-yellow-400';
    if (score >= 70) return 'text-orange-400';
    return 'text-red-400';
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Influencers</h1>
          <p className="text-gray-400">Manage your influencer network and partnerships</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search influencers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
          />
        </div>
        
        <div className="flex gap-4">
          <div className="relative">
            <Filter className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="pl-10 pr-8 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="matched">Matched</option>
              <option value="completed">Completed</option>
              <option value="available">Available</option>
            </select>
          </div>

          <select
            value={filterPlatform}
            onChange={(e) => setFilterPlatform(e.target.value)}
            className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
          >
            <option value="all">All Platforms</option>
            <option value="youtube">YouTube</option>
            <option value="instagram">Instagram</option>
            <option value="twitter">Twitter</option>
            <option value="tiktok">TikTok</option>
            <option value="twitch">Twitch</option>
          </select>
        </div>
      </div>

      {/* Influencers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredInfluencers.map((influencer) => (
          <div key={influencer.id} className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden hover:border-purple-500/30 transition-all duration-300">
            {/* Header */}
            <div className="p-6 pb-4">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <img
                    src={influencer.avatar}
                    alt={influencer.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-white">{influencer.name}</h3>
                    <p className="text-gray-400 text-sm">{influencer.niche}</p>
                  </div>
                </div>
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(influencer.status)}`}>
                  {getStatusIcon(influencer.status)}
                  {influencer.status.charAt(0).toUpperCase() + influencer.status.slice(1)}
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
                <MapPin className="w-4 h-4" />
                {influencer.location}
              </div>

              {/* Credibility Score */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-400 text-sm">Credibility Score</span>
                <div className="flex items-center gap-2">
                  <Star className={`w-4 h-4 ${getCredibilityColor(influencer.credibilityScore)}`} />
                  <span className={`font-semibold ${getCredibilityColor(influencer.credibilityScore)}`}>
                    {influencer.credibilityScore}/100
                  </span>
                </div>
              </div>

              {/* Platforms */}
              <div className="mb-4">
                <p className="text-gray-400 text-sm mb-2">Platforms & Followers</p>
                <div className="space-y-2">
                  {Object.entries(influencer.platforms).map(([platform, followers]) => (
                    <div key={platform} className="flex items-center justify-between text-sm">
                      <span className="text-gray-300">{platform}</span>
                      <span className="text-white font-medium">{followers.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center">
                  <p className="text-lg font-bold text-white">{influencer.completedCampaigns}</p>
                  <p className="text-xs text-gray-400">Campaigns</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-white">{influencer.credibilityScore}/100</p>
                  <p className="text-xs text-gray-400">Credibility</p>
                </div>
              </div>

              {/* Current Campaign */}
              {influencer.currentCampaign && (
                <div className="mb-4 p-3 bg-gray-700 rounded-lg">
                  <p className="text-gray-400 text-xs mb-1">Current Campaign</p>
                  <p className="text-white text-sm font-medium">{influencer.currentCampaign}</p>
                </div>
              )}

              {/* Rates & Proposed Deliverables */}
              {/* Earnings */}
              <div className="mb-4 p-3 bg-gradient-to-r from-purple-500/20 to-teal-500/20 rounded-lg border border-purple-500/30">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300 text-sm">Total Earned</span>
                  <span className="text-purple-400 font-semibold">₹{influencer.totalEarned.toLocaleString()}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-teal-500 text-white text-sm font-medium rounded-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300">
                  <FileText className="w-4 h-4" />
                  Create Contract
                </button>
              </div>

              {/* Last Active */}
              <p className="text-gray-500 text-xs mt-3 text-center">
                Last active: {influencer.lastActive}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredInfluencers.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No influencers found</h3>
          <p className="text-gray-400">
            {searchTerm || filterStatus !== 'all' || filterPlatform !== 'all'
              ? 'Try adjusting your search or filter criteria'
              : 'Your influencer network will appear here once you start creating campaigns'
            }
          </p>
        </div>
      )}
    </div>
  );
}