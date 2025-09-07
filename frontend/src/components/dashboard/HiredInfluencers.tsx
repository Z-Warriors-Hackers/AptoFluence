import React, { useState } from 'react';
import { 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  Star,
  DollarSign,
  Eye,
  ThumbsUp,
  ThumbsDown,
  ExternalLink,
  User,
  Calendar,
  Target
} from 'lucide-react';

interface HiredInfluencersProps {
  user: any;
}

export default function HiredInfluencers({ user }: HiredInfluencersProps) {
  const [selectedContract, setSelectedContract] = useState<string | null>(null);

  // Mock hired influencers data
  const hiredInfluencers = [
    {
      id: 1,
      influencer: {
        name: 'TechReviewer',
        avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
        credibilityScore: 92
      },
      campaign: 'Q4 Laptop Launch',
      contractDate: '2024-01-15',
      totalAds: 8,
      completedAds: 5,
      pendingAds: 1,
      totalAmount: 1200,
      paidAmount: 750,
      lockedAmount: 450,
      deliverables: [
        {
          id: 1,
          platform: 'YouTube',
          type: 'Product Review Video',
          status: 'completed',
          proofUrl: 'https://youtube.com/watch?v=example1',
          submittedDate: '2024-01-16',
          approvedDate: '2024-01-16',
          amount: 150
        },
        {
          id: 2,
          platform: 'YouTube',
          type: 'Unboxing Video',
          status: 'completed',
          proofUrl: 'https://youtube.com/watch?v=example2',
          submittedDate: '2024-01-18',
          approvedDate: '2024-01-18',
          amount: 150
        },
        {
          id: 3,
          platform: 'Instagram',
          type: 'Product Post',
          status: 'completed',
          proofUrl: 'https://instagram.com/p/example1',
          submittedDate: '2024-01-19',
          approvedDate: '2024-01-19',
          amount: 100
        },
        {
          id: 4,
          platform: 'Instagram',
          type: 'Story Series',
          status: 'completed',
          proofUrl: 'https://instagram.com/stories/example1',
          submittedDate: '2024-01-20',
          approvedDate: '2024-01-20',
          amount: 100
        },
        {
          id: 5,
          platform: 'Instagram',
          type: 'Reel',
          status: 'completed',
          proofUrl: 'https://instagram.com/reel/example1',
          submittedDate: '2024-01-21',
          approvedDate: '2024-01-21',
          amount: 100
        },
        {
          id: 6,
          platform: 'Twitter',
          type: 'Product Tweet',
          status: 'pending_approval',
          proofUrl: 'https://twitter.com/status/example1',
          submittedDate: '2024-01-22',
          approvedDate: null,
          amount: 50
        },
        {
          id: 7,
          platform: 'YouTube',
          type: 'Comparison Video',
          status: 'in_progress',
          proofUrl: null,
          submittedDate: null,
          approvedDate: null,
          amount: 150
        },
        {
          id: 8,
          platform: 'Instagram',
          type: 'Final Review Post',
          status: 'not_started',
          proofUrl: null,
          submittedDate: null,
          approvedDate: null,
          amount: 100
        }
      ]
    },
    {
      id: 2,
      influencer: {
        name: 'FashionInfluencer',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
        credibilityScore: 88
      },
      campaign: 'Winter Fashion Collection',
      contractDate: '2024-01-20',
      totalAds: 10,
      completedAds: 7,
      pendingAds: 2,
      totalAmount: 1600,
      paidAmount: 840,
      lockedAmount: 760,
      deliverables: [
        {
          id: 1,
          platform: 'Instagram',
          type: 'Outfit Post',
          status: 'completed',
          proofUrl: 'https://instagram.com/p/fashion1',
          submittedDate: '2024-01-21',
          approvedDate: '2024-01-21',
          amount: 120
        },
        {
          id: 2,
          platform: 'Instagram',
          type: 'Styling Reel',
          status: 'completed',
          proofUrl: 'https://instagram.com/reel/fashion1',
          submittedDate: '2024-01-22',
          approvedDate: '2024-01-22',
          amount: 120
        },
        {
          id: 3,
          platform: 'Instagram',
          type: 'Story Highlights',
          status: 'pending_approval',
          proofUrl: 'https://instagram.com/stories/fashion1',
          submittedDate: '2024-01-23',
          approvedDate: null,
          amount: 120
        },
        {
          id: 4,
          platform: 'Instagram',
          type: 'OOTD Post',
          status: 'pending_approval',
          proofUrl: 'https://instagram.com/p/fashion2',
          submittedDate: '2024-01-24',
          approvedDate: null,
          amount: 120
        }
      ]
    }
  ];

  const handleApproveDeliverable = (influencerId: number, deliverableId: number) => {
    // In real app, this would call API to approve and transfer payment
    console.log(`Approving deliverable ${deliverableId} for influencer ${influencerId}`);
    // Simulate automatic payment transfer
    alert('Deliverable approved! Payment transferred automatically.');
  };

  const handleRejectDeliverable = (influencerId: number, deliverableId: number) => {
    // In real app, this would call API to reject and request revision
    console.log(`Rejecting deliverable ${deliverableId} for influencer ${influencerId}`);
    alert('Deliverable rejected. Influencer will be notified to make revisions.');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'pending_approval':
        return <Clock className="w-4 h-4 text-yellow-400" />;
      case 'in_progress':
        return <Target className="w-4 h-4 text-blue-400" />;
      case 'not_started':
        return <AlertTriangle className="w-4 h-4 text-gray-400" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'pending_approval':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'in_progress':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'not_started':
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'youtube':
        return '📺';
      case 'instagram':
        return '📷';
      case 'twitter':
        return '🐦';
      default:
        return '📱';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Hired Influencers</h1>
        <p className="text-gray-400">Manage active contracts and approve deliverables</p>
      </div>

      {/* Contracts List */}
      <div className="space-y-6">
        {hiredInfluencers.map((contract) => (
          <div key={contract.id} className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
            {/* Contract Header */}
            <div className="p-6 border-b border-gray-700">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src={contract.influencer.avatar}
                    alt={contract.influencer.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-white">{contract.influencer.name}</h3>
                    <p className="text-gray-400">{contract.campaign}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span className="text-yellow-400 text-sm">{contract.influencer.credibilityScore}/100</span>
                      <span className="text-gray-500 text-sm">• Contracted on {contract.contractDate}</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="w-5 h-5 text-green-400" />
                    <span className="text-xl font-bold text-green-400">₹{contract.totalAmount}</span>
                  </div>
                  <div className="text-sm text-gray-400">
                    <p>Paid: ₹{contract.paidAmount} | Locked: ₹{contract.lockedAmount}</p>
                  </div>
                </div>
              </div>

              {/* Progress Summary */}
              <div className="mt-4 grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-400">{contract.completedAds}</p>
                  <p className="text-xs text-gray-400">Completed</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-yellow-400">{contract.pendingAds}</p>
                  <p className="text-xs text-gray-400">Pending Approval</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">{contract.totalAds - contract.completedAds - contract.pendingAds}</p>
                  <p className="text-xs text-gray-400">Remaining</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-300">Overall Progress</span>
                  <span className="text-sm font-medium text-white">
                    {Math.round((contract.completedAds / contract.totalAds) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div 
                    className="h-3 rounded-full bg-gradient-to-r from-green-500 to-teal-500 transition-all duration-300"
                    style={{ width: `${(contract.completedAds / contract.totalAds) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Deliverables */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-white">Deliverables</h4>
                <button
                  onClick={() => setSelectedContract(selectedContract === contract.id.toString() ? null : contract.id.toString())}
                  className="text-purple-400 hover:text-purple-300 text-sm"
                >
                  {selectedContract === contract.id.toString() ? 'Hide Details' : 'Show Details'}
                </button>
              </div>

              {selectedContract === contract.id.toString() && (
                <div className="space-y-3">
                  {contract.deliverables.map((deliverable) => (
                    <div key={deliverable.id} className={`p-4 rounded-lg border transition-all duration-300 ${
                      deliverable.status === 'completed' 
                        ? 'bg-green-500/10 border-green-500/30' 
                        : deliverable.status === 'pending_approval'
                        ? 'bg-yellow-500/10 border-yellow-500/30'
                        : 'bg-gray-700 border-gray-600'
                    }`}>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <span className="text-2xl">{getPlatformIcon(deliverable.platform)}</span>
                          <div>
                            <h5 className="text-white font-medium">{deliverable.type}</h5>
                            <p className="text-gray-400 text-sm">{deliverable.platform}</p>
                            
                            <div className="flex items-center gap-2 mt-2">
                              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(deliverable.status)}`}>
                                {getStatusIcon(deliverable.status)}
                                {deliverable.status.replace('_', ' ').toUpperCase()}
                              </div>
                              <span className="text-green-400 font-semibold text-sm">₹{deliverable.amount}</span>
                            </div>

                            {deliverable.submittedDate && (
                              <p className="text-gray-500 text-xs mt-1">
                                Submitted: {deliverable.submittedDate}
                                {deliverable.approvedDate && ` • Approved: ${deliverable.approvedDate}`}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {deliverable.proofUrl && (
                            <button
                              onClick={() => window.open(deliverable.proofUrl, '_blank')}
                              className="flex items-center gap-2 px-3 py-2 bg-gray-700 text-gray-300 hover:text-white hover:bg-gray-600 rounded-lg transition-all duration-300"
                            >
                              <ExternalLink className="w-4 h-4" />
                              <span className="text-sm">View Proof</span>
                            </button>
                          )}

                          {deliverable.status === 'pending_approval' && (
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleApproveDeliverable(contract.id, deliverable.id)}
                                className="flex items-center gap-2 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-300"
                              >
                                <ThumbsUp className="w-4 h-4" />
                                <span className="text-sm">Approve</span>
                              </button>
                              <button
                                onClick={() => handleRejectDeliverable(contract.id, deliverable.id)}
                                className="flex items-center gap-2 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300"
                              >
                                <ThumbsDown className="w-4 h-4" />
                                <span className="text-sm">Reject</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {hiredInfluencers.length === 0 && (
        <div className="text-center py-12">
          <User className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No hired influencers</h3>
          <p className="text-gray-400">
            Your hired influencers and active contracts will appear here
          </p>
        </div>
      )}
    </div>
  );
}