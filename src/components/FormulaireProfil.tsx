import { useState, useRef, useEffect } from 'react';

// Types pour les données du formulaire
interface FormulaireData {
  // Phase 1: Informations générales
  age: string;
  genre: string;
  taille: string;
  poids: string;
  niveauActivite: string;
  categorieHandicap: string;
  diagnostic: string;

  // Phase 2: Évaluation fonctionnelle
  fauteuilRoulant: string;
  aidesMarche: string[];
  equilibre: string;

  // Limitations motrices
  fonctionMembresSupérieurs: {
    forcePrehension: string;
    amplitudeMouvement: string;
    zoneDouleur: string;
  };
  fonctionMembresInférieurs: {
    supportPoids: string;
    capaciteEscaliers: string;
    zoneDouleur: string;
  };
  maintieBuste: string;

  // Conditions médicales
  douleurActuelle: string;
  problemesCardio: string;

  // Phase 3: Objectifs
  partiesCorpsPriorite: string[];
  dureeSouhaitee: string;
  frequenceSouhaitee: string;
}

interface FormulaireProfilProps {
  onProgramSubmit: () => void;
}

const FormulaireProfil = ({ onProgramSubmit }: FormulaireProfilProps) => {
  const [phase, setPhase] = useState(1);
  const formTopRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState<FormulaireData>({
    age: '62',
    genre: 'femme',
    taille: '160',
    poids: '61',
    niveauActivite: 'Faible',
    categorieHandicap: 'Moteur',
    diagnostic: 'Arthrose genou droit',
    fauteuilRoulant: 'non',
    aidesMarche: ['Cannes'],
    equilibre: 'stable-avec-support',
    fonctionMembresSupérieurs: {
      forcePrehension: 'bonne',
      amplitudeMouvement: 'totale',
      zoneDouleur: '',
    },
    fonctionMembresInférieurs: {
      supportPoids: 'partiel',
      capaciteEscaliers: 'avec-aide',
      zoneDouleur: 'Genou droit',
    },
    maintieBuste: 'tient-assis',
    douleurActuelle: '3',
    problemesCardio: 'non',
    partiesCorpsPriorite: ['Bras', 'Tronc', 'Épaules'],
    dureeSouhaitee: '30 min',
    frequenceSouhaitee: '3',
  });

  const [showCardioWarning, setShowCardioWarning] = useState(false);

  // Scroller vers le haut à chaque changement de phase
  useEffect(() => {
    formTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [phase]);

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNestedChange = (parent: string, field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...(prev[parent as keyof FormulaireData] as any),
        [field]: value,
      },
    }));
  };

  const handleArrayToggle = (field: string, value: string) => {
    setFormData((prev) => {
      const currentArray = prev[field as keyof FormulaireData] as string[];
      const newArray = currentArray.includes(value)
        ? currentArray.filter((item) => item !== value)
        : [...currentArray, value];
      return {
        ...prev,
        [field]: newArray,
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Empêcher la soumission par défaut du formulaire (ex: appui sur Entrée)
  };

  const nextPhase = () => {
    if (phase < 3) setPhase(phase + 1);
  };

  const prevPhase = () => {
    if (phase > 1) setPhase(phase - 1);
  };

  // Logique conditionnelle pour afficher les questions selon le handicap
  const shouldShowMotorDetails = () => {
    return formData.categorieHandicap === 'Moteur';
  };

  const isAmputation = () => {
    return formData.diagnostic.toLowerCase().includes('amputation');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50 py-12 px-4 pb-24">
      <div ref={formTopRef} className="max-w-4xl mx-auto">
        {/* En-tête */}
        <div className="text-center mb-8">
            <div className="flex items-center gap-10">
            <img
                src="/logo_ImpulseCap.jpg"
                alt="ImpulseCap Logo"
                className="top-4 left-4 h-16 object-contain z-50 drop-shadow-lg"
            />
          <h1 className="text-4xl font-bold text-blue-900 mb-2">
            Votre Profil Personnalisé
          </h1>
            </div>

            <p className="text-gray-600 mt-6">
            Créez un programme d'exercices adapté à vos besoins
          </p>
        </div>

        {/* Indicateur de phase */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            {[1, 2, 3].map((num) => (
              <div key={num} className="flex-1">
                <div className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      phase >= num
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-300 text-gray-600'
                    }`}
                  >
                    {num}
                  </div>
                  {num < 3 && (
                    <div
                      className={`flex-1 h-1 mx-2 ${
                        phase > num ? 'bg-orange-500' : 'bg-gray-300'
                      }`}
                    />
                  )}
                </div>
                <div className="text-sm text-center mt-2 font-medium text-gray-700">
                  {num === 1 && 'Identification'}
                  {num === 2 && 'Évaluation'}
                  {num === 3 && 'Objectifs'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-xl p-8">
          {/* PHASE 1: IDENTIFICATION PRIMAIRE */}
          {phase === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-blue-900 mb-6 border-b-2 border-orange-500 pb-2">
                Phase 1: Identification Primaire
              </h2>

              {/* Informations générales */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-blue-800">
                  Informations Générales
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Âge *
                    </label>
                    <input
                      type="number"
                      min="18"
                      max="99"
                      value={formData.age}
                      onChange={(e) => handleChange('age', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sexe/Genre *
                    </label>
                    <select
                      value={formData.genre}
                      onChange={(e) => handleChange('genre', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      required
                    >
                      <option value="">Sélectionner</option>
                      <option value="homme">Homme</option>
                      <option value="femme">Femme</option>
                      <option value="non-binaire">Non-binaire</option>
                      <option value="autre">Préfère ne pas répondre</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Taille (cm) *
                    </label>
                    <input
                      type="number"
                      value={formData.taille}
                      onChange={(e) => handleChange('taille', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Poids (kg) *
                    </label>
                    <input
                      type="number"
                      value={formData.poids}
                      onChange={(e) => handleChange('poids', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Niveau d'activité physique actuel *
                  </label>
                  <div className="grid grid-cols-4 gap-3">
                    {['Sédentaire', 'Faible', 'Modéré', 'Actif'].map((niveau) => (
                      <label
                        key={niveau}
                        className={`flex text-sm tems-center justify-center px-4 py-3 border-2 rounded-lg cursor-pointer transition ${
                          formData.niveauActivite === niveau
                            ? 'border-orange-500 bg-orange-50 text-orange-700'
                            : 'border-gray-300 hover:border-orange-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="niveauActivite"
                          value={niveau}
                          checked={formData.niveauActivite === niveau}
                          onChange={(e) =>
                            handleChange('niveauActivite', e.target.value)
                          }
                          className="sr-only"
                          required
                        />
                        <span className="font-medium">{niveau}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Identification du handicap */}
              <div className="space-y-4 mt-8">
                <h3 className="text-xl font-semibold text-blue-800">
                  Identification du Handicap
                </h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Catégorie de Handicap Principal *
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {['Moteur', 'Sensoriel'].map((categorie) => (
                      <label
                        key={categorie}
                        className={`flex items-center justify-center px-6 py-4 border-2 rounded-lg cursor-pointer transition ${
                          formData.categorieHandicap === categorie
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-300 hover:border-blue-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="categorieHandicap"
                          value={categorie}
                          checked={formData.categorieHandicap === categorie}
                          onChange={(e) =>
                            handleChange('categorieHandicap', e.target.value)
                          }
                          className="sr-only"
                          required
                        />
                        <span className="font-medium capitalize">{categorie}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Diagnostic / Précision *
                  </label>
                  <textarea
                    value={formData.diagnostic}
                    onChange={(e) => handleChange('diagnostic', e.target.value)}
                    placeholder="Ex: Amputation du membre inférieur, Paraplégie, Cécité, etc."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={3}
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {/* PHASE 2: ÉVALUATION FONCTIONNELLE */}
          {phase === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-blue-900 mb-6 border-b-2 border-orange-500 pb-2">
                Phase 2: Évaluation Fonctionnelle et Sécurité
              </h2>

              {/* Assistance et Mobilité */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-blue-800">
                  Assistance et Mobilité
                </h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Utilisez-vous un fauteuil roulant ? *
                  </label>
                  <div className="flex gap-4">
                    {['oui', 'non'].map((option) => (
                      <label
                        key={option}
                        className={`flex-1 flex items-center justify-center px-4 py-2 border-2 rounded-lg cursor-pointer transition ${
                          formData.fauteuilRoulant === option
                            ? 'border-orange-500 bg-orange-50'
                            : 'border-gray-300 hover:border-orange-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="fauteuilRoulant"
                          value={option}
                          checked={formData.fauteuilRoulant === option}
                          onChange={(e) =>
                            handleChange('fauteuilRoulant', e.target.value)
                          }
                          className="sr-only"
                          required
                        />
                        <span className="capitalize">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Utilisez-vous d'autres aides à la marche ?
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {['Cannes', 'Béquilles', 'Déambulateur', 'Orthèse/Prothèse'].map(
                      (aide) => (
                        <label
                          key={aide}
                          className={`flex items-center px-4 py-2 border-2 rounded-lg cursor-pointer transition ${
                            formData.aidesMarche.includes(aide)
                              ? 'border-orange-500 bg-orange-50'
                              : 'border-gray-300 hover:border-orange-300'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={formData.aidesMarche.includes(aide)}
                            onChange={() => handleArrayToggle('aidesMarche', aide)}
                            className="mr-2"
                          />
                          <span>{aide}</span>
                        </label>
                      )
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Capacité d'équilibre (assis ou debout) *
                  </label>
                  <select
                    value={formData.equilibre}
                    onChange={(e) => handleChange('equilibre', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                  >
                    <option value="">Sélectionner</option>
                    <option value="tres-stable">Très stable</option>
                    <option value="stable-avec-support">Stable avec support</option>
                    <option value="instable">Instable</option>
                    <option value="ne-peut-pas">Ne peut pas se maintenir</option>
                  </select>
                </div>
              </div>

              {/* Limitations Motrices Spécifiques */}
              {shouldShowMotorDetails() && !isAmputation() && (
                <div className="space-y-4 mt-8">
                  <h3 className="text-xl font-semibold text-blue-800">
                    Limitations Motrices Spécifiques
                  </h3>

                  {/* Membres Supérieurs */}
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-3">
                      Membres Supérieurs (Bras, Épaules)
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Force de préhension
                        </label>
                        <select
                          value={formData.fonctionMembresSupérieurs.forcePrehension}
                          onChange={(e) =>
                            handleNestedChange(
                              'fonctionMembresSupérieurs',
                              'forcePrehension',
                              e.target.value
                            )
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Sélectionner</option>
                          <option value="faible">Faible</option>
                          <option value="moderee">Modérée</option>
                          <option value="bonne">Bonne</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Amplitude du mouvement
                        </label>
                        <select
                          value={
                            formData.fonctionMembresSupérieurs.amplitudeMouvement
                          }
                          onChange={(e) =>
                            handleNestedChange(
                              'fonctionMembresSupérieurs',
                              'amplitudeMouvement',
                              e.target.value
                            )
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Sélectionner</option>
                          <option value="reduite">Réduite</option>
                          <option value="partielle">Partielle</option>
                          <option value="totale">Totale</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Zone de douleur
                        </label>
                        <input
                          type="text"
                          value={formData.fonctionMembresSupérieurs.zoneDouleur}
                          onChange={(e) =>
                            handleNestedChange(
                              'fonctionMembresSupérieurs',
                              'zoneDouleur',
                              e.target.value
                            )
                          }
                          placeholder="Ex: Épaule droite, poignet gauche"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Membres Inférieurs */}
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-orange-900 mb-3">
                      Membres Inférieurs (Jambes, Hanches)
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Capacité à supporter le poids
                        </label>
                        <select
                          value={formData.fonctionMembresInférieurs.supportPoids}
                          onChange={(e) =>
                            handleNestedChange(
                              'fonctionMembresInférieurs',
                              'supportPoids',
                              e.target.value
                            )
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        >
                          <option value="">Sélectionner</option>
                          <option value="aucun">Aucun</option>
                          <option value="partiel">Partiel</option>
                          <option value="total">Total</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Capacité à monter les escaliers
                        </label>
                        <select
                          value={
                            formData.fonctionMembresInférieurs.capaciteEscaliers
                          }
                          onChange={(e) =>
                            handleNestedChange(
                              'fonctionMembresInférieurs',
                              'capaciteEscaliers',
                              e.target.value
                            )
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        >
                          <option value="">Sélectionner</option>
                          <option value="impossible">Impossible</option>
                          <option value="avec-aide">Avec aide</option>
                          <option value="facilement">Facilement</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Zone de douleur
                        </label>
                        <input
                          type="text"
                          value={formData.fonctionMembresInférieurs.zoneDouleur}
                          onChange={(e) =>
                            handleNestedChange(
                              'fonctionMembresInférieurs',
                              'zoneDouleur',
                              e.target.value
                            )
                          }
                          placeholder="Ex: Genou droit, hanche gauche"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tronc et Stabilité */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Capacité de maintien du buste *
                </label>
                <select
                  value={formData.maintieBuste}
                  onChange={(e) => handleChange('maintieBuste', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                >
                  <option value="">Sélectionner</option>
                  <option value="necessite-support">Nécessite support</option>
                  <option value="tient-assis">Tient assis</option>
                  <option value="tient-debout">Tient debout sans support</option>
                </select>
              </div>

              {/* Conditions Médicales */}
              <div className="space-y-4 mt-8">
                <h3 className="text-xl font-semibold text-blue-800">
                  Conditions Médicales et Contre-indications
                </h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Douleur actuelle (0 = aucune, 10 = maximale) *
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="0"
                      max="10"
                      value={formData.douleurActuelle}
                      onChange={(e) =>
                        handleChange('douleurActuelle', e.target.value)
                      }
                      className="flex-1"
                    />
                    <span className="text-2xl font-bold text-orange-600 min-w-[3rem] text-center">
                      {formData.douleurActuelle}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Problèmes cardiovasculaires *
                  </label>
                  <div className="flex gap-4">
                    {['oui', 'non'].map((option) => (
                      <label
                        key={option}
                        className={`flex-1 flex items-center justify-center px-4 py-2 border-2 rounded-lg cursor-pointer transition ${
                          formData.problemesCardio === option
                            ? 'border-orange-500 bg-orange-50'
                            : 'border-gray-300 hover:border-orange-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="problemesCardio"
                          value={option}
                          checked={formData.problemesCardio === option}
                          onChange={(e) => {
                            handleChange('problemesCardio', e.target.value);
                            setShowCardioWarning(e.target.value === 'oui');
                          }}
                          className="sr-only"
                          required
                        />
                        <span className="capitalize">{option}</span>
                      </label>
                    ))}
                  </div>
                  {showCardioWarning && (
                    <div className="mt-3 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
                      <p className="font-semibold">⚠️ Attention</p>
                      <p className="text-sm mt-1">
                        Veuillez obtenir l'accord de votre médecin avant de
                        continuer.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* PHASE 3: OBJECTIFS ET VALIDATION */}
          {phase === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-blue-900 mb-6 border-b-2 border-orange-500 pb-2">
                Phase 3: Objectifs et Préférences
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Parties du corps à prioriser *
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {['Bras', 'Dos', 'Cuisses', 'Tronc', 'Épaules', 'Mollets'].map(
                      (partie) => (
                        <label
                          key={partie}
                          className={`flex items-center px-4 py-3 border-2 rounded-lg cursor-pointer transition ${
                            formData.partiesCorpsPriorite.includes(partie)
                              ? 'border-blue-500 bg-blue-50 text-blue-700'
                              : 'border-gray-300 hover:border-blue-300'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={formData.partiesCorpsPriorite.includes(partie)}
                            onChange={() =>
                              handleArrayToggle('partiesCorpsPriorite', partie)
                            }
                            className="mr-2"
                          />
                          <span className="font-medium">{partie}</span>
                        </label>
                      )
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Durée moyenne de séance souhaitée *
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {['<15 min', '30 min', '>45 min'].map((duree) => (
                      <label
                        key={duree}
                        className={`flex items-center justify-center px-4 py-3 border-2 rounded-lg cursor-pointer transition ${
                          formData.dureeSouhaitee === duree
                            ? 'border-orange-500 bg-orange-50 text-orange-700'
                            : 'border-gray-300 hover:border-orange-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="dureeSouhaitee"
                          value={duree}
                          checked={formData.dureeSouhaitee === duree}
                          onChange={(e) =>
                            handleChange('dureeSouhaitee', e.target.value)
                          }
                          className="sr-only"
                          required
                        />
                        <span className="font-medium">{duree}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fréquence souhaitée (fois par semaine) *
                  </label>
                  <div className="grid grid-cols-4 gap-3">
                    {['2', '3', '4', '5+'].map((freq) => (
                      <label
                        key={freq}
                        className={`flex items-center justify-center px-4 py-3 border-2 rounded-lg cursor-pointer transition ${
                          formData.frequenceSouhaitee === freq
                            ? 'border-orange-500 bg-orange-50 text-orange-700'
                            : 'border-gray-300 hover:border-orange-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="frequenceSouhaitee"
                          value={freq}
                          checked={formData.frequenceSouhaitee === freq}
                          onChange={(e) =>
                            handleChange('frequenceSouhaitee', e.target.value)
                          }
                          className="sr-only"
                          required
                        />
                        <span className="font-medium">{freq}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Résumé */}
              <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-orange-50 rounded-lg border-2 border-blue-200">
                <h3 className="text-lg font-bold text-blue-900 mb-4">
                  📋 Résumé de votre profil
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-semibold">Âge:</span> {formData.age} ans
                  </div>
                  <div>
                    <span className="font-semibold">Handicap:</span>{' '}
                    {formData.categorieHandicap} - {formData.diagnostic}
                  </div>
                  <div>
                    <span className="font-semibold">Fréquence:</span>{' '}
                    {formData.frequenceSouhaitee} fois/semaine
                  </div>
                  <div>
                    <span className="font-semibold">Durée:</span>{' '}
                    {formData.dureeSouhaitee}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 mt-8 pt-6 border-t">
            <button
              type="button"
              onClick={prevPhase}
              disabled={phase === 1}
              className={`px-6 py-3 rounded-lg font-medium transition ${
                phase === 1
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
              }`}
            >
              ← Précédent
            </button>

            {phase < 3 ? (
              <button
                type="button"
                onClick={nextPhase}
                className="px-6 py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition"
              >
                Suivant →
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  console.log('Données du formulaire:', formData);
                  onProgramSubmit();
                }}
                className="px-6 py-3 sm:px-8 bg-gradient-to-r from-blue-600 to-orange-500 text-white rounded-lg font-bold hover:from-blue-700 hover:to-orange-600 transition shadow-lg text-base sm:text-lg"
              >
                Créer mon programme 🎯
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormulaireProfil;
