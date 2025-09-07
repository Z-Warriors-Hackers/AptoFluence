import React from 'react';
import { 
  TrendingUp, 
  Megaphone, 
  DollarSign,
  Star,
  CheckCircle,
  Clock,
  AlertTriangle,
  Eye,
  Gift,
  Zap
} from 'lucide-react';

interface InfluencerHomeProps {
  user: any;
}

export default function InfluencerHome({ user }: InfluencerHomeProps) {
  // Mock data - in real app, this would come from API/blockchain
  const metrics = {
    activeCampaigns: 2,
    fundsInEscrow: 3500,
    totalEarned: 12500,
    reputationScore: user?.credibilityScore || 85
  };

  const actionItems = [
    {
      id: 1,
      type: 'offer',
      title: 'New Offer: Promote "CyberBook Pro"',
      description: 'TechCorp wants you to create 3 YouTube videos',
      amount: 2000,
      urgent: false,
      action: 'View Offer',
      icon: Gift,
      color: 'text-green-400'
    },
    {
      id: 2,
      type: 'action',
      title: 'Action Required: Submit proof for "Gaming Setup"',
      description: 'Upload screenshots of your Instagram posts',
      dueDate: '2 days',
      urgent: true,
      action: 'Submit Now',
      icon: AlertTriangle,
      color: 'text-yellow-400'
    },
    {
      id: 3,
      type: 'match',
      title: 'Auto-Match: Fashion Brand Campaign',
      description: 'You\'ve been matched based on your profile',
      amount: 800,
      urgent: false,
      action: 'Review Match',
      icon: Zap,
      color: 'text-purple-400'
    }
  ];

  const notifications = [
    {
      id: 1,
      type: 'payment',
      message: 'Payment Released: ₹1,500 for "Laptop Review" has been added to your wallet',
      time: '2 hours ago',
      icon: CheckCircle,
      color: 'text-green-400'
    },
    {
      id: 2,
      type: 'rating',
      message: 'Reputation Boost: TechCorp left you a 5-star rating!',
      time: '4 hours ago',
      icon: Star,
      color: 'text-yellow-400'
    },
    {
      id: 3,
      type: 'match',
      message: 'New Match: You\'ve been automatically matched for a gaming campaign',
      time: '6 hours ago',
      icon: TrendingUp,
      color: 'text-teal-400'
    },
    {
      id: 4,
      type: 'milestone',
      message: 'Milestone Achieved: 10 campaigns completed! Badge unlocked',
      time: '1 day ago',
      icon: Gift,
      color: 'text-purple-400'
    }
  ];

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

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Message */}
      <div className="bg-gradient-to-r from-teal-500/20 to-cyan-500/20 rounded-2xl p-6 border border-teal-500/30">
        <h1 className="text-2xl font-bold text-white mb-2">
          Welcome back, @{user?.email?.split('@')[0] || 'creator'}! 🚀
        </h1>
        <p className="text-gray-300">
          You have {actionItems.filter(item => item.urgent).length} urgent actions and {metrics.activeCampaigns} active campaigns.
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-teal-500/20">
              <Megaphone className="w-6 h-6 text-teal-400" />
            </div>
            <span className="text-teal-400 text-sm font-medium">{metrics.activeCampaigns}</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">{metrics.activeCampaigns}</h3>
          <p className="text-gray-400 text-sm">Active Campaigns</p>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-yellow-500/20">
              <Clock className="w-6 h-6 text-yellow-400" />
            </div>
            <span className="text-yellow-400 text-sm font-medium">Locked</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">
            ₹{metrics.fundsInEscrow.toLocaleString()}
          </h3>
          <p className="text-gray-400 text-sm">Funds in Escrow</p>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-green-500/20">
              <DollarSign className="w-6 h-6 text-green-400" />
            </div>
            <span className="text-green-400 text-sm font-medium">+15%</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">
            ₹{metrics.totalEarned.toLocaleString()}
          </h3>
          <p className="text-gray-400 text-sm">Total Earned</p>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-purple-500/20">
              <Star className="w-6 h-6 text-purple-400" />
            </div>
            <div className="flex items-center gap-1">
              <Star className={`w-4 h-4 ${getReputationColor(metrics.reputationScore)}`} />
              <span className={`text-sm font-medium ${getReputationColor(metrics.reputationScore)}`}>
                {metrics.reputationScore}/100
              </span>
            </div>
          </div>
          <div className="relative">
            <div className="w-full bg-gray-700 rounded-full h-3 mb-2">
              <div 
                className={`h-3 rounded-full bg-gradient-to-r ${getReputationGradient(metrics.reputationScore)} transition-all duration-300`}
                style={{ width: `${metrics.reputationScore}%` }}
              />
            </div>
            <p className="text-gray-400 text-sm">Reputation Score</p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Action Center */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <CheckCircle className="w-6 h-6 text-teal-400" />
            What's Next?
          </h2>
          <div className="space-y-4">
            {actionItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.id} className={`p-4 rounded-lg border transition-all duration-300 hover:border-teal-500/30 ${
                  item.urgent ? 'bg-yellow-500/10 border-yellow-500/30' : 'bg-gray-700 border-gray-600'
                }`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`flex items-center justify-center w-10 h-10 rounded-lg bg-gray-600 ${item.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold text-sm">{item.title}</h3>
                        <p className="text-gray-400 text-xs">{item.description}</p>
                      </div>
                    </div>
                    {item.amount && (
                      <span className="text-green-400 font-semibold text-sm">₹{item.amount}</span>
                    )}
                  </div>
                  
                  {item.dueDate && (
                    <p className="text-yellow-400 text-xs mb-3">Due in {item.dueDate}</p>
                  )}
                  
                  <button className="w-full px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-sm font-medium rounded-lg hover:shadow-lg hover:shadow-teal-500/25 transition-all duration-300">
                    {item.action}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Notifications Feed */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-purple-400" />
            Recent Activity
          </h2>
          <div className="space-y-4">
            {notifications.map((notification) => {
              const Icon = notification.icon;
              return (
                <div key={notification.id} className="flex items-start gap-4 p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors duration-300">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-lg bg-gray-600 ${notification.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-sm">{notification.message}</p>
                    <p className="text-gray-400 text-xs mt-1">{notification.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-gradient-to-r from-purple-500/20 to-teal-500/20 rounded-xl p-6 border border-purple-500/30">
        <h2 className="text-xl font-bold text-white mb-4">This Month's Performance</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <p className="text-3xl font-bold text-white">5</p>
            <p className="text-gray-300 text-sm">Campaigns Completed</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-white">4.9</p>
            <p className="text-gray-300 text-sm">Average Rating</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-white">98%</p>
            <p className="text-gray-300 text-sm">On-Time Delivery</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-white">₹8,500</p>
            <p className="text-gray-300 text-sm">Earnings</p>
          </div>
        </div>
      </div>
    </div>
  );
}