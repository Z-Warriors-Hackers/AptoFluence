import React, { useState } from 'react';
import { 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  Upload,
  Eye,
  Calendar,
  DollarSign,
  Star,
  Link,
  Image,
  Video,
  FileText
} from 'lucide-react';

interface MyCampaignsProps {
  user: any;
}

export default function MyCampaigns({ user }: MyCampaignsProps) {
  const [activeTab, setActiveTab] = useState('active');

  // Mock campaigns data
  const campaigns = {
    active: [
      {
        id: 1,
        seller: {
          name: 'TechCorp',
          logo: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=100'
        },
        title: 'CyberBook Pro Laptop Review',
        budget: 2500,
        progress: 60,
        dueDate: '2024-02-15',
        daysLeft: 8,
        deliverables: [
          { id: 1, task: 'YouTube review video (10+ minutes)', completed: true, type: 'video', proof: 'https://youtube.com/watch?v=example1' },
          { id: 2, task: 'Instagram post with unboxing', completed: true, type: 'image', proof: 'https://instagram.com/p/example1' },
          { id: 3, task: 'Instagram story series (5 stories)', completed: false, type: 'image', proof: null },
          { id: 4, task: 'Twitter thread about features', completed: false, type: 'text', proof: null },
          { id: 5, task: 'Final review Instagram post', completed: false, type: 'image', proof: null }
        ],
        status: 'active'
      },
      {
        id: 2,
        seller: {
          name: 'EcoDrops',
          logo: 'https://images.pexels.com/photos/1029896/pexels-photo-1029896.jpeg?auto=compress&cs=tinysrgb&w=100'
        },
        title: 'Sustainable Water Bottles Campaign',
        budget: 1200,
        progress: 25,
        dueDate: '2024-02-20',
        daysLeft: 12,
        deliverables: [
          { id: 1, task: 'Instagram Reel showing daily use', completed: true, type: 'video', proof: 'https://instagram.com/reel/example1' },
          { id: 2, task: 'YouTube Short about sustainability', completed: false, type: 'video', proof: null },
          { id: 3, task: 'Instagram post with lifestyle shot', completed: false, type: 'image', proof: null },
          { id: 4, task: 'Instagram story with eco-tips', completed: false, type: 'image', proof: null }
        ],
        status: 'active'
      }
    ],
    pending: [
      {
        id: 3,
        seller: {
          name: 'GameZone',
          logo: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=100'
        },
        title: 'RGB Gaming Setup Showcase',
        budget: 1800,
        submittedDate: '2024-01-25',
        deliverables: [
          { id: 1, task: 'YouTube setup tour video', completed: true, type: 'video', proof: 'https://youtube.com/watch?v=example2' },
          { id: 2, task: 'Instagram posts with setup shots', completed: true, type: 'image', proof: 'https://instagram.com/p/example2' }
        ],
        status: 'pending'
      }
    ],
    completed: [
      {
        id: 4,
        seller: {
          name: 'FashionForward',
          logo: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=100'
        },
        title: 'Winter Fashion Collection',
        budget: 1500,
        completedDate: '2024-01-20',
        rating: 5,
        feedback: 'Excellent work! The content was creative and engaging. Looking forward to working together again.',
        deliverables: [
          { id: 1, task: 'Instagram Reels with outfit styling', completed: true, type: 'video', proof: 'https://instagram.com/reel/example3' },
          { id: 2, task: 'YouTube styling video', completed: true, type: 'video', proof: 'https://youtube.com/watch?v=example3' },
          { id: 3, task: 'Instagram posts with different looks', completed: true, type: 'image', proof: 'https://instagram.com/p/example3' }
        ],
        status: 'completed'
      }
    ]
  };

  const getDeliverableIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="w-4 h-4 text-red-500" />;
      case 'image':
        return <Image className="w-4 h-4 text-blue-500" />;
      case 'text':
        return <FileText className="w-4 h-4 text-green-500" />;
      default:
        return <FileText className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-400';
      case 'pending':
        return 'text-yellow-400';
      case 'completed':
        return 'text-blue-400';
      default:
        return 'text-gray-400';
    }
  };

  const tabs = [
    { id: 'active', label: 'Active', count: campaigns.active.length },
    { id: 'pending', label: 'Pending Approval', count: campaigns.pending.length },
    { id: 'completed', label: 'Completed', count: campaigns.completed.length }
  ];

  const renderActiveCampaigns = () => (
    <div className="space-y-6">
      {campaigns.active.map((campaign) => (
        <div key={campaign.id} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          {/* Campaign Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <img
                src={campaign.seller.logo}
                alt={campaign.seller.name}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div>
                <h3 className="text-xl font-semibold text-white">{campaign.title}</h3>
                <p className="text-gray-400">{campaign.seller.name}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-5 h-5 text-green-400" />
                <span className="text-xl font-bold text-green-400">₹{campaign.budget.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Calendar className="w-4 h-4" />
                <span>{campaign.daysLeft} days left</span>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-300">Campaign Progress</span>
              <span className="text-sm font-medium text-white">{campaign.progress}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div 
                className="h-3 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 transition-all duration-300"
                style={{ width: `${campaign.progress}%` }}
              />
            </div>
          </div>

          {/* Deliverables */}
          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-white mb-4">Deliverables</h4>
            {campaign.deliverables.map((deliverable) => (
              <div key={deliverable.id} className={`flex items-center justify-between p-4 rounded-lg border transition-all duration-300 ${
                deliverable.completed 
                  ? 'bg-green-500/10 border-green-500/30' 
                  : 'bg-gray-700 border-gray-600 hover:border-teal-500/30'
              }`}>
                <div className="flex items-center gap-3">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    deliverable.completed ? 'bg-green-500' : 'bg-gray-600'
                  }`}>
                    {deliverable.completed ? (
                      <CheckCircle className="w-5 h-5 text-white" />
                    ) : (
                      getDeliverableIcon(deliverable.type)
                    )}
                  </div>
                  <div>
                    <p className={`font-medium ${deliverable.completed ? 'text-green-400' : 'text-white'}`}>
                      {deliverable.task}
                    </p>
                    {deliverable.completed && deliverable.proof && (
                      <div className="flex items-center gap-2 mt-1">
                        <CheckCircle className="w-3 h-3 text-green-400" />
                        <span className="text-green-400 text-xs">Approved & Paid</span>
                      </div>
                    )}
                    {!deliverable.completed && (
                      <div className="flex items-center gap-2 mt-1">
                        <Clock className="w-3 h-3 text-yellow-400" />
                        <span className="text-yellow-400 text-xs">Waiting for approval</span>
                      </div>
                    )}
                    {deliverable.proof && (
                      <a 
                        href={deliverable.proof} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-teal-400 text-sm hover:underline flex items-center gap-1"
                      >
                        <Link className="w-3 h-3" />
                        View Proof
                      </a>
                    )}
                  </div>
                </div>
                
                {!deliverable.completed && (
                  <div className="text-right">
                    <div className="mb-2">
                      <span className="text-green-400 font-semibold text-sm">₹{deliverable.amount || 50}</span>
                      <p className="text-gray-400 text-xs">Per advertisement</p>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-sm font-medium rounded-lg hover:shadow-lg hover:shadow-teal-500/25 transition-all duration-300">
                      <Upload className="w-4 h-4" />
                      Submit Proof
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const renderPendingCampaigns = () => (
    <div className="space-y-6">
      {campaigns.pending.map((campaign) => (
        <div key={campaign.id} className="bg-gray-800 rounded-xl p-6 border border-yellow-500/30">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <img
                src={campaign.seller.logo}
                alt={campaign.seller.name}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div>
                <h3 className="text-xl font-semibold text-white">{campaign.title}</h3>
                <p className="text-gray-400">{campaign.seller.name}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-5 h-5 text-green-400" />
                <span className="text-xl font-bold text-green-400">₹{campaign.budget.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-yellow-500/20 text-yellow-400 text-sm rounded-full border border-yellow-500/30">
                <Clock className="w-4 h-4" />
                Pending Review
              </div>
            </div>
          </div>

          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-4">
            <p className="text-yellow-300 text-sm">
              Your work has been submitted and is awaiting seller approval. Payment of ₹{campaign.budget} will be released automatically once approved.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-white">Submitted Work</h4>
            {campaign.deliverables.map((deliverable) => (
              <div key={deliverable.id} className="flex items-center justify-between p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <div>
                    <p className="text-green-400 font-medium">{deliverable.task}</p>
                    <a 
                      href={deliverable.proof} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-teal-400 text-sm hover:underline flex items-center gap-1"
                    >
                      <Link className="w-3 h-3" />
                      View Submitted Work
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const renderCompletedCampaigns = () => (
    <div className="space-y-6">
      {campaigns.completed.map((campaign) => (
        <div key={campaign.id} className="bg-gray-800 rounded-xl p-6 border border-blue-500/30">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <img
                src={campaign.seller.logo}
                alt={campaign.seller.name}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div>
                <h3 className="text-xl font-semibold text-white">{campaign.title}</h3>
                <p className="text-gray-400">{campaign.seller.name}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-5 h-5 text-green-400" />
                <span className="text-xl font-bold text-green-400">₹{campaign.budget.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-blue-500/20 text-blue-400 text-sm rounded-full border border-blue-500/30">
                <CheckCircle className="w-4 h-4" />
                Completed
              </div>
            </div>
          </div>

          {/* Rating */}
          <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-lg p-4 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-white font-medium">Seller Rating:</span>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < campaign.rating ? 'text-yellow-400 fill-current' : 'text-gray-600'}`} />
                ))}
              </div>
              <span className="text-yellow-400 font-semibold">{campaign.rating}/5</span>
            </div>
            <p className="text-gray-300 text-sm italic">"{campaign.feedback}"</p>
          </div>

          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-white">Delivered Work</h4>
            {campaign.deliverables.map((deliverable) => (
              <div key={deliverable.id} className="flex items-center justify-between p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-400" />
                  <div>
                    <p className="text-blue-400 font-medium">{deliverable.task}</p>
                    <a 
                      href={deliverable.proof} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-teal-400 text-sm hover:underline flex items-center gap-1"
                    >
                      <Link className="w-3 h-3" />
                      View Work
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">My Campaigns</h1>
        <p className="text-gray-400">Manage your active campaigns and track your progress</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-700">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-300 ${
                activeTab === tab.id
                  ? 'border-teal-500 text-teal-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              {tab.label}
              <span className={`px-2 py-1 rounded-full text-xs ${
                activeTab === tab.id
                  ? 'bg-teal-500/20 text-teal-400'
                  : 'bg-gray-700 text-gray-400'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'active' && renderActiveCampaigns()}
      {activeTab === 'pending' && renderPendingCampaigns()}
      {activeTab === 'completed' && renderCompletedCampaigns()}

      {/* Empty State */}
      {campaigns[activeTab as keyof typeof campaigns].length === 0 && (
        <div className="text-center py-12">
          <Megaphone className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No {activeTab} campaigns</h3>
          <p className="text-gray-400 mb-6">
            {activeTab === 'active' 
              ? 'You don\'t have any active campaigns. Check the marketplace for new opportunities!'
              : activeTab === 'pending'
              ? 'No campaigns are currently pending approval.'
              : 'You haven\'t completed any campaigns yet.'
            }
          </p>
          {activeTab === 'active' && (
            <button className="px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-teal-500/25 transition-all duration-300">
              Browse Marketplace
            </button>
          )}
        </div>
      )}
    </div>
  );
}