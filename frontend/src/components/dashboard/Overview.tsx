import React from 'react';
import { 
  TrendingUp, 
  Megaphone, 
  Users, 
  DollarSign,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';

interface OverviewProps {
  user: any;
}

export default function Overview({ user }: OverviewProps) {
  // Mock data - in real app, this would come from API/blockchain
  const metrics = {
    totalSales: 125000,
    activeCampaigns: 3,
    influencersEngaged: 7,
    totalSpent: 15000
  };

  const activeCampaigns = [
    {
      id: 1,
      name: 'Q4 Laptop Launch',
      product: 'CyberBook Pro',
      currentSales: 85000,
      targetSales: 100000,
      progress: 85,
      status: 'active',
      daysLeft: 12
    },
    {
      id: 2,
      name: 'Winter Fashion Collection',
      product: 'Premium Jackets',
      currentSales: 45000,
      targetSales: 80000,
      progress: 56,
      status: 'warning',
      daysLeft: 8
    },
    {
      id: 3,
      name: 'Gaming Accessories',
      product: 'RGB Keyboards',
      currentSales: 32000,
      targetSales: 50000,
      progress: 64,
      status: 'active',
      daysLeft: 15
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'contract',
      message: 'Smart contract deployed for "Q4 Laptop Launch"',
      time: '2 hours ago',
      icon: CheckCircle,
      color: 'text-green-400'
    },
    {
      id: 2,
      type: 'payment',
      message: 'Payment of $500 released to @TechReviewer',
      time: '4 hours ago',
      icon: DollarSign,
      color: 'text-blue-400'
    },
    {
      id: 3,
      type: 'warning',
      message: 'Warning: "Winter Fashion" trending 15% below target',
      time: '6 hours ago',
      icon: AlertTriangle,
      color: 'text-yellow-400'
    },
    {
      id: 4,
      type: 'match',
      message: 'New Match Found: @FashionInfluencer for "Winter Fashion"',
      time: '8 hours ago',
      icon: Users,
      color: 'text-purple-400'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Message */}
      <div className="bg-gradient-to-r from-purple-500/20 to-teal-500/20 rounded-2xl p-6 border border-purple-500/30">
        <h1 className="text-2xl font-bold text-white mb-2">
          Welcome back, {user?.businessName || 'Seller'}! 👋
        </h1>
        <p className="text-gray-300">
          Your campaigns are performing well. Here's your latest overview.
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-green-500/20">
              <TrendingUp className="w-6 h-6 text-green-400" />
            </div>
            <span className="text-green-400 text-sm font-medium">+12%</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">
            ₹{metrics.totalSales.toLocaleString()}
          </h3>
          <p className="text-gray-400 text-sm">Total Sales</p>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-purple-500/20">
              <Megaphone className="w-6 h-6 text-purple-400" />
            </div>
            <span className="text-purple-400 text-sm font-medium">{metrics.activeCampaigns}</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">{metrics.activeCampaigns}</h3>
          <p className="text-gray-400 text-sm">Active Campaigns</p>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-teal-500/20">
              <Users className="w-6 h-6 text-teal-400" />
            </div>
            <span className="text-teal-400 text-sm font-medium">{metrics.influencersEngaged}</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">{metrics.influencersEngaged}</h3>
          <p className="text-gray-400 text-sm">Influencers Engaged</p>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-blue-500/20">
              <DollarSign className="w-6 h-6 text-blue-400" />
            </div>
            <span className="text-blue-400 text-sm font-medium">₹{metrics.totalSpent.toLocaleString()}</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">
            ₹{metrics.totalSpent.toLocaleString()}
          </h3>
          <p className="text-gray-400 text-sm">Total Spent</p>
        </div>
      </div>

      {/* Active Campaigns */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h2 className="text-xl font-bold text-white mb-6">Active Campaigns</h2>
        <div className="space-y-4">
          {activeCampaigns.map((campaign) => (
            <div key={campaign.id} className="bg-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-white">{campaign.name}</h3>
                  <p className="text-gray-400 text-sm">{campaign.product}</p>
                </div>
                <div className="text-right">
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${
                    campaign.status === 'active' 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {campaign.status === 'active' ? (
                      <CheckCircle className="w-3 h-3" />
                    ) : (
                      <AlertTriangle className="w-3 h-3" />
                    )}
                    {campaign.status === 'active' ? 'On Track' : 'Needs Attention'}
                  </div>
                  <p className="text-gray-400 text-xs mt-1">{campaign.daysLeft} days left</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-300">
                  ₹{campaign.currentSales.toLocaleString()} / ₹{campaign.targetSales.toLocaleString()}
                </span>
                <span className="text-sm font-medium text-white">{campaign.progress}%</span>
              </div>
              
              <div className="w-full bg-gray-600 rounded-full h-2">
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
              
              <div className="flex justify-end mt-3">
                <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-teal-500 text-white text-sm font-medium rounded-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h2 className="text-xl font-bold text-white mb-6">Recent Activity</h2>
        <div className="space-y-4">
          {recentActivity.map((activity) => {
            const Icon = activity.icon;
            return (
              <div key={activity.id} className="flex items-start gap-4 p-3 bg-gray-700 rounded-lg">
                <div className={`flex items-center justify-center w-10 h-10 rounded-lg bg-gray-600 ${activity.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="text-white text-sm">{activity.message}</p>
                  <p className="text-gray-400 text-xs mt-1">{activity.time}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}