import {useEffect, useRef, useState} from 'react';
import AdPopup from './AdPopup';

interface ExerciceDetailProps {
  exercice: {
    id: number;
    name: string;
    duration: string;
    reps?: string;
    series?: string;
    videoUrl?: string;
    description: string;
    conseilsPersonnalises: string[];
    musclesCibles: string[];
    precautions: string[];
    completed: boolean;
    hasVariants?: boolean; // Indique si l'exercice a des variantes débutant/confirmé
    variantId?: number; // ID de la version alternative (débutant <-> confirmé)
  };
  onBack: () => void;
  onComplete: () => void;
  onSwitchVariant?: (variantId: number) => void; // Callback pour changer de variante
}

const ExerciceDetail = ({ exercice, onBack, onComplete, onSwitchVariant }: ExerciceDetailProps) => {
  const [isCompleted, setIsCompleted] = useState(exercice.completed);
  const [showAdPopup, setShowAdPopup] = useState(true);
  const formTopRef = useRef<HTMLDivElement>(null);

    // Déterminer si c'est la version débutant ou confirmé
  const isDebutant = exercice.name.includes('(Débutant)');

  const handleComplete = () => {
    setIsCompleted(true);
    onComplete();
  };

    // Scroll vers le haut à l'ouverture de la page
    useEffect(() => {
        formTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, []); // Tableau vide = exécution uniquement au montage du composant

  return (
    <>
      {/* Popup de publicité */}
      {showAdPopup && <AdPopup onClose={() => setShowAdPopup(false)} />}

      <div className="relative min-h-screen bg-gradient-to-br from-blue-50 to-orange-50 pb-24">
      {/* Header avec bouton retour */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={onBack}
            className="text-blue-600 hover:text-blue-800 flex items-center gap-2 font-medium"
          >
            <span className="text-2xl">←</span>
            <span>Retour</span>
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Titre de l'exercice */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-blue-900 mb-2">
            {exercice.name}
          </h1>
          
          {/* Sélecteur de niveau si l'exercice a des variantes */}
          {exercice.hasVariants && onSwitchVariant && exercice.variantId && (
            <div className="mb-4 p-4 bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-300 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">
                    Niveau actuel : <span className={`font-bold ${isDebutant ? 'text-green-600' : 'text-blue-600'}`}>
                      {isDebutant ? '🌱 Débutant' : '⭐ Confirmé'}
                    </span>
                  </p>
                  <p className="text-xs text-gray-600">
                    {isDebutant 
                      ? 'Vous pouvez passer au niveau confirmé une fois cet exercice maîtrisé'
                      : 'Vous pouvez revenir au niveau débutant si nécessaire'
                    }
                  </p>
                </div>
                <button
                  onClick={() => onSwitchVariant(exercice.variantId!)}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-all transform hover:scale-105 ${
                    isDebutant 
                      ? 'bg-blue-500 hover:bg-blue-600 text-white'
                      : 'bg-green-500 hover:bg-green-600 text-white'
                  }`}
                >
                  {isDebutant ? '⬆️ Passer au niveau Confirmé' : '⬇️ Revenir au niveau Débutant'}
                </button>
              </div>
            </div>
          )}
          
          <div className="flex flex-wrap gap-3 text-sm">
            <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full font-medium">
              ⏱️ {exercice.duration}
            </span>
            {exercice.reps && (
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
                🔢 {exercice.reps}
              </span>
            )}
            {exercice.series && (
              <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-medium">
                📊 {exercice.series}
              </span>
            )}
          </div>
        </div>

        {/* Vidéo de l'exercice */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
          <div className="relative bg-gray-900 aspect-video flex items-center justify-center">
            {exercice.videoUrl ? (
              <video
                src={exercice.videoUrl}
                controls
                loop
                className="w-full h-full"
                playsInline
              >
                Votre navigateur ne supporte pas la lecture de vidéos.
              </video>
            ) : (
              <div className="text-center text-gray-400">
                <div className="text-6xl mb-4">🎥</div>
                <p className="text-lg">Vidéo de démonstration</p>
                <p className="text-sm">(À ajouter prochainement)</p>
              </div>
            )}
          </div>
        </div>

        {/* Description du mouvement */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-blue-900 mb-3 flex items-center gap-2">
            <span>📖</span>
            <span>Description du mouvement</span>
          </h2>
          <p className="text-gray-700 leading-relaxed">{exercice.description}</p>
        </div>

        {/* Conseils personnalisés */}
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl shadow-lg p-6 mb-6 border-2 border-orange-200">
          <h2 className="text-xl font-bold text-orange-900 mb-3 flex items-center gap-2">
            <span>💡</span>
            <span>Conseils personnalisés pour vous</span>
          </h2>
          <ul className="space-y-2">
            {exercice.conseilsPersonnalises.map((conseil, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-orange-500 mt-1">✓</span>
                <span className="text-gray-700">{conseil}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Muscles ciblés */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-blue-900 mb-3 flex items-center gap-2">
            <span>💪</span>
            <span>Muscles ciblés</span>
          </h2>
          <div className="flex flex-wrap gap-2">
            {exercice.musclesCibles.map((muscle, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-medium text-sm"
              >
                {muscle}
              </span>
            ))}
          </div>
        </div>

        {/* Précautions / Contre-indications */}
        <div className="bg-red-50 rounded-xl shadow-lg p-6 mb-6 border-2 border-red-200">
          <h2 className="text-xl font-bold text-red-900 mb-3 flex items-center gap-2">
            <span>⚠️</span>
            <span>Précautions importantes</span>
          </h2>
          <ul className="space-y-2">
            {exercice.precautions.map((precaution, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-red-500 mt-1">!</span>
                <span className="text-gray-700">{precaution}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Bouton marquer comme terminé */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          {isCompleted ? (
            <div className="text-center py-4">
              <div className="text-6xl mb-3">✅</div>
              <p className="text-xl font-bold text-green-600">
                Exercice terminé !
              </p>
              <p className="text-gray-600 mt-2">Excellent travail ! 💪</p>
            </div>
          ) : (
            <button
              onClick={handleComplete}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-lg font-bold text-lg shadow-lg hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105 active:scale-95"
            >
              ✓ Marquer comme terminé
            </button>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default ExerciceDetail;
