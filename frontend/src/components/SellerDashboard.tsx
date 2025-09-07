import React, { useState } from 'react';
import Sidebar from './dashboard/Sidebar';
import Overview from './dashboard/Overview';
import Campaigns from './dashboard/Campaigns';
import Influencers from './dashboard/Influencers';
import HiredInfluencers from './dashboard/HiredInfluencers';
import Payments from './dashboard/Payments';
import Settings from './dashboard/Settings';

interface SellerDashboardProps {
  user: any;
  onLogout: () => void;
}

export default function SellerDashboard({ user, onLogout }: SellerDashboardProps) {
  const [activeSection, setActiveSection] = useState('overview');
  const [currentUser, setCurrentUser] = useState(user);

  const handleUserUpdate = (updatedUser: any) => {
    setCurrentUser(updatedUser);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return <Overview user={currentUser} />;
      case 'campaigns':
        return <Campaigns user={currentUser} />;
      case 'hired':
        return <HiredInfluencers user={currentUser} />;
      case 'influencers':
        return <Influencers user={currentUser} />;
      case 'payments':
        return <Payments user={currentUser} />;
      case 'settings':
        return <Settings user={currentUser} onUserUpdate={handleUserUpdate} />;
      default:
        return <Overview user={currentUser} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex">
      <Sidebar
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