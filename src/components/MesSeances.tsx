import {useRef, useState} from 'react';
import ExerciceDetail from './ExerciceDetail';

interface Exercise {
  id: number;
  name: string;
  duration: string;
  reps?: string;
  imageUrl: string;
  conseil: string;
  completed: boolean;
}

interface Seance {
  id: number;
  title: string;
  date: string;
  duration: string;
  category: string;
  difficulty: 'Débutant' | 'Intermédiaire' | 'Avancé';
  exercises: Exercise[];
  completed: boolean;
}

// Données enrichies pour l'exercice exemple
const exerciceDetailData = {
  id: 1,
  name: 'Extensions des bras',
  duration: '3 min',
  reps: '3 séries de 10',
  series: '3 séries',
  videoUrl: '', // Laisser vide pour l'instant, tu ajouteras l'URL plus tard
  description: `Asseyez-vous confortablement avec le dos bien droit. Tenez un poids léger dans chaque main (ou sans poids pour commencer). Levez lentement vos bras devant vous jusqu'à hauteur d'épaule, puis redescendez de manière contrôlée. Gardez vos coudes légèrement fléchis tout au long du mouvement.`,
  conseilsPersonnalises: [
    'Commencez sans poids pour maîtriser le mouvement',
    'Si vous êtes en fauteuil roulant, assurez-vous que vos freins sont bien serrés',
    'Respirez : expirez en levant les bras, inspirez en descendant',
    'Arrêtez immédiatement si vous ressentez une douleur',
    'Adaptez l\'amplitude selon votre mobilité'
  ],
  musclesCibles: [
    'Deltoïdes antérieurs',
    'Triceps',
    'Trapèzes',
    'Muscles stabilisateurs du tronc'
  ],
  precautions: [
    'Ne forcez jamais au-delà de votre zone de confort',
    'Évitez cet exercice si vous avez une tendinite d\'épaule non traitée',
    'Gardez toujours le dos droit pour éviter les tensions',
    'En cas de vertige, arrêtez et consultez votre médecin',
    'Hydratez-vous régulièrement pendant l\'exercice'
  ],
  completed: false
};

const MesSeances = () => {
  const [seances, setSeances] = useState<Seance[]>([
    {
      id: 1,
      title: 'Renforcement Haut du Corps',
      date: "Aujourd'hui - 10h00",
      duration: '30 min',
      category: 'Force',
      difficulty: 'Débutant',
      completed: false,
      exercises: [
        {
          id: 1,
          name: 'Échauffement des épaules',
          duration: '5 min',
          imageUrl: '🔄',
          conseil: 'Effectuez des rotations douces, restez assis dans votre fauteuil',
          completed: false,
        },
        {
          id: 2,
          name: 'Extensions des bras',
          duration: '3 min',
          reps: '3 séries de 10',
          imageUrl: '💪',
          conseil: 'Utilisez des poids légers (0.5-1kg) ou sans poids',
          completed: false,
        },
        {
          id: 3,
          name: 'Levées latérales',
          duration: '3 min',
          reps: '3 séries de 8',
          imageUrl: '🏋️',
          conseil: 'Gardez le dos droit, levez les bras à hauteur d\'épaule',
          completed: false,
        },
        {
          id: 4,
          name: 'Rotations du tronc',
          duration: '4 min',
          reps: '3 séries de 12',
          imageUrl: '🌀',
          conseil: 'Mouvement lent et contrôlé, renforcez les abdominaux',
          completed: false,
        },
        {
          id: 5,
          name: 'Étirements doux',
          duration: '5 min',
          imageUrl: '🧘',
          conseil: 'Respirez profondément, maintenez chaque étirement 20 secondes',
          completed: false,
        },
      ],
    },
    {
      id: 2,
      title: 'Cardio Adapté',
      date: 'Demain - 14h30',
      duration: '25 min',
      category: 'Cardio',
      difficulty: 'Débutant',
      completed: false,
      exercises: [
        {
          id: 1,
          name: 'Échauffement articulaire',
          duration: '5 min',
          imageUrl: '🔥',
          conseil: 'Mobilisez doucement toutes les articulations du haut du corps',
          completed: false,
        },
        {
          id: 2,
          name: 'Boxe assise',
          duration: '8 min',
          reps: '4 séries de 1 min',
          imageUrl: '🥊',
          conseil: 'Alternez coups droits et crochets, repos 30s entre séries',
          completed: false,
        },
        {
          id: 3,
          name: 'Moulinets de bras',
          duration: '6 min',
          reps: '3 séries de 30s',
          imageUrl: '🌪️',
          conseil: 'Augmentez progressivement la vitesse',
          completed: false,
        },
        {
          id: 4,
          name: 'Retour au calme',
          duration: '6 min',
          imageUrl: '😌',
          conseil: 'Respirations profondes, détendez-vous',
          completed: false,
        },
      ],
    },
    {
      id: 3,
      title: 'Mobilité et Souplesse',
      date: 'Mercredi - 9h00',
      duration: '20 min',
      category: 'Mobilité',
      difficulty: 'Débutant',
      completed: false,
      exercises: [
        {
          id: 1,
          name: 'Cercles de bras',
          duration: '4 min',
          imageUrl: '⭕',
          conseil: 'Mouvements amples et contrôlés',
          completed: false,
        },
        {
          id: 2,
          name: 'Flexions du tronc',
          duration: '5 min',
          imageUrl: '↔️',
          conseil: 'Penchez-vous doucement sur les côtés',
          completed: false,
        },
        {
          id: 3,
          name: 'Étirements du cou',
          duration: '4 min',
          imageUrl: '👆',
          conseil: 'Inclinez lentement la tête de chaque côté',
          completed: false,
        },
        {
          id: 4,
          name: 'Rotations des poignets',
          duration: '3 min',
          imageUrl: '👐',
          conseil: 'Mouvements circulaires dans les deux sens',
          completed: false,
        },
        {
          id: 5,
          name: 'Respiration guidée',
          duration: '4 min',
          imageUrl: '🫁',
          conseil: 'Inspirez 4 secondes, expirez 6 secondes',
          completed: false,
        },
      ],
    },
    {
      id: 4,
      title: 'Force Progressive',
      date: 'Vendredi - 16h00',
      duration: '35 min',
      category: 'Force',
      difficulty: 'Intermédiaire',
      completed: false,
      exercises: [
        {
          id: 1,
          name: 'Échauffement complet',
          duration: '5 min',
          imageUrl: '🔥',
          conseil: 'Préparez vos muscles et articulations',
          completed: false,
        },
        {
          id: 2,
          name: 'Développé militaire assis',
          duration: '5 min',
          reps: '4 séries de 10',
          imageUrl: '🏋️',
          conseil: 'Poids légers, contrôlez la descente',
          completed: false,
        },
        {
          id: 3,
          name: 'Tirages élastiques',
          duration: '5 min',
          reps: '4 séries de 12',
          imageUrl: '🎯',
          conseil: 'Utilisez un élastique de résistance moyenne',
          completed: false,
        },
        {
          id: 4,
          name: 'Planches adaptées',
          duration: '6 min',
          reps: '3 séries de 30s',
          imageUrl: '⬜',
          conseil: 'Sur les avant-bras, dos droit si possible',
          completed: false,
        },
        {
          id: 5,
          name: 'Curls biceps',
          duration: '4 min',
          reps: '3 séries de 15',
          imageUrl: '💪',
          conseil: 'Mouvement lent, contractez bien le biceps',
          completed: false,
        },
        {
          id: 6,
          name: 'Cool down',
          duration: '10 min',
          imageUrl: '🧊',
          conseil: 'Étirements et relaxation',
          completed: false,
        },
      ],
    },
  ]);

  const [expandedSeance, setExpandedSeance] = useState<number | null>(1);
  const [selectedExercice, setSelectedExercice] = useState<number | null>(null);
  const formTopRef = useRef<HTMLDivElement>(null);

  const difficultyColors = {
    Débutant: 'bg-green-100 text-green-700 border-green-300',
    Intermédiaire: 'bg-orange-100 text-orange-700 border-orange-300',
    Avancé: 'bg-red-100 text-red-700 border-red-300',
  };

  const categoryColors = {
    Force: 'bg-blue-500',
    Cardio: 'bg-orange-500',
    Mobilité: 'bg-purple-500',
  };

  const handleExerciceClick = (exerciceId: number) => {
    // Pour l'instant, on affiche seulement l'exercice ID 2 (Extensions des bras)
    if (exerciceId === 2) {
      setSelectedExercice(exerciceId);
    }
  };

  const handleBackFromDetail = () => {
    setSelectedExercice(null);
  };

  const handleCompleteExercice = () => {
    // Marquer l'exercice comme complété dans la liste
    setSeances(prevSeances =>
      prevSeances.map(seance => ({
        ...seance,
        exercises: seance.exercises.map(ex =>
          ex.id === selectedExercice ? { ...ex, completed: true } : ex
        )
      }))
    );
  };

  // Si un exercice est sélectionné, afficher la vue détaillée
  if (selectedExercice === 2) {
    return (
      <ExerciceDetail
        exercice={exerciceDetailData}
        onBack={handleBackFromDetail}
        onComplete={handleCompleteExercice}
      />
    );
  }

  return (
    <div ref={formTopRef} className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50 py-8 px-4 pb-24">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
            <div className="flex items-center gap-10">
                <img
                    src="/logo_ImpulseCap.jpg"
                    alt="ImpulseCap Logo"
                    className="top-4 left-4 h-16 object-contain z-50 drop-shadow-lg"
                />
            <h1 className="text-4xl font-bold text-blue-900 mb-2">Mes Séances</h1>
            </div>
          <p className="text-gray-600 mt-6">
            Programme personnalisé adapté à votre profil
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white rounded-lg p-4 shadow-md text-center">
            <div className="text-3xl font-bold text-blue-600">3</div>
            <div className="text-xs text-gray-600 mt-1">séances/semaine</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-md text-center">
            <div className="text-3xl font-bold text-orange-600">28</div>
            <div className="text-xs text-gray-600 mt-1">min/séance</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-md text-center">
            <div className="text-3xl font-bold text-green-600">12</div>
            <div className="text-xs text-gray-600 mt-1">séances faites</div>
          </div>
        </div>

        {/* Séances List */}
        <div className="space-y-4">
          {seances.map((seance) => (
            <div
              key={seance.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              {/* Header */}
              <div
                onClick={() =>
                  setExpandedSeance(
                    expandedSeance === seance.id ? null : seance.id
                  )
                }
                className="p-4 cursor-pointer hover:bg-gray-50 transition"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          categoryColors[seance.category as keyof typeof categoryColors]
                        }`}
                      />
                      <h3 className="font-bold text-lg text-gray-800">
                        {seance.title}
                      </h3>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600 mb-2">
                      <span className="flex items-center gap-1">
                        📅 {seance.date}
                      </span>
                      <span className="flex items-center gap-1">
                        ⏱️ {seance.duration}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs px-2 py-1 rounded-full border ${
                          difficultyColors[seance.difficulty]
                        }`}
                      >
                        {seance.difficulty}
                      </span>
                      <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                        {seance.category}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-orange-500 text-white rounded-lg font-medium text-sm hover:from-blue-700 hover:to-orange-600 transition">
                      Démarrer
                    </button>
                    <span
                      className={`text-xl transition-transform ${
                        expandedSeance === seance.id ? 'rotate-180' : ''
                      }`}
                    >
                      ▼
                    </span>
                  </div>
                </div>
              </div>

              {/* Exercises Details */}
              {expandedSeance === seance.id && (
                <div className="border-t border-gray-200 bg-gray-50">
                  <div className="p-4 space-y-3">
                    <h4 className="font-semibold text-gray-800 mb-3">
                      Exercices ({seance.exercises.length})
                    </h4>
                    {seance.exercises.map((exercise, index) => (
                      <div
                        key={exercise.id}
                        onClick={() => handleExerciceClick(exercise.id)}
                        className="bg-white rounded-lg p-4 shadow-sm cursor-pointer hover:shadow-md hover:scale-[1.02] transition-all"
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-orange-100 rounded-full flex items-center justify-center text-2xl">
                              {exercise.imageUrl}
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm font-bold text-gray-400">
                                #{index + 1}
                              </span>
                              <h5 className="font-semibold text-gray-800">
                                {exercise.name}
                              </h5>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-600 mb-2">
                              <span>⏱️ {exercise.duration}</span>
                              {exercise.reps && <span>🔢 {exercise.reps}</span>}
                            </div>
                            <div className="bg-blue-50 border-l-4 border-blue-500 p-2 rounded">
                              <p className="text-xs text-gray-700">
                                💡 <span className="font-medium">Conseil :</span>{' '}
                                {exercise.conseil}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Prochaine séance suggestion */}
        <div className="mt-6 bg-gradient-to-r from-blue-600 to-orange-500 rounded-lg p-6 text-white shadow-lg">
          <h3 className="text-xl font-bold mb-2">🎯 Prochaine séance recommandée</h3>
          <p className="text-blue-50 mb-4">
            Basé sur votre profil et votre historique, nous vous recommandons de
            commencer par "Renforcement Haut du Corps"
          </p>
          <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-bold hover:bg-blue-50 transition">
            Démarrer maintenant
          </button>
        </div>
      </div>
    </div>
  );
};

export default MesSeances;
