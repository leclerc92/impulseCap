import { useEffect, useState } from 'react';
import './GenerationPopup.css';

interface GenerationPopupProps {
  onComplete: () => void;
}

type PopupState = 'loading' | 'success' | 'closed';

const GenerationPopup = ({ onComplete }: GenerationPopupProps) => {
  const [state, setState] = useState<PopupState>('loading');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animation de la barre de progression
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    // Après 2.5 secondes, passer à l'état success
    const successTimer = setTimeout(() => {
      setState('success');
    }, 2500);

    // Après 4 secondes au total, fermer et appeler onComplete
    const completeTimer = setTimeout(() => {
      setState('closed');
      onComplete();
    }, 4000);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(successTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  if (state === 'closed') return null;

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        {state === 'loading' && (
          <div className="popup-content">
            <div className="spinner"></div>
            <h2 className="popup-title">Génération de votre programme</h2>
            <p className="popup-text">
              Analyse de votre profil en cours...
            </p>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="popup-subtext">{progress}%</p>
          </div>
        )}

        {state === 'success' && (
          <div className="popup-content popup-success">
            <div className="success-icon">✓</div>
            <h2 className="popup-title">Programme créé avec succès !</h2>
            <p className="popup-text">
              Votre programme personnalisé est prêt
            </p>
            <div className="success-checkmarks">
              <div className="checkmark-item">✓ Exercices adaptés à votre profil</div>
              <div className="checkmark-item">✓ Durée et fréquence optimisées</div>
              <div className="checkmark-item">✓ Progression personnalisée</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GenerationPopup;
