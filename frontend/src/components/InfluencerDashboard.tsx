import React, { useState } from 'react';
import InfluencerSidebar from './influencer/InfluencerSidebar';
import InfluencerHome from './influencer/InfluencerHome';
import Marketplace from './influencer/Marketplace';
import MyCampaigns from './influencer/MyCampaigns';
import InfluencerWallet from './influencer/InfluencerWallet';
import InfluencerProfile from './influencer/InfluencerProfile';
import Settings from './dashboard/Settings';

interface InfluencerDashboardProps {
  user: any;
  onLogout: () => void;
}

export default function InfluencerDashboard({ user, onLogout }: InfluencerDashboardProps) {
  const [activeSection, setActiveSection] = useState('home');
  const [currentUser, setCurrentUser] = useState(user);

  const handleUserUpdate = (updatedUser: any) => {
    setCurrentUser(updatedUser);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return <InfluencerHome user={currentUser} />;
      case 'marketplace':
        return <Marketplace user={currentUser} />;
      case 'campaigns':
        return <MyCampaigns user={currentUser} />;
      case 'wallet':
        return <InfluencerWallet user={currentUser} />;
      case 'profile':
        return <InfluencerProfile user={currentUser} onUserUpdate={handleUserUpdate} />;
      case 'settings':
        return <Settings user={currentUser} onUserUpdate={handleUserUpdate} />;
      default:
        return <InfluencerHome user={currentUser} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex">
      <InfluencerSidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        onLogout={onLogout}
        user={currentUser}
      />
      
      <div className="flex-1 overflow-auto">
        {renderContent()}
      </div>
    </div>
  );
}