import React from 'react';
import { useHistory } from 'react-router-dom';
import TeebotLogo from '../images/Teebot.png';
import './styles.css'
import './landingpage.css';

const LandingPage: React.FC = () => {
    return (
      <div className="LandingPage">
        <header className="LandingPage-header">
          <img className="teebotLogo" src={TeebotLogo}></img>
          <h1>Welcome to Teebot ⛳</h1>
        </header>
        <main className="LandingPage-content">
          <section className="hero">
            <h2>Discover available tee times</h2>
            <p>Never miss out on your favorite tee times at the best courses</p>
            <a href="/#/login_or_register" className="cta-button">Get Started</a>
          </section>
          <section className="features">
            <div className="feature">
              <h3>Find your favorite course(s)/times</h3>
              <p>Use our course/time selector to choose a tee time slot you would want to reserve</p>
            </div>
            <div className="feature">
              <h3>Golf Innovation</h3>
              <p>Our revolutionary tee time discovery tool tirelessly locates available tee times.</p>
            </div>
            <div className="feature">
              <h3>Reservation Concierge</h3>
              <p>Out automated concierge will provide 5-star booking experince</p>
            </div>
          </section>
        </main>
        <footer className="LandingPage-footer">
          <p>© 2023 Teebot. All rights reserved.</p>
        </footer>
      </div>
    );
  }

export default LandingPage;