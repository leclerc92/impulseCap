interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const BottomNav = ({ activeTab, onTabChange }: BottomNavProps) => {
  const tabs = [
    { id: 'profil', label: 'Profil', icon: '👤' },
    { id: 'seances', label: 'Mes séances', icon: '💪' },
    { id: 'social', label: 'Social', icon: '👥' },
  ];

  return (
    <nav className="absolute bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 shadow-lg z-50">
      <div className="flex justify-around items-center h-16">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center justify-center flex-1 h-full transition-all ${
              activeTab === tab.id
                ? 'text-orange-600 font-bold'
                : 'text-gray-500 hover:text-blue-600'
            }`}
          >
            <span className="text-2xl mb-1">{tab.icon}</span>
            <span className="text-xs">{tab.label}</span>
            {activeTab === tab.id && (
              <div className="absolute bottom-0 h-1 w-16 bg-gradient-to-r from-blue-600 to-orange-500 rounded-t-full" />
            )}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
