import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import FAQ from './components/FAQ';
import CallToAction from './components/CallToAction';
import LoginForm from './components/LoginForm';
import SellerRegistrationForm from './components/SellerRegistrationForm';
import InfluencerRegistrationForm from './components/InfluencerRegistrationForm';
import SellerDashboard from './components/SellerDashboard';
import InfluencerDashboard from './components/InfluencerDashboard';

type ModalType = 'login' | 'seller-register' | 'influencer-register' | null;

function App() {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('aptofluence_current_user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  const handleModalClose = () => {
    setActiveModal(null);
  };

  const handleLoginSuccess = (user: any) => {
    setCurrentUser(user);
    setActiveModal(null);
  };

  const handleRegistrationSuccess = (user: any) => {
    setCurrentUser(user);
    setActiveModal(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('aptofluence_current_user');
    setCurrentUser(null);
  };

  const handleRegisterClick = (type: 'seller' | 'influencer') => {
    setActiveModal(type === 'seller' ? 'seller-register' : 'influencer-register');
  };

  // If user is logged in, show a simple dashboard preview
  if (currentUser) {
    if (currentUser.type === 'seller') {
      return <SellerDashboard user={currentUser} onLogout={handleLogout} />;
    } else if (currentUser.type === 'influencer') {
      return <InfluencerDashboard user={currentUser} onLogout={handleLogout} />;
    }
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar 
        onLoginClick={() => setActiveModal('login')}
        onRegisterClick={handleRegisterClick}
      />
      
      <main>
        <section id="home">
          <Hero onRegisterClick={handleRegisterClick} />
        </section>
        
        <section id="how-it-works">
          <HowItWorks />
        </section>
        
        <section id="faq">
          <FAQ />
        </section>
        
        <CallToAction onRegisterClick={handleRegisterClick} />
      </main>

      {/* Modals */}
      <LoginForm 
        isOpen={activeModal === 'login'}
        onClose={handleModalClose}
        onSuccess={handleLoginSuccess}
      />
      
      <SellerRegistrationForm 
        isOpen={activeModal === 'seller-register'}
        onClose={handleModalClose}
        onSuccess={handleRegistrationSuccess}
      />
      
      <InfluencerRegistrationForm 
        isOpen={activeModal === 'influencer-register'}
        onClose={handleModalClose}
        onSuccess={handleRegistrationSuccess}
      />
    </div>
  );
}

export default App;