import { useState } from 'react';
import FormulaireProfil from './components/FormulaireProfil';
import MesSeances from './components/MesSeances';
import Social from './components/Social';
import BottomNav from './components/BottomNav';

function App() {
  const [activeTab, setActiveTab] = useState('profil');

  const renderContent = () => {
    switch (activeTab) {
      case 'profil':
        return <FormulaireProfil />;
      case 'seances':
        return <MesSeances />;
      case 'social':
        return <Social />;
      default:
        return <FormulaireProfil />;
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Logo en position absolue dans le coin supérieur gauche */}
      <img 
        src="/logo_ImpulseCap.jpg" 
        alt="ImpulseCap Logo" 
        className="fixed top-4 left-4 h-16 object-contain z-50 drop-shadow-lg"
      />
      
      {renderContent()}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}

export default App;
