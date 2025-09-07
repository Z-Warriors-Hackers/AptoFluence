import React, { useState } from 'react';
import { 
  X, 
  Upload, 
  Plus, 
  Trash2,
  Target,
  Calendar,
  DollarSign,
  Users,
  Zap
} from 'lucide-react';

interface CreateCampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
}

interface TriggerRule {
  id: string;
  trigger: number;
  platforms: {
    [platform: string]: {
      selected: boolean;
      minFollowers: number;
    };
  };
  deliverables: {
    [platform: string]: {
      count: number;
      rate: number;
    };
  };
  location: string;
}

export default function CreateCampaignModal({ isOpen, onClose, user }: CreateCampaignModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    campaignName: '',
    productName: '',
    productImage: '',
    targetType: 'value', // 'value' or 'quantity'
    targetValue: '',
    startDate: '',
    endDate: '',
  });
  const [triggerRules, setTriggerRules] = useState<TriggerRule[]>([
    {
      id: '1',
      trigger: 10,
      platforms: {
        YouTube: { selected: true, minFollowers: 5000 },
        Instagram: { selected: false, minFollowers: 1000 },
        Twitter: { selected: false, minFollowers: 1000 }
      },
      location: '',
      deliverables: {
        YouTube: { count: 5, rate: 100 },
        Instagram: { count: 0, rate: 80 },
        Twitter: { count: 0, rate: 50 }
      }
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const platforms = ['YouTube', 'Instagram', 'Twitter'];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const addTriggerRule = () => {
    const newRule: TriggerRule = {
      id: Date.now().toString(),
      trigger: 20,
      platforms: {
        YouTube: { selected: false, minFollowers: 10000 },
        Instagram: { selected: true, minFollowers: 10000 },
        Twitter: { selected: false, minFollowers: 5000 }
      },
      deliverables: {
        YouTube: { count: 0, rate: 150 },
        Instagram: { count: 8, rate: 120 },
        Twitter: { count: 0, rate: 60 }
      },
      location: '',
    };
    setTriggerRules(prev => [...prev, newRule]);
  };

  const updateTriggerRule = (id: string, field: string, value: any) => {
    setTriggerRules(prev => prev.map(rule => 
      rule.id === id ? { ...rule, [field]: value } : rule
    ));
  };

  const removeTriggerRule = (id: string) => {
    setTriggerRules(prev => prev.filter(rule => rule.id !== id));
  };

  const togglePlatform = (ruleId: string, platform: string) => {
    setTriggerRules(prev => prev.map(rule => {
      if (rule.id === ruleId) {
        return {
          ...rule,
          platforms: {
            ...rule.platforms,
            [platform]: {
              ...rule.platforms[platform],
              selected: !rule.platforms[platform].selected
            }
          }
        };
      }
      return rule;
    }));
  };

  const updatePlatformData = (ruleId: string, platform: string, field: string, value: number) => {
    setTriggerRules(prev => prev.map(rule => {
      if (rule.id === ruleId) {
        return {
          ...rule,
          [field === 'minFollowers' ? 'platforms' : 'deliverables']: {
            ...rule[field === 'minFollowers' ? 'platforms' : 'deliverables'],
            [platform]: {
              ...rule[field === 'minFollowers' ? 'platforms' : 'deliverables'][platform],
              [field]: value
            }
          }
        };
      }
      return rule;
    }));
  };

  const calculateTotalBudget = () => {
    return triggerRules.reduce((total, rule) => total + (rule.budget || 0), 0);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    
    // Simulate smart contract deployment
    setTimeout(() => {
      console.log('Campaign created:', {
        ...formData,
        triggerRules,
        totalBudget: calculateTotalBudget()
      });
      setIsLoading(false);
      onClose();
      // Reset form
      setCurrentStep(1);
      setFormData({
        campaignName: '',
        productName: '',
        productImage: '',
        targetType: 'value',
        targetValue: '',
        startDate: '',
        endDate: '',
      });
      setTriggerRules([{
        id: '1',
        trigger: 10,
        platforms: {
          YouTube: { selected: true, minFollowers: 5000 },
          Instagram: { selected: false, minFollowers: 1000 },
          Twitter: { selected: false, minFollowers: 1000 }
        },
        deliverables: {
          YouTube: { count: 5, rate: 100 },
          Instagram: { count: 0, rate: 80 },
          Twitter: { count: 0, rate: 50 }
        },
        location: '',
      }]);
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-gray-800 rounded-2xl w-full max-w-4xl shadow-2xl border border-gray-700 my-8">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent">
              Create Smart Campaign
            </h2>
            <p className="text-gray-400 text-sm">Step {currentStep} of 3</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors duration-300"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 py-4 border-b border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Campaign Basics</span>
            <span className="text-sm text-gray-400">Auto-Trigger Rules</span>
            <span className="text-sm text-gray-400">Review & Deploy</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="h-2 bg-gradient-to-r from-purple-500 to-teal-500 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 3) * 100}%` }}
            />
          </div>
        </div>

        <div className="p-6">
          {/* Step 1: Campaign Basics */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Campaign Name *
                  </label>
                  <div className="relative">
                    <Target className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="campaignName"
                      value={formData.campaignName}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                      placeholder="Enter campaign name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    name="productName"
                    value={formData.productName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                    placeholder="Enter product name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Product Image
                </label>
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-purple-500 transition-colors duration-300">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400 mb-2">Click to upload or drag and drop</p>
                  <p className="text-gray-500 text-sm">PNG, JPG up to 10MB</p>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      // Handle file upload
                      console.log('File selected:', e.target.files?.[0]);
                    }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Target Type *
                  </label>
                  <select
                    name="targetType"
                    value={formData.targetType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                  >
                    <option value="value">Sales Value (₹)</option>
                    <option value="quantity">Quantity (Units)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Target {formData.targetType === 'value' ? 'Amount' : 'Quantity'} *
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      name="targetValue"
                      value={formData.targetValue}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                      placeholder={formData.targetType === 'value' ? '100000' : '500'}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Start Date *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    End Date *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Auto-Trigger Rules */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-purple-500/20 to-teal-500/20 rounded-lg p-4 border border-purple-500/30">
                <h3 className="text-lg font-semibold text-white mb-2">Smart Contract Rules</h3>
                <p className="text-gray-300 text-sm">
                  Define when and how the system should automatically engage influencers based on your sales performance.
                </p>
              </div>

              {triggerRules.map((rule, index) => (
                <div key={rule.id} className="bg-gray-700 rounded-lg p-6 border border-gray-600">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-white">
                      Rule {index + 1}
                    </h4>
                    {triggerRules.length > 1 && (
                      <button
                        onClick={() => removeTriggerRule(rule.id)}
                        className="text-red-400 hover:text-red-300 transition-colors duration-300"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        If sales drop by (%)
                      </label>
                      <input
                        type="number"
                        value={rule.trigger}
                        onChange={(e) => updateTriggerRule(rule.id, 'trigger', parseInt(e.target.value))}
                        className="w-full px-4 py-3 bg-gray-600 border border-gray-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                        min="1"
                        max="100"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Budget for this rule (₹)
                      </label>
                      <input
                        type="number"
                        value={rule.budget || ''}
                        onChange={(e) => updateTriggerRule(rule.id, 'budget', parseInt(e.target.value) || 0)}
                        className="w-full px-4 py-3 bg-gray-600 border border-gray-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                        min="100"
                        placeholder="10000"
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-300 mb-4">
                      Platform Requirements
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {platforms.map(platform => (
                        <div key={platform} className="space-y-3">
                          <button
                            type="button"
                            onClick={() => togglePlatform(rule.id, platform)}
                            className={`w-full px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                              rule.platforms[platform].selected
                                ? 'bg-gradient-to-r from-purple-500 to-teal-500 text-white'
                                : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                            }`}
                          >
                            {platform}
                            {rule.platforms[platform].selected && <span className="ml-2">✓</span>}
                          </button>
                          
                          {rule.platforms[platform].selected && (
                            <div>
                              <label className="block text-xs text-gray-400 mb-1">Min Followers</label>
                              <div className="relative">
                                <Users className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                                <input
                                  type="number"
                                  value={rule.platforms[platform].minFollowers}
                                  onChange={(e) => updatePlatformData(rule.id, platform, 'minFollowers', parseInt(e.target.value) || 0)}
                                  className="w-full pl-10 pr-3 py-3 bg-gray-600 border border-gray-500 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                                  min="100"
                                  placeholder="5000"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Location (Optional)
                    </label>
                    <input
                      type="text"
                      value={rule.location}
                      onChange={(e) => updateTriggerRule(rule.id, 'location', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                      placeholder="e.g., India, Mumbai"
                    />
                  </div>
                  
                  <div className="bg-gray-600 rounded-lg p-3 mt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 text-sm">Rule Total Budget:</span>
                      <span className="text-purple-400 font-semibold">
                        ₹{rule.budget || 0}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              <button
                onClick={addTriggerRule}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 border-2 border-dashed border-gray-600 rounded-lg text-gray-400 hover:border-purple-500 hover:text-purple-400 transition-all duration-300"
              >
                <Plus className="w-5 h-5" />
                Add Escalation Rule
              </button>
            </div>
          )}

          {/* Step 3: Review & Deploy */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-purple-500/20 to-teal-500/20 rounded-lg p-6 border border-purple-500/30">
                <h3 className="text-xl font-semibold text-white mb-4">Campaign Summary</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-medium text-white mb-3">Campaign Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Name:</span>
                        <span className="text-white">{formData.campaignName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Product:</span>
                        <span className="text-white">{formData.productName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Target:</span>
                        <span className="text-white">
                          {formData.targetType === 'value' ? '₹' : ''}{formData.targetValue}
                          {formData.targetType === 'quantity' ? ' units' : ''}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Duration:</span>
                        <span className="text-white">{formData.startDate} to {formData.endDate}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-medium text-white mb-3">Budget Breakdown</h4>
                    <div className="space-y-2 text-sm">
                      {triggerRules.map((rule, index) => (
                        <div key={rule.id} className="flex justify-between">
                          <span className="text-gray-400">Rule {index + 1} ({rule.trigger}% drop):</span>
                          <span className="text-white">₹{rule.budget || 0}</span>
                        </div>
                      ))}
                      <div className="border-t border-gray-600 pt-2 mt-2">
                        <div className="flex justify-between font-semibold">
                          <span className="text-white">Total Budget:</span>
                          <span className="text-purple-400">₹{calculateTotalBudget()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-700 rounded-lg p-6">
                <h4 className="text-lg font-medium text-white mb-4">Auto-Trigger Rules</h4>
                <div className="space-y-4">
                  {triggerRules.map((rule, index) => (
                    <div key={rule.id} className="bg-gray-600 rounded-lg p-4">
                      <p className="text-white text-sm">
                        <strong>Rule {index + 1}:</strong> If sales drop by <strong>{rule.trigger}%</strong>, 
                        automatically hire influencers with budget of <strong>₹{rule.budget || 0}</strong> for platforms: 
                        {Object.entries(rule.platforms)
                          .filter(([_, req]) => req.selected)
                          .map(([platform, req]) => (
                            <span key={platform}> <strong>{platform}</strong> ({req.minFollowers.toLocaleString()}+ followers)</span>
                          ))
                          .reduce((prev, curr, i) => i === 0 ? [curr] : [...prev, ', ', curr], [] as any)
                        }
                        {rule.location && ` in ${rule.location}`}.
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4">
                <p className="text-yellow-300 text-sm">
                  <strong>Important:</strong> You are about to escrow a total of ₹{calculateTotalBudget()} 
                  to fund this automated campaign. Funds will be released to influencers automatically 
                  when conditions are met.
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-700">
            <button
              onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
              disabled={currentStep === 1}
              className="px-6 py-3 bg-gray-700 text-white font-medium rounded-lg hover:bg-gray-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            {currentStep < 3 ? (
              <button
                onClick={() => setCurrentStep(prev => prev + 1)}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-teal-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
              >
                Next Step
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-teal-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Deploying Contract...
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5" />
                    Deploy Smart Contract
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}