import { useState } from 'react';
import PhoneMockup from './components/PhoneMockup';
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
    <PhoneMockup>
      <div className="h-full flex flex-col relative">
        {/* Logo fixe en haut à gauche - ne suit pas le scroll */}
        {/* Contenu scrollable */}
        <div className="flex-1 overflow-y-auto pb-16">
          {renderContent()}
        </div>

        {/* Bottom Nav fixe en bas du mockup */}
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </PhoneMockup>
  );
}

export default App;
