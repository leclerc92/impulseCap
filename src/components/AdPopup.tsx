import './AdPopup.css';

interface AdPopupProps {
  onClose: () => void;
}

const AdPopup = ({ onClose }: AdPopupProps) => {

  return (
    <div className="ad-popup-overlay">
      <div className="ad-popup-container">
        {/* Bouton passer en haut à droite */}
        <div className="ad-skip-button-wrapper">
          <button
            onClick={onClose}
            className="ad-skip-button ad-skip-button-active"
          >
            Passer →
          </button>
        </div>

        {/* Contenu de la publicité */}
        <div className="ad-content">
          <div className="ad-badge">PUBLICITÉ</div>

          <div className="ad-icon">🏋️</div>

          <h2 className="ad-title">
            Tapis de Yoga Premium
          </h2>

          <p className="ad-description">
            Le tapis anti-dérapant parfait pour vos exercices à domicile. Confort optimal et durabilité garantie
          </p>

          <div className="ad-features">
            <div className="ad-feature">
              <span className="ad-feature-icon">✓</span>
              <span>Surface antidérapante</span>
            </div>
            <div className="ad-feature">
              <span className="ad-feature-icon">✓</span>
              <span>Épaisseur 8mm - confort max</span>
            </div>
            <div className="ad-feature">
              <span className="ad-feature-icon">✓</span>
              <span>Matériaux écologiques</span>
            </div>
            <div className="ad-feature">
              <span className="ad-feature-icon">✓</span>
              <span>Livraison gratuite 48h</span>
            </div>
          </div>

          <div className="ad-price">
            <span className="ad-price-amount">39,90€</span>
            <span className="ad-price-period"></span>
          </div>

          <button className="ad-cta-button">
            🛒 Commander maintenant
          </button>

          <p className="ad-trial-text">
            Satisfait ou remboursé 30 jours - Stock limité
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdPopup;
