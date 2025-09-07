import React, { useState } from 'react';
import { 
  Search, 
  Filter,
  Download,
  ExternalLink,
  CheckCircle,
  Clock,
  AlertTriangle,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calendar
} from 'lucide-react';

interface PaymentsProps {
  user: any;
}

export default function Payments({ user }: PaymentsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPeriod, setFilterPeriod] = useState('all');

  // Mock payment data
  const paymentStats = {
    totalSpent: 15000,
    totalEscrowed: 8500,
    totalReleased: 6500,
    pendingPayments: 3,
    monthlySpend: 4200,
    monthlyChange: 12.5
  };

  const transactions = [
    {
      id: 'tx_001',
      type: 'escrow',
      amount: 5000,
      campaign: 'Q4 Laptop Launch',
      influencer: null,
      status: 'completed',
      date: '2024-01-15T10:30:00Z',
      txHash: '0x1234567890abcdef1234567890abcdef12345678',
      description: 'Funds escrowed for campaign smart contract'
    },
    {
      id: 'tx_002',
      type: 'payment',
      amount: 500,
      campaign: 'Q4 Laptop Launch',
      influencer: 'TechReviewer',
      status: 'completed',
      date: '2024-01-16T14:20:00Z',
      txHash: '0xabcdef1234567890abcdef1234567890abcdef12',
      description: 'Automatic payment to influencer for milestone completion'
    },
    {
      id: 'tx_003',
      type: 'payment',
      amount: 2000,
      campaign: 'Q4 Laptop Launch',
      influencer: 'TechReviewer',
      status: 'completed',
      date: '2024-01-18T09:15:00Z',
      txHash: '0x567890abcdef1234567890abcdef1234567890ab',
      description: 'Escalation payment - 20% drop trigger activated'
    },
    {
      id: 'tx_004',
      type: 'escrow',
      amount: 3000,
      campaign: 'Winter Fashion Collection',
      influencer: null,
      status: 'completed',
      date: '2024-01-20T11:45:00Z',
      txHash: '0x90abcdef1234567890abcdef1234567890abcdef',
      description: 'Funds escrowed for campaign smart contract'
    },
    {
      id: 'tx_005',
      type: 'payment',
      amount: 800,
      campaign: 'Winter Fashion Collection',
      influencer: 'FashionInfluencer',
      status: 'pending',
      date: '2024-01-22T16:30:00Z',
      txHash: '0xdef1234567890abcdef1234567890abcdef12345',
      description: 'Payment processing - awaiting milestone verification'
    },
    {
      id: 'tx_006',
      type: 'payment',
      amount: 1000,
      campaign: 'Gaming Accessories',
      influencer: 'GamingPro',
      status: 'completed',
      date: '2024-01-23T13:20:00Z',
      txHash: '0x234567890abcdef1234567890abcdef1234567890',
      description: 'Automatic payment for campaign completion'
    },
    {
      id: 'tx_007',
      type: 'refund',
      amount: 1500,
      campaign: 'Gaming Accessories',
      influencer: null,
      status: 'completed',
      date: '2024-01-24T10:10:00Z',
      txHash: '0x7890abcdef1234567890abcdef1234567890abcd',
      description: 'Unused escrow funds returned to seller'
    }
  ];

  const filteredTransactions = transactions.filter(tx => {
    const matchesSearch = tx.campaign.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (tx.influencer && tx.influencer.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         tx.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || tx.status === filterStatus;
    
    let matchesPeriod = true;
    if (filterPeriod !== 'all') {
      const txDate = new Date(tx.date);
      const now = new Date();
      const daysDiff = Math.floor((now.getTime() - txDate.getTime()) / (1000 * 60 * 60 * 24));
      
      switch (filterPeriod) {
        case '7d':
          matchesPeriod = daysDiff <= 7;
          break;
        case '30d':
          matchesPeriod = daysDiff <= 30;
          break;
        case '90d':
          matchesPeriod = daysDiff <= 90;
          break;
      }
    }
    
    return matchesSearch && matchesStatus && matchesPeriod;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-400" />;
      case 'failed':
        return <AlertTriangle className="w-4 h-4 text-red-400" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'failed':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'escrow':
        return '🔒';
      case 'payment':
        return '💰';
      case 'refund':
        return '↩️';
      default:
        return '💳';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const truncateHash = (hash: string) => {
    return `${hash.slice(0, 8)}...${hash.slice(-8)}`;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Payments</h1>
          <p className="text-gray-400">Track your transactions and escrow status</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg hover:bg-gray-700 transition-all duration-300">
          <Download className="w-4 h-4" />
          Export
        </button>
      </div>

      {/* Payment Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-purple-500/20">
              <DollarSign className="w-6 h-6 text-purple-400" />
            </div>
            <span className="text-purple-400 text-sm font-medium">Total</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">
            ₹{paymentStats.totalSpent.toLocaleString()}
          </h3>
          <p className="text-gray-400 text-sm">Total Spent</p>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-yellow-500/20">
              <Clock className="w-6 h-6 text-yellow-400" />
            </div>
            <span className="text-yellow-400 text-sm font-medium">Locked</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">
            ₹{paymentStats.totalEscrowed.toLocaleString()}
          </h3>
          <p className="text-gray-400 text-sm">Escrowed Funds</p>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-green-500/20">
              <CheckCircle className="w-6 h-6 text-green-400" />
            </div>
            <span className="text-green-400 text-sm font-medium">Released</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">
            ₹{paymentStats.totalReleased.toLocaleString()}
          </h3>
          <p className="text-gray-400 text-sm">Paid to Influencers</p>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-teal-500/20">
              <TrendingUp className="w-6 h-6 text-teal-400" />
            </div>
            <div className="flex items-center gap-1">
              {paymentStats.monthlyChange >= 0 ? (
                <TrendingUp className="w-4 h-4 text-green-400" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-400" />
              )}
              <span className={`text-sm font-medium ${
                paymentStats.monthlyChange >= 0 ? 'text-green-400' : 'text-red-400'
              }`}>
                {paymentStats.monthlyChange >= 0 ? '+' : ''}{paymentStats.monthlyChange}%
              </span>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">
            ₹{paymentStats.monthlySpend.toLocaleString()}
          </h3>
          <p className="text-gray-400 text-sm">This Month</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search transactions..."
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
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
          </div>

          <div className="relative">
            <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <select
              value={filterPeriod}
              onChange={(e) => setFilterPeriod(e.target.value)}
              className="pl-10 pr-8 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
            >
              <option value="all">All Time</option>
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700 border-b border-gray-600">
              <tr>
                <th className="text-left py-4 px-6 text-gray-300 font-medium">Transaction</th>
                <th className="text-left py-4 px-6 text-gray-300 font-medium">Campaign</th>
                <th className="text-left py-4 px-6 text-gray-300 font-medium">Influencer</th>
                <th className="text-left py-4 px-6 text-gray-300 font-medium">Amount</th>
                <th className="text-left py-4 px-6 text-gray-300 font-medium">Status</th>
                <th className="text-left py-4 px-6 text-gray-300 font-medium">Date</th>
                <th className="text-left py-4 px-6 text-gray-300 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((tx) => (
                <tr key={tx.id} className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors duration-300">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{getTypeIcon(tx.type)}</span>
                      <div>
                        <p className="text-white font-medium">{tx.id}</p>
                        <p className="text-gray-400 text-sm capitalize">{tx.type}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-white">{tx.campaign}</p>
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-white">{tx.influencer || '-'}</p>
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-white font-semibold">₹{tx.amount.toLocaleString()}</p>
                  </td>
                  <td className="py-4 px-6">
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(tx.status)}`}>
                      {getStatusIcon(tx.status)}
                      {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-gray-300 text-sm">{formatDate(tx.date)}</p>
                  </td>
                  <td className="py-4 px-6">
                    <button
                      onClick={() => window.open(`https://explorer.aptoslabs.com/txn/${tx.txHash}`, '_blank')}
                      className="flex items-center gap-2 px-3 py-1 bg-gray-700 text-gray-300 hover:text-white hover:bg-gray-600 rounded-lg transition-all duration-300"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span className="text-sm">{truncateHash(tx.txHash)}</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State */}
      {filteredTransactions.length === 0 && (
        <div className="text-center py-12">
          <DollarSign className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No transactions found</h3>
          <p className="text-gray-400">
            {searchTerm || filterStatus !== 'all' || filterPeriod !== 'all'
              ? 'Try adjusting your search or filter criteria'
              : 'Your payment history will appear here once you start creating campaigns'
            }
          </p>
        </div>
      )}

      {/* Pending Payments Alert */}
      {paymentStats.pendingPayments > 0 && (
        <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-6 h-6 text-yellow-400" />
            <h3 className="text-lg font-semibold text-white">Pending Payments</h3>
          </div>
          <p className="text-gray-300">
            You have {paymentStats.pendingPayments} pending payment{paymentStats.pendingPayments > 1 ? 's' : ''} 
            awaiting milestone verification. These will be processed automatically once conditions are met.
          </p>
        </div>
      )}
    </div>
  );
}