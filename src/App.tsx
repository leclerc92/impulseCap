import {useState} from 'react';
import PhoneMockup from './components/PhoneMockup';
import FormulaireProfil from './components/FormulaireProfil';
import MesSeances from './components/MesSeances';
import Social from './components/Social';
import BottomNav from './components/BottomNav';
import GenerationPopup from './components/GenerationPopup';

function App() {
  const [activeTab, setActiveTab] = useState('profil');
  const [showGenerationPopup, setShowGenerationPopup] = useState(false);

  const handleProgramSubmit = () => {
    setShowGenerationPopup(true);
  };

  const handleGenerationComplete = () => {
    setShowGenerationPopup(false);
    setActiveTab('seances');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'profil':
        return <FormulaireProfil onProgramSubmit={handleProgramSubmit} />;
      case 'seances':
        return <MesSeances />;
      case 'social':
        return <Social />;
      default:
        return <FormulaireProfil onProgramSubmit={handleProgramSubmit} />;
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

        {/* Popup de génération - couvre tout l'écran du mockup */}
        {showGenerationPopup && (
          <GenerationPopup onComplete={handleGenerationComplete} />
        )}
      </div>
    </PhoneMockup>
  );
}

export default App;
