import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter,
  Eye,
  Edit,
  Trash2,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';
import CreateCampaignModal from './CreateCampaignModal';

interface CampaignsProps {
  user: any;
}

export default function Campaigns({ user }: CampaignsProps) {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock campaigns data
  const campaigns = [
    {
      id: 1,
      name: 'Q4 Laptop Launch',
      product: 'CyberBook Pro',
      image: 'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=400',
      targetType: 'value',
      targetValue: 100000,
      currentValue: 85000,
      progress: 85,
      status: 'active',
      startDate: '2024-01-01',
      endDate: '2024-01-31',
      daysLeft: 12,
      influencersCount: 3,
      totalBudget: 5000,
      spent: 3000,
      rules: [
        { trigger: 10, followers: 5000, platform: 'YouTube', amount: 500 },
        { trigger: 20, followers: 20000, platform: 'YouTube', amount: 2000 }
      ]
    },
    {
      id: 2,
      name: 'Winter Fashion Collection',
      product: 'Premium Jackets',
      image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400',
      targetType: 'quantity',
      targetValue: 200,
      currentValue: 112,
      progress: 56,
      status: 'warning',
      startDate: '2024-01-15',
      endDate: '2024-02-15',
      daysLeft: 8,
      influencersCount: 2,
      totalBudget: 3000,
      spent: 1500,
      rules: [
        { trigger: 15, followers: 10000, platform: 'Instagram', amount: 800 },
        { trigger: 25, followers: 50000, platform: 'Instagram', amount: 2200 }
      ]
    },
    {
      id: 3,
      name: 'Gaming Accessories',
      product: 'RGB Keyboards',
      image: 'https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=400',
      targetType: 'value',
      targetValue: 50000,
      currentValue: 32000,
      progress: 64,
      status: 'active',
      startDate: '2024-01-10',
      endDate: '2024-02-10',
      daysLeft: 15,
      influencersCount: 2,
      totalBudget: 2500,
      spent: 1000,
      rules: [
        { trigger: 20, followers: 15000, platform: 'Twitch', amount: 1000 },
        { trigger: 30, followers: 30000, platform: 'YouTube', amount: 1500 }
      ]
    }
  ];

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.product.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || campaign.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-400" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-blue-400" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'warning':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'completed':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Campaigns</h1>
          <p className="text-gray-400">Manage your automated influencer campaigns</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-teal-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
        >
          <Plus className="w-5 h-5" />
          Create Campaign
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search campaigns..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
          />
        </div>
        
        <div className="relative">
          <Filter className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="pl-10 pr-8 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="warning">Warning</option>
            <option value="completed">Completed</option>
            <option value="paused">Paused</option>
          </select>
        </div>
      </div>

      {/* Campaigns Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredCampaigns.map((campaign) => (
          <div key={campaign.id} className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden hover:border-purple-500/30 transition-all duration-300">
            {/* Campaign Image */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={campaign.image}
                alt={campaign.product}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4">
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(campaign.status)}`}>
                  {getStatusIcon(campaign.status)}
                  {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                </div>
              </div>
            </div>

            {/* Campaign Info */}
            <div className="p-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-white mb-1">{campaign.name}</h3>
                <p className="text-gray-400 text-sm">{campaign.product}</p>
              </div>

              {/* Progress */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-300">
                    {campaign.targetType === 'value' ? '₹' : ''}{campaign.currentValue.toLocaleString()} / 
                    {campaign.targetType === 'value' ? '₹' : ''}{campaign.targetValue.toLocaleString()}
                    {campaign.targetType === 'quantity' ? ' units' : ''}
                  </span>
                  <span className="text-sm font-medium text-white">{campaign.progress}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      campaign.progress >= 80 
                        ? 'bg-gradient-to-r from-green-500 to-green-400'
                        : campaign.progress >= 60
                        ? 'bg-gradient-to-r from-yellow-500 to-yellow-400'
                        : 'bg-gradient-to-r from-red-500 to-red-400'
                    }`}
                    style={{ width: `${campaign.progress}%` }}
                  />
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">{campaign.daysLeft}</p>
                  <p className="text-xs text-gray-400">Days Left</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">{campaign.influencersCount}</p>
                  <p className="text-xs text-gray-400">Influencers</p>
                </div>
              </div>

              {/* Budget */}
              <div className="mb-4 p-3 bg-gray-700 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">Budget</span>
                  <span className="text-sm font-medium text-white">
                    ₹{campaign.spent.toLocaleString()} / ₹{campaign.totalBudget.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-teal-500 text-white text-sm font-medium rounded-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300">
                  <Eye className="w-4 h-4" />
                  View
                </button>
                <button className="px-3 py-2 bg-gray-700 text-gray-300 hover:text-white hover:bg-gray-600 rounded-lg transition-all duration-300">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="px-3 py-2 bg-gray-700 text-gray-300 hover:text-red-400 hover:bg-red-500/20 rounded-lg transition-all duration-300">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredCampaigns.length === 0 && (
        <div className="text-center py-12">
          <Megaphone className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No campaigns found</h3>
          <p className="text-gray-400 mb-6">
            {searchTerm || filterStatus !== 'all' 
              ? 'Try adjusting your search or filter criteria'
              : 'Create your first automated campaign to get started'
            }
          </p>
          {!searchTerm && filterStatus === 'all' && (
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-teal-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
            >
              Create Your First Campaign
            </button>
          )}
        </div>
      )}

      {/* Create Campaign Modal */}
      <CreateCampaignModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        user={user}
      />
    </div>
  );
}