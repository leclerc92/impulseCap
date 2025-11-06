import {useEffect, useRef, useState} from 'react';
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
  id: 2,
  name: 'Extensions des bras',
  duration: '3 min',
  reps: '3 séries de 10',
  series: '3 séries',
  videoUrl: 'public/video.mp4', // Laisser vide pour l'instant, tu ajouteras l'URL plus tard
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
  completed: false,
  hasVariants: false
};

// Données pour montées sur pointes (débutant)
const monteesPointesDebutantData = {
  id: 10,
  name: 'Montées sur pointes (Débutant)',
  duration: '4 min',
  reps: '3 séries de 10',
  series: '3 séries',
  videoUrl: '',
  description: `Tenez-vous debout face à un mur ou un support stable (table, chaise). Placez vos mains sur le support pour maintenir l'équilibre. Montez doucement sur la pointe des deux pieds en même temps, en contractant les mollets. Maintenez la position 2 secondes, puis redescendez lentement. Gardez les genoux légèrement fléchis, surtout le genou droit.`,
  conseilsPersonnalises: [
    'Utilisez votre canne ou un support solide pour l\'équilibre',
    'Version débutant : montez sur les deux pieds en même temps',
    'Ne montez pas trop haut au début, l\'amplitude viendra progressivement',
    'Protégez votre genou droit en évitant de le verrouiller',
    'Si vous ressentez une douleur au genou, arrêtez l\'exercice'
  ],
  musclesCibles: [
    'Gastrocnémiens (mollets)',
    'Soléaires',
    'Muscles stabilisateurs de la cheville',
    'Muscles profonds du pied'
  ],
  precautions: [
    'Attention à votre arthrose du genou droit - ne forcez jamais',
    'Assurez-vous d\'avoir un support stable à portée de main',
    'Arrêtez si vous ressentez une douleur au genou ou à la cheville',
    'Évitez cet exercice si vous avez des vertiges',
    'Progression : une fois à l\'aise, passez à la version confirmée (un pied)'
  ],
  completed: false,
  hasVariants: true,
  variantId: 11 // ID de la version confirmée
};

// Données pour montées sur pointes (confirmé)
const monteesPointesConfirmeData = {
  id: 11,
  name: 'Montées sur pointes (Confirmé)',
  duration: '5 min',
  reps: '3 séries de 8 par pied',
  series: '3 séries',
  videoUrl: '',
  description: `Version avancée : Tenez-vous debout avec un support proche. Levez un pied du sol (genou fléchi). Montez sur la pointe du pied d'appui, maintenez 2 secondes, puis redescendez lentement. Alternez les pieds entre chaque série. Commencez par le pied gauche (non douloureux) pour prendre confiance.`,
  conseilsPersonnalises: [
    'Niveau confirmé : un pied à la fois',
    'Commencez par le pied gauche pour vous habituer',
    'Soyez très progressif avec le pied droit (genou arthrosique)',
    'Gardez le support à portée de main pour l\'équilibre',
    'Si trop difficile, revenez à la version débutant (deux pieds)'
  ],
  musclesCibles: [
    'Gastrocnémiens',
    'Soléaires',
    'Stabilisateurs de cheville',
    'Proprioception et équilibre'
  ],
  precautions: [
    'Exercice avancé - ne le tentez que si la version débutant est maîtrisée',
    'Doublez la prudence avec le pied droit à cause de l\'arthrose du genou',
    'Arrêtez immédiatement en cas de douleur',
    'Progression très graduelle recommandée',
    'Consultez votre kinésithérapeute avant de passer à cette version'
  ],
  completed: false,
  hasVariants: true,
  variantId: 10 // ID de la version débutant
};

// Données pour squats avec chaise (débutant)
const squatsAvecChaiseData = {
  id: 12,
  name: 'Squats avec chaise (Débutant)',
  duration: '5 min',
  reps: '3 séries de 8',
  series: '3 séries',
  videoUrl: '',
  description: `Placez une chaise solide derrière vous. Tenez-vous debout, pieds écartés largeur d'épaules, face à un support si nécessaire. Descendez lentement en pliant les genoux comme pour vous asseoir, jusqu'à toucher légèrement la chaise avec vos fesses. Ne vous asseyez pas complètement. Remontez ensuite en poussant sur vos talons. Gardez le dos droit et les genoux alignés avec les pieds.`,
  conseilsPersonnalises: [
    'Version débutant : la chaise est là pour vous rassurer et limiter la descente',
    'Touchez simplement la chaise, ne vous asseyez pas',
    'Utilisez votre canne ou un support devant vous pour l\'équilibre',
    'Ne descendez pas trop bas pour protéger votre genou droit',
    'Poussez davantage sur la jambe gauche si le genou droit est sensible'
  ],
  musclesCibles: [
    'Quadriceps',
    'Fessiers (grands et moyens)',
    'Ischio-jambiers',
    'Muscles stabilisateurs du tronc'
  ],
  precautions: [
    'Évitez de descendre en dessous de 90° au niveau des genoux',
    'Attention particulière au genou droit - arrêtez si douleur',
    'Ne laissez jamais les genoux dépasser les orteils',
    'Gardez toujours le poids sur les talons, pas sur les orteils',
    'Si trop difficile, contentez-vous de mini-flexions'
  ],
  completed: false,
  hasVariants: true,
  variantId: 13 // ID de la version confirmée
};

// Données pour squats sans chaise (confirmé)
const squatsSansChaiseData = {
  id: 13,
  name: 'Squats sans chaise (Confirmé)',
  duration: '6 min',
  reps: '3 séries de 10',
  series: '3 séries',
  videoUrl: '',
  description: `Version avancée sans chaise. Pieds écartés largeur d'épaules, descendez en pliant les genoux et en poussant les fesses vers l'arrière comme pour vous asseoir. Descendez jusqu'à ce que vos cuisses soient parallèles au sol (ou moins bas selon votre confort). Remontez en poussant sur les talons. Gardez le dos droit, la poitrine ouverte et les abdominaux contractés.`,
  conseilsPersonnalises: [
    'Niveau confirmé : sans support arrière',
    'Contrôlez bien la descente, pas de mouvement brusque',
    'Gardez un support à portée de main pour l\'équilibre si nécessaire',
    'Adaptez l\'amplitude selon votre genou droit',
    'Si trop difficile, revenez à la version avec chaise'
  ],
  musclesCibles: [
    'Quadriceps (vaste médial, latéral, intermédiaire)',
    'Grands fessiers',
    'Ischio-jambiers',
    'Core (abdominaux et lombaires)'
  ],
  precautions: [
    'Exercice avancé - maîtrisez d\'abord la version avec chaise',
    'Votre genou droit peut limiter l\'amplitude - c\'est normal',
    'Ne forcez jamais si vous ressentez une douleur',
    'Maintenez toujours les genoux alignés avec les pieds',
    'Consultez votre kinésithérapeute pour validation'
  ],
  completed: false,
  hasVariants: true,
  variantId: 12 // ID de la version débutant
};

// Données pour fentes statiques (débutant)
const fentesStatiquesData = {
  id: 14,
  name: 'Fentes statiques (Débutant)',
  duration: '5 min',
  reps: '3 séries de 6 par jambe',
  series: '3 séries',
  videoUrl: '',
  description: `Tenez-vous debout près d\'un mur ou d\'un support. Avancez un pied devant vous (environ 60-80 cm). Gardez cette position fixe. Fléchissez les deux genoux en descendant le corps verticalement, jusqu\'à ce que le genou arrière s\'approche du sol (sans le toucher). Remontez en poussant sur le talon avant. Les pieds ne bougent pas pendant toute la série. Puis changez de jambe.`,
  conseilsPersonnalises: [
    'Version débutant : position statique, pas de déplacement',
    'Tenez-vous à un mur ou une chaise pour l\'équilibre',
    'Commencez par la jambe gauche devant (genou sain)',
    'Amplitude réduite si le genou droit est devant',
    'Si trop difficile, contentez-vous de petites flexions'
  ],
  musclesCibles: [
    'Quadriceps (jambe avant)',
    'Fessiers',
    'Ischio-jambiers',
    'Stabilisateurs de hanche et genou'
  ],
  precautions: [
    'Le genou avant ne doit jamais dépasser les orteils',
    'Attention au genou droit - commencez toujours par le gauche',
    'Gardez le buste droit, ne vous penchez pas en avant',
    'Arrêtez si vous ressentez une douleur au genou ou à la hanche',
    'Support obligatoire pour la sécurité'
  ],
  completed: false,
  hasVariants: true,
  variantId: 15 // ID de la version confirmée
};

// Données pour fentes dynamiques (confirmé)
const fentesDynamiquesData = {
  id: 15,
  name: 'Fentes dynamiques (Confirmé)',
  duration: '6 min',
  reps: '3 séries de 8 par jambe',
  series: '3 séries',
  videoUrl: '',
  description: `Version avancée en mouvement. Debout, pieds joints. Faites un grand pas en avant avec un pied, fléchissez les deux genoux jusqu\'à ce que le genou arrière s\'approche du sol. Poussez sur le talon avant pour revenir à la position de départ. Alternez les jambes à chaque répétition. Mouvement fluide et contrôlé.`,
  conseilsPersonnalises: [
    'Niveau confirmé : fentes en mouvement',
    'Commencez avec de petits pas si vous n\'êtes pas à l\'aise',
    'Privilégiez la jambe gauche si le genou droit est sensible',
    'Gardez un support à proximité en cas de déséquilibre',
    'Si trop difficile, revenez à la version statique'
  ],
  musclesCibles: [
    'Quadriceps',
    'Grands fessiers',
    'Ischio-jambiers',
    'Coordination et équilibre dynamique'
  ],
  precautions: [
    'Exercice avancé nécessitant un bon équilibre',
    'Ne tentez cet exercice que si les fentes statiques sont maîtrisées',
    'Votre arthrose du genou droit peut limiter l\'amplitude',
    'Assurez-vous d\'avoir de l\'espace dégagé autour de vous',
    'Validez avec votre kinésithérapeute avant de commencer'
  ],
  completed: false,
  hasVariants: true,
  variantId: 14 // ID de la version débutant
};

const MesSeances = () => {
  const [seances, setSeances] = useState<Seance[]>([
    {
      id: 1,
      title: 'Renforcement Bras & Épaules',
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
          conseil: 'Effectuez des rotations douces, restez en position stable avec support si nécessaire',
          completed: false,
        },
        {
          id: 2,
          name: 'Extensions des bras',
          duration: '3 min',
          reps: '3 séries de 10',
          imageUrl: '💪',
          conseil: 'Utilisez des poids légers (0.5-1kg) ou sans poids. Adapté à votre bonne force de préhension',
          completed: false,
        },
        {
          id: 3,
          name: 'Levées latérales',
          duration: '3 min',
          reps: '3 séries de 8',
          imageUrl: '🏋️',
          conseil: 'Gardez le dos droit, levez les bras à hauteur d\'épaule. Adaptez l\'amplitude selon votre confort',
          completed: false,
        },
        {
          id: 4,
          name: 'Rotations du tronc assis',
          duration: '4 min',
          reps: '3 séries de 12',
          imageUrl: '🌀',
          conseil: 'Mouvement lent et contrôlé, idéal pour renforcer le tronc',
          completed: false,
        },
        {
          id: 5,
          name: 'Étirements doux épaules et bras',
          duration: '5 min',
          imageUrl: '🧘',
          conseil: 'Respirez profondément, maintenez chaque étirement 20 secondes',
          completed: false,
        },
      ],
    },
    {
      id: 2,
      title: 'Renforcement Membres Inférieurs',
      date: 'Demain - 14h30',
      duration: '30 min',
      category: 'Force',
      difficulty: 'Débutant',
      completed: false,
      exercises: [
        {
          id: 1,
          name: 'Échauffement des jambes',
          duration: '5 min',
          imageUrl: '🔥',
          conseil: 'Mobilisez doucement les chevilles et genoux. Utilisez votre canne pour le support',
          completed: false,
        },
        {
          id: 10,
          name: 'Montées sur pointes (Débutant)',
          duration: '4 min',
          reps: '3 séries de 10',
          imageUrl: '�',
          conseil: 'Débutant: Montez sur les pointes avec les deux pieds en même temps. Tenez-vous à un support stable. Attention au genou droit',
          completed: false,
        },
        {
          id: 12,
          name: 'Squats avec chaise (Débutant)',
          duration: '5 min',
          reps: '3 séries de 8',
          imageUrl: '🪑',
          conseil: 'Débutant: Placez une chaise derrière vous, descendez jusqu\'à la toucher puis remontez. Protégez votre genou droit',
          completed: false,
        },
        {
          id: 14,
          name: 'Fentes statiques (Débutant)',
          duration: '5 min',
          reps: '3 séries de 6 par jambe',
          imageUrl: '🦵',
          conseil: 'Débutant: Position fixe, fléchissez les jambes sans bouger les pieds. Support recommandé. Évitez de forcer sur le genou droit',
          completed: false,
        },
        {
          id: 5,
          name: 'Renforcement mollets assis',
          duration: '4 min',
          reps: '3 séries de 15',
          imageUrl: '�',
          conseil: 'Assis, soulevez les talons du sol. Exercice doux pour les mollets',
          completed: false,
        },
        {
          id: 6,
          name: 'Étirements des jambes',
          duration: '7 min',
          imageUrl: '�',
          conseil: 'Étirez doucement les mollets, cuisses et hanches. Évitez les tensions au genou droit',
          completed: false,
        },
      ],
    },
    {
      id: 3,
      title: 'Tronc & Stabilité',
      date: 'Mercredi - 9h00',
      duration: '25 min',
      category: 'Force',
      difficulty: 'Débutant',
      completed: false,
      exercises: [
        {
          id: 1,
          name: 'Échauffement du tronc',
          duration: '4 min',
          imageUrl: '�',
          conseil: 'Mouvements doux de rotation et flexion du buste',
          completed: false,
        },
        {
          id: 2,
          name: 'Flexions latérales du tronc',
          duration: '5 min',
          reps: '3 séries de 10',
          imageUrl: '↔️',
          conseil: 'Penchez-vous doucement sur les côtés, maintenez votre stabilité assise',
          completed: false,
        },
        {
          id: 3,
          name: 'Rotations du tronc',
          duration: '5 min',
          reps: '3 séries de 12',
          imageUrl: '�',
          conseil: 'Tournez le buste de gauche à droite, travaillez les abdominaux obliques',
          completed: false,
        },
        {
          id: 4,
          name: 'Gainage adapté',
          duration: '4 min',
          reps: '3 séries de 20s',
          imageUrl: '⬜',
          conseil: 'Position assise, contractez les abdominaux et maintenez le dos droit',
          completed: false,
        },
        {
          id: 5,
          name: 'Étirements du dos',
          duration: '7 min',
          imageUrl: '�',
          conseil: 'Respirations profondes, relâchez les tensions du dos et tronc',
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
    // Afficher les exercices détaillés disponibles
    const availableExercices = [2, 10, 11, 12, 13, 14, 15];
    if (availableExercices.includes(exerciceId)) {
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

  // Scroll vers le haut à l'ouverture de la page
  useEffect(() => {
    formTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []); // Tableau vide = exécution uniquement au montage du composant

  // Sélectionner les données de l'exercice en fonction de l'ID
  const getExerciceData = () => {
    switch(selectedExercice) {
      case 2: return exerciceDetailData;
      case 10: return monteesPointesDebutantData;
      case 11: return monteesPointesConfirmeData;
      case 12: return squatsAvecChaiseData;
      case 13: return squatsSansChaiseData;
      case 14: return fentesStatiquesData;
      case 15: return fentesDynamiquesData;
      default: return null;
    }
  };

  // Fonction pour changer de variante (débutant <-> confirmé)
  const handleSwitchVariant = (variantId: number) => {
    setSelectedExercice(variantId);
  };

  // Si un exercice est sélectionné, afficher la vue détaillée
  const exerciceData = getExerciceData();
  if (selectedExercice && exerciceData) {
    return (
      <ExerciceDetail
        exercice={exerciceData}
        onBack={handleBackFromDetail}
        onComplete={handleCompleteExercice}
        onSwitchVariant={handleSwitchVariant}
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
            <div className="text-3xl font-bold text-orange-600">30</div>
            <div className="text-xs text-gray-600 mt-1">min/séance</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-md text-center">
            <div className="text-3xl font-bold text-green-600">8</div>
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
            Basé sur votre profil (arthrose genou droit, priorité Bras/Tronc/Épaules), 
            nous vous recommandons de commencer par "Renforcement Bras & Épaules"
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
