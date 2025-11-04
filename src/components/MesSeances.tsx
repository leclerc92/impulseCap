const MesSeances = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50 py-8 px-4 pb-24">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-900 mb-2">Mes Séances</h1>
          <p className="text-gray-600">
            Vos programmes d'exercices personnalisés
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-8 text-center">
          <div className="text-6xl mb-4">💪</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Bientôt disponible
          </h2>
          <p className="text-gray-600 mb-6">
            Cette section affichera vos séances d'entraînement personnalisées,
            adaptées à votre profil et vos objectifs.
          </p>
          <div className="bg-gradient-to-r from-blue-50 to-orange-50 rounded-lg p-6 text-left">
            <h3 className="font-semibold text-blue-900 mb-3">
              Fonctionnalités à venir :
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-orange-500 mr-2">•</span>
                <span>Programmes d'exercices personnalisés</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-2">•</span>
                <span>Vidéos des mouvements adaptés</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-2">•</span>
                <span>Suivi de vos progrès</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-2">•</span>
                <span>Conseils personnalisés selon votre handicap</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MesSeances;
