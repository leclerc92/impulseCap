import './PremiumPopup.css';

interface PremiumPopupProps {
  onClose: () => void;
}

const PremiumPopup = ({ onClose }: PremiumPopupProps) => {
  return (
    <div className="premium-popup-overlay">
      <div className="premium-popup-container">
        {/* Bouton passer en haut à droite */}
        <div className="premium-skip-button-wrapper">
          <button
            onClick={onClose}
            className="premium-skip-button premium-skip-button-active"
          >
            Fermer ✕
          </button>
        </div>

        {/* Contenu de la popup premium */}
        <div className="premium-content">
          <div className="premium-badge">PREMIUM</div>

          <div className="premium-icon">👑</div>

          <h2 className="premium-title">
            Passez à Premium
          </h2>

          <p className="premium-description">
            Débloquez toutes les fonctionnalités sociales et boostez votre motivation
          </p>

          <div className="premium-features">
            <div className="premium-feature">
              <span className="premium-feature-icon">✓</span>
              <span>Contacter vos amis</span>
            </div>
            <div className="premium-feature">
              <span className="premium-feature-icon">✓</span>
              <span>Créer des défis personnalisés</span>
            </div>
            <div className="premium-feature">
              <span className="premium-feature-icon">✓</span>
              <span>Groupes privés</span>
            </div>
            <div className="premium-feature">
              <span className="premium-feature-icon">✓</span>
              <span>Statistiques avancées</span>
            </div>
          </div>

          <div className="premium-price">
            <span className="premium-price-amount">4,99€</span>
            <span className="premium-price-period">/mois</span>
          </div>

          <button className="premium-cta-button">
            🚀 Découvrir Premium
          </button>

          <p className="premium-trial-text">
            Sans engagement - Résiliable à tout moment
          </p>
        </div>
      </div>
    </div>
  );
};

export default PremiumPopup;
