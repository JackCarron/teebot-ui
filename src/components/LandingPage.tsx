import React from 'react';
import './styles.css';
import './landingpage.css';

const LandingPage: React.FC = () => {
  return (
    <div className="LandingPage">
      <main className="LandingPage-content">
        <section className="hero">
          <div className='hero-text-container'>
            <h2>Discover available tee times</h2>
            <p>Never miss out on your favorite tee times at the best courses</p>
          </div>
          <div>
            <a href="/#/register" className="cta-button">
              Find Tee Times
            </a>
          </div>
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
            <p>Our automated concierge will provide a 5-star booking experience</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
