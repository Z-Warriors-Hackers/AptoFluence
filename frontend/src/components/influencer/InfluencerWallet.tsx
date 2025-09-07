import React, { useState } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  Clock,
  Download,
  ExternalLink,
  CheckCircle,
  ArrowUpRight,
  ArrowDownLeft,
  Wallet,
  Copy
} from 'lucide-react';

interface InfluencerWalletProps {
  user: any;
}

export default function InfluencerWallet({ user }: InfluencerWalletProps) {
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [isWithdrawing, setIsWithdrawing] = useState(false);

  // Mock wallet data
  const walletData = {
    fundsInEscrow: 3500,
    availableForWithdrawal: 8750,
    totalEarned: 12250,
    pendingPayments: 2,
    walletAddress: user?.walletAddress || '0x1234567890abcdef1234567890abcdef12345678'
  };

  // Mock transaction history
  const transactions = [
    {
      id: 'tx_001',
      type: 'payout',
      amount: 2500,
      campaign: 'CyberBook Pro Review',
      seller: 'TechCorp',
      date: '2024-01-25T14:30:00Z',
      status: 'completed',
      txHash: '0xabcdef1234567890abcdef1234567890abcdef12'
    },
    {
      id: 'tx_002',
      type: 'payout',
      amount: 1500,
      campaign: 'Winter Fashion Collection',
      seller: 'FashionForward',
      date: '2024-01-20T10:15:00Z',
      status: 'completed',
      txHash: '0x567890abcdef1234567890abcdef1234567890ab'
    },
    {
      id: 'tx_003',
      type: 'bonus',
      amount: 250,
      campaign: 'Gaming Setup Showcase',
      seller: 'GameZone',
      date: '2024-01-18T16:45:00Z',
      status: 'completed',
      txHash: '0x90abcdef1234567890abcdef1234567890abcdef'
    },
    {
      id: 'tx_004',
      type: 'withdrawal',
      amount: -3000,
      campaign: null,
      seller: null,
      date: '2024-01-15T09:20:00Z',
      status: 'completed',
      txHash: '0xdef1234567890abcdef1234567890abcdef12345'
    },
    {
      id: 'tx_005',
      type: 'payout',
      amount: 1200,
      campaign: 'Sustainable Products',
      seller: 'EcoDrops',
      date: '2024-01-12T13:10:00Z',
      status: 'completed',
      txHash: '0x234567890abcdef1234567890abcdef1234567890'
    }
  ];

  const handleWithdraw = async () => {
    if (!withdrawAmount || parseFloat(withdrawAmount) <= 0) return;
    
    setIsWithdrawing(true);
    
    // Simulate withdrawal process
    setTimeout(() => {
      setIsWithdrawing(false);
      setWithdrawAmount('');
      alert(`Withdrawal of ₹${withdrawAmount} initiated successfully!`);
    }, 2000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Address copied to clipboard!');
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

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'payout':
        return <ArrowDownLeft className="w-5 h-5 text-green-400" />;
      case 'bonus':
        return <ArrowDownLeft className="w-5 h-5 text-yellow-400" />;
      case 'withdrawal':
        return <ArrowUpRight className="w-5 h-5 text-blue-400" />;
      default:
        return <DollarSign className="w-5 h-5 text-gray-400" />;
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'payout':
        return 'text-green-400';
      case 'bonus':
        return 'text-yellow-400';
      case 'withdrawal':
        return 'text-blue-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Wallet</h1>
          <p className="text-gray-400">Manage your earnings and withdrawals</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg hover:bg-gray-700 transition-all duration-300">
          <Download className="w-4 h-4" />
          Export
        </button>
      </div>

      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-yellow-500/20">
              <Clock className="w-6 h-6 text-yellow-400" />
            </div>
            <span className="text-yellow-400 text-sm font-medium">Locked</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">
            ₹{walletData.fundsInEscrow.toLocaleString()}
          </h3>
          <p className="text-gray-400 text-sm">Funds in Escrow</p>
          <p className="text-yellow-400 text-xs mt-2">{walletData.pendingPayments} pending campaigns</p>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-green-500/20">
              <DollarSign className="w-6 h-6 text-green-400" />
            </div>
            <span className="text-green-400 text-sm font-medium">Available</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">
            ₹{walletData.availableForWithdrawal.toLocaleString()}
          </h3>
          <p className="text-gray-400 text-sm">Available for Withdrawal</p>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-teal-500/20">
              <TrendingUp className="w-6 h-6 text-teal-400" />
            </div>
            <span className="text-teal-400 text-sm font-medium">Lifetime</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">
            ₹{walletData.totalEarned.toLocaleString()}
          </h3>
          <p className="text-gray-400 text-sm">Total Earned</p>
        </div>
      </div>

      {/* Withdrawal Section */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Wallet className="w-6 h-6 text-teal-400" />
          Withdraw Funds
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Withdrawal Amount
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="number"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                max={walletData.availableForWithdrawal}
                className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300"
                placeholder="Enter amount to withdraw"
              />
            </div>
            <p className="text-gray-400 text-sm mt-2">
              Maximum: ₹{walletData.availableForWithdrawal.toLocaleString()}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Withdrawal Method
            </label>
            <select className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300">
              <option value="apt">APT to connected wallet</option>
              <option value="bank">Bank Transfer (Coming Soon)</option>
              <option value="upi">UPI (Coming Soon)</option>
            </select>
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={handleWithdraw}
            disabled={!withdrawAmount || parseFloat(withdrawAmount) <= 0 || isWithdrawing}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-teal-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isWithdrawing ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <ArrowUpRight className="w-5 h-5" />
                Withdraw Funds
              </>
            )}
          </button>
        </div>
      </div>

      {/* Wallet Address */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h2 className="text-xl font-bold text-white mb-4">Connected Wallet</h2>
        <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
          <div>
            <p className="text-gray-400 text-sm mb-1">Wallet Address</p>
            <p className="text-white font-mono text-sm">{walletData.walletAddress}</p>
          </div>
          <button
            onClick={() => copyToClipboard(walletData.walletAddress)}
            className="flex items-center gap-2 px-3 py-2 bg-gray-600 text-gray-300 hover:text-white hover:bg-gray-500 rounded-lg transition-all duration-300"
          >
            <Copy className="w-4 h-4" />
            Copy
          </button>
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">Transaction History</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700 border-b border-gray-600">
              <tr>
                <th className="text-left py-4 px-6 text-gray-300 font-medium">Type</th>
                <th className="text-left py-4 px-6 text-gray-300 font-medium">Campaign</th>
                <th className="text-left py-4 px-6 text-gray-300 font-medium">Amount</th>
                <th className="text-left py-4 px-6 text-gray-300 font-medium">Date</th>
                <th className="text-left py-4 px-6 text-gray-300 font-medium">Status</th>
                <th className="text-left py-4 px-6 text-gray-300 font-medium">Transaction</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id} className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors duration-300">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      {getTransactionIcon(tx.type)}
                      <span className="text-white capitalize">{tx.type}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      <p className="text-white">{tx.campaign || 'Withdrawal'}</p>
                      {tx.seller && <p className="text-gray-400 text-sm">{tx.seller}</p>}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`font-semibold ${getTransactionColor(tx.type)}`}>
                      {tx.amount > 0 ? '+' : ''}₹{Math.abs(tx.amount).toLocaleString()}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-300 text-sm">{formatDate(tx.date)}</span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30">
                      <CheckCircle className="w-3 h-3" />
                      {tx.status}
                    </div>
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
    </div>
  );
}