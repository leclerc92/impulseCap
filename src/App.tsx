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
    <div className="min-h-screen">
      {renderContent()}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}

export default App;
