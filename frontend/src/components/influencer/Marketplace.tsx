import React, { useState } from 'react';
import { 
  Search, 
  Filter,
  MapPin,
  Users,
  Calendar,
  DollarSign,
  Eye,
  Heart,
  Star,
  Zap,
  Youtube,
  Instagram,
  Twitter,
  CheckCircle,
  X,
  Building,
  Target
} from 'lucide-react';

interface MarketplaceProps {
  user: any;
}

export default function Marketplace({ user }: MarketplaceProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBudget, setFilterBudget] = useState('all');
  const [filterNiche, setFilterNiche] = useState('all');
  const [filterPlatform, setFilterPlatform] = useState('all');
  const [selectedContract, setSelectedContract] = useState<any>(null);

  // Mock campaign offers from sellers
  const offers = [
    {
      id: 1,
      seller: {
        name: 'TechCorp',
        logo: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=100',
        rating: 4.8,
        campaigns: 15,
        location: 'Mumbai, India'
      },
      title: 'Promote CyberBook Pro Laptop',
      description: 'Looking for tech reviewers to showcase our latest gaming laptop with RGB keyboard and high-performance specs.',
      budget: 2500,
      timeline: {
        start: '2024-02-01',
        end: '2024-02-15',
        duration: '14 days'
      },
      platforms: ['YouTube', 'Instagram'],
      requirements: {
        minFollowers: {
          YouTube: 10000,
          Instagram: 5000
        },
        location: 'India',
        niche: 'Technology'
      },
      deliverables: [
        { platform: 'YouTube', type: 'Product Review Video', count: 1, description: '10+ minutes detailed review' },
        { platform: 'Instagram', type: 'Product Posts', count: 3, description: 'High-quality product shots with captions' },
        { platform: 'Instagram', type: 'Story Series', count: 5, description: 'Behind-the-scenes and unboxing stories' }
      ],
      tags: ['Tech', 'Gaming', 'Review', 'Mumbai'],
      urgent: false,
      featured: true,
      estimatedAds: 9 // Total deliverables
    },
    {
      id: 2,
      seller: {
        name: 'EcoDrops',
        logo: 'https://images.pexels.com/photos/1029896/pexels-photo-1029896.jpeg?auto=compress&cs=tinysrgb&w=100',
        rating: 4.9,
        campaigns: 8,
        location: 'Delhi, India'
      },
      title: 'Sustainable Products Campaign',
      description: 'Promote our eco-friendly water bottles and sustainable lifestyle products to environmentally conscious audience.',
      budget: 1200,
      timeline: {
        start: '2024-02-05',
        end: '2024-02-20',
        duration: '15 days'
      },
      platforms: ['Instagram', 'YouTube'],
      requirements: {
        minFollowers: {
          Instagram: 5000,
          YouTube: 3000
        },
        location: 'India',
        niche: 'Lifestyle'
      },
      deliverables: [
        { platform: 'Instagram', type: 'Reels', count: 2, description: 'Daily use and lifestyle integration' },
        { platform: 'YouTube', type: 'Short Video', count: 1, description: '60 seconds sustainability tips' },
        { platform: 'Instagram', type: 'Posts', count: 3, description: 'Lifestyle shots with product' }
      ],
      tags: ['Sustainable', 'Lifestyle', 'Eco-friendly', 'Delhi'],
      urgent: true,
      featured: false,
      estimatedAds: 6
    }
  ];

  const filteredOffers = offers.filter(offer => {
    const matchesSearch = offer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         offer.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         offer.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesBudget = filterBudget === 'all' || 
                         (filterBudget === 'high' && offer.budget >= 2000) ||
                         (filterBudget === 'medium' && offer.budget >= 1000 && offer.budget < 2000) ||
                         (filterBudget === 'low' && offer.budget < 1000);
    
    const matchesNiche = filterNiche === 'all' || 
                        offer.requirements.niche.toLowerCase() === filterNiche.toLowerCase();
    
    const matchesPlatform = filterPlatform === 'all' || 
                           offer.platforms.some(platform => 
                             platform.toLowerCase() === filterPlatform.toLowerCase()
                           );
    
    return matchesSearch && matchesBudget && matchesNiche && matchesPlatform;
  });

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'youtube':
        return <Youtube className="w-4 h-4 text-red-500" />;
      case 'instagram':
        return <Instagram className="w-4 h-4 text-pink-500" />;
      case 'twitter':
        return <Twitter className="w-4 h-4 text-blue-500" />;
      default:
        return <Zap className="w-4 h-4 text-gray-400" />;
    }
  };

  const handleAcceptContract = (offerId: number) => {
    console.log(`Accepting contract ${offerId}`);
    alert('Contract accepted! You will be notified once the seller confirms.');
    setSelectedContract(null);
  };

  const handleDeclineContract = (offerId: number) => {
    console.log(`Declining contract ${offerId}`);
    alert('Contract declined.');
    setSelectedContract(null);
  };

  const calculateEstimatedEarnings = (offer: any) => {
    // Mock calculation based on user's rates and offer deliverables
    const userRates = user?.rateCard || {
      youtubeVideo: 200,
      instagramPost: 100,
      instagramReel: 150,
      twitterPost: 25
    };

    let total = 0;
    offer.deliverables.forEach((deliverable: any) => {
      const platform = deliverable.platform.toLowerCase();
      const type = deliverable.type.toLowerCase();
      
      if (platform === 'youtube') {
        total += deliverable.count * userRates.youtubeVideo;
      } else if (platform === 'instagram') {
        if (type.includes('reel')) {
          total += deliverable.count * userRates.instagramReel;
        } else {
          total += deliverable.count * userRates.instagramPost;
        }
      } else if (platform === 'twitter') {
        total += deliverable.count * userRates.twitterPost;
      }
    });

    return Math.min(total, offer.budget); // Don't exceed offer budget
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Marketplace</h1>
          <p className="text-gray-400">Discover new campaign opportunities and grow your earnings</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-500/20 to-cyan-500/20 rounded-lg border border-teal-500/30">
          <Zap className="w-5 h-5 text-teal-400" />
          <span className="text-white font-medium">{filteredOffers.length} Available</span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search campaigns, brands, or keywords..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300"
          />
        </div>
        
        <div className="flex gap-4">
          <div className="relative">
            <Filter className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <select
              value={filterBudget}
              onChange={(e) => setFilterBudget(e.target.value)}
              className="pl-10 pr-8 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300"
            >
              <option value="all">All Budgets</option>
              <option value="high">High (₹2000+)</option>
              <option value="medium">Medium (₹1000-2000)</option>
              <option value="low">Low (Under ₹1000)</option>
            </select>
          </div>

          <select
            value={filterNiche}
            onChange={(e) => setFilterNiche(e.target.value)}
            className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300"
          >
            <option value="all">All Niches</option>
            <option value="technology">Technology</option>
            <option value="gaming">Gaming</option>
            <option value="fashion">Fashion</option>
            <option value="lifestyle">Lifestyle</option>
          </select>

          <select
            value={filterPlatform}
            onChange={(e) => setFilterPlatform(e.target.value)}
            className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300"
          >
            <option value="all">All Platforms</option>
            <option value="youtube">YouTube</option>
            <option value="instagram">Instagram</option>
            <option value="twitter">Twitter</option>
          </select>
        </div>
      </div>

      {/* Campaign Offers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredOffers.map((offer) => (
          <div key={offer.id} className={`bg-gray-800 rounded-xl border transition-all duration-300 hover:border-teal-500/30 hover:shadow-lg hover:shadow-teal-500/10 ${
            offer.featured ? 'border-teal-500/50 bg-gradient-to-br from-gray-800 to-teal-900/20' : 'border-gray-700'
          }`}>
            {/* Header */}
            <div className="p-6 pb-4">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <img
                    src={offer.seller.logo}
                    alt={offer.seller.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="text-white font-semibold">{offer.seller.name}</h3>
                    <div className="flex items-center gap-2">
                      <Star className="w-3 h-3 text-yellow-400" />
                      <span className="text-gray-400 text-sm">{offer.seller.rating}</span>
                      <span className="text-gray-500 text-sm">• {offer.seller.campaigns} campaigns</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {offer.featured && (
                    <div className="px-2 py-1 bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-xs font-medium rounded-full">
                      Featured
                    </div>
                  )}
                  {offer.urgent && (
                    <div className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs font-medium rounded-full border border-yellow-500/30">
                      Urgent
                    </div>
                  )}
                </div>
              </div>

              <h2 className="text-xl font-bold text-white mb-2">{offer.title}</h2>
              <p className="text-gray-300 text-sm mb-4 line-clamp-2">{offer.description}</p>

              {/* Budget & Timeline */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-green-400" />
                  <span className="text-2xl font-bold text-green-400">₹{offer.budget.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <Calendar className="w-4 h-4" />
                  <span>{offer.timeline.duration}</span>
                </div>
              </div>

              {/* Estimated Earnings */}
              <div className="mb-4 p-3 bg-gradient-to-r from-purple-500/20 to-teal-500/20 rounded-lg border border-purple-500/30">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300 text-sm">Your Estimated Earnings</span>
                  <span className="text-purple-400 font-semibold">₹{calculateEstimatedEarnings(offer).toLocaleString()}</span>
                </div>
              </div>

              {/* Platform Requirements */}
              <div className="mb-4">
                <p className="text-gray-400 text-sm mb-2">Platform Requirements:</p>
                <div className="flex flex-wrap gap-2">
                  {offer.platforms.map((platform) => (
                    <div key={platform} className="flex items-center gap-2 px-3 py-1 bg-gray-700 rounded-full">
                      {getPlatformIcon(platform)}
                      <span className="text-white text-sm">{platform}</span>
                      <span className="text-gray-400 text-xs">
                        {offer.requirements.minFollowers[platform as keyof typeof offer.requirements.minFollowers]?.toLocaleString()}+
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Deliverables Preview */}
              <div className="mb-4">
                <p className="text-gray-400 text-sm mb-2">Deliverables ({offer.estimatedAds} total ads):</p>
                <ul className="space-y-1">
                  {offer.deliverables.slice(0, 2).map((deliverable, index) => (
                    <li key={index} className="text-gray-300 text-sm flex items-start gap-2">
                      <span className="text-teal-400 mt-1">•</span>
                      <span>{deliverable.count} {deliverable.type} on {deliverable.platform}</span>
                    </li>
                  ))}
                  {offer.deliverables.length > 2 && (
                    <li className="text-gray-400 text-sm">
                      +{offer.deliverables.length - 2} more deliverables...
                    </li>
                  )}
                </ul>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedContract(offer)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-teal-500/25 transition-all duration-300"
                >
                  <Eye className="w-4 h-4" />
                  View Contract
                </button>
                <button className="px-4 py-3 bg-gray-700 text-gray-300 hover:text-white hover:bg-gray-600 rounded-lg transition-all duration-300">
                  <Heart className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Contract Details Modal */}
      {selectedContract && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
          <div className="bg-gray-800 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-700">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <div>
                <h2 className="text-2xl font-bold text-white">{selectedContract.title}</h2>
                <p className="text-gray-400">Contract Details</p>
              </div>
              <button
                onClick={() => setSelectedContract(null)}
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Seller Info */}
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-3">Seller Information</h3>
                <div className="flex items-center gap-4">
                  <img
                    src={selectedContract.seller.logo}
                    alt={selectedContract.seller.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div>
                    <h4 className="text-white font-semibold">{selectedContract.seller.name}</h4>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span>{selectedContract.seller.rating} rating</span>
                      <span>• {selectedContract.seller.campaigns} campaigns</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                      <MapPin className="w-4 h-4" />
                      <span>{selectedContract.seller.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Campaign Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-700 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-3">Campaign Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Budget:</span>
                      <span className="text-green-400 font-semibold">₹{selectedContract.budget.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Duration:</span>
                      <span className="text-white">{selectedContract.timeline.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Start Date:</span>
                      <span className="text-white">{selectedContract.timeline.start}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">End Date:</span>
                      <span className="text-white">{selectedContract.timeline.end}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-700 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-3">Your Earnings</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Estimated Earnings:</span>
                      <span className="text-purple-400 font-semibold">₹{calculateEstimatedEarnings(selectedContract).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total Deliverables:</span>
                      <span className="text-white">{selectedContract.estimatedAds} ads</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Avg per Ad:</span>
                      <span className="text-white">₹{Math.round(calculateEstimatedEarnings(selectedContract) / selectedContract.estimatedAds)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Detailed Deliverables */}
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-3">Required Deliverables</h3>
                <div className="space-y-3">
                  {selectedContract.deliverables.map((deliverable: any, index: number) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-gray-600 rounded-lg">
                      {getPlatformIcon(deliverable.platform)}
                      <div className="flex-1">
                        <h4 className="text-white font-medium">{deliverable.count} × {deliverable.type}</h4>
                        <p className="text-gray-400 text-sm">{deliverable.platform}</p>
                        <p className="text-gray-300 text-sm mt-1">{deliverable.description}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-green-400 font-semibold">
                          ₹{deliverable.count * (user?.rateCard?.[`${deliverable.platform.toLowerCase()}${deliverable.type.includes('Post') ? 'Post' : deliverable.type.includes('Reel') ? 'Reel' : 'Video'}`] || 100)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Requirements */}
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-3">Requirements</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-400 text-sm mb-2">Platform Requirements:</p>
                    {selectedContract.platforms.map((platform: string) => (
                      <div key={platform} className="flex items-center justify-between text-sm mb-1">
                        <span className="text-white">{platform}:</span>
                        <span className="text-gray-400">
                          {selectedContract.requirements.minFollowers[platform as keyof typeof selectedContract.requirements.minFollowers]?.toLocaleString()}+ followers
                        </span>
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-2">Other Requirements:</p>
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span className="text-white">Location:</span>
                        <span className="text-gray-400">{selectedContract.requirements.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white">Niche:</span>
                        <span className="text-gray-400">{selectedContract.requirements.niche}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={() => handleAcceptContract(selectedContract.id)}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300"
                >
                  <CheckCircle className="w-5 h-5" />
                  Accept Contract
                </button>
                <button
                  onClick={() => handleDeclineContract(selectedContract.id)}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-red-500/25 transition-all duration-300"
                >
                  <X className="w-5 h-5" />
                  Decline Contract
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredOffers.length === 0 && (
        <div className="text-center py-12">
          <Search className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No campaigns found</h3>
          <p className="text-gray-400 mb-6">
            Try adjusting your search criteria or check back later for new opportunities
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setFilterBudget('all');
              setFilterNiche('all');
              setFilterPlatform('all');
            }}
            className="px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-teal-500/25 transition-all duration-300"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}