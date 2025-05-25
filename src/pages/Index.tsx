
import React, { useState } from 'react';
import Header from '@/components/Header';
import TouristMode from '@/components/TouristMode';
import CitizenMode from '@/components/CitizenMode';
import Chatbot from '@/components/Chatbot';
import Login from './Login';

const Index = () => {
  const [activeMode, setActiveMode] = useState<'tourist' | 'citizen'>('tourist');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header activeMode={activeMode} setActiveMode={setActiveMode} />
      
      <main className="min-h-screen">
        {activeMode === 'tourist' ? <TouristMode /> : <CitizenMode />}
      </main>
      
      <Chatbot />
    </div>
  );
};

export default Index;
