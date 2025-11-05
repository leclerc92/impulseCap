import React from 'react';
import './PhoneMockup.css';

interface PhoneMockupProps {
  children: React.ReactNode;
}

const PhoneMockup: React.FC<PhoneMockupProps> = ({ children }) => {
  return (
    <div className="phone-mockup-container">
      <div className="phone-mockup">
        {/* Boutons latéraux */}
        <div className="phone-button phone-button-left phone-button-mute"></div>
        <div className="phone-button phone-button-left phone-button-volume-up"></div>
        <div className="phone-button phone-button-left phone-button-volume-down"></div>
        <div className="phone-button phone-button-right phone-button-power"></div>

        {/* Cadre de l'iPhone */}
        <div className="phone-frame">
          {/* Notch (encoche) */}
          <div className="phone-notch">
            <div className="phone-camera"></div>
            <div className="phone-speaker"></div>
          </div>

          {/* Status bar */}
          <div className="phone-status-bar">
            <div className="status-bar-left">
              <span className="time">9:41</span>
            </div>
            <div className="status-bar-right">
              <span className="status-icon">📶</span>
              <span className="status-icon">📡</span>
              <span className="status-icon">🔋</span>
            </div>
          </div>

          {/* Contenu de l'application */}
          <div className="phone-screen">
            {children}
          </div>

          {/* Home indicator */}
          <div className="phone-home-indicator"></div>
        </div>
      </div>
    </div>
  );
};

export default PhoneMockup;